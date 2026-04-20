import createMiddleware from 'next-intl/middleware';
import {routing} from './navigation';

const handleRequest = createMiddleware(routing);

export function proxy(request: any) {
  return handleRequest(request);
}

export default handleRequest;

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files (e.g. favicon.ico)
  // - Next.js internals (e.g. _next)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
