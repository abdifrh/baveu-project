
import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Loader2 } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import ChatMessage from './ChatMessage';
import GlassCard from '@/components/UI/GlassCard';
import { toast } from 'sonner';

const ChatInterface = () => {
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      return;
    }
    
    sendMessage(inputValue);
    setInputValue('');
  };

  const handleClearChat = () => {
    if (messages.length === 0) {
      toast.info('Chat is already empty');
      return;
    }
    
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      clearChat();
    }
  };

  // Auto-resize textarea as user types
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  return (
    <GlassCard className="flex flex-col h-[calc(100vh-220px)] min-h-[500px] shadow-md hover:shadow-md">
      {/* Chat Header */}
      <div className="flex justify-between items-center pb-4 border-b">
        <h3 className="font-display text-lg font-medium">Legal Assistant</h3>
        <button
          onClick={handleClearChat}
          className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-full"
          title="Clear chat history"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto py-4 px-1">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <p className="mb-4 font-display text-lg">How can I help you today?</p>
            <div className="grid grid-cols-1 gap-3 max-w-md">
              <button
                onClick={() => sendMessage("What should I look for in a music distribution contract?")}
                className="text-sm px-4 py-2 border rounded-lg hover:bg-secondary transition-colors text-left"
              >
                What should I look for in a music distribution contract?
              </button>
              <button
                onClick={() => sendMessage("Explain copyright ownership in simple terms")}
                className="text-sm px-4 py-2 border rounded-lg hover:bg-secondary transition-colors text-left"
              >
                Explain copyright ownership in simple terms
              </button>
              <button
                onClick={() => sendMessage("What are mechanical royalties?")}
                className="text-sm px-4 py-2 border rounded-lg hover:bg-secondary transition-colors text-left"
              >
                What are mechanical royalties?
              </button>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </>
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center space-x-2 text-muted-foreground animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">LegalBeat is thinking...</span>
          </div>
        )}

        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="border-t pt-4">
        <div className="flex items-end">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleTextareaChange}
            placeholder="Ask a question about music contracts, royalties, copyright..."
            className="flex-1 max-h-[150px] resize-none bg-transparent border-0 focus:ring-0 px-0 py-2"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="ml-2 p-2 rounded-full bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>
    </GlassCard>
  );
};

export default ChatInterface;
