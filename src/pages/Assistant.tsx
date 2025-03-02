
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import PageHeader from '@/components/UI/PageHeader';
import ChatInterface from '@/components/Chat/ChatInterface';

const Assistant = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container py-24">
        <PageHeader
          title="Assistant Juridique IA"
          description="Posez des questions sur les contrats musicaux, les droits d'auteur, les redevances et plus encore. Obtenez des explications claires adaptées aux artistes indépendants."
        />

        <ChatInterface />
      </main>

      <Footer />
    </div>
  );
};

export default Assistant;
