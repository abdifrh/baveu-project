
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Trash2, 
  Loader2, 
  MessageSquarePlus, 
  MessageSquare, 
  MoreVertical,
  Edit,
  Trash,
  LayoutList
} from 'lucide-react';
import { useChat, ChatSession } from '@/hooks/useChat';
import ChatMessage from './ChatMessage';
import GlassCard from '@/components/UI/GlassCard';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChatInterface = () => {
  const { 
    messages, 
    sessions,
    activeSessionId,
    isLoading, 
    sendMessage, 
    createNewSession,
    renameSession,
    deleteSession,
    switchSession,
    clearSession,
    clearAllSessions
  } = useChat();
  
  const [inputValue, setInputValue] = useState('');
  const [showSessionsSheet, setShowSessionsSheet] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [sessionToRename, setSessionToRename] = useState<string | null>(null);
  const [newSessionName, setNewSessionName] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeSessionId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      return;
    }
    
    sendMessage(inputValue);
    setInputValue('');
  };

  const handleClearChat = () => {
    if (!activeSessionId) return;
    
    if (messages.length === 0) {
      toast.info('Le chat est déjà vide');
      return;
    }
    
    if (window.confirm('Êtes-vous sûr de vouloir effacer l\'historique de cette conversation ?')) {
      clearSession(activeSessionId);
    }
  };

  // Auto-resize textarea as user types
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  // Gestion de la session à renommer
  const handleOpenRenameDialog = (sessionId: string, currentName: string) => {
    setSessionToRename(sessionId);
    setNewSessionName(currentName);
    setRenameDialogOpen(true);
  };

  const handleRenameSession = () => {
    if (sessionToRename && newSessionName.trim()) {
      renameSession(sessionToRename, newSessionName.trim());
      setRenameDialogOpen(false);
      setSessionToRename(null);
      setNewSessionName('');
      toast.success('Session renommée');
    }
  };

  // Gestion de la suppression d'une session
  const handleOpenDeleteDialog = (sessionId: string) => {
    setSessionToDelete(sessionId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteSession = () => {
    if (sessionToDelete) {
      deleteSession(sessionToDelete);
      setDeleteDialogOpen(false);
      setSessionToDelete(null);
      toast.success('Session supprimée');
    }
  };

  const activeSessionName = activeSessionId 
    ? sessions.find(s => s.id === activeSessionId)?.name 
    : "Nouvelle discussion";

  return (
    <>
      <GlassCard className="flex flex-col h-[calc(100vh-220px)] min-h-[500px] shadow-md hover:shadow-md">
        {/* Chat Header */}
        <div className="flex justify-between items-center pb-4 border-b">
          <div className="flex items-center space-x-2">
            <Sheet open={showSessionsSheet} onOpenChange={setShowSessionsSheet}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="mr-2">
                  <LayoutList className="h-4 w-4 mr-2" />
                  <span className="font-medium max-w-[200px] truncate">{activeSessionName}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Vos conversations</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <Button 
                    onClick={() => {
                      createNewSession();
                      setShowSessionsSheet(false);
                    }}
                    className="w-full justify-start mb-4"
                  >
                    <MessageSquarePlus className="mr-2 h-4 w-4" />
                    Nouvelle conversation
                  </Button>
                  
                  <div className="space-y-2 mt-4">
                    {sessions.map((session) => (
                      <div 
                        key={session.id}
                        className={`flex items-center justify-between p-2 rounded-md ${
                          session.id === activeSessionId 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-secondary'
                        }`}
                      >
                        <button
                          className="flex items-center flex-1 text-left truncate"
                          onClick={() => {
                            switchSession(session.id);
                            setShowSessionsSheet(false);
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{session.name}</span>
                        </button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenRenameDialog(session.id, session.name)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Renommer
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleOpenDeleteDialog(session.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearChat}
              title="Effacer cette conversation"
              disabled={messages.length === 0}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => createNewSession()}
              title="Nouvelle conversation"
            >
              <MessageSquarePlus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto py-4 px-1">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <p className="mb-4 font-display text-lg">Comment puis-je vous aider aujourd'hui ?</p>
              <div className="grid grid-cols-1 gap-3 max-w-md">
                <button
                  onClick={() => sendMessage("Que dois-je rechercher dans un contrat de distribution musicale ?")}
                  className="text-sm px-4 py-2 border rounded-lg hover:bg-secondary transition-colors text-left"
                >
                  Que dois-je rechercher dans un contrat de distribution musicale ?
                </button>
                <button
                  onClick={() => sendMessage("Expliquer les droits d'auteur en termes simples")}
                  className="text-sm px-4 py-2 border rounded-lg hover:bg-secondary transition-colors text-left"
                >
                  Expliquer les droits d'auteur en termes simples
                </button>
                <button
                  onClick={() => sendMessage("Qu'est-ce que les redevances mécaniques ?")}
                  className="text-sm px-4 py-2 border rounded-lg hover:bg-secondary transition-colors text-left"
                >
                  Qu'est-ce que les redevances mécaniques ?
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
              <span className="text-sm">BAVEU réfléchit...</span>
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
              placeholder="Posez une question sur les contrats musicaux, les redevances, les droits d'auteur..."
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
      
      {/* Rename Dialog */}
      <Dialog open={renameDialogOpen} onOpenChange={setRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renommer la conversation</DialogTitle>
          </DialogHeader>
          <Input
            value={newSessionName}
            onChange={(e) => setNewSessionName(e.target.value)}
            placeholder="Nom de la conversation"
            className="mt-4"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleRenameSession();
              }
            }}
          />
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setRenameDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleRenameSession}>
              Renommer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer la conversation</DialogTitle>
          </DialogHeader>
          <p className="mt-4">Êtes-vous sûr de vouloir supprimer cette conversation ? Cette action est irréversible.</p>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteSession}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatInterface;
