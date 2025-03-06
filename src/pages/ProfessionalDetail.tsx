
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { musicProfessionals } from '@/data/musicProfessionalsData';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  ChevronLeft, 
  ExternalLink, 
  Facebook, 
  Globe, 
  Heart, 
  Instagram, 
  Linkedin,
  MapPin, 
  Music2, 
  Star, 
  Twitter, 
  Youtube 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlassCard from '@/components/UI/GlassCard';
import { useToast } from '@/hooks/use-toast';

const ProfessionalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  
  // Trouver le professionnel correspondant à l'ID
  const professional = musicProfessionals.find(p => p.id === id);
  
  // Vérifier si le professionnel a été "liké" auparavant
  useEffect(() => {
    if (id) {
      const likedProfessionals = JSON.parse(localStorage.getItem('likedProfessionals') || '{}');
      setLiked(!!likedProfessionals[id]);
    }
  }, [id]);
  
  // Gérer le "like" d'un professionnel
  const handleLike = () => {
    if (id) {
      const likedProfessionals = JSON.parse(localStorage.getItem('likedProfessionals') || '{}');
      
      if (liked) {
        delete likedProfessionals[id];
        toast({
          title: "Retiré des favoris",
          description: `${professional?.name} a été retiré de vos favoris.`,
        });
      } else {
        likedProfessionals[id] = true;
        toast({
          title: "Ajouté aux favoris",
          description: `${professional?.name} a été ajouté à vos favoris.`,
        });
      }
      
      localStorage.setItem('likedProfessionals', JSON.stringify(likedProfessionals));
      setLiked(!liked);
    }
  };
  
  // Rediriger vers la page 404 si le professionnel n'existe pas
  if (!professional) {
    return (
      <Layout>
        <div className="container py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Professionnel non trouvé</h1>
          <p className="mb-6">Le professionnel que vous recherchez n'existe pas.</p>
          <Button onClick={() => navigate('/professionals')}>
            Retour à la liste
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Formatage de la date en français
  const formattedDate = new Date(professional.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  return (
    <Layout>
      <div className="container py-24 animate-fade-in">
        <Button 
          variant="ghost" 
          className="mb-6 pl-2" 
          onClick={() => navigate('/professionals')}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Retour à la liste
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar avec les informations du professionnel */}
          <div className="lg:col-span-1">
            <GlassCard className="sticky top-24">
              <div className="flex flex-col items-center text-center mb-6">
                <img 
                  src={professional.avatar} 
                  alt={professional.name}
                  className="w-32 h-32 rounded-full object-cover shadow-md border-2 border-background mb-4"
                />
                
                <h1 className="text-2xl font-bold mb-1">{professional.name}</h1>
                
                <Badge className="capitalize mb-3">
                  {professional.category}
                </Badge>
                
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{professional.location}</span>
                  {professional.distance && (
                    <span className="ml-1">· {professional.distance} km</span>
                  )}
                </div>
                
                <div className="flex items-center bg-muted/50 rounded-full px-3 py-1 text-sm mb-4">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{professional.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <Separator className="mb-4" />
              
              <div className="mb-6">
                <h2 className="text-sm font-semibold mb-2">À propos</h2>
                <p className="text-sm text-muted-foreground">
                  {professional.description}
                </p>
              </div>
              
              <Separator className="mb-4" />
              
              <div className="mb-6">
                <h2 className="text-sm font-semibold mb-3">Compétences</h2>
                <div className="flex flex-wrap gap-2">
                  {professional.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-normal capitalize">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {professional.socialMedia && Object.values(professional.socialMedia).some(Boolean) && (
                <>
                  <Separator className="mb-4" />
                  
                  <div className="mb-4">
                    <h2 className="text-sm font-semibold mb-3">Réseaux sociaux</h2>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {professional.socialMedia.instagram && (
                        <a href={`https://instagram.com/${professional.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                          <Instagram className="h-5 w-5" />
                        </a>
                      )}
                      {professional.socialMedia.facebook && (
                        <a href={`https://facebook.com/${professional.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                          <Facebook className="h-5 w-5" />
                        </a>
                      )}
                      {professional.socialMedia.twitter && (
                        <a href={`https://twitter.com/${professional.socialMedia.twitter}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {professional.socialMedia.youtube && (
                        <a href={`https://youtube.com/${professional.socialMedia.youtube}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                          <Youtube className="h-5 w-5" />
                        </a>
                      )}
                      {professional.socialMedia.linkedin && (
                        <a href={`https://linkedin.com/in/${professional.socialMedia.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {professional.socialMedia.website && (
                        <a href={`https://${professional.socialMedia.website}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                          <Globe className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </>
              )}
              
              <Separator className="mb-4" />
              
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Sur la plateforme depuis le {formattedDate}</span>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col gap-3">
                <Button
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Demande envoyée",
                      description: "Votre demande de contact a été envoyée avec succès.",
                    });
                  }}
                >
                  Contacter
                </Button>
                
                <Button
                  variant={liked ? "default" : "outline"}
                  className={`w-full ${liked ? 'bg-red-500 hover:bg-red-600' : ''}`}
                  onClick={handleLike}
                >
                  <Heart className={`h-4 w-4 mr-2 ${liked ? 'fill-current' : ''}`} />
                  {liked ? 'Retirez des favoris' : 'Ajouter aux favoris'}
                </Button>
              </div>
            </GlassCard>
          </div>
          
          {/* Contenu principal avec les travaux */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Music2 className="h-6 w-6 mr-2 text-primary" />
              Portfolio
            </h2>
            
            <div className="space-y-8">
              {professional.portfolio.map((item) => (
                <GlassCard key={item.id} className="overflow-hidden">
                  <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.clientName && (
                      <Badge variant="outline">
                        Client: {item.clientName}
                      </Badge>
                    )}
                    <Badge variant="outline">
                      {item.year}
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  
                  {item.videoUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={item.videoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Voir la vidéo
                      </a>
                    </Button>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessionalDetail;
