
import React from 'react';
import { Link } from 'react-router-dom';
import { Professional } from '@/data/musicProfessionalsData';
import GlassCard from '@/components/UI/GlassCard';
import { Calendar, MapPin, Tag, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface ProfessionalCardProps {
  professional: Professional;
  showDistance?: boolean;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ 
  professional, 
  showDistance = false 
}) => {
  const { id, name, category, location, distance, avatar, tags, createdAt } = professional;
  const { user } = useAuth();
  
  // Formatage de la date en français
  const formattedDate = new Date(createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <GlassCard className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img 
            src={avatar} 
            alt={name}
            className="w-16 h-16 rounded-full object-cover shadow-sm border border-white/40 dark:border-slate-700/60"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
            <Badge variant="outline" className="capitalize font-normal">
              {category}
            </Badge>
            
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
              {showDistance && distance && (
                <span className="text-xs">· {distance} km</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-3">
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-normal capitalize">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="secondary" className="text-xs font-normal">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-auto pt-3 border-t">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Depuis le {formattedDate}</span>
        </div>
        
        {!user ? (
          <Button variant="outline" size="sm" className="p-2 h-auto" asChild>
            <Link to="/auth" className="flex items-center gap-1 text-xs">
              <Lock className="h-3 w-3" />
              <span>Créer un compte pour voir</span>
            </Link>
          </Button>
        ) : (
          <Button variant="link" className="p-0 h-auto" asChild>
            <Link to={`/professionals/${id}`}>Voir le profil</Link>
          </Button>
        )}
      </div>
    </GlassCard>
  );
};

export default ProfessionalCard;
