import { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, MessageCircle } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/PageHeader';
import { seo } from '@/lib/seo-data';
import { company, serviceIndex } from '@/lib/company-data';
import { useToast } from '@/hooks/use-toast';
import coastalImg from '@/assets/real/hero/hero-coastal-site.jpg';

interface ContactProps {
  language: 'ar' | 'en';
}

export const Contact = ({ language }: ContactProps) => {
  const isArabic = language === 'ar';
  const t = (ar: string, en: string) => (isArabic ? ar : en);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '' as '' | keyof typeof serviceIndex,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Dynamic import: the Supabase client touches localStorage at module load,
      // which breaks Node SSG. Loading it lazily here ensures it only runs in the browser.
      const { supabase } = await import('@/integrations/supabase/client');
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...formData,
          service: formData.service
            ? (isArabic ? serviceIndex[formData.service].ar : serviceIndex[formData.service].en)
            : '',
        },
      });
      if (error) throw error;
      toast({
        title: t('تم إرسال الرسالة بنجاح', 'Message sent successfully'),
        description: t(
          'شكراً لتواصلكم. سنعاود الاتصال بكم قريباً.',
          'Thank you. We will get back to you shortly.'
        ),
      });
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      console.error('contact form error', err);
      toast({
        title: t('خطأ في الإرسال', 'Error sending message'),
        description: t(
          'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.',
          'An error occurred. Please try again or call us directly.'
        ),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const waNumber = company.whatsapp.replace(/[^0-9]/g, '');
  const waMessage = encodeURIComponent(
    isArabic
      ? 'السلام عليكم، أرغب بالاستفسار عن خدمات شركة تدعيمكو'
      : 'Hello, I would like to inquire about Tadeemco services'
  );
  const waHref = `https://wa.me/${waNumber}?text=${waMessage}`;

  // Google Maps embed for the Darwaza Building in Kuwait City
  const mapsSrc =
    'https://www.google.com/maps?q=Kuwait+City+Darwaza+Building&output=embed';

  return (
    <div className={isArabic ? 'font-cairo' : 'font-roboto'}>
      <SEO page={seo.contact} language={language} />

      <PageHeader
        language={language}
        eyebrow={t('تواصل معنا', 'Contact Us')}
        title={t('نحن هنا لمساعدتكم', 'We\'re here to help')}
        subtitle={t(
          'فريقنا الهندسي جاهز للرد على استفساراتكم وتقديم استشارة مجانية وعرض سعر دقيق لمشروعكم.',
          'Our engineering team is ready to answer your questions and provide a free consultation and accurate quote for your project.'
        )}
        image={coastalImg}
        imageAlt={t('اتصل بتدعيمكو', 'Contact Tadeemco')}
      />

      {/* Contact methods */}
      <section className="section-padding bg-background">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Phones */}
            <div className="card-industrial p-6 border-t-[3px] border-accent">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 text-accent mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">
                {t('اتصل بنا', 'Call Us')}
              </h3>
              <div className="space-y-1.5" dir="ltr">
                {company.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:+965${p.replace(/\s/g, '')}`}
                    className="block text-foreground/80 hover:text-accent transition-colors tabular-nums font-semibold"
                  >
                    +965 {p}
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="card-industrial p-6 border-t-[3px] border-accent block hover:bg-secondary/20"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#25D366]/10 text-[#25D366] mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">WhatsApp</h3>
              <p className="text-muted-foreground text-sm">
                {t(
                  'تواصل سريع عبر واتساب — نرد خلال ساعات العمل.',
                  'Quick chat via WhatsApp — we respond during business hours.'
                )}
              </p>
              <p className="text-accent font-bold mt-3 text-sm">
                {t('راسلنا الآن', 'Message us now')} →
              </p>
            </a>

            {/* Email */}
            <a
              href={`mailto:${company.email}`}
              className="card-industrial p-6 border-t-[3px] border-accent block hover:bg-secondary/20"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 text-accent mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{t('البريد الإلكتروني', 'Email')}</h3>
              <p className="text-foreground/80 font-semibold break-all">{company.email}</p>
            </a>

            {/* Instagram */}
            <a
              href={company.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-industrial p-6 border-t-[3px] border-accent block hover:bg-secondary/20"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 text-accent mb-4">
                <Instagram className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Instagram</h3>
              <p className="text-foreground/80 font-semibold">{company.instagram}</p>
              <p className="text-muted-foreground text-sm mt-2">
                {t('شاهد أعمالنا الحديثة', 'See our latest work')}
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Form */}
            <div className={`bg-background p-8 md:p-10 shadow-lg ${isArabic ? 'text-right' : 'text-left'}`}>
              <p className="eyebrow mb-4">{t('اطلب عرض سعر', 'Request a Quote')}</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6 text-balance">
                {t('حدثنا عن مشروعك', 'Tell us about your project')}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    {t('الاسم', 'Name')} <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      {t('البريد الإلكتروني', 'Email')} <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      dir="ltr"
                      className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      {t('رقم الهاتف', 'Phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      dir="ltr"
                      className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    {t('الخدمة المطلوبة', 'Service Needed')}
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  >
                    <option value="">{t('اختر خدمة (اختياري)', 'Select a service (optional)')}</option>
                    {Object.entries(serviceIndex).map(([key, val]) => (
                      <option key={key} value={key}>
                        {isArabic ? val.ar : val.en}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    {t('تفاصيل المشروع', 'Project Details')} <span className="text-accent">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t(
                      'موقع المشروع، عمق الحفر المتوقع، توقيت البدء، أي تفاصيل أخرى...',
                      'Project location, expected excavation depth, start timeline, any other details...'
                    )}
                    className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-y"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-solid w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? t('جاري الإرسال...', 'Sending...')
                    : t('أرسل الرسالة', 'Send Message')}
                </button>
              </form>
            </div>

            {/* Address + Map */}
            <div>
              <div className={`bg-background p-8 md:p-10 shadow-lg mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                <p className="eyebrow mb-4">{t('موقعنا', 'Our Office')}</p>
                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-5 text-balance">
                  {t('زورونا في مدينة الكويت', 'Visit us in Kuwait City')}
                </h2>
                <div className={`flex items-start gap-3 mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-accent" />
                  <p className="text-foreground leading-relaxed">
                    {isArabic ? company.address.ar : company.address.en}
                  </p>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                  {t(
                    'ساعات العمل: الأحد إلى الخميس — ٨:٠٠ صباحاً حتى ٥:٠٠ مساءً',
                    'Business hours: Sunday–Thursday, 8:00 AM – 5:00 PM'
                  )}
                </p>
              </div>
              <div className="bg-background shadow-lg overflow-hidden aspect-[4/3]">
                <iframe
                  src={mapsSrc}
                  title="Tadeemco office location"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
