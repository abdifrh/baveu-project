
import React from 'react';
import { BookOpen, Clock, Eye } from 'lucide-react';
import GlassCard from '@/components/UI/GlassCard';
import { Button } from '@/components/ui/button';

interface KnowledgeArticleProps {
  title: string;
  description: string;
  category: string;
  readingTime: number;
  slug: string;
  views?: number;
}

const KnowledgeArticle: React.FC<KnowledgeArticleProps> = ({
  title,
  description,
  category,
  readingTime,
  slug,
  views = 0
}) => {
  return (
    <GlassCard className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center mb-3">
        <div className="p-1.5 bg-primary/10 rounded-full mr-2 dark:bg-blue-500/20">
          <BookOpen className="h-4 w-4 text-primary" />
        </div>
        <span className="text-xs font-medium text-primary px-2 py-1 rounded-full bg-primary/5 dark:bg-blue-500/10">
          {category}
        </span>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      
      <p className="text-sm text-muted-foreground mb-4 flex-grow">
        {description}
      </p>
      
      <div className="flex justify-between items-center mt-auto pt-3 border-t">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{readingTime} min</span>
          </span>
          
          <span className="flex items-center">
            <Eye className="h-3 w-3 mr-1" />
            <span>{views} vues</span>
          </span>
        </div>
        
        <Button variant="link" className="p-0 h-auto" asChild>
          <a href={`/kb/${slug}`}>Lire l'article</a>
        </Button>
      </div>
    </GlassCard>
  );
};

export default KnowledgeArticle;
