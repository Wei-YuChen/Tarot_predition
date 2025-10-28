import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'zh', 'tw', 'ja', 'ko', 'vi', 'th', 'id', 'ms'];
const defaultLocale = 'tw';

// Detect if the request is from a Google bot
function isGoogleBot(userAgent: string | null): boolean {
  if (!userAgent) return false;

  const googleBotPatterns = [
    /googlebot/i, // Matches all Googlebot variants (mobile, image, news, video)
    /adsbot-google/i, // AdSense crawler
    /mediapartners-google/i, // AdSense crawler for page content
  ];

  return googleBotPatterns.some((pattern) => pattern.test(userAgent));
}

// Get locale from pathname
function getLocale(pathname: string): string | undefined {
  const segments = pathname.split('/');
  if (segments.length > 1 && locales.includes(segments[1])) {
    return segments[1];
  }
  return undefined;
}

// Detect preferred locale from various sources
function detectLocale(request: NextRequest): string {
  // 1. Check cookie first
  const cookieLocale = request.cookies.get('locale')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse accept-language header and find best match
    const langs = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim())
      .map((lang) => {
        // Handle common language variations
        if (lang.startsWith('zh-CN') || lang === 'zh-Hans') return 'zh';
        if (
          lang.startsWith('zh-TW') ||
          lang.startsWith('zh-HK') ||
          lang === 'zh-Hant'
        )
          return 'tw';
        if (lang.startsWith('zh')) return 'zh'; // Default Chinese to simplified
        if (lang.startsWith('en')) return 'en';
        if (lang.startsWith('ja')) return 'ja';
        if (lang.startsWith('ko')) return 'ko';
        if (lang.startsWith('vi')) return 'vi';
        if (lang.startsWith('th')) return 'th';
        if (lang.startsWith('id')) return 'id';
        if (lang.startsWith('ms')) return 'ms';
        return lang;
      });

    for (const lang of langs) {
      if (locales.includes(lang)) {
        return lang;
      }
    }
  }

  // 3. Default fallback
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = getLocale(pathname);

  // If no locale in pathname, redirect to detected locale
  if (!pathnameHasLocale) {
    // Check if request is from a Google bot
    const userAgent = request.headers.get('user-agent');
    const isBot = isGoogleBot(userAgent);

    // For Google bots, always redirect to English to ensure consistent crawling
    // For regular users, detect their preferred language
    const detectedLocale = isBot ? defaultLocale : detectLocale(request);

    const url = request.nextUrl.clone();
    url.pathname = `/${detectedLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
