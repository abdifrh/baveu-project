
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckIcon, 
  MessageSquare, 
  Users, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/UI/PageHeader';
import { useAuth } from '@/contexts/AuthContext';

const PricingFeature = ({ included, text }: { included: boolean; text: string }) => (
  <div className="flex items-start space-x-2">
    {included ? (
      <CheckIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
    ) : (
      <span className="h-5 w-5 shrink-0 mt-0.5" />
    )}
    <span className={included ? "" : "text-muted-foreground"}>{text}</span>
  </div>
);

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const plans = [
    {
      name: "Invité",
      description: "Pour découvrir notre assistant",
      price: "Gratuit",
      features: [
        { text: "2 questions à vie avec l'assistant", included: true },
        { text: "Accès aux articles de la base de connaissances", included: true },
        { text: "Consultation des profils des professionnels", included: true },
        { text: "Accès aux réseaux sociaux des pros", included: false },
        { text: "Accès aux portfolios des pros", included: false },
        { text: "Contacter les professionnels", included: false },
      ],
      icon: <MessageSquare className="h-10 w-10 text-muted-foreground" />,
      buttonText: "Continuer en tant qu'invité",
      popular: false,
      action: () => navigate('/')
    },
    {
      name: "Gratuit",
      description: "Pour une utilisation personnelle",
      price: "0€",
      perMonth: true,
      features: [
        { text: "5 messages par jour avec l'assistant", included: true },
        { text: "Accès aux articles de la base de connaissances", included: true },
        { text: "Consultation des profils des professionnels", included: true },
        { text: "Accès aux réseaux sociaux des pros", included: true },
        { text: "Accès aux portfolios des pros", included: true },
        { text: "Contacter les professionnels", included: true },
      ],
      icon: <Users className="h-10 w-10 text-blue-500" />,
      buttonText: user ? "Forfait actuel" : "S'inscrire",
      popular: false,
      action: () => navigate('/auth')
    },
    {
      name: "Basic",
      description: "Pour les musiciens débutants",
      price: "9,99€",
      perMonth: true,
      features: [
        { text: "25 messages par jour avec l'assistant", included: true },
        { text: "Accès aux articles de la base de connaissances", included: true },
        { text: "Consultation des profils des professionnels", included: true },
        { text: "Accès aux réseaux sociaux des pros", included: true },
        { text: "Accès aux portfolios des pros", included: true },
        { text: "Contacter les professionnels", included: true },
        { text: "Support prioritaire", included: true },
      ],
      icon: <Zap className="h-10 w-10 text-yellow-500" />,
      buttonText: "Choisir Basic",
      popular: true,
      action: () => navigate('/auth')
    },
    {
      name: "Premium",
      description: "Pour les musiciens professionnels",
      price: "19,99€",
      perMonth: true,
      features: [
        { text: "100 messages par jour avec l'assistant", included: true },
        { text: "Accès aux articles de la base de connaissances", included: true },
        { text: "Consultation des profils des professionnels", included: true },
        { text: "Accès aux réseaux sociaux des pros", included: true },
        { text: "Accès aux portfolios des pros", included: true },
        { text: "Contacter les professionnels", included: true },
        { text: "Support prioritaire 24/7", included: true },
        { text: "Recommandations personnalisées", included: true },
        { text: "Fonctionnalités exclusives", included: true },
      ],
      icon: <ShieldCheck className="h-10 w-10 text-purple-500" />,
      buttonText: "Choisir Premium",
      popular: false,
      action: () => navigate('/auth')
    }
  ];

  return (
    <Layout>
      <div className="container py-24 animate-fade-in">
        <PageHeader 
          title="Nos forfaits"
          description="Choisissez le forfait qui correspond à vos besoins et commencez à utiliser notre assistant dès aujourd'hui."
        />

        <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col h-full ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  {plan.icon}
                  {plan.popular && <Badge className="bg-primary">Populaire</Badge>}
                </div>
                <CardTitle className="mt-4 text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-0 flex-grow">
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.perMonth && <span className="text-muted-foreground ml-1">/mois</span>}
                </div>
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <PricingFeature 
                      key={i}
                      included={feature.included}
                      text={feature.text}
                    />
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-6 mt-auto">
                <Button 
                  onClick={plan.action} 
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-20 bg-muted p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Questions fréquentes</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Comment puis-je changer de forfait ?</h3>
              <p className="text-muted-foreground">Vous pouvez modifier votre forfait à tout moment depuis votre profil. Les changements prendront effet immédiatement.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Les messages sont-ils réinitialisés chaque jour ?</h3>
              <p className="text-muted-foreground">Oui, votre quota de messages est réinitialisé tous les jours à minuit UTC.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Puis-je annuler mon abonnement ?</h3>
              <p className="text-muted-foreground">Vous pouvez annuler votre abonnement à tout moment. Après l'annulation, vous conserverez l'accès jusqu'à la fin de la période de facturation.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Comment fonctionne la limite pour les invités ?</h3>
              <p className="text-muted-foreground">Les invités sont limités à 2 questions au total pour l'assistant. Pour poser plus de questions, inscrivez-vous à un compte gratuit.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
