
import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ApiKeySettings from '@/components/Settings/ApiKeySettings';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ApiSettingsButtonProps {
  className?: string;
}

const ApiSettingsButton: React.FC<ApiSettingsButtonProps> = ({ className }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDialogOpen(true)}
              className={cn('rounded-full hover:bg-blue-100/50 dark:hover:bg-blue-900/50', className)}
              aria-label="Paramètres API Mr BAVEU"
            >
              <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Paramètres API Mr BAVEU</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <ApiKeySettings 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </>
  );
};

export default ApiSettingsButton;
