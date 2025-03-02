
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, BookOpen, Lightbulb, Shield, ArrowRight } from 'lucide-react';
import GlassCard from '@/components/UI/GlassCard';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="container py-16 md:py-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="animate-slide-up">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Pour les Artistes Indépendants
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                Naviguez le droit musical avec <span className="text-primary">Confiance</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
                BAVEU aide les musiciens indépendants à comprendre les termes des contrats, protéger leurs droits et prendre des décisions éclairées sur leur carrière.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/assistant')}
                  className="px-6 py-3 font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Essayer l'Assistant IA
                </button>
                <button 
                  onClick={() => navigate('/knowledge-base')}
                  className="px-6 py-3 font-medium rounded-lg border hover:bg-secondary transition-colors"
                >
                  Parcourir la Base de Connaissances
                </button>
              </div>
            </div>

            <div className="relative animate-fade-in lg:pl-10">
              <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center">
                <MessageSquare className="w-16 h-16 text-primary opacity-80" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-16 md:py-24">
          <div className="text-center mb-12 animate-slide-down">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Votre Compagnon Juridique en Musique
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des explications de contrats aux répartitions des redevances, nous vous aidons à naviguer dans le paysage juridique complexe de l'industrie musicale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard className="md:translate-y-8">
              <MessageSquare className="mb-4 h-8 w-8 text-primary" />
              <h3 className="font-display text-xl font-medium mb-2">Assistant Juridique IA</h3>
              <p className="text-muted-foreground mb-4">
                Posez des questions sur les contrats, les redevances et les droits en langage simple. Obtenez des réponses claires et exploitables.
              </p>
              <button 
                onClick={() => navigate('/assistant')}
                className="flex items-center text-primary hover:underline mt-auto"
              >
                Essayez maintenant <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </GlassCard>

            <GlassCard>
              <BookOpen className="mb-4 h-8 w-8 text-primary" />
              <h3 className="font-display text-xl font-medium mb-2">Bibliothèque de Connaissances</h3>
              <p className="text-muted-foreground mb-4">
                Parcourez notre vaste collection de termes juridiques musicaux et d'explications contractuelles. Comprenez avant de signer.
              </p>
              <button 
                onClick={() => navigate('/knowledge-base')}
                className="flex items-center text-primary hover:underline mt-auto"
              >
                Explorer <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </GlassCard>

            <GlassCard className="md:translate-y-8">
              <Lightbulb className="mb-4 h-8 w-8 text-primary" />
              <h3 className="font-display text-xl font-medium mb-2">Conseils de Négociation</h3>
              <p className="text-muted-foreground mb-4">
                Apprenez ce qui est négociable, ce qui est standard et comment défendre vos intérêts lors de l'examen des contrats.
              </p>
              <button 
                onClick={() => navigate('/assistant')}
                className="flex items-center text-primary hover:underline mt-auto"
              >
                Obtenir des conseils <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </GlassCard>
          </div>
        </section>

        {/* Trust Section */}
        <section className="container py-16 md:py-24">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
                  Vos Droits, Protégés
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl">
                  Nous aidons les artistes indépendants à égaliser les chances en démystifiant le droit musical et les termes contractuels. La connaissance, c'est le pouvoir.
                </p>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm">
                    Pas un conseil juridique, mais une orientation utile pour vous guider dans la bonne direction.
                  </span>
                </div>
              </div>
              <button 
                onClick={() => navigate('/assistant')}
                className="px-6 py-3 font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Commencer Maintenant
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
