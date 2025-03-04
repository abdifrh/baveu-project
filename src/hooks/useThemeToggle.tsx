
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme preference or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      return savedTheme || (systemPreference ? 'dark' : 'light');
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove the previous theme class and add the new one
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Save the theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}
