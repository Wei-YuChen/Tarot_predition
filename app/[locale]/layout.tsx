import '../globals.css'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'zh' },
    { locale: 'es' },
    { locale: 'fr' },
    { locale: 'de' },
    { locale: 'id' },
    { locale: 'vi' },
    { locale: 'th' },
    { locale: 'ja' },
    { locale: 'ko' },
    { locale: 'pt-BR' },
    { locale: 'pt-PT' },
    { locale: 'it' },
    { locale: 'ru' },
    { locale: 'tr' },
    { locale: 'ar' },
    { locale: 'hi' },
    { locale: 'fil' },
    { locale: 'ms' },
    { locale: 'pl' }
  ];
}

export const metadata = {
  title: 'Tarot Prediction - Discover Your Destiny',
  description: 'Unlock the mysteries of your future with our ancient Tarot wisdom. Get insights into your past, present, and future.',
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <Header />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}