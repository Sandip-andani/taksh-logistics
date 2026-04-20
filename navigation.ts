import {createNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';

export const locales = ['en', 'hi', 'gu', 'ar', 'es', 'fr', 'zh'] as const;
export const localeNames: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
  gu: 'Gujarati',
  ar: 'Arabic',
  es: 'Spanish',
  fr: 'French',
  zh: 'Chinese'
};

export const routing = defineRouting({
  locales,
  defaultLocale: 'en'
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
