import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { seo } from '@/lib/seo-data';
import { company } from '@/lib/company-data';
import { useCms, useText } from '@/lib/cms-context';
import { IconShoring, IconDewatering, IconWaterproofing, IconExcavation } from '@/components/ServiceIcons';
import dewateringImg from '@/assets/real/equipment/dewatering-pumps.jpg';
import pumpFleetImg from '@/assets/real/equipment/pump-fleet.jpg';
import excavatorImg from '@/assets/real/equipment/excavator.jpg';
import siteImg from '@/assets/real/equipment/site-overview.jpg';

interface ServicesProps {
  language: 'ar' | 'en';
}

export const Services = ({ language }: ServicesProps) => {
  const isArabic = language === 'ar';
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  const t = (ar: string, en: string) => (isArabic ? ar : en);
  const text = useText();
  const tx = (key: string, ar: string, en: string) => text(key, language, t(ar, en));
  const cx = tx;

  const baseServices = [
    {
      id: 'shoring',
      Icon: IconShoring,
      image: siteImg,
      title: t('أعمال التدعيم', 'Shoring Works'),
      subtitle: t('حماية جوانب الحفر ومنع انهيار التربة', 'Excavation side protection and soil stabilization'),
      intro: t(
        'التدعيم هو عملية حماية جوانب الحفر العميق من الانهيار باستخدام أنظمة هندسية متخصصة. يُعتبر من أهم مراحل المشروع لضمان سلامة العمال والمنشآت المجاورة.',
        'Shoring is the process of protecting the sides of deep excavations from collapse using engineered support systems. It is one of the most critical project phases for ensuring worker safety and protecting adjacent structures.'
      ),
      whenNeeded: t(
        'يُستخدم عند الحفر بعمق يزيد عن ١.٥ متر، أو عند الحفر قرب مبانٍ قائمة، أو في التربة غير المستقرة.',
        'Required for excavations deeper than 1.5m, when excavating near existing structures, or in unstable soils.'
      ),
      methods: isArabic
        ? ['تدعيم الجدران الاستنادية', 'الدعامات الفولاذية القابلة للتعديل', 'ألواح التدعيم المعدنية', 'تدعيم الحفريات العميقة', 'حماية المباني المجاورة']
        : ['Retaining wall support', 'Adjustable steel struts', 'Metal shoring panels', 'Deep excavation shoring', 'Adjacent-structure protection'],
    },
    {
      id: 'dewatering',
      Icon: IconDewatering,
      image: dewateringImg,
      title: t('سحب المياه الجوفية', 'Groundwater Dewatering'),
      subtitle: t('بيئة عمل جافة لتنفيذ أعمال الأساسات', 'Dry working conditions for foundation works'),
      intro: t(
        'خفض منسوب المياه الجوفية قبل أعمال الحفر والأساسات لضمان استقرار الموقع وتمكين تنفيذ الأعمال بأمان وكفاءة. تربة الكويت ومنسوب المياه الجوفية المرتفع يجعلان من هذه الخدمة ضرورة في معظم المشاريع.',
        'Lowering the groundwater table before excavation and foundation works to stabilize the site and enable safe, efficient construction. Kuwait\'s soil conditions and high water table make this service essential for most projects.'
      ),
      whenNeeded: t(
        'ضروري في أي مشروع يتضمن حفر أساسات أو أدوار سفلية أسفل منسوب المياه الجوفية الطبيعي.',
        'Essential for any project with foundations or basements below the natural groundwater level.'
      ),
      methods: isArabic
        ? ['أنظمة الآبار النقطية (Wellpoint)', 'مضخات طرد مركزي عالية الكفاءة', 'مضخات غاطسة متنوعة الأحجام', 'مضخات تفريغ HÜDIG الألمانية', 'مراقبة مستوى المياه ٢٤/٧', 'تصريف المياه وفقاً للمعايير البيئية']
        : ['Wellpoint dewatering systems', 'High-capacity centrifugal pumps', 'Submersible pumps in all sizes', 'HÜDIG Germany vacuum pumps', '24/7 water-level monitoring', 'Environmentally-compliant discharge'],
    },
    {
      id: 'waterproofing',
      Icon: IconWaterproofing,
      image: pumpFleetImg,
      title: t('العازل المائي', 'Waterproofing'),
      subtitle: t('حماية طويلة الأمد للأساسات والجدران تحت الأرضية', 'Long-term protection for foundations and below-grade walls'),
      intro: t(
        'تطبيق أنظمة عزل مائي متطورة على الأساسات والجدران تحت الأرضية لحمايتها من الرطوبة والمياه الجوفية طوال العمر التشغيلي للمنشأة. العزل الصحيح يوفر تكاليف صيانة كبيرة ويحافظ على سلامة الخرسانة.',
        'Application of advanced waterproofing systems to foundations and below-grade walls to protect them from moisture and groundwater throughout the structure\'s service life. Proper waterproofing prevents costly long-term maintenance and preserves concrete integrity.'
      ),
      whenNeeded: t(
        'لازم لجميع الأساسات والأدوار السفلية في الكويت نظراً لارتفاع منسوب المياه الجوفية وملوحتها.',
        'Required for all foundations and basements in Kuwait due to high groundwater levels and salinity.'
      ),
      methods: isArabic
        ? ['أغشية عزل بيتومينية', 'أنظمة العزل الإيبوكسي', 'طبقات حماية الخرسانة', 'عزل الفواصل الإنشائية', 'أنظمة الحماية الكاثودية']
        : ['Bituminous membrane systems', 'Epoxy waterproofing', 'Concrete protective coatings', 'Construction joint sealing', 'Cathodic protection systems'],
    },
    {
      id: 'excavation',
      Icon: IconExcavation,
      image: excavatorImg,
      title: t('أعمال الحفر', 'Excavation Works'),
      subtitle: t('حفر متخصص لجميع أنواع التربة والمشاريع', 'Specialized excavation for all soil types and project scales'),
      intro: t(
        'أعمال حفر شاملة للأساسات العميقة، الخنادق، والقنوات باستخدام معدات حديثة وفريق ذو خبرة طويلة في التربة الكويتية. نتعامل مع جميع أنواع التربة من الرملية إلى الصخرية.',
        'Comprehensive excavation works for deep foundations, trenches, and channels using modern equipment and a team with deep experience in Kuwaiti ground conditions. We handle all soil types from sandy to rocky.'
      ),
      whenNeeded: t(
        'جميع أنواع المشاريع السكنية، التجارية، والصناعية — من الفلل الخاصة إلى الأبراج والمجمعات.',
        'All project types — residential, commercial, and industrial — from private villas to towers and large complexes.'
      ),
      methods: isArabic
        ? ['حفر الأساسات العميقة', 'حفر الخنادق والقنوات', 'إزالة التربة والردم', 'أعمال الحفر في التربة الصعبة', 'التنسيق مع أعمال التدعيم والنزح']
        : ['Deep foundation excavation', 'Trenching and channel works', 'Soil removal and backfilling', 'Difficult-soil excavation', 'Coordination with shoring and dewatering'],
    },
  ];

  // Overlay editable CMS fields (title, tag, description, image) onto the rich
  // static service definitions, matched by slug. Detailed copy stays as fallback.
  const { services: cmsServices } = useCms();
  const cmsBySlug = Object.fromEntries(cmsServices.map((s) => [s.slug, s]));
  const services = baseServices.map((s) => {
    const o = cmsBySlug[s.id];
    if (!o) return s;
    return {
      ...s,
      title: (isArabic ? o.title_ar : o.title_en) || s.title,
      subtitle: (isArabic ? o.tag_ar : o.tag_en) || s.subtitle,
      intro: (isArabic ? o.description_ar : o.description_en) || s.intro,
      image: o.image_url || s.image,
    };
  });

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className={isArabic ? 'font-cairo' : 'font-roboto'}>
      <SEO page={seo.services} language={language} />

      {/* HERO */}
      <section className="bg-primary text-white py-16 md:py-20" style={{ backgroundColor: 'hsl(var(--primary))' }}>
        <div className={`container-width ${isArabic ? 'text-right' : 'text-left'}`}>
          <p className="eyebrow mb-4 text-accent">{tx('services.hero.eyebrow', 'خدماتنا', 'Our Services')}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-balance max-w-4xl">
            {tx('services.hero.title', 'أربع خدمات متخصصة نجيدها', 'Four specialized services, mastered end-to-end')}
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl leading-relaxed">
            {t(
              'لا نقدم كل شيء. نقدم بالتحديد ما نجيده: المراحل الأولى والأكثر أهمية في أي مشروع إنشائي. فريقنا الهندسي ومعداتنا المتخصصة مصممة حصرياً لهذه المراحل.',
              "We don't do everything. We do exactly what we're best at: the earliest, most critical stages of any construction project. Our engineering team and specialized equipment are built specifically for these phases."
            )}
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <section className="bg-muted border-y border-border">
        <div className="container-width py-4">
          <div className={`flex flex-wrap gap-2 md:gap-4 ${isArabic ? 'justify-end' : 'justify-start'}`}>
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border hover:border-accent hover:text-accent transition-colors text-sm font-semibold"
              >
                <s.Icon className="w-4 h-4" />
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE SECTIONS — alternating image/text */}
      {services.map((s, i) => {
        const imageFirst = i % 2 === 0;
        return (
          <section
            key={s.id}
            id={s.id}
            className={`section-padding scroll-mt-24 ${i % 2 === 0 ? 'bg-background' : 'bg-muted'}`}
          >
            <div className="container-width">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isArabic ? (imageFirst ? '' : 'lg:[&>*:first-child]:order-2') : (imageFirst ? '' : 'lg:[&>*:first-child]:order-2')}`}>
                <div className={isArabic ? 'text-right' : 'text-left'}>
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-accent text-white mb-5">
                    <s.Icon className="w-8 h-8" />
                  </div>
                  <p className="text-accent text-sm font-bold uppercase tracking-wide mb-2">
                    {s.subtitle}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6 text-balance">
                    {s.title}
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6 text-pretty">
                    {s.intro}
                  </p>
                  <div className={`bg-secondary/50 border-${isArabic ? 'r' : 'l'}-4 border-accent p-5 mb-8`}>
                    <p className="text-sm font-bold text-primary mb-1 uppercase tracking-wide">
                      {tx('services.card.when', 'متى تحتاج هذه الخدمة؟', 'When you need this service')}
                    </p>
                    <p className="text-foreground">{s.whenNeeded}</p>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {tx('services.card.methods', 'معداتنا وأساليبنا', 'Our Equipment & Methods')}
                  </h3>
                  <ul className="space-y-2.5 mb-8">
                    {s.methods.map((m, idx) => (
                      <li key={idx} className={`flex items-start gap-3`}>
                        <span className="flex-shrink-0 w-5 h-5 bg-accent text-white flex items-center justify-center mt-0.5">
                          <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        </span>
                        <span className="text-foreground">{m}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`flex flex-wrap gap-3 ${isArabic ? 'justify-end' : ''}`}>
                    <Link to="/contact" className="btn-primary-solid">
                      {cx('common.cta.quote', 'اطلب عرض سعر', 'Request a Quote')}
                      <Arrow className="h-5 w-5" />
                    </Link>
                    <a href={`tel:${company.whatsapp}`} className="btn-secondary-solid">
                      <Phone className="h-5 w-5" />
                      {cx('common.cta.call', 'اتصل بنا', 'Call Us')}
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-auto aspect-[4/3] object-cover shadow-lg"
                    loading="lazy"
                  />
                  <div className={`absolute -bottom-4 ${isArabic ? '-left-4' : '-right-4'} bg-accent text-white p-4 hidden md:block`}>
                    <p className="text-xs uppercase tracking-wide font-bold">{tx('services.card.expertise', 'خبرة', 'Expertise')}</p>
                    <p className="text-lg font-bold mt-0.5">{s.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Final CTA */}
      <section className="bg-primary text-white section-padding-sm" style={{ backgroundColor: 'hsl(var(--primary))' }}>
        <div className="container-width text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-5 text-balance">
            {tx('services.cta.heading', 'نحتاج خدمتين أو أكثر في مشروعك؟', 'Need two or more of these services on your project?')}
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
            {t(
              'نسّق جميع المراحل معنا — من الحفر إلى التدعيم إلى النزح إلى العزل — تحت فريق هندسي واحد. أوفر للوقت، أقل للتعقيد.',
              'Coordinate all stages with us — excavation through shoring through dewatering through waterproofing — under one engineering team. Faster, less complexity.'
            )}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary-solid">
              {cx('common.cta.quote_full', 'اطلب عرض سعر شامل', 'Request a Full Quote')}
              <Arrow className="h-5 w-5" />
            </Link>
            <Link to="/projects" className="btn-outline-light">
              {cx('common.cta.projects', 'شاهد مشاريعنا', 'See Our Projects')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
