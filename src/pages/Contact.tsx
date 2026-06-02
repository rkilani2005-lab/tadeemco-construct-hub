import { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, MessageCircle, Send } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { seo } from '@/lib/seo-data';
import { company } from '@/lib/company-data';
import { useCms, useText } from '@/lib/cms-context';
import { useToast } from '@/hooks/use-toast';

interface ContactProps {
  language: 'ar' | 'en';
}

export const Contact = ({ language }: ContactProps) => {
  const isArabic = language === 'ar';
  const t = (ar: string, en: string) => (isArabic ? ar : en);
  const { toast } = useToast();
  const { settings, services } = useCms();
  const text = useText();
  const tx = (key: string, ar: string, en: string) => text(key, language, t(ar, en));

  const phones = settings.phones.length ? settings.phones : company.phones;
  const email = settings.email || company.email;
  const instagram = settings.instagram || company.instagram;
  const instagramUrl = settings.instagramUrl || company.instagramUrl;
  const whatsapp = settings.whatsapp || company.whatsapp;
  const address = isArabic
    ? settings.address.ar || company.address.ar
    : settings.address.en || company.address.en;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });
      if (error) throw error;
      toast({
        title: t('تم إرسال الرسالة بنجاح', 'Message sent'),
        description: t('شكراً لتواصلكم. سنرد عليكم قريباً.', "Thanks for reaching out. We'll get back to you shortly."),
      });
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
      toast({
        title: t('خطأ في الإرسال', 'Send failed'),
        description: t('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.', 'An error occurred. Please try again or call us directly.'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const waNumber = whatsapp.replace(/[^0-9]/g, '');
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    t('السلام عليكم، أرغب بالاستفسار عن خدمات شركة تدعيمكو', 'Hello, I would like to inquire about Tadeemco services')
  )}`;

  return (
    <div className={isArabic ? 'font-cairo' : 'font-roboto'}>
      <SEO page={seo.contact} language={language} />

      {/* HERO */}
      <section className="bg-primary text-white py-16 md:py-20" style={{ backgroundColor: 'hsl(var(--primary))' }}>
        <div className={`container-width ${isArabic ? 'text-right' : 'text-left'}`}>
          <p className="eyebrow mb-4 text-accent">{tx('contact.hero.eyebrow', 'تواصل معنا', 'Contact Us')}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-balance max-w-4xl">
            {tx('contact.hero.title', 'استشارة مجانية وعرض سعر دقيق', 'Free consultation and accurate quote')}
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl leading-relaxed">
            {tx(
              'contact.hero.subtitle',
              'فريقنا الهندسي جاهز للاستماع إلى تفاصيل مشروعكم وتقديم عرض سعر مدروس مبنياً على ظروف موقعكم الفعلية.',
              "Our engineering team is ready to hear the details of your project and prepare a carefully-sized quote based on your actual site conditions."
            )}
          </p>
        </div>
      </section>

      {/* MAIN: Form + Info */}
      <section className="section-padding bg-background">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

            {/* FORM — takes 3/5 */}
            <div className={`lg:col-span-3 ${isArabic ? 'text-right' : 'text-left'}`}>
              <p className="eyebrow mb-4">{tx('contact.form.eyebrow', 'أرسل استفساراً', 'Send an inquiry')}</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-8 text-balance">
                {tx('contact.form.heading', 'تفاصيل مشروعك', 'Tell us about your project')}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-foreground mb-2">
                      {t('الاسم الكامل', 'Full Name')} <span className="text-accent">*</span>
                    </label>
                    <input
                      id="name" name="name" type="text" required
                      value={formData.name} onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
                      dir={isArabic ? 'rtl' : 'ltr'}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-foreground mb-2">
                      {t('رقم الهاتف', 'Phone')} <span className="text-accent">*</span>
                    </label>
                    <input
                      id="phone" name="phone" type="tel" required
                      value={formData.phone} onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors tabular-nums"
                      dir="ltr"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-foreground mb-2">
                    {t('البريد الإلكتروني', 'Email')}
                  </label>
                  <input
                    id="email" name="email" type="email"
                    value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-3 border border-border bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-bold text-foreground mb-2">
                    {t('الخدمة المطلوبة', 'Service Needed')}
                  </label>
                  <select
                    id="service" name="service"
                    value={formData.service} onChange={handleChange}
                    className="w-full px-4 py-3 border border-border bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors"
                    dir={isArabic ? 'rtl' : 'ltr'}
                  >
                    <option value="">{t('اختر خدمة...', 'Select a service...')}</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.slug}>{isArabic ? s.title_ar : s.title_en}</option>
                    ))}
                    <option value="multiple">{t('أكثر من خدمة', 'Multiple services')}</option>
                    <option value="other">{t('استفسار عام', 'General inquiry')}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-foreground mb-2">
                    {t('تفاصيل المشروع', 'Project Details')} <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message" name="message" required rows={5}
                    value={formData.message} onChange={handleChange}
                    placeholder={t('الموقع، نوع المشروع، الجدول الزمني المتوقع، أي تفاصيل إضافية...', 'Location, project type, expected timeline, any additional details...')}
                    className="w-full px-4 py-3 border border-border bg-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-colors resize-y"
                    dir={isArabic ? 'rtl' : 'ltr'}
                  />
                </div>
                <button
                  type="submit" disabled={isSubmitting}
                  className="btn-primary-solid disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? t('جاري الإرسال...', 'Sending...')
                    : t('إرسال الاستفسار', 'Send Inquiry')}
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* INFO — takes 2/5 */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <p className="eyebrow mb-4">{tx('contact.info.eyebrow', 'أو تواصل مباشرةً', 'Or reach us directly')}</p>
                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6 text-balance">
                  {tx('contact.info.heading', 'طرق أسرع للتواصل', 'Faster ways to connect')}
                </h2>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 p-5 bg-[#25D366] text-white hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="h-7 w-7" />
                  <span className="text-sm font-bold uppercase tracking-wide">WhatsApp</span>
                </a>
                <a
                  href={`tel:${whatsapp}`}
                  className="flex flex-col items-center justify-center gap-2 p-5 bg-accent text-white hover:opacity-90 transition-opacity"
                >
                  <Phone className="h-7 w-7" />
                  <span className="text-sm font-bold uppercase tracking-wide">{t('اتصل الآن', 'Call Now')}</span>
                </a>
              </div>

              {/* Contact rows */}
              <div className="bg-muted p-6 space-y-5">
                <div className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div className={isArabic ? 'text-right' : 'text-left'}>
                    <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-1">
                      {t('المكتب', 'Office')}
                    </p>
                    <p className="text-foreground leading-relaxed">
                      {address}
                    </p>
                  </div>
                </div>

                <div className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div className={isArabic ? 'text-right' : 'text-left'}>
                    <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-2">
                      {t('أرقام الهاتف', 'Phone Numbers')}
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1" dir="ltr">
                      {phones.map((p) => (
                        <a key={p} href={`tel:+965${p.replace(/\s/g, '')}`}
                           className="text-foreground hover:text-accent transition-colors tabular-nums font-semibold">
                          {p}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Mail className="h-5 w-5 text-accent shrink-0" />
                  <a href={`mailto:${email}`}
                     className="text-foreground hover:text-accent transition-colors font-semibold">
                    {email}
                  </a>
                </div>

                <div className={`flex items-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Instagram className="h-5 w-5 text-accent shrink-0" />
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer"
                     className="text-foreground hover:text-accent transition-colors font-semibold">
                    {instagram}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-muted pb-16">
        <div className="container-width">
          <div className="aspect-[21/9] w-full overflow-hidden border border-border">
            <iframe
              title={t('موقع مكتب تدعيمكو', 'Tadeemco office location')}
              src="https://www.google.com/maps?q=Kuwait+City+Darwaza+Building&output=embed"
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
