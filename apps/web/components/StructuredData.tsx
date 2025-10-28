import React from 'react';

interface StructuredDataProps {
  type:
    | 'website'
    | 'organization'
    | 'article'
    | 'faq'
    | 'breadcrumb'
    | 'service';
  data: Record<string, any>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateSchema = () => {
    const baseUrl = 'https://tarot-predition.vercel.app';

    switch (type) {
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: data.name || 'Mystic Tarot',
          description:
            data.description ||
            'Free online tarot card readings with traditional interpretations',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/tw?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        };

      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Mystic Tarot',
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          sameAs: [],
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'fish760217@gmail.com',
            contactType: 'Customer Service',
            availableLanguage: [
              'English',
              'Chinese',
              'Japanese',
              'Korean',
              'Vietnamese',
              'Thai',
              'Indonesian',
              'Malay',
            ],
          },
        };

      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.title,
          description: data.description,
          image: data.image || `${baseUrl}/og-image.png`,
          author: {
            '@type': 'Organization',
            name: 'Mystic Tarot',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Mystic Tarot',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/logo.png`,
            },
          },
          datePublished: data.datePublished || new Date().toISOString(),
          dateModified: data.dateModified || new Date().toISOString(),
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url || baseUrl,
          },
        };

      case 'faq':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data.questions.map(
            (q: { question: string; answer: string }) => ({
              '@type': 'Question',
              name: q.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: q.answer,
              },
            })
          ),
        };

      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.items.map(
            (item: { name: string; url: string }, index: number) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.name,
              item: `${baseUrl}${item.url}`,
            })
          ),
        };

      case 'service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: 'Tarot Card Reading',
          provider: {
            '@type': 'Organization',
            name: 'Mystic Tarot',
            url: baseUrl,
          },
          areaServed: 'Worldwide',
          availableLanguage: [
            'English',
            'Chinese',
            'Japanese',
            'Korean',
            'Vietnamese',
            'Thai',
            'Indonesian',
            'Malay',
          ],
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          description: data.description || 'Free online tarot card readings',
        };

      default:
        return null;
    }
  };

  const schema = generateSchema();

  if (!schema) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
