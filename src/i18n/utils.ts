import { ui, defaultLang, showDefaultLang, type Language } from './ui';

/**
 * Get the current language from the URL path
 */
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Language;
  return defaultLang;
}

/**
 * Get the translation for a given key in the current language
 */
export function useTranslations(lang: Language) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

/**
 * Create a localized URL for the given path
 */
export function useTranslatedPath(lang: Language) {
  return function translatePath(path: string, l: Language = lang) {
    // Remove the language segment if it exists
    const pathWithoutLang = path.replace(/^\/[a-z]{2}(\/|$)/, '/');
    
    // If we're on the default language and we shouldn't show it in the URL, return the path without the language
    if (l === defaultLang && !showDefaultLang) {
      return pathWithoutLang;
    }
    
    // Otherwise, add the language to the path
    return `/${l}${pathWithoutLang}`;
  }
}

/**
 * Get all alternate language URLs for the current route
 */
export function getAlternateLanguageLinks(url: URL): Record<Language, string> {
  const alternateLinks: Partial<Record<Language, string>> = {};
  const currentLang = getLangFromUrl(url);
  const translatePath = useTranslatedPath(currentLang);
  
  // If we're on a page like /en/blog/some-post, we want to get the path without the language prefix
  let pathname = url.pathname;
  if (pathname.startsWith(`/${currentLang}/`)) {
    pathname = pathname.replace(`/${currentLang}/`, '/');
  } else if (pathname === `/${currentLang}`) {
    pathname = '/';
  }
  
  // Create all possible language URLs
  for (const lang in ui) {
    alternateLinks[lang as Language] = `${url.origin}${translatePath(pathname, lang as Language)}`;
  }
  
  return alternateLinks as Record<Language, string>;
}