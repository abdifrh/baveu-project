
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
                For Independent Artists
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                Navigate Music Law with <span className="text-primary">Confidence</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
                LegalBeat helps independent musicians understand contract terms, protect their rights, and make informed decisions about their career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/assistant')}
                  className="px-6 py-3 font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Try the AI Assistant
                </button>
                <button 
                  onClick={() => navigate('/knowledge-base')}
                  className="px-6 py-3 font-medium rounded-lg border hover:bg-secondary transition-colors"
                >
                  Browse Knowledge Base
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
              Your Legal Companion in Music
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From contract explanations to royalty breakdowns, we help you navigate the complex legal landscape of the music industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard className="md:translate-y-8">
              <MessageSquare className="mb-4 h-8 w-8 text-primary" />
              <h3 className="font-display text-xl font-medium mb-2">AI Legal Assistant</h3>
              <p className="text-muted-foreground mb-4">
                Ask questions about contracts, royalties, and rights in simple language. Get clear, actionable insights.
              </p>
              <button 
                onClick={() => navigate('/assistant')}
                className="flex items-center text-primary hover:underline mt-auto"
              >
                Try it now <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </GlassCard>

            <GlassCard>
              <BookOpen className="mb-4 h-8 w-8 text-primary" />
              <h3 className="font-display text-xl font-medium mb-2">Knowledge Library</h3>
              <p className="text-muted-foreground mb-4">
                Browse our extensive collection of music legal terms and contract explanations. Understand before you sign.
              </p>
              <button 
                onClick={() => navigate('/knowledge-base')}
                className="flex items-center text-primary hover:underline mt-auto"
              >
                Explore <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </GlassCard>

            <GlassCard className="md:translate-y-8">
              <Lightbulb className="mb-4 h-8 w-8 text-primary" />
              <h3 className="font-display text-xl font-medium mb-2">Negotiation Tips</h3>
              <p className="text-muted-foreground mb-4">
                Learn what's negotiable, what's standard, and how to advocate for your interests when reviewing contracts.
              </p>
              <button 
                onClick={() => navigate('/assistant')}
                className="flex items-center text-primary hover:underline mt-auto"
              >
                Get advice <ArrowRight className="ml-1 h-4 w-4" />
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
                  Your Rights, Protected
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl">
                  We help independent artists level the playing field by demystifying music law and contract terms. Knowledge is power.
                </p>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm">
                    Not legal advice, but helpful guidance to point you in the right direction.
                  </span>
                </div>
              </div>
              <button 
                onClick={() => navigate('/assistant')}
                className="px-6 py-3 font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Start Now
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
