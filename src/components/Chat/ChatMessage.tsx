
import React from 'react';
import { User, Bot, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '@/utils/aimlApi';

interface ChatMessageProps {
  message: Message;
}

const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={cn(
        'flex w-full mb-4 animate-slide-up',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div 
        className={cn(
          'flex max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3',
          isUser 
            ? 'bg-primary text-primary-foreground ml-4' 
            : 'glass border ml-0 mr-4'
        )}
      >
        <div className="flex-shrink-0 mr-3">
          {isUser ? (
            <User className="h-5 w-5" />
          ) : (
            <Bot className="h-5 w-5" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <span className="font-medium text-sm">
              {isUser ? 'Vous' : 'LegalBeat'}
            </span>
            <span className="text-xs opacity-70 flex items-center ml-2">
              <Clock className="h-3 w-3 mr-1" />
              {formatTime(message.createdAt)}
            </span>
          </div>
          
          <div className="prose prose-sm max-w-none">
            {message.content.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < message.content.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
