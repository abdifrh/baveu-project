import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

export type SubscriptionPlan = 'free' | 'basic' | 'premium';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  subscription_plan: SubscriptionPlan;
  messages_sent_today: number;
  messages_reset_date: string;
}

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetGuestQuestions: () => Promise<void>;
  incrementGuestQuestions: () => Promise<number>;
  getGuestQuestionsCount: () => Promise<number>;
  canAskQuestion: () => Promise<boolean>;
  incrementUserMessages: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setProfile(data as UserProfile);
          
          // Reset messages count if date has changed
          const today = new Date().toISOString().split('T')[0];
          if (data.messages_reset_date !== today) {
            await supabase
              .from('profiles')
              .update({ 
                messages_sent_today: 0,
                messages_reset_date: today
              })
              .eq('id', userId);
              
            // Update local state
            setProfile({
              ...data as UserProfile,
              messages_sent_today: 0,
              messages_reset_date: today
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    const { data } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user || null);
      
      if (newSession?.user) {
        await fetchUserProfile(newSession.user.id);
      } else {
        setProfile(null);
      }
      
      setIsLoading(false);
    });

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }
      
      toast.success('Connexion réussie');
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error(error.message || 'Erreur de connexion');
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast.success('Inscription réussie ! Veuillez vérifier votre email pour confirmer votre compte.');
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(error.message || 'Erreur lors de l\'inscription');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      // Nous ne naviguons plus ici car cela sera fait dans le composant
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error(error.message || 'Erreur lors de la déconnexion');
      throw error;
    }
  };

  // Fonctions pour les invités
  const getGuestQuestionsCount = async (): Promise<number> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const { ip } = await response.json();
      
      const { data, error } = await supabase
        .from('guest_questions')
        .select('questions_count')
        .eq('ip_address', ip)
        .maybeSingle();
      
      if (error) {
        throw error;
      }
      
      return data?.questions_count || 0;
    } catch (error) {
      console.error('Error getting guest questions count:', error);
      return 0;
    }
  };

  const incrementGuestQuestions = async (): Promise<number> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const { ip } = await response.json();
      
      // Vérifier si l'entrée existe déjà
      const { data: existingData } = await supabase
        .from('guest_questions')
        .select('*')
        .eq('ip_address', ip)
        .maybeSingle();
      
      if (existingData) {
        const newCount = existingData.questions_count + 1;
        
        const { data, error } = await supabase
          .from('guest_questions')
          .update({ 
            questions_count: newCount,
            last_question_at: new Date().toISOString()
          })
          .eq('ip_address', ip)
          .select('questions_count')
          .single();
        
        if (error) {
          throw error;
        }
        
        return data.questions_count;
      } else {
        // Créer une nouvelle entrée
        const { data, error } = await supabase
          .from('guest_questions')
          .insert({ 
            ip_address: ip,
            questions_count: 1,
            last_question_at: new Date().toISOString()
          })
          .select('questions_count')
          .single();
        
        if (error) {
          throw error;
        }
        
        return data.questions_count;
      }
    } catch (error) {
      console.error('Error incrementing guest questions:', error);
      return 0;
    }
  };

  const resetGuestQuestions = async (): Promise<void> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const { ip } = await response.json();
      
      await supabase
        .from('guest_questions')
        .update({ questions_count: 0 })
        .eq('ip_address', ip);
    } catch (error) {
      console.error('Error resetting guest questions:', error);
    }
  };

  // Vérifier si l'utilisateur peut poser une question
  const canAskQuestion = async (): Promise<boolean> => {
    if (user) {
      // Utilisateur connecté - vérifier son forfait et le nombre de messages envoyés aujourd'hui
      if (!profile) return false;
      
      const messageLimits = {
        'free': 5,
        'basic': 25,
        'premium': 100
      };
      
      const limit = messageLimits[profile.subscription_plan];
      return profile.messages_sent_today < limit;
    } else {
      // Invité - limité à 2 questions
      const count = await getGuestQuestionsCount();
      return count < 2;
    }
  };

  // Incrémenter le compteur de messages pour un utilisateur connecté
  const incrementUserMessages = async (): Promise<boolean> => {
    if (!user || !profile) return false;
    
    try {
      const newCount = profile.messages_sent_today + 1;
      
      const { error } = await supabase
        .from('profiles')
        .update({ messages_sent_today: newCount })
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setProfile({
        ...profile,
        messages_sent_today: newCount
      });
      
      return true;
    } catch (error) {
      console.error('Error incrementing user messages:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      session,
      user,
      profile,
      isLoading,
      signIn,
      signUp,
      signOut,
      resetGuestQuestions,
      incrementGuestQuestions,
      getGuestQuestionsCount,
      canAskQuestion,
      incrementUserMessages
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
