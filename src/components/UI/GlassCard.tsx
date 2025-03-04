
import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  emoji?: string;
  showSparkle?: boolean;
  variant?: 'default' | 'blue' | 'gradient';
  hoverEffect?: 'lift' | 'glow' | 'both' | 'none';
}

const GlassCard = ({ 
  children, 
  className, 
  hover = true, 
  emoji, 
  showSparkle = false,
  variant = 'default',
  hoverEffect = 'both',
  ...props 
}: GlassCardProps) => {
  // Define base classes based on variant
  const variantClasses = {
    default: 'glass-card',
    blue: 'glass-card bg-blue-50/80 border-blue-100 dark:bg-slate-800/90 dark:border-slate-700/60',
    gradient: 'glass-card bg-gradient-to-br from-white to-blue-50 dark:from-slate-800/95 dark:to-slate-900/80'
  };

  // Define hover effects
  const hoverClasses = {
    none: '',
    lift: hover ? 'hover:-translate-y-1 transition-transform duration-300' : '',
    glow: hover ? 'hover:shadow-lg hover:border-blue-200/60 dark:hover:border-blue-700/70 transition-all duration-300' : '',
    both: hover ? 'hover:shadow-lg hover:-translate-y-1 hover:border-blue-200/60 dark:hover:border-blue-700/70 transition-all duration-300' : ''
  };

  return (
    <div
      className={cn(
        'p-6 animate-fade-in relative rounded-xl',
        variantClasses[variant],
        hoverClasses[hoverEffect],
        className
      )}
      {...props}
    >
      {emoji && (
        <div className="absolute -top-3 -right-2 z-10">
          <div className="emoji transform rotate-12 bg-white dark:bg-slate-800 rounded-full w-10 h-10 flex items-center justify-center shadow-md border border-blue-100/50 dark:border-slate-700/80 text-xl">
            {emoji}
          </div>
        </div>
      )}
      
      {showSparkle && (
        <div className="absolute -top-2 -left-2 z-10">
          <Sparkles className="h-6 w-6 text-blue-500 dark:text-blue-400" />
        </div>
      )}
      
      {children}
    </div>
  );
};

export default GlassCard;
