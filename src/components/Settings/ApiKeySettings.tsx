
import React, { useState, useEffect } from 'react';
import { Check, X, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ApiKeySettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApiKeySettings: React.FC<ApiKeySettingsProps> = ({
  open,
  onOpenChange,
}) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [useOfflineMode, setUseOfflineMode] = useState<boolean>(true);

  // Récupérer les paramètres sauvegardés lors de l'ouverture du dialog
  useEffect(() => {
    if (open) {
      const savedApiKey = localStorage.getItem('baveu-api-key') || '';
      const savedOfflineMode = localStorage.getItem('baveu-offline-mode') !== 'false';
      
      setApiKey(savedApiKey);
      setUseOfflineMode(savedOfflineMode);
    }
  }, [open]);

  const handleSaveSettings = () => {
    setIsLoading(true);
    
    try {
      // Vérifier si la clé API est valide si on n'utilise pas le mode hors ligne
      if (!useOfflineMode && !apiKey.trim()) {
        toast.error('Veuillez entrer une clé API valide ou activer le mode hors ligne');
        setIsLoading(false);
        return;
      }
      
      // Sauvegarder les paramètres
      localStorage.setItem('baveu-api-key', apiKey);
      localStorage.setItem('baveu-offline-mode', useOfflineMode.toString());
      
      toast.success('Paramètres sauvegardés avec succès');
      onOpenChange(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des paramètres:', error);
      toast.error('Erreur lors de la sauvegarde des paramètres');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestApiKey = async () => {
    if (!apiKey.trim()) {
      toast.error('Veuillez entrer une clé API');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simuler un test de connexion à l'API OpenAI
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // En situation réelle, vous feriez une requête à l'API pour vérifier la validité de la clé
      toast.success('Connexion à l\'API OpenAI réussie');
    } catch (error) {
      console.error('Erreur lors du test de la clé API:', error);
      toast.error('Erreur lors du test de la clé API');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Paramètres de l'API</DialogTitle>
          <DialogDescription>
            Configurez les paramètres de l'API pour Mr BAVEU, votre assistant juridique musical.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-2 mt-4">
          <Switch
            id="offline-mode"
            checked={useOfflineMode}
            onCheckedChange={setUseOfflineMode}
          />
          <Label htmlFor="offline-mode">Mode hors ligne</Label>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertCircle className="h-4 w-4 text-muted-foreground ml-1" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Le mode hors ligne utilise des réponses pré-enregistrées. 
                  Désactivez-le pour utiliser l'API OpenAI en ligne.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className={!useOfflineMode ? 'mt-4' : 'mt-4 opacity-50 pointer-events-none'}>
          <Label htmlFor="api-key" className="mb-2 block">
            Clé API OpenAI
          </Label>
          <div className="flex space-x-2">
            <Input
              id="api-key"
              type="password"
              placeholder="Entrez votre clé API OpenAI"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleTestApiKey}
              disabled={!apiKey.trim() || isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Vous pouvez obtenir une clé API sur platform.openai.com
          </p>
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSaveSettings} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sauvegarde...
              </>
            ) : (
              'Sauvegarder'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeySettings;
