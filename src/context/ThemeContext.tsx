import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { THEME_COLORS, type ThemeColor } from '@/types';

interface ThemeContextType {
  activeTheme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  selectedProject: string | null;
  setSelectedProject: (id: string | null) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<ThemeColor>(THEME_COLORS[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const setTheme = useCallback((theme: ThemeColor) => {
    setActiveTheme(theme);
    document.documentElement.style.setProperty('--bg-primary', theme.bg);
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.style.setProperty('--text-primary', theme.text);
    document.body.style.background = theme.bg;
    document.body.style.color = theme.text;
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        activeTheme,
        setTheme,
        isMenuOpen,
        setIsMenuOpen,
        activeSection,
        setActiveSection,
        selectedProject,
        setSelectedProject,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
