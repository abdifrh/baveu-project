
import React from 'react';
import { User, Bot, Clock, ThumbsUp, MessageSquare, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '@/utils/aimlApi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
          'flex max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-sm transition-all duration-300 hover:shadow-md',
          isUser 
            ? 'bg-primary text-primary-foreground ml-4 hover:-translate-y-0.5' 
            : 'glass border ml-0 mr-4 hover:-translate-y-0.5 dark:bg-slate-800/60 dark:border-slate-700/50'
        )}
      >
        <div className="flex-shrink-0 mr-3">
          {isUser ? (
            <div className="p-1.5 bg-primary-foreground/20 rounded-full">
              <User className="h-4 w-4" />
            </div>
          ) : (
            <div className="p-1.5 bg-primary/10 rounded-full dark:bg-blue-500/20">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <span className="font-medium text-sm flex items-center">
              {isUser ? (
                <>
                  Vous <ThumbsUp className="ml-1 h-3 w-3" />
                </>
              ) : (
                <>
                  Mr BAVEU <MessageSquare className="ml-1 h-3 w-3" />
                </>
              )}
            </span>
            <span className="text-xs opacity-70 flex items-center ml-2">
              <Clock className="h-3 w-3 mr-1" />
              {formatTime(message.createdAt)}
            </span>
          </div>
          
          {isUser ? (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {message.content.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < message.content.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-3 mb-2 pb-1 border-b" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-3 mb-2 pb-1 border-b border-opacity-20" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-base font-bold mt-3 mb-1" {...props} />,
                  h4: ({node, ...props}) => <h4 className="text-sm font-bold mt-2 mb-1" {...props} />,
                  p: ({node, ...props}) => <p className="my-2 leading-relaxed" {...props} />,
                  ul: ({node, ...props}) => <ul className="my-2 pl-6 list-disc" {...props} />,
                  ol: ({node, ...props}) => <ol className="my-2 pl-6 list-decimal" {...props} />,
                  li: ({node, ...props}) => <li className="mt-1" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary pl-4 my-2 italic" {...props} />,
                  code: ({node, inline, ...props}) => 
                    inline ? (
                      <code className="px-1.5 py-0.5 bg-muted rounded text-xs" {...props} />
                    ) : (
                      <code className="block bg-muted p-3 rounded-md text-xs overflow-x-auto my-2" {...props} />
                    ),
                  a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />,
                  table: ({node, ...props}) => <div className="overflow-x-auto my-4"><table className="border-collapse w-full text-sm" {...props} /></div>,
                  th: ({node, ...props}) => <th className="border border-muted p-2 bg-muted/50 font-medium" {...props} />,
                  td: ({node, ...props}) => <td className="border border-muted p-2" {...props} />,
                  hr: ({node, ...props}) => <hr className="my-4 border-muted" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                  em: ({node, ...props}) => <em className="italic" {...props} />,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
