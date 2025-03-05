
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Share2, Eye, Heart, Users } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { knowledgeArticlesData } from '@/data/knowledgeArticlesData';

const KnowledgeArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [article, setArticle] = useState(knowledgeArticlesData.find(article => article.slug === slug));

  useEffect(() => {
    if (article) {
      // Update view count in local state
      setArticle(prevArticle => {
        if (!prevArticle) return prevArticle;
        return {
          ...prevArticle,
          views: (prevArticle.views || 0) + 1
        };
      });

      // Check if user has already liked this article in this session
      const likedArticles = JSON.parse(sessionStorage.getItem('likedArticles') || '{}');
      if (likedArticles[article.id]) {
        setHasLiked(true);
        setLikes(likedArticles[article.id]);
      }
    }
  }, [slug]);

  const handleLike = () => {
    if (hasLiked || !article) return;
    
    const newLikes = likes + 1;
    setLikes(newLikes);
    setHasLiked(true);
    
    // Store like in session storage
    const likedArticles = JSON.parse(sessionStorage.getItem('likedArticles') || '{}');
    likedArticles[article.id] = newLikes;
    sessionStorage.setItem('likedArticles', JSON.stringify(likedArticles));
  };

  if (!article) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Article introuvable</h1>
            <p className="mb-6">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
            <Button asChild>
              <Link to="/knowledge-base">Retour à la base de connaissances</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-24">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link to="/knowledge-base" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à la base de connaissances
              </Link>
            </Button>
            
            <div className="flex items-center mb-3">
              <div className="p-1.5 bg-primary/10 rounded-full mr-2 dark:bg-blue-500/20">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs font-medium text-primary px-2 py-1 rounded-full bg-primary/5 dark:bg-blue-500/10">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold mb-3">{article.title}</h1>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{article.readingTime} min de lecture</span>
                </span>
                
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{article.views || 1} vues</span>
                </span>
              </div>
              
              <Button 
                variant={hasLiked ? "default" : "outline"} 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleLike}
                disabled={hasLiked}
              >
                <Heart className={`h-4 w-4 ${hasLiked ? 'fill-white' : ''}`} />
                <span>{likes}</span>
              </Button>
            </div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl leading-relaxed mb-6">
              {article.description}
            </p>

            <div className="bg-muted/40 rounded-lg p-5 my-8 border dark:bg-slate-800/40">
              <h2 className="text-xl font-semibold mb-3 flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" /> 
                Public concerné
              </h2>
              <p>
                Cet article s'adresse principalement aux artistes indépendants, auteurs-compositeurs, interprètes et producteurs
                qui souhaitent comprendre les aspects juridiques liés au domaine {article.category.toLowerCase()}.
                Que vous soyez un artiste émergent ou un professionnel établi, ces informations vous aideront
                à mieux naviguer dans le paysage juridique complexe de l'industrie musicale.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">Concepts fondamentaux</h2>
            
            <p>
              L'industrie musicale est un secteur complexe et en constante évolution, où les artistes doivent naviguer entre création 
              artistique et considérations juridiques. Cette section vise à clarifier certains aspects essentiels pour aider les artistes 
              à protéger leurs droits et à maximiser leurs revenus.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Définitions et cadre légal</h3>
            <p>
              Avant d'aborder les aspects pratiques, il est important de comprendre les termes et concepts juridiques de base
              qui s'appliquent dans le domaine {article.category.toLowerCase()}. Cette compréhension vous permettra de mieux
              communiquer avec les professionnels du secteur et de prendre des décisions éclairées.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">Points clés à comprendre</h2>
            
            <p>
              Dans le domaine {article.category.toLowerCase()}, plusieurs éléments fondamentaux méritent votre attention :
            </p>
            
            <ul className="space-y-2 my-4">
              <li className="flex items-start">
                <span className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5 dark:bg-blue-500/20">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                </span>
                <span>Les différents types de droits et leur portée juridique</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5 dark:bg-blue-500/20">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                </span>
                <span>Les obligations contractuelles et leurs implications</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5 dark:bg-blue-500/20">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                </span>
                <span>Les mécanismes de rémunération et de collecte</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5 dark:bg-blue-500/20">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                </span>
                <span>Les recours disponibles en cas de litige</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5 dark:bg-blue-500/20">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                </span>
                <span>Les évolutions récentes de la législation</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Implications pratiques</h3>
            <p>
              Comprendre ces concepts ne suffit pas, il faut également savoir comment les appliquer dans votre
              pratique professionnelle quotidienne. Cette section explore les applications concrètes des principes juridiques
              dans diverses situations que vous pourriez rencontrer.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">Conseils pratiques</h2>
            
            <p>
              Pour naviguer efficacement dans cet environnement juridique complexe, voici quelques recommandations :
            </p>
            
            <ol className="space-y-4 my-4">
              <li className="flex items-start">
                <span className="bg-primary/10 rounded-full px-2 py-1 mr-2 font-bold text-primary text-sm dark:bg-blue-500/20">1</span>
                <div>
                  <strong className="text-lg">Consultez un avocat spécialisé</strong>
                  <p className="mt-1">Avant de signer tout contrat important, prenez le temps de consulter un avocat spécialisé
                  dans le droit de la musique qui pourra vous guider et protéger vos intérêts.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 rounded-full px-2 py-1 mr-2 font-bold text-primary text-sm dark:bg-blue-500/20">2</span>
                <div>
                  <strong className="text-lg">Documentez systématiquement vos créations</strong>
                  <p className="mt-1">Gardez une trace écrite de toutes vos créations et contributions artistiques pour faciliter
                  les preuves en cas de litige ultérieur.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 rounded-full px-2 py-1 mr-2 font-bold text-primary text-sm dark:bg-blue-500/20">3</span>
                <div>
                  <strong className="text-lg">Rejoignez les sociétés de gestion collective</strong>
                  <p className="mt-1">Ces organismes peuvent vous aider à percevoir les droits qui vous sont dus sur différents
                  territoires et plateformes.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 rounded-full px-2 py-1 mr-2 font-bold text-primary text-sm dark:bg-blue-500/20">4</span>
                <div>
                  <strong className="text-lg">Restez informé des évolutions</strong>
                  <p className="mt-1">Le cadre juridique évolue constamment, particulièrement avec l'émergence de nouvelles
                  technologies. Consacrez du temps à vous tenir informé.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 rounded-full px-2 py-1 mr-2 font-bold text-primary text-sm dark:bg-blue-500/20">5</span>
                <div>
                  <strong className="text-lg">Négociez activement vos contrats</strong>
                  <p className="mt-1">Ne vous contentez pas d'accepter les termes standards. Apprenez à négocier pour obtenir
                  des conditions qui correspondent à votre valeur et à vos objectifs.</p>
                </div>
              </li>
            </ol>

            <blockquote className="bg-primary/5 border-l-4 border-primary p-4 my-8 rounded-r dark:bg-blue-500/10 dark:border-blue-500">
              <p className="italic text-lg">
                "La connaissance de vos droits est la première étape vers une carrière musicale épanouissante et économiquement viable."
              </p>
              <footer className="mt-2 font-medium text-sm">— Me Claire Dupont, Avocate spécialisée en droit de la musique</footer>
            </blockquote>

            <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">Conclusion</h2>
            
            <p>
              Les artistes qui investissent du temps dans la compréhension de leurs droits et obligations juridiques sont mieux 
              armés pour bâtir une carrière durable. N'hésitez pas à consulter nos autres ressources ou à solliciter l'aide de 
              notre assistant Mr BAVEU pour approfondir vos connaissances sur ce sujet.
            </p>

            <div className="bg-muted/40 rounded-lg p-5 my-8 border dark:bg-slate-800/40">
              <h3 className="text-lg font-semibold mb-2">Ressources supplémentaires</h3>
              <ul className="space-y-2">
                <li>Guide pratique des contrats musicaux (SACEM)</li>
                <li>Législation française sur les droits d'auteur</li>
                <li>Études de cas et jurisprudence récente</li>
                <li>Modèles de contrats et documents types</li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />
          
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold mb-1">Besoin d'aide personnalisée?</h3>
              <p className="text-sm text-muted-foreground">
                Discutez avec Mr BAVEU, notre assistant juridique spécialisé
              </p>
            </div>
            <Button asChild>
              <Link to="/assistant">Consulter l'assistant</Link>
            </Button>
          </div>

          <div className="mt-8 flex justify-end">
            <Button variant="outline" size="sm" className="flex items-center">
              <Share2 className="mr-2 h-4 w-4" />
              Partager l'article
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default KnowledgeArticleDetail;
