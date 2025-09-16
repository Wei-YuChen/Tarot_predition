import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

export const locales = [
  'en', 'zh', 'es', 'fr', 'de', 'id', 'vi', 'th', 
  'ja', 'ko', 'pt-BR', 'pt-PT', 'it', 'ru', 'tr', 
  'ar', 'hi', 'fil', 'ms', 'pl'
] as const;

export type Locale = typeof locales[number];

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});