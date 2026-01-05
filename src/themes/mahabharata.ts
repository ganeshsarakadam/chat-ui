import { Theme } from './types';

export const mahabharataTheme: Theme = {
  id: 'mahabharata',
  name: 'Mahabharata',
  description: 'Ancient Indian epic of dharma and cosmic battles',
  colors: {
    primary: '#FF6B35',      // Vibrant saffron (kept for cultural significance)
    secondary: '#F97316',    // Modern orange
    accent: '#FBBF24',       // Bright gold
    background: '#F5F5F5',   // Light gray background for contrast
    text: '#0F172A',         // Slate 900 (high contrast)
    border: '#E2E8F0',       // Slate 200 (subtle)
    messageBg: {
      user: '#FFFFFF',       // Pure white
      assistant: '#FFFFFF',  // Pure white
    },
    inputBg: '#FFFFFF',      // Pure white
    headerBg: '#FFFFFF',     // Clean white for light mode
  },
  darkColors: {
    primary: '#FF6B35',      // Keep vibrant saffron
    secondary: '#F97316',    // Modern orange
    accent: '#FBBF24',       // Bright gold
    background: '#0F172A',   // Dark slate
    text: '#F8FAFC',         // Light slate
    border: '#1E293B',       // Slate 800
    messageBg: {
      user: '#1E293B',       // Slate 800
      assistant: '#0F172A',  // Darker slate
    },
    inputBg: '#1E293B',      // Slate 800
    headerBg: '#020617',     // Almost black
  },
  fonts: {
    heading: '"Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    code: '"JetBrains Mono", "Fira Code", monospace',
  },
  avatars: {
    assistant: '/avatars/mahabharata/krishna.png',
    user: '/avatars/mahabharata/arjuna.png',
  },
  patterns: {
    background: '/patterns/mahabharata/lotus-mandala.svg',
    decoration: '/patterns/mahabharata/om-border.svg',
    opacity: 0.03,           // More subtle pattern
  },
  animations: {
    messageEntry: 'fadeSlideUp',
    thinking: 'lotusBloom',
  },
  metadata: {
    culture: 'Hindu',
    primaryLanguage: 'Sanskrit',
    region: 'Indian Subcontinent',
  },
};
