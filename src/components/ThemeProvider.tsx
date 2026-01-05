'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Theme } from '@/themes/types';
import { ThemeLoader } from '@/themes/loader';

interface ThemeContextValue {
  theme: Theme;
  isLoading: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  domainId,
  children
}: {
  domainId: string;
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setIsDarkMode(savedMode === 'true');
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadTheme() {
      setIsLoading(true);
      try {
        const loadedTheme = await ThemeLoader.load(domainId);
        if (mounted) {
          setTheme(loadedTheme);
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadTheme();

    return () => {
      mounted = false;
    };
  }, [domainId]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', String(newMode));
      return newMode;
    });
  };

  if (isLoading || !theme) {
    return <ThemeLoadingSkeleton />;
  }

  // Use dark colors if dark mode is enabled and available
  const activeColors = (isDarkMode && theme.darkColors) ? theme.darkColors : theme.colors;

  return (
    <ThemeContext.Provider value={{ theme, isLoading, isDarkMode, toggleDarkMode }}>
      <div
        className={`min-h-screen transition-all duration-500 ease-in-out ${isDarkMode ? 'dark' : 'light'}`}
        style={{
          // CSS custom properties
          '--color-primary': activeColors.primary,
          '--color-secondary': activeColors.secondary,
          '--color-accent': activeColors.accent,
          '--color-background': activeColors.background,
          '--color-text': activeColors.text,
          '--color-border': activeColors.border,
          '--color-message-user': activeColors.messageBg.user,
          '--color-message-assistant': activeColors.messageBg.assistant,
          '--color-input-bg': activeColors.inputBg,
          '--color-header-bg': activeColors.headerBg,
          '--font-heading': theme.fonts.heading,
          '--font-body': theme.fonts.body,

          // Apply base styles
          fontFamily: theme.fonts.body,
          backgroundColor: activeColors.background,
          color: activeColors.text,
        } as React.CSSProperties}
      >
        {/* Background pattern */}
        {theme.patterns.background && (
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${theme.patterns.background})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '400px',
              opacity: theme.patterns.opacity || 0.05,
              zIndex: 0,
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

function ThemeLoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-slate-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-slate-600 text-lg font-medium">Loading experience...</p>
      </div>
    </div>
  );
}
