
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogIn, LogOut, UserCircle, Zap, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const UserMenu = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Obtenir les initiales pour l'avatar
  const getInitials = () => {
    if (!profile?.full_name) return 'U';
    
    const names = profile.full_name.split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };
  
  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'premium': return 'text-yellow-500';
      case 'basic': return 'text-blue-500';
      case 'free': return 'text-green-500';
      default: return '';
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Déconnexion réussie');
      navigate('/');
    } catch (error: any) {
      console.error('Erreur lors de la déconnexion:', error);
      toast.error(error.message || 'Erreur lors de la déconnexion');
    }
  };

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="gap-2" asChild>
          <Link to="/auth">
            <LogIn className="h-4 w-4" />
            <span>Connexion</span>
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative rounded-full h-8 w-8 p-0">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-sm font-medium">{profile?.full_name || 'Utilisateur'}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
          {profile && (
            <div className="flex items-center text-xs">
              <Zap className={`h-3 w-3 mr-1 ${getPlanColor(profile.subscription_plan)}`} />
              <span className={`capitalize ${getPlanColor(profile.subscription_plan)}`}>
                {profile.subscription_plan}
              </span>
              <span className="ml-1 text-muted-foreground">
                ({profile.messages_sent_today} / 
                {profile.subscription_plan === 'free' ? '5' : 
                 profile.subscription_plan === 'basic' ? '25' : '100'} messages)
              </span>
            </div>
          )}
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer flex w-full items-center">
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Profil</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/pricing" className="cursor-pointer flex w-full items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Forfaits</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="cursor-pointer text-red-500 focus:text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
