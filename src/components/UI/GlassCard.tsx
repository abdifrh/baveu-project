
import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  emoji?: string;
  showSparkle?: boolean;
}

const GlassCard = ({ 
  children, 
  className, 
  hover = true, 
  emoji, 
  showSparkle = false,
  ...props 
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        'glass-card p-6 animate-fade-in relative',
        hover ? 'hover:shadow-lg hover:-translate-y-1 transition-transform duration-300' : '',
        className
      )}
      {...props}
    >
      {emoji && (
        <span className="absolute -top-3 -right-2 text-xl emoji transform rotate-12 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
          {emoji}
        </span>
      )}
      
      {showSparkle && (
        <div className="absolute -top-2 -left-2">
          <Sparkles className="h-5 w-5 text-primary animate-pulse-slow" />
        </div>
      )}
      
      {children}
    </div>
  );
};

export default GlassCard;
