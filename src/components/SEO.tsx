import { Helmet } from 'react-helmet-async';
import { seo, type PageSEO } from '@/lib/seo-data';

interface SEOProps {
  page: PageSEO;
  language: 'ar' | 'en';
  /** Optional per-page JSON-LD to inject in addition to the global LocalBusiness schema. */
  jsonLd?: Record<string, unknown>;
}

/**
 * Per-route SEO head manager. Emits:
 * - <title>, meta description, keywords (in the active language)
 * - Canonical URL
 * - hreflang ar / en / x-default (for Google to serve the right language)
 * - Open Graph + Twitter Card tags (for WhatsApp/LinkedIn/Twitter link previews)
 * - Optional JSON-LD (page-specific structured data)
 */
export const SEO = ({ page, language, jsonLd }: SEOProps) => {
  const isArabic = language === 'ar';
  const canonical = `${seo.siteUrl}${page.path}`;
  const ogImage = `${seo.siteUrl}${seo.defaultOgImage}`;
  const title = isArabic ? page.title.ar : page.title.en;
  const description = isArabic ? page.description.ar : page.description.en;
  const keywords = isArabic ? page.keywords.ar : page.keywords.en;

  return (
    <Helmet>
      {/* html lang + dir follow current language — swaps on language toggle */}
      <html lang={isArabic ? 'ar' : 'en'} dir={isArabic ? 'rtl' : 'ltr'} />

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical + hreflang pair — tells Google this is the definitive URL
          and that an alternate language version exists */}
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="ar" href={canonical} />
      <link rel="alternate" hrefLang="en" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Tadeemco construction site in Kuwait" />
      <meta property="og:site_name" content="Tadeemco" />
      <meta property="og:locale" content={isArabic ? 'ar_KW' : 'en_KW'} />
      <meta property="og:locale:alternate" content={isArabic ? 'en_KW' : 'ar_KW'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Geo targeting for Kuwait */}
      <meta name="geo.region" content="KW" />
      <meta name="geo.placename" content="Kuwait City" />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};
