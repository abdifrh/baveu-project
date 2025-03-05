
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t py-8">
      <div className="container">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/57a09eb7-2124-46b0-9e3a-ef34f5074432.png" 
                alt="BAVEU Logo Light" 
                className="h-6 md:h-8 w-auto dark:hidden"
              />
              <img 
                src="/lovable-uploads/e11ec289-300f-4617-aada-a3614f607ae3.png" 
                alt="BAVEU Logo Dark" 
                className="h-6 md:h-8 w-auto hidden dark:block"
              />
              <span className="sr-only">BAVEU</span>
            </Link>
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
