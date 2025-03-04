
import React from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: React.ReactNode; // Changed from string to ReactNode
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

const PageHeader = ({ title, description, className, children }: PageHeaderProps) => {
  return (
    <div className={cn('mb-10 space-y-2 animate-slide-down', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          {description && (
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageHeader;
