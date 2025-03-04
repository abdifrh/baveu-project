
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, BookOpen, Lightbulb, Shield, ArrowRight, Sparkles, Music, Award, ZapIcon } from 'lucide-react';
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
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-medium dark:bg-blue-900/40 dark:text-blue-300">
                Pour les Artistes Indépendants ✨
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                Naviguez le droit musical avec <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Confiance</span> 🚀
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
                BAVEU aide les musiciens indépendants à comprendre les termes des contrats, protéger leurs droits et prendre des décisions éclairées sur leur carrière. 🎵
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/assistant')}
                  className="px-6 py-3 font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 dark:bg-blue-700 dark:hover:bg-blue-600"
                >
                  Essayer l'Assistant IA 🤖
                </button>
                <button 
                  onClick={() => navigate('/knowledge-base')}
                  className="px-6 py-3 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors dark:border-blue-700 dark:hover:bg-blue-900/30"
                >
                  Parcourir la Base de Connaissances 📚
                </button>
              </div>
            </div>

            <div className="relative animate-fade-in lg:pl-10">
              <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-blue-300/30 to-blue-100/5 dark:from-blue-900/20 dark:to-blue-800/5 flex items-center justify-center shadow-lg transform hover:rotate-1 transition-transform duration-300">
                <MessageSquare className="w-16 h-16 text-blue-500 opacity-80 animate-pulse-slow" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-blue-300/20 dark:bg-blue-700/10 rounded-full blur-3xl -z-10" />
              <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
                <span className="text-3xl animate-float">🎵</span>
              </div>
              <div className="absolute bottom-8 left-8">
                <span className="text-3xl animate-float" style={{ animationDelay: '1s' }}>📝</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-16 md:py-24 relative">
          <div className="text-center mb-12 animate-slide-down">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Votre Compagnon Juridique en Musique 🎻
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des explications de contrats aux répartitions des redevances, nous vous aidons à naviguer dans le paysage juridique complexe de l'industrie musicale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard className="md:translate-y-8 bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-blue-900/10" emoji="💬">
              <MessageSquare className="mb-4 h-8 w-8 text-blue-500" />
              <h3 className="font-display text-xl font-medium mb-2">Assistant Juridique IA</h3>
              <p className="text-muted-foreground mb-4">
                Posez des questions sur les contrats, les redevances et les droits en langage simple. Obtenez des réponses claires et exploitables. 🤖
              </p>
              <button 
                onClick={() => navigate('/assistant')}
                className="flex items-center text-blue-600 hover:underline mt-auto group dark:text-blue-400"
              >
                Essayez maintenant <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </GlassCard>

            <GlassCard className="bg-gradient-to-br from-white to-blue-50/80 dark:from-slate-800 dark:to-blue-900/5" emoji="📖">
              <BookOpen className="mb-4 h-8 w-8 text-blue-500" />
              <h3 className="font-display text-xl font-medium mb-2">Bibliothèque de Connaissances</h3>
              <p className="text-muted-foreground mb-4">
                Parcourez notre vaste collection de termes juridiques musicaux et d'explications contractuelles. Comprenez avant de signer. 📚
              </p>
              <button 
                onClick={() => navigate('/knowledge-base')}
                className="flex items-center text-blue-600 hover:underline mt-auto group dark:text-blue-400"
              >
                Explorer <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </GlassCard>

            <GlassCard className="md:translate-y-8 bg-gradient-to-br from-white to-blue-50/60 dark:from-slate-800 dark:to-blue-900/5" emoji="💡">
              <Lightbulb className="mb-4 h-8 w-8 text-blue-500" />
              <h3 className="font-display text-xl font-medium mb-2">Conseils de Négociation</h3>
              <p className="text-muted-foreground mb-4">
                Apprenez ce qui est négociable, ce qui est standard et comment défendre vos intérêts lors de l'examen des contrats. 🔍
              </p>
              <button 
                onClick={() => navigate('/assistant')}
                className="flex items-center text-blue-600 hover:underline mt-auto group dark:text-blue-400"
              >
                Obtenir des conseils <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </GlassCard>
          </div>
        </section>

        {/* Trust Section */}
        <section className="container py-16 md:py-24 relative">
          <div className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-blue-800/10 rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4 flex items-center">
                  Vos Droits, Protégés <span className="ml-2">🔒</span>
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl">
                  Nous aidons les artistes indépendants à égaliser les chances en démystifiant le droit musical et les termes contractuels. La connaissance, c'est le pouvoir. ✨
                </p>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm">
                    Pas un conseil juridique, mais une orientation utile pour vous guider dans la bonne direction. 🧭
                  </span>
                </div>
              </div>
              <button 
                onClick={() => navigate('/assistant')}
                className="px-6 py-3 font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors whitespace-nowrap shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                Commencer Maintenant 🚀
              </button>
            </div>
          </div>
        </section>

        {/* New Testimonials Section */}
        <section className="container py-16 md:py-24">
          <div className="text-center mb-12">
            <span className="text-3xl mb-4 block">⭐</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Ce Que Disent Les Artistes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Voici ce que les musiciens pensent de notre plateforme
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard className="bg-gradient-to-br from-white to-blue-50/40 dark:from-slate-800 dark:to-blue-900/10" emoji="🎸">
              <div className="mb-4 flex justify-between">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <span className="text-lg">🎧</span>
              </div>
              <p className="italic text-muted-foreground mb-4">
                "BAVEU m'a aidé à comprendre mon premier contrat d'édition. J'aurais perdu beaucoup de droits sans ces conseils!"
              </p>
              <div className="font-medium">Sophie L.</div>
              <div className="text-sm text-muted-foreground">Auteure-compositrice</div>
            </GlassCard>

            <GlassCard className="bg-gradient-to-br from-white to-blue-50/40 dark:from-slate-800 dark:to-blue-900/10" emoji="🎤">
              <div className="mb-4 flex justify-between">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <span className="text-lg">🎹</span>
              </div>
              <p className="italic text-muted-foreground mb-4">
                "L'assistant IA m'a permis de poser toutes les questions que j'avais peur de poser à mon label. Un outil indispensable!"
              </p>
              <div className="font-medium">Marc T.</div>
              <div className="text-sm text-muted-foreground">Producteur</div>
            </GlassCard>

            <GlassCard className="bg-gradient-to-br from-white to-blue-50/40 dark:from-slate-800 dark:to-blue-900/10" emoji="🥁">
              <div className="mb-4 flex justify-between">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <span className="text-lg">🎷</span>
              </div>
              <p className="italic text-muted-foreground mb-4">
                "La base de connaissances est une mine d'or! Enfin des informations juridiques expliquées simplement pour les musiciens."
              </p>
              <div className="font-medium">Lucie M.</div>
              <div className="text-sm text-muted-foreground">Chanteuse indépendante</div>
            </GlassCard>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
