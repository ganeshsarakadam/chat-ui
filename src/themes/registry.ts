import { Theme } from './types';
import { mahabharataTheme } from './mahabharata';
import { bibleTheme } from './bible';
import { quranTheme } from './quran';
import { defaultTheme } from './default';

export const THEME_REGISTRY: Record<string, Theme> = {
  mahabharata: mahabharataTheme,
  bible: bibleTheme,
  quran: quranTheme,
  default: defaultTheme,
};

export const AVAILABLE_DOMAINS = Object.keys(THEME_REGISTRY).filter(
  key => key !== 'default'
);

export function getTheme(domainId: string): Theme {
  return THEME_REGISTRY[domainId] || THEME_REGISTRY.default;
}
