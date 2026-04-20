import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'hi', 'gu', 'ar', 'es', 'fr', 'zh'],
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/', '/(en|hi|gu|ar|es|fr|zh)/:path*']
};
