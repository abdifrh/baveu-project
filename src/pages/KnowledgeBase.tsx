
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import PageHeader from '@/components/UI/PageHeader';
import KnowledgeArticle from '@/components/KnowledgeBase/KnowledgeArticle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { knowledgeArticlesData } from '@/data/knowledgeArticlesData';

const KnowledgeBase = () => {
  const categories = ['Tous', 'Contrats', 'Droits d\'auteur', 'Licences', 'Protection', 'Revenus', 'Gestion collective', 'Collaboration', 'Innovation'];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container py-24">
        <PageHeader
          title="Base de connaissances juridiques"
          description="Ressources et informations juridiques essentielles pour les artistes indépendants. Approfondissez vos connaissances sur le droit de la musique."
        />

        <Tabs defaultValue="Tous" className="mb-8">
          <TabsList className="mb-8 flex flex-wrap h-auto py-1">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="my-1 mx-1">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {knowledgeArticlesData
                  .filter(article => category === 'Tous' || article.category === category)
                  .map(article => (
                    <KnowledgeArticle
                      key={article.id}
                      title={article.title}
                      description={article.description}
                      category={article.category}
                      readingTime={article.readingTime}
                      slug={article.slug}
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="bg-muted rounded-lg p-6 mt-12 dark:bg-slate-800/30">
          <h2 className="text-xl font-semibold mb-4">Témoignages d'artistes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-background p-4 rounded-lg shadow-sm dark:bg-slate-800">
              <p className="italic text-sm mb-4">"Grâce aux ressources de BAVEU, j'ai pu mieux comprendre mes contrats d'édition et négocier des termes plus avantageux. Une aide précieuse pour les artistes indépendants."</p>
              <p className="font-medium text-right">- Sophie M., auteure-compositrice</p>
            </div>
            <div className="bg-background p-4 rounded-lg shadow-sm dark:bg-slate-800">
              <p className="italic text-sm mb-4">"L'assistant Mr BAVEU m'a aidé à comprendre les subtilités de mes droits sur les plateformes de streaming. J'ai augmenté mes revenus de 30% grâce à ces conseils."</p>
              <p className="font-medium text-right">- Thomas L., producteur</p>
            </div>
            <div className="bg-background p-4 rounded-lg shadow-sm dark:bg-slate-800">
              <p className="italic text-sm mb-4">"En tant qu'artiste indépendant, naviguer dans les aspects juridiques était mon point faible. BAVEU a changé la donne en rendant ces informations accessibles."</p>
              <p className="font-medium text-right">- Marie D., chanteuse indépendante</p>
            </div>
            <div className="bg-background p-4 rounded-lg shadow-sm dark:bg-slate-800">
              <p className="italic text-sm mb-4">"Les explications sur les licences de synchronisation m'ont permis de placer ma musique dans plusieurs publicités. Une ressource indispensable pour comprendre ce marché."</p>
              <p className="font-medium text-right">- Antoine R., compositeur</p>
            </div>
            <div className="bg-background p-4 rounded-lg shadow-sm dark:bg-slate-800">
              <p className="italic text-sm mb-4">"Je recommande BAVEU à tous les musiciens qui veulent prendre en main leur carrière. Ces informations m'ont évité plusieurs pièges contractuels très coûteux."</p>
              <p className="font-medium text-right">- Julien B., guitariste et auteur</p>
            </div>
            <div className="bg-background p-4 rounded-lg shadow-sm dark:bg-slate-800">
              <p className="italic text-sm mb-4">"Le PDF exportable des conversations est particulièrement utile pour garder une trace des conseils juridiques et les partager avec mon manager ou mon avocat."</p>
              <p className="font-medium text-right">- Clara M., artiste émergente</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default KnowledgeBase;
