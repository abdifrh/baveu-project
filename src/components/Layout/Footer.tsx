
import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t py-8">
      <div className="container">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2">
            <Music className="h-5 w-5 text-primary" />
            <span className="font-display font-medium">BAVEU</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} BAVEU. Tous droits réservés.
            </p>
            <p className="mt-1 text-xs text-muted-foreground/80">
              Créé avec <Heart className="inline-block h-3 w-3 text-destructive" /> pour les artistes indépendants
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
