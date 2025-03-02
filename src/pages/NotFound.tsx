
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import GlassCard from '@/components/UI/GlassCard';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container flex items-center justify-center py-24">
        <GlassCard className="max-w-md w-full text-center py-12">
          <FileQuestion className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="font-display text-3xl font-semibold mb-2">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Home className="mr-2 h-5 w-5" />
            Return to Home
          </Link>
        </GlassCard>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
