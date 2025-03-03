
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { Message, sendMessageToAIML } from '@/utils/aimlApi';
import Cookies from 'js-cookie';

export interface ChatSession {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
  lastUpdated: Date;
}

// Générer un ID unique pour une nouvelle session
const generateSessionId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Formater un nom de session par défaut basé sur la date
const formatDefaultSessionName = (date: Date) => {
  return `Chat du ${new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)}`;
};

export const useChat = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Récupérer la session active
  const activeSession = activeSessionId 
    ? sessions.find(session => session.id === activeSessionId) 
    : sessions.length > 0 ? sessions[0] : null;
  
  const messages = activeSession?.messages || [];

  // Chargement des sessions depuis les cookies au montage du composant
  useEffect(() => {
    const savedSessions = Cookies.get('baveu-chat-sessions');
    
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions);
        // S'assurer que les dates sont des objets Date
        const formattedSessions = parsedSessions.map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          lastUpdated: new Date(session.lastUpdated),
          messages: session.messages.map((msg: any) => ({
            ...msg,
            createdAt: new Date(msg.createdAt)
          }))
        }));
        
        setSessions(formattedSessions);
        
        // Définir la session active comme la dernière utilisée
        if (formattedSessions.length > 0) {
          const lastActiveId = Cookies.get('baveu-active-session');
          if (lastActiveId && formattedSessions.some((s: ChatSession) => s.id === lastActiveId)) {
            setActiveSessionId(lastActiveId);
          } else {
            setActiveSessionId(formattedSessions[0].id);
          }
        }
      } catch (error) {
        console.error('Erreur lors de l\'analyse des sessions sauvegardées:', error);
        // En cas d'erreur, effacer les cookies
        Cookies.remove('baveu-chat-sessions');
        Cookies.remove('baveu-active-session');
      }
    } else {
      // Créer une session par défaut si aucune session n'existe
      createNewSession();
    }
  }, []);

  // Sauvegarder les sessions dans les cookies à chaque modification
  useEffect(() => {
    if (sessions.length > 0) {
      // Limiter la taille des cookies (max ~4KB)
      const sessionsToSave = sessions.map(session => ({
        ...session,
        // Ne garder que les 50 derniers messages par session pour éviter de dépasser la limite
        messages: session.messages.slice(-50)
      }));
      
      Cookies.set('baveu-chat-sessions', JSON.stringify(sessionsToSave), { expires: 30 }); // Expire dans 30 jours
      
      if (activeSessionId) {
        Cookies.set('baveu-active-session', activeSessionId, { expires: 30 });
      }
    }
  }, [sessions, activeSessionId]);

  // Créer une nouvelle session de chat
  const createNewSession = useCallback((customName?: string) => {
    const now = new Date();
    const newSession: ChatSession = {
      id: generateSessionId(),
      name: customName || formatDefaultSessionName(now),
      messages: [],
      createdAt: now,
      lastUpdated: now
    };
    
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    return newSession.id;
  }, []);

  // Renommer une session
  const renameSession = useCallback((sessionId: string, newName: string) => {
    setSessions(prev => 
      prev.map(session => 
        session.id === sessionId 
          ? { ...session, name: newName, lastUpdated: new Date() } 
          : session
      )
    );
  }, []);

  // Supprimer une session
  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prev => {
      const filteredSessions = prev.filter(session => session.id !== sessionId);
      
      // Si on supprime la session active, basculer vers une autre
      if (sessionId === activeSessionId && filteredSessions.length > 0) {
        setActiveSessionId(filteredSessions[0].id);
      } else if (filteredSessions.length === 0) {
        // Créer une nouvelle session si toutes sont supprimées
        setTimeout(() => createNewSession(), 0);
        setActiveSessionId(null);
      }
      
      return filteredSessions;
    });
  }, [activeSessionId, createNewSession]);

  // Changer de session active
  const switchSession = useCallback((sessionId: string) => {
    if (sessions.some(session => session.id === sessionId)) {
      setActiveSessionId(sessionId);
    }
  }, [sessions]);

  // Envoyer un message dans la session active
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Vérifier si une session existe, sinon en créer une
    if (!activeSessionId) {
      const newSessionId = createNewSession();
      setActiveSessionId(newSessionId);
    }

    // Créer le message utilisateur
    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 15),
      role: 'user',
      content,
      createdAt: new Date()
    };

    // Ajouter le message utilisateur à la session active
    setSessions(prev => prev.map(session => 
      session.id === activeSessionId 
        ? { 
            ...session, 
            messages: [...session.messages, userMessage],
            lastUpdated: new Date()
          } 
        : session
    ));
    
    setIsLoading(true);

    try {
      // Envoyer à l'API
      const sessionMessages = sessions.find(s => s.id === activeSessionId)?.messages || [];
      const allMessages = [...sessionMessages, userMessage];
      
      await sendMessageToAIML(
        allMessages,
        (newMessage) => {
          setSessions(prev => prev.map(session => 
            session.id === activeSessionId 
              ? { 
                  ...session, 
                  messages: [...session.messages, newMessage],
                  lastUpdated: new Date()
                } 
              : session
          ));
          setIsLoading(false);
        },
        (error) => {
          console.error('Erreur dans le chat:', error);
          toast.error('Impossible d\'obtenir une réponse. Veuillez réessayer.');
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setIsLoading(false);
      toast.error('Une erreur s\'est produite. Veuillez réessayer.');
    }
  }, [activeSessionId, sessions, createNewSession]);

  // Effacer tous les messages d'une session
  const clearSession = useCallback((sessionId: string = activeSessionId!) => {
    if (!sessionId) return;
    
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { 
            ...session, 
            messages: [],
            lastUpdated: new Date()
          } 
        : session
    ));
    
    toast.success('Messages de la session effacés');
  }, [activeSessionId]);

  // Effacer toutes les sessions
  const clearAllSessions = useCallback(() => {
    setSessions([]);
    setActiveSessionId(null);
    Cookies.remove('baveu-chat-sessions');
    Cookies.remove('baveu-active-session');
    
    // Créer une nouvelle session par défaut
    setTimeout(() => createNewSession(), 0);
    
    toast.success('Toutes les sessions ont été supprimées');
  }, [createNewSession]);

  return {
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
  };
};
