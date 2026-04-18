import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Award, Shield, Cog, HardHat } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/PageHeader';
import { seo } from '@/lib/seo-data';
import { company, mainContractors } from '@/lib/company-data';
import coastalImg from '@/assets/real/hero/hero-coastal-site.jpg';
import drillingImg from '@/assets/real/hero/hero-drilling-sunrise.jpg';
import pumpFleetImg from '@/assets/real/equipment/pump-fleet.jpg';

interface AboutProps {
  language: 'ar' | 'en';
}

export const About = ({ language }: AboutProps) => {
  const isArabic = language === 'ar';
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  const t = (ar: string, en: string) => (isArabic ? ar : en);

  const values = [
    {
      icon: Award,
      title: t('التخصص', 'Specialization'),
      desc: t(
        'لا نقدم كل شيء. نركز على أعمال التأسيسات تحت الأرض ونتقنها بشكل كامل.',
        "We don't do everything. We focus on substructure works and master them end-to-end."
      ),
    },
    {
      icon: Shield,
      title: t('السلامة', 'Safety'),
      desc: t(
        'التزام صارم بأعلى معايير السلامة في كل موقع، حماية للعمال وللمباني المجاورة.',
        'Strict adherence to the highest safety standards at every site, protecting workers and adjacent structures.'
      ),
    },
    {
      icon: Cog,
      title: t('المعدات المتخصصة', 'Specialized Equipment'),
      desc: t(
        'أسطول من المعدات الألمانية المتقدمة ومضخات HÜDIG-CELLE، مدعومة بصيانة مستمرة.',
        'A fleet of advanced German equipment and HÜDIG-CELLE pumps, backed by continuous maintenance.'
      ),
    },
    {
      icon: HardHat,
      title: t('فريق هندسي', 'Engineering Team'),
      desc: t(
        'مهندسون وفنيون ذوو خبرة طويلة في التربة الكويتية ومتطلبات المواقع المحلية.',
        'Engineers and technicians with deep experience in Kuwaiti soil conditions and local site requirements.'
      ),
    },
  ];

  return (
    <div className={isArabic ? 'font-cairo' : 'font-roboto'}>
      <SEO page={seo.about} language={language} />

      <PageHeader
        language={language}
        eyebrow={t('من نحن', 'About Us')}
        title={t('متخصصون في أعمال التأسيسات تحت الأرض', 'Substructure specialists')}
        subtitle={t(
          'شركة كويتية متخصصة في المرحلة الأولى والأكثر أهمية من أي مشروع إنشائي — من الحفر والتدعيم إلى سحب المياه الجوفية والعزل المائي.',
          "A Kuwaiti specialist in the earliest and most critical stage of any construction project — from excavation and shoring to groundwater dewatering and waterproofing."
        )}
        image={coastalImg}
        imageAlt={t('موقع عمل تدعيمكو', 'Tadeemco work site')}
      />

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="container-width">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isArabic ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <div className={isArabic ? 'text-right' : 'text-left'}>
              <p className="eyebrow mb-4">{t('قصتنا', 'Our Story')}</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6 text-balance">
                {t('خبرة عميقة في المراحل الأولى للبناء', 'Deep expertise in the earliest stages of construction')}
              </h2>
              <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed text-pretty">
                <p>
                  {t(
                    'شركة تدعيمكو هي شركة كويتية متخصصة في أعمال الحفر والتدعيم وسحب المياه الجوفية والعزل المائي. نعمل مع كبرى شركات المقاولات والمكاتب الاستشارية في دولة الكويت على تنفيذ أعقد مراحل البناء.',
                    'Tadeemco is a Kuwaiti company specialized in excavation, shoring, groundwater dewatering, and waterproofing. We partner with leading main contractors and consulting offices across the State of Kuwait on the most demanding stages of construction.'
                  )}
                </p>
                <p>
                  {t(
                    'نحن لا نقدم كل شيء. نقدم بالتحديد ما نجيده — المرحلة الأولى، التي يعتمد عليها كل ما يأتي بعدها. التأسيس الصحيح لا يمكن إصلاحه لاحقاً، لذلك نضع معايير عالية منذ اليوم الأول.',
                    "We don't offer everything. We offer exactly what we're best at — the earliest stage, upon which everything else depends. Foundations done right cannot be fixed later, so we hold ourselves to high standards from day one."
                  )}
                </p>
              </div>
              <div className="mt-8">
                <Link to="/services" className="btn-ghost-primary">
                  {t('استعرض خدماتنا', 'Explore our services')}
                  <Arrow className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src={drillingImg}
                alt={t('موقع حفر تدعيمكو', 'Tadeemco drilling site')}
                className="w-full h-auto shadow-lg"
              />
              <div className={`absolute -bottom-4 ${isArabic ? '-left-4' : '-right-4'} bg-accent text-accent-foreground p-4 max-w-[220px] hidden md:block`}>
                <p className="text-xs uppercase tracking-wider font-bold opacity-90">
                  {t('نعمل في', 'Active across')}
                </p>
                <p className="text-lg font-bold mt-1">
                  {t('جميع محافظات الكويت', 'All Kuwait governorates')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className={`max-w-3xl mb-14 ${isArabic ? 'text-right ms-auto' : 'text-left'}`}>
            <p className="eyebrow mb-4">{t('لماذا تدعيمكو', 'Why Tadeemco')}</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 text-balance">
              {t('أربعة أشياء تميزنا', 'Four things that set us apart')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="card-service">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 text-accent mb-5">
                  <v.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section className="section-padding-sm bg-background border-y border-border">
        <div className="container-width">
          <p className={`eyebrow mb-6 ${isArabic ? 'flex-row-reverse' : ''}`}>
            {t('نعمل مع', 'We Work With')}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            {mainContractors.map((c, i) => (
              <span key={i} className="text-base md:text-lg font-bold text-muted-foreground hover:text-primary transition-colors">
                {isArabic ? c.ar : c.en}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment tease */}
      <section className="section-padding bg-background">
        <div className="container-width">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isArabic ? 'lg:[&>*:last-child]:order-first' : ''}`}>
            <img src={pumpFleetImg} alt={t('أسطول معدات تدعيمكو', 'Tadeemco equipment fleet')} className="w-full h-auto shadow-lg" />
            <div className={isArabic ? 'text-right' : 'text-left'}>
              <p className="eyebrow mb-4">{t('معداتنا', 'Our Equipment')}</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 text-balance">
                {t('أسطول ألماني الصنع', 'A German-engineered fleet')}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 text-pretty">
                {t(
                  'نعتمد على مضخات HÜDIG-CELLE الألمانية، أنظمة الآبار النقطية، مضخات غاطسة بمختلف الأحجام، ومعدات تدعيم فولاذية وخشبية.',
                  'We operate HÜDIG-CELLE German pumps, wellpoint systems, submersible pumps in a full range of sizes, and steel and timber shoring materials.'
                )}
              </p>
              <Link to="/equipment" className="btn-secondary-solid">
                {t('استعرض المعدات', 'View Equipment')}
                <Arrow className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-muted">
        <div className="container-width text-center">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-5 text-balance">
            {t('ابدأ مشروعك القادم معنا', 'Start your next project with us')}
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            {t(
              'تحدث مع فريقنا الهندسي للحصول على استشارة مجانية وعرض سعر دقيق.',
              'Talk to our engineering team for a free consultation and accurate quote.'
            )}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary-solid">
              {t('اطلب عرض سعر', 'Request a Quote')}
              <Arrow className="h-5 w-5" />
            </Link>
            <Link to="/projects" className="btn-secondary-solid">
              {t('أعمالنا السابقة', 'Our Previous Work')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
