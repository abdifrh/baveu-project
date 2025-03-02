
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { Message, sendMessageToAIML } from '@/utils/aimlApi';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Chargement des messages depuis le localStorage au montage du composant
  useEffect(() => {
    const savedMessages = localStorage.getItem('legalbeat-chat');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // S'assurer que createdAt est un objet Date
        const formattedMessages = parsedMessages.map((msg: any) => ({
          ...msg,
          createdAt: new Date(msg.createdAt)
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error('Erreur lors de l\'analyse des messages sauvegardés:', error);
        // En cas d'erreur, effacer le localStorage
        localStorage.removeItem('legalbeat-chat');
      }
    }
  }, []);

  // Sauvegarder les messages dans le localStorage à chaque modification
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('legalbeat-chat', JSON.stringify(messages));
    }
  }, [messages]);

  // Envoyer un message et obtenir une réponse
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Créer le message utilisateur
    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 15),
      role: 'user',
      content,
      createdAt: new Date()
    };

    // Ajouter le message utilisateur à l'état
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Envoyer à l'API
      const allMessages = [...messages, userMessage];
      await sendMessageToAIML(
        allMessages,
        (newMessage) => {
          setMessages(prev => [...prev, newMessage]);
          setIsLoading(false);
        },
        (error) => {
          console.error('Erreur dans le chat:', error);
          toast.error('Impossible d\'obtenir une réponse. Veuillez réessayer.');
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setIsLoading(false);
      toast.error('Une erreur s\'est produite. Veuillez réessayer.');
    }
  }, [messages]);

  // Effacer tous les messages
  const clearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem('legalbeat-chat');
    toast.success('Historique du chat effacé');
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat
  };
};
