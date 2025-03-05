
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, Share2 } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { knowledgeArticlesData } from '@/data/knowledgeArticlesData';

const KnowledgeArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = knowledgeArticlesData.find(article => article.slug === slug);

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
            
            <div className="flex items-center text-sm text-muted-foreground mb-6">
              <Clock className="h-4 w-4 mr-1" />
              <span>{article.readingTime} min de lecture</span>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="lead">
              {article.description}
            </p>

            <p>
              L'industrie musicale est un secteur complexe et en constante évolution, où les artistes doivent naviguer entre création 
              artistique et considérations juridiques. Cet article vise à clarifier certains aspects essentiels pour aider les artistes 
              à protéger leurs droits et à maximiser leurs revenus.
            </p>

            <h2>Points clés à comprendre</h2>
            
            <p>
              Dans le domaine {article.category.toLowerCase()}, plusieurs éléments fondamentaux méritent votre attention :
            </p>
            
            <ul>
              <li>Les différents types de droits et leur portée juridique</li>
              <li>Les obligations contractuelles et leurs implications</li>
              <li>Les mécanismes de rémunération et de collecte</li>
              <li>Les recours disponibles en cas de litige</li>
              <li>Les évolutions récentes de la législation</li>
            </ul>

            <h2>Conseils pratiques</h2>
            
            <p>
              Pour naviguer efficacement dans cet environnement juridique complexe, voici quelques recommandations :
            </p>
            
            <ol>
              <li>Consultez un avocat spécialisé avant de signer tout contrat important</li>
              <li>Documentez systématiquement vos créations et vos contributions</li>
              <li>Rejoignez les sociétés de gestion collective appropriées</li>
              <li>Restez informé des évolutions législatives et technologiques</li>
              <li>Négociez activement vos contrats plutôt que d'accepter les termes standards</li>
            </ol>

            <blockquote>
              <p>
                "La connaissance de vos droits est la première étape vers une carrière musicale épanouissante et économiquement viable."
              </p>
            </blockquote>

            <h2>Conclusion</h2>
            
            <p>
              Les artistes qui investissent du temps dans la compréhension de leurs droits et obligations juridiques sont mieux 
              armés pour bâtir une carrière durable. N'hésitez pas à consulter nos autres ressources ou à solliciter l'aide de 
              notre assistant Mr BAVEU pour approfondir vos connaissances sur ce sujet.
            </p>
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
