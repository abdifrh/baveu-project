
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Book, Music2, Info, X, CreditCard } from 'lucide-react';
import ThemeToggle from '@/components/UI/ThemeToggle';
import ApiSettingsButton from '@/components/UI/ApiSettingsButton';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import UserMenu from './UserMenu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Mr BAVEU', href: '/assistant', icon: <Info className="h-4 w-4 mr-2" /> },
    { name: 'Base de connaissances', href: '/knowledge-base', icon: <Book className="h-4 w-4 mr-2" /> },
    { name: 'Professionnels', href: '/professionals', icon: <Music2 className="h-4 w-4 mr-2" /> },
    { name: 'Forfaits', href: '/pricing', icon: <CreditCard className="h-4 w-4 mr-2" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-200 ${isScrolled ? 'bg-background/80 backdrop-blur-sm border-b shadow-sm' : 'bg-background/50'}`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
            BAVEU
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant={isActive(item.href) ? "default" : "ghost"}
                size="sm"
                className={isActive(item.href) ? "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary" : ""}
                asChild
              >
                <Link to={item.href} className="flex items-center">
                  {item.icon}
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <UserMenu />
          <ThemeToggle />
          <ApiSettingsButton />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary" onClick={() => setIsOpen(false)}>
                  BAVEU
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    variant={isActive(item.href) ? "default" : "ghost"}
                    size="sm"
                    className={`justify-start ${isActive(item.href) ? "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary" : ""}`}
                    asChild
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to={item.href} className="flex items-center">
                      {item.icon}
                      {item.name}
                    </Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
