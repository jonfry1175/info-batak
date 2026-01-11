import Script from 'next/script';

// Helper to sanitize strings for JSON-LD (prevent XSS)
function sanitizeJsonLd(str: string): string {
  return str.replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}

// Organization Schema
export interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
  description?: string;
}

export function OrganizationJsonLd({ data }: { data: OrganizationSchema }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: sanitizeJsonLd(data.name),
    url: data.url,
    logo: data.logo,
    description: data.description ? sanitizeJsonLd(data.description) : undefined,
    sameAs: data.sameAs,
  };

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}

// WebSite Schema with SearchAction
export interface WebSiteSchema {
  name: string;
  url: string;
  searchUrl?: string;
  description?: string;
}

export function WebSiteJsonLd({ data }: { data: WebSiteSchema }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: sanitizeJsonLd(data.name),
    url: data.url,
    description: data.description ? sanitizeJsonLd(data.description) : undefined,
    potentialAction: data.searchUrl
      ? {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${data.searchUrl}?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        }
      : undefined,
  };

  return (
    <Script
      id="website-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}

// Article Schema
export interface ArticleSchema {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  publisher: {
    name: string;
    logo: string;
  };
  url: string;
}

export function ArticleJsonLd({ data }: { data: ArticleSchema }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: sanitizeJsonLd(data.headline),
    description: sanitizeJsonLd(data.description),
    image: data.image,
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    url: data.url,
    author: {
      '@type': 'Organization',
      name: sanitizeJsonLd(data.author),
    },
    publisher: {
      '@type': 'Organization',
      name: sanitizeJsonLd(data.publisher.name),
      logo: {
        '@type': 'ImageObject',
        url: data.publisher.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
  };

  return (
    <Script
      id="article-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}

// BreadcrumbList Schema
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: sanitizeJsonLd(item.name),
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}

// FAQPage Schema
export interface FAQItem {
  question: string;
  answer: string;
}

export function FAQJsonLd({ items }: { items: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: sanitizeJsonLd(item.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: sanitizeJsonLd(item.answer),
      },
    })),
  };

  return (
    <Script
      id="faq-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}

// LocalBusiness Schema (for cultural organization)
export interface CulturalOrganizationSchema {
  name: string;
  url: string;
  logo: string;
  description: string;
  areaServed: string;
  knowsAbout: string[];
}

export function CulturalOrganizationJsonLd({ data }: { data: CulturalOrganizationSchema }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: sanitizeJsonLd(data.name),
    url: data.url,
    logo: data.logo,
    description: sanitizeJsonLd(data.description),
    areaServed: data.areaServed,
    knowsAbout: data.knowsAbout.map(sanitizeJsonLd),
  };

  return (
    <Script
      id="cultural-org-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}
