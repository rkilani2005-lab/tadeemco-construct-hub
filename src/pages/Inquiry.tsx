import { SEO } from '@/components/SEO';
import { seo } from '@/lib/seo-data';

interface InquiryProps {
  language: 'ar' | 'en';
}

export const Inquiry = ({ language }: InquiryProps) => {
  const isArabic = language === 'ar';

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className={isArabic ? 'font-cairo' : 'font-roboto'}>
      <SEO page={seo.inquiry} language={language} />

      <section className="h-screen w-full bg-background">
        <iframe
          title={isArabic ? 'نموذج الاستفسار' : 'Inquiry Form'}
          src="http://tadeemco.foxdigia.com/expo"
          className="h-full w-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </section>
    </div>
  );
};
