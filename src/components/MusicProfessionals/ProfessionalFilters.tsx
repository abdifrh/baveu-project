
import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfessionalCategory, SortOption, categories, sortOptions } from '@/data/musicProfessionalsData';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface ProfessionalFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ProfessionalCategory | '';
  setSelectedCategory: (category: ProfessionalCategory | '') => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
  availableLocations: string[];
  resetFilters: () => void;
  activeFiltersCount: number;
}

const ProfessionalFilters: React.FC<ProfessionalFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  sortBy,
  setSortBy,
  availableLocations,
  resetFilters,
  activeFiltersCount
}) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un professionnel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtres
                {activeFiltersCount > 0 && (
                  <Badge 
                    variant="default" 
                    className="ml-2 h-5 w-5 p-0 text-[10px] flex items-center justify-center font-semibold"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h3 className="font-medium">Filtres</h3>
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select 
                    value={selectedCategory} 
                    onValueChange={(value) => setSelectedCategory(value as ProfessionalCategory | '')}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Toutes les catégories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Toutes les catégories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Lieu</Label>
                  <Select 
                    value={selectedLocation} 
                    onValueChange={setSelectedLocation}
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Tous les lieux" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tous les lieux</SelectItem>
                      {availableLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-2 flex justify-between">
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    Réinitialiser
                  </Button>
                  <Button size="sm">Appliquer</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {selectedCategory && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Catégorie: {categories.find(c => c.value === selectedCategory)?.label}
            <button onClick={() => setSelectedCategory('')}>
              <X className="h-3 w-3 ml-1" />
            </button>
          </Badge>
        )}
        
        {selectedLocation && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Lieu: {selectedLocation}
            <button onClick={() => setSelectedLocation('')}>
              <X className="h-3 w-3 ml-1" />
            </button>
          </Badge>
        )}
        
        {(selectedCategory || selectedLocation) && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 px-2 text-xs" 
            onClick={resetFilters}
          >
            Tout effacer
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfessionalFilters;
