import { SEO } from '@/components/SEO';
import { seo } from '@/lib/seo-data';
import { useCms, useText } from '@/lib/cms-context';

interface InquiryProps {
  language: 'ar' | 'en';
}

export const Inquiry = ({ language }: InquiryProps) => {
  const isArabic = language === 'ar';
  const t = (ar: string, en: string) => (isArabic ? ar : en);
  const text = useText();
  const tx = (key: string, ar: string, en: string) => text(key, language, t(ar, en));

  // Allow the iframe URL to be edited from /admin → Content → inquiry.
  // Fallback to a generic placeholder so the page still renders if unset.
  const iframeUrl = text('inquiry.iframe.url', language, '').trim() || 'https://forms.gle/example';

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className={isArabic ? 'font-cairo' : 'font-roboto'}>
      <SEO page={seo.inquiry} language={language} />

      {/* HERO */}
      <section className="bg-primary text-white py-16 md:py-20" style={{ backgroundColor: 'hsl(var(--primary))' }}>
        <div className={`container-width ${isArabic ? 'text-right' : 'text-left'}`}>
          <p className="eyebrow mb-4 text-accent">{tx('inquiry.hero.eyebrow', 'استفسار مباشر', 'Direct Inquiry')}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-balance max-w-4xl">
            {tx('inquiry.hero.title', 'أرسل استفسارك عبر النموذج التالي', 'Submit your inquiry through the form below')}
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl leading-relaxed">
            {tx(
              'inquiry.hero.subtitle',
              'املأ النموذج أدناه وسيقوم فريقنا بالرد عليك في أقرب وقت.',
              'Fill out the form below and our team will get back to you as soon as possible.'
            )}
          </p>
        </div>
      </section>

      {/* IFRAME */}
      <section className="section-padding bg-background">
        <div className="container-width">
          <div className="aspect-[16/9] w-full overflow-hidden border border-border rounded-sm shadow-sm">
            <iframe
              title={t('نموذج الاستفسار', 'Inquiry Form')}
              src={iframeUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
