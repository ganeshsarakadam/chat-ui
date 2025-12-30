import { Theme } from './types';

export const quranTheme: Theme = {
  id: 'quran',
  name: 'Al-Quran',
  description: 'Divine revelations of guidance and mercy',
  colors: {
    primary: '#006B3F',      // Islamic green
    secondary: '#FFD700',    // Gold
    accent: '#00A86B',       // Jade
    background: '#F0F8F0',   // Mint cream
    text: '#1B4332',         // Dark green
    border: '#B8860B',       // Dark goldenrod
    messageBg: {
      user: '#E8F5E9',
      assistant: '#FFFFFF',
    },
    inputBg: '#FFFFFF',
    headerBg: '#006B3F',
  },
  fonts: {
    heading: '"Amiri", serif',
    body: '"Noto Naskh Arabic", serif',
    code: '"Fira Code", monospace',
  },
  avatars: {
    assistant: '/avatars/quran/scholar.png',
    user: '/avatars/quran/believer.png',
  },
  patterns: {
    background: '/patterns/quran/geometric-islamic.svg',
    decoration: '/patterns/quran/arabesque.svg',
    opacity: 0.06,
  },
  animations: {
    messageEntry: 'reverentSlide',
    thinking: 'prayerBeads',
  },
  metadata: {
    culture: 'Islamic',
    primaryLanguage: 'Arabic',
    region: 'Arabian Peninsula',
  },
};
