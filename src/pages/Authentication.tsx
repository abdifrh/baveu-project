
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/UI/PageHeader';
import { Shield, LockKeyhole } from 'lucide-react';

const Authentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsSubmitting(true);
    await signIn(email, password);
    setIsSubmitting(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) return;
    
    setIsSubmitting(true);
    await signUp(email, password, fullName);
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="container py-24 animate-fade-in">
        <PageHeader 
          title={
            <div className="flex items-center">
              <Shield className="h-7 w-7 mr-3 text-primary" />
              Authentification
            </div>
          }
          description="Connectez-vous ou créez un compte pour accéder à toutes les fonctionnalités."
        />

        <div className="max-w-md mx-auto mt-8">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Connexion</TabsTrigger>
              <TabsTrigger value="signup">Inscription</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <Card>
                <CardHeader>
                  <CardTitle>Connexion</CardTitle>
                  <CardDescription>
                    Entrez vos identifiants pour vous connecter à votre compte.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignIn}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="exemple@domaine.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Mot de passe</Label>
                      </div>
                      <Input 
                        id="password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span>Connexion en cours...</span>
                      ) : (
                        <span>Se connecter</span>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Créer un compte</CardTitle>
                  <CardDescription>
                    Inscrivez-vous pour accéder à toutes les fonctionnalités.
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignUp}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nom complet</Label>
                      <Input 
                        id="fullName" 
                        type="text" 
                        placeholder="Jean Dupont"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-signup">Email</Label>
                      <Input 
                        id="email-signup" 
                        type="email" 
                        placeholder="exemple@domaine.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-signup">Mot de passe</Label>
                      <Input 
                        id="password-signup" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span>Inscription en cours...</span>
                      ) : (
                        <span>S'inscrire</span>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8">
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center"><LockKeyhole className="w-4 h-4 mr-2" /> Nos forfaits</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold">Invité:</span> Limité à 2 questions à vie pour l'assistant. Accès limité aux professionnels.
                </div>
                <div>
                  <span className="font-semibold">Gratuit:</span> 5 messages par jour avec l'assistant.
                </div>
                <div>
                  <span className="font-semibold">Basic:</span> 25 messages par jour avec l'assistant.
                </div>
                <div>
                  <span className="font-semibold">Premium:</span> 100 messages par jour avec l'assistant.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Authentication;
