import { Theme } from './types';
import { getTheme } from './registry';

export class ThemeLoader {
  private static cache = new Map<string, Theme>();
  private static assetCache = new Set<string>();

  static async load(domainId: string): Promise<Theme> {
    // Return cached theme if available
    if (this.cache.has(domainId)) {
      return this.cache.get(domainId)!;
    }

    // Load theme from registry
    const theme = getTheme(domainId);

    // Cache it
    this.cache.set(domainId, theme);

    // Preload assets in background
    this.preloadAssets(theme);

    return theme;
  }

  private static preloadAssets(theme: Theme): void {
    // Preload fonts
    this.preloadFont(theme.fonts.heading);
    this.preloadFont(theme.fonts.body);
    if (theme.fonts.code) {
      this.preloadFont(theme.fonts.code);
    }

    // Preload images
    const images = [
      theme.avatars.assistant,
      theme.avatars.user,
      theme.patterns.background,
      theme.patterns.decoration,
    ].filter((url): url is string => Boolean(url));

    images.forEach(url => this.preloadImage(url));
  }

  private static preloadFont(fontFamily: string): void {
    const fontName = fontFamily.match(/["']([^"']+)["']/)?.[1] || fontFamily;
    const cacheKey = `font-${fontName}`;

    if (this.assetCache.has(cacheKey)) return;
    this.assetCache.add(cacheKey);

    if (typeof document !== 'undefined' && !document.querySelector(`link[href*="${fontName}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;500;600;700&display=swap`;
      document.head.appendChild(link);
    }
  }

  private static preloadImage(url: string): void {
    if (this.assetCache.has(url)) return;
    this.assetCache.add(url);

    if (typeof window !== 'undefined') {
      const img = new Image();
      img.src = url;
    }
  }
}
