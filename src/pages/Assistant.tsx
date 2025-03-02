
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
          title="AI Legal Assistant"
          description="Ask questions about music contracts, copyright, royalties, and more. Get clear explanations tailored to independent artists."
        />

        <ChatInterface />
      </main>

      <Footer />
    </div>
  );
};

export default Assistant;
