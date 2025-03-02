
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { Message, sendMessageToAIML } from '@/utils/aimlApi';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('legalbeat-chat');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Ensure createdAt is a Date object
        const formattedMessages = parsedMessages.map((msg: any) => ({
          ...msg,
          createdAt: new Date(msg.createdAt)
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
        // If there's an error, clear the localStorage
        localStorage.removeItem('legalbeat-chat');
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('legalbeat-chat', JSON.stringify(messages));
    }
  }, [messages]);

  // Send a message and get a response
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Create user message
    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 15),
      role: 'user',
      content,
      createdAt: new Date()
    };

    // Add user message to state
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Send to API
      const allMessages = [...messages, userMessage];
      await sendMessageToAIML(
        allMessages,
        (newMessage) => {
          setMessages(prev => [...prev, newMessage]);
          setIsLoading(false);
        },
        (error) => {
          console.error('Error in chat:', error);
          toast.error('Failed to get a response. Please try again.');
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      toast.error('Something went wrong. Please try again.');
    }
  }, [messages]);

  // Clear all messages
  const clearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem('legalbeat-chat');
    toast.success('Chat history cleared');
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat
  };
};
