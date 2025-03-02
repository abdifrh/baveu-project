
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard = ({ children, className, hover = true, ...props }: GlassCardProps) => {
  return (
    <div
      className={cn(
        'glass-card p-6 animate-fade-in',
        hover ? 'hover:shadow-lg hover:-translate-y-1' : '',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
