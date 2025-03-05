
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/UI/ThemeToggle';
import ApiSettingsButton from '@/components/UI/ApiSettingsButton';

const NavLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'Assistant', path: '/assistant' },
  { name: 'Base de Connaissances', path: '/knowledge-base' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'py-3 bg-background/80 dark:bg-background/90 backdrop-blur-lg border-b' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center font-display text-xl font-semibold"
        >
          <img 
            src="/lovable-uploads/57a09eb7-2124-46b0-9e3a-ef34f5074432.png" 
            alt="BAVEU Logo Light" 
            className="h-8 md:h-10 w-auto transition-all duration-300 dark:hidden"
          />
          <img 
            src="/lovable-uploads/e11ec289-300f-4617-aada-a3614f607ae3.png" 
            alt="BAVEU Logo Dark" 
            className="h-8 md:h-10 w-auto transition-all duration-300 hidden dark:block"
          />
          <span className="sr-only">BAVEU</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-8">
            {NavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-foreground/80'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
            <ApiSettingsButton />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <ApiSettingsButton />
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 z-40 flex flex-col bg-background/98 dark:bg-background/95 backdrop-blur-sm p-6 pt-24 transition-all duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex flex-col space-y-6">
          {NavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-lg font-medium transition-colors hover:text-primary',
                location.pathname === link.path
                  ? 'text-primary'
                  : 'text-foreground/80'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
