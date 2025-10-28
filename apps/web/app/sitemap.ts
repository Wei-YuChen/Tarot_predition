import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tarot-predition.vercel.app';
  const locales = ['en', 'zh', 'tw', 'ja', 'ko', 'vi', 'th', 'id', 'ms'];

  const routes: MetadataRoute.Sitemap = [];

  // Add home page for each locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    });
  });

  // Add reading page for each locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}/reading`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    });
  });

  // Add about page for each locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Add contact page for each locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  // Add FAQ page for each locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  // Add guide page for each locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}/guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  });

  // Add cards page for each locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}/cards`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  });

  // Add terms page for each locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  // Add privacy page for each locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  return routes;
}
