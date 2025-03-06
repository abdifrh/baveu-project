
import React, { useState, useMemo } from 'react';
import PageHeader from '@/components/UI/PageHeader';
import Layout from '@/components/Layout/Layout';
import ProfessionalCard from '@/components/MusicProfessionals/ProfessionalCard';
import ProfessionalFilters from '@/components/MusicProfessionals/ProfessionalFilters';
import { musicProfessionals, ProfessionalCategory, SortOption } from '@/data/musicProfessionalsData';
import { MusicIcon, UsersRound } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MusicProfessionals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProfessionalCategory | ''>('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');

  // Extraire tous les lieux uniques
  const availableLocations = useMemo(() => {
    return Array.from(new Set(musicProfessionals.map(p => p.location)));
  }, []);

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedLocation('');
    setSearchQuery('');
  };

  // Filtrer les professionnels en fonction des critères
  const filteredProfessionals = useMemo(() => {
    let result = [...musicProfessionals];
    
    // Filtre par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        prof => 
          prof.name.toLowerCase().includes(query) || 
          prof.description.toLowerCase().includes(query) || 
          prof.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filtre par catégorie
    if (selectedCategory) {
      result = result.filter(prof => prof.category === selectedCategory);
    }
    
    // Filtre par lieu
    if (selectedLocation) {
      result = result.filter(prof => prof.location === selectedLocation);
    }
    
    // Tri
    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'recent':
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'proximity':
        result.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
        break;
      case 'relevance':
        // Tri par défaut basé sur une combinaison de note et de pertinence
        result.sort((a, b) => b.rating - a.rating);
        break;
    }
    
    return result;
  }, [searchQuery, selectedCategory, selectedLocation, sortBy]);

  // Nombre de filtres actifs
  const activeFiltersCount = [
    selectedCategory, 
    selectedLocation
  ].filter(Boolean).length;

  return (
    <Layout>
      <div className="container py-24 animate-fade-in">
        <PageHeader 
          title={
            <div className="flex items-center">
              <UsersRound className="h-7 w-7 mr-3 text-primary" />
              Professionnels de la musique
            </div>
          }
          description="Découvrez une sélection de professionnels pour vous accompagner dans vos projets musicaux."
        />
        
        <ProfessionalFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          sortBy={sortBy}
          setSortBy={setSortBy}
          availableLocations={availableLocations}
          resetFilters={resetFilters}
          activeFiltersCount={activeFiltersCount}
        />
        
        {filteredProfessionals.length === 0 ? (
          <div className="text-center py-12">
            <MusicIcon className="h-12 w-12 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aucun professionnel trouvé</h3>
            <p className="text-muted-foreground mb-6">
              Aucun professionnel ne correspond à vos critères de recherche.
            </p>
            <Button onClick={resetFilters}>Réinitialiser les filtres</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((professional) => (
              <ProfessionalCard 
                key={professional.id} 
                professional={professional}
                showDistance={sortBy === 'proximity'}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MusicProfessionals;
