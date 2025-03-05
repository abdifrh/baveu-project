
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import PageHeader from '@/components/UI/PageHeader';
import ChatInterface from '@/components/Chat/ChatInterface';
import { Scale, BookOpen, Lightbulb } from 'lucide-react';

const Assistant = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container py-16 md:py-24">
        <PageHeader
          title="Mr BAVEU - Assistant Juridique Musical"
          description="Posez vos questions juridiques sur les contrats musicaux, les droits d'auteur, les redevances et plus encore. Obtenez des explications claires adaptées aux jeunes artistes indépendants en France."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="col-span-1 lg:col-span-3">
            <ChatInterface />
          </div>
          
          <div className="hidden lg:flex lg:flex-col gap-4">
            <div className="glass-card p-4">
              <h3 className="text-lg font-semibold flex items-center mb-3">
                <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                Exemples de questions
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="p-2 hover:bg-secondary rounded-md transition-colors">Comment protéger mes compositions musicales ?</li>
                <li className="p-2 hover:bg-secondary rounded-md transition-colors">Dois-je m'inscrire à la SACEM ?</li>
                <li className="p-2 hover:bg-secondary rounded-md transition-colors">Quels points négocier dans un contrat d'édition ?</li>
                <li className="p-2 hover:bg-secondary rounded-md transition-colors">Comment fonctionne le droit voisin ?</li>
              </ul>
            </div>
            
            <div className="glass-card p-4">
              <h3 className="text-lg font-semibold flex items-center mb-3">
                <BookOpen className="h-5 w-5 mr-2 text-emerald-500" />
                Ressources utiles
              </h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                  <a href="#" className="hover:underline">SACEM</a>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                  <a href="#" className="hover:underline">SDRM</a>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                  <a href="#" className="hover:underline">ADAMI</a>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                  <a href="#" className="hover:underline">SPEDIDAM</a>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-4">
              <h3 className="text-lg font-semibold flex items-center mb-3">
                <Scale className="h-5 w-5 mr-2 text-blue-500" />
                Informations légales
              </h3>
              <p className="text-sm text-muted-foreground">
                Mr BAVEU fournit des informations générales et ne remplace pas un conseil juridique professionnel. Consultez toujours un avocat pour des situations spécifiques.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Assistant;
