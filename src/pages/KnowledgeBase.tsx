
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import PageHeader from '@/components/UI/PageHeader';
import KnowledgeArticle from '@/components/KnowledgeBase/KnowledgeArticle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const KnowledgeBase = () => {
  const knowledgeArticles = [
    {
      id: '1',
      title: 'Comprendre les contrats d\'édition musicale',
      description: 'Un guide complet sur les clauses essentielles des contrats d\'édition musicale, les pièges à éviter et comment négocier des conditions favorables.',
      category: 'Contrats',
      readingTime: 8,
      slug: 'contrats-edition-musicale'
    },
    {
      id: '2',
      title: 'Droits d\'auteur et streaming: ce que vous devez savoir',
      description: 'Explorez comment les droits d\'auteur fonctionnent dans l\'univers du streaming et maximisez vos revenus sur les plateformes numériques.',
      category: 'Droits d\'auteur',
      readingTime: 6,
      slug: 'droits-auteur-streaming'
    },
    {
      id: '3',
      title: 'La synchronisation musicale expliquée',
      description: 'Tout sur les licences de synchronisation: comment placer votre musique dans des films, séries et publicités et en tirer un revenu substantiel.',
      category: 'Licences',
      readingTime: 5,
      slug: 'synchronisation-musicale'
    },
    {
      id: '4',
      title: 'Comment protéger votre musique sans budget',
      description: 'Stratégies accessibles pour protéger légalement vos créations musicales, même avec des ressources limitées.',
      category: 'Protection',
      readingTime: 4,
      slug: 'proteger-musique-sans-budget'
    },
    {
      id: '5',
      title: 'Les sociétés de gestion collective: guide pratique',
      description: 'Fonctionnement de la SACEM et autres sociétés de gestion, processus d\'adhésion et maximisation des collectes de droits.',
      category: 'Gestion collective',
      readingTime: 7,
      slug: 'societes-gestion-collective'
    },
    {
      id: '6',
      title: 'Négocier un contrat de distribution musicale',
      description: 'Les aspects essentiels à négocier dans votre contrat de distribution, physique ou numérique, pour préserver vos intérêts.',
      category: 'Contrats',
      readingTime: 6,
      slug: 'negocier-contrat-distribution'
    },
    {
      id: '7',
      title: 'Comprendre les royalties dans le streaming',
      description: 'Analyse détaillée du calcul des royalties sur les principales plateformes de streaming et stratégies pour les optimiser.',
      category: 'Revenus',
      readingTime: 8,
      slug: 'royalties-streaming'
    },
    {
      id: '8',
      title: 'Les contrats d\'enregistrement: clauses critiques',
      description: 'Décryptage des clauses les plus importantes dans les contrats d\'enregistrement et conseils pour leur négociation.',
      category: 'Contrats',
      readingTime: 9,
      slug: 'contrats-enregistrement-clauses'
    },
    {
      id: '9',
      title: 'Collaborations musicales: aspects juridiques',
      description: 'Cadre juridique des collaborations entre artistes, partage des droits et rédaction de contrats de collaboration.',
      category: 'Collaboration',
      readingTime: 5,
      slug: 'collaborations-aspects-juridiques'
    },
    {
      id: '10',
      title: 'NFT et musique: nouvelles opportunités juridiques',
      description: 'Explorer le cadre juridique des NFT dans l\'industrie musicale et comment les artistes peuvent exploiter cette technologie.',
      category: 'Innovation',
      readingTime: 7,
      slug: 'nft-musique-opportunites'
    },
    {
      id: '11',
      title: 'Comprendre les licences Creative Commons',
      description: 'Guide pratique des différentes licences Creative Commons et comment les utiliser pour protéger et partager votre musique.',
      category: 'Licences',
      readingTime: 4,
      slug: 'licences-creative-commons'
    },
    {
      id: '12',
      title: 'Les droits voisins pour les musiciens',
      description: 'Explication des droits voisins, leur différence avec les droits d\'auteur et comment ils s\'appliquent aux interprètes.',
      category: 'Droits d\'auteur',
      readingTime: 6,
      slug: 'droits-voisins-musiciens'
    }
  ];

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
                {knowledgeArticles
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
