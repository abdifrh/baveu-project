
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Assistant from "./pages/Assistant";
import Authentication from "./pages/Authentication";
import KnowledgeBase from "./pages/KnowledgeBase";
import KnowledgeArticleDetail from "./pages/KnowledgeArticleDetail";
import MusicProfessionals from "./pages/MusicProfessionals";
import ProfessionalDetail from "./pages/ProfessionalDetail";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => {
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Authentication />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
              <Route path="/kb/:slug" element={<KnowledgeArticleDetail />} />
              <Route path="/professionals" element={<MusicProfessionals />} />
              <Route path="/professionals/:id" element={<ProfessionalDetail />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
