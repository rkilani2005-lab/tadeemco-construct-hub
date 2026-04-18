import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/PageHeader';
import { seo } from '@/lib/seo-data';
import { IconShoring, IconDewatering, IconWaterproofing, IconExcavation } from '@/components/ServiceIcons';
import dewateringPumpsImg from '@/assets/real/equipment/dewatering-pumps.jpg';
import excavatorImg from '@/assets/real/equipment/excavator.jpg';
import pumpFleetImg from '@/assets/real/equipment/pump-fleet.jpg';
import siteOverviewImg from '@/assets/real/equipment/site-overview.jpg';

interface ServicesProps {
  language: 'ar' | 'en';
}

interface ServiceDetail {
  id: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  tag: string;
  intro: string;
  when: string;
  howItems: string[];
  image: string;
}

export const Services = ({ language }: ServicesProps) => {
  const isArabic = language === 'ar';
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  const t = (ar: string, en: string) => (isArabic ? ar : en);

  const services: ServiceDetail[] = [
    {
      id: 'shoring',
      Icon: IconShoring,
      title: t('التدعيم', 'Shoring'),
      tag: t('تدعيم هندسي للحفريات', 'Engineered excavation support'),
      intro: t(
        'التدعيم هو العملية الهندسية التي تحمي جوانب الحفر من الانهيار وتضمن سلامة العمال والمباني المجاورة. يُعد من أهم المراحل التي تسبق أعمال الأساسات والأدوار السفلية.',
        'Shoring is the engineered process that protects excavation sides from collapse and ensures the safety of workers and adjacent structures. It is one of the most critical stages before foundation and basement works.'
      ),
      when: t(
        'عندما يكون عمق الحفر أكبر من ١.٥ متر، أو عند وجود مبانٍ ومنشآت قريبة من الموقع، أو في التربة غير المستقرة.',
        'When excavation depth exceeds 1.5 meters, when there are nearby buildings or structures, or in unstable soil conditions.'
      ),
      howItems: [
        t('تركيب الخوازيق الفولاذية (Steel Sheet Piles)', 'Installation of steel sheet piles'),
        t('الألواح الخشبية والدعائم الأفقية', 'Timber sheeting and horizontal struts'),
        t('أنظمة التدعيم الهيدروليكية للمواقع الضيقة', 'Hydraulic shoring systems for confined sites'),
        t('تصميم هندسي مخصص لكل موقع', 'Custom engineering design per site'),
        t('حماية المباني والمرافق المجاورة', 'Protection of adjacent buildings and utilities'),
      ],
      image: siteOverviewImg,
    },
    {
      id: 'dewatering',
      Icon: IconDewatering,
      title: t('سحب المياه الجوفية', 'Groundwater Dewatering'),
      tag: t('بيئة عمل جافة وآمنة', 'Safe, dry working conditions'),
      intro: t(
        'سحب المياه الجوفية هو خفض منسوب المياه أسفل سطح الأرض قبل أعمال الحفر العميق، لضمان استقرار الموقع وتسهيل تنفيذ الأساسات والأدوار السفلية بشكل جاف وآمن.',
        "Groundwater dewatering is the lowering of the water table below ground level before deep excavation, to stabilize the site and enable dry, safe execution of foundations and basement works."
      ),
      when: t(
        'في المشاريع التي يتجاوز فيها عمق الحفر منسوب المياه الجوفية — شائع جداً في جميع مناطق الكويت الساحلية وكذلك الداخلية.',
        "On projects where excavation depth exceeds the groundwater table — very common across all of Kuwait's coastal and inland areas."
      ),
      howItems: [
        t('أنظمة الآبار النقطية (Wellpoint Systems)', 'Wellpoint dewatering systems'),
        t('مضخات طرد مركزي عالية السعة', 'High-capacity centrifugal pumps'),
        t('مضخات غاطسة متعددة الأحجام', 'Submersible pumps in multiple sizes'),
        t('مضخات تفريغ HÜDIG-CELLE الألمانية', 'HÜDIG-CELLE German vacuum pumps'),
        t('مراقبة مستمرة لمنسوب المياه وتصريف وفق المعايير البيئية', 'Continuous water-level monitoring and environmentally compliant discharge'),
      ],
      image: pumpFleetImg,
    },
    {
      id: 'waterproofing',
      Icon: IconWaterproofing,
      title: t('العازل المائي', 'Waterproofing'),
      tag: t('حماية طويلة الأمد للمنشآت', 'Long-term structural protection'),
      intro: t(
        'أنظمة العزل المائي تحمي الأساسات والجدران تحت الأرضية من الرطوبة والمياه الجوفية خلال العمر التشغيلي الكامل للمبنى — وهي عملية لا يمكن إصلاحها بعد الانتهاء من البناء.',
        'Waterproofing systems protect foundations and below-grade walls from moisture and groundwater throughout the building\'s operational life — a process that cannot be retrofitted after construction.'
      ),
      when: t(
        'بعد أعمال الحفر والتدعيم وقبل صب الخرسانة للأساسات والأدوار السفلية. العزل الخاطئ في هذه المرحلة يؤدي إلى أضرار لا يمكن إصلاحها بسهولة.',
        'After excavation and shoring, before casting the foundation concrete and basement structure. Incorrect insulation at this stage causes damage that cannot be easily repaired.'
      ),
      howItems: [
        t('أغشية البيتومين المعدلة بالبوليمر', 'Polymer-modified bituminous membranes'),
        t('طبقات العزل السائل (Liquid-Applied)', 'Liquid-applied waterproofing coatings'),
        t('مواد حماية ميكانيكية إضافية', 'Additional mechanical protection layers'),
        t('عزل الفواصل وأماكن العبور (Joint and Penetration Sealing)', 'Joint and penetration sealing'),
        t('فحص الجودة قبل وبعد الصب', 'Quality inspection pre- and post-pour'),
      ],
      image: excavatorImg,
    },
    {
      id: 'excavation',
      Icon: IconExcavation,
      title: t('أعمال الحفر', 'Excavation'),
      tag: t('حفر متخصص لجميع أنواع التربة', 'Specialized excavation for all soil conditions'),
      intro: t(
        'أعمال الحفر تشمل إزالة التربة وإعداد الموقع لبدء أعمال الأساسات. في الكويت، تتطلب التربة الرملية والطبقات الصخرية معدات وخبرة متخصصة.',
        'Excavation covers soil removal and site preparation for foundation works to begin. In Kuwait, the sandy soils and rock layers require specialized equipment and expertise.'
      ),
      when: t(
        'في بداية أي مشروع إنشائي بعد تحديد مستوى الأساسات، وقبل بدء أعمال التدعيم وسحب المياه والعزل.',
        'At the start of every construction project after determining foundation levels, and before shoring, dewatering, and waterproofing works begin.'
      ),
      howItems: [
        t('حفارات هيدروليكية لمختلف الأحجام', 'Hydraulic excavators in various sizes'),
        t('لوادر وحفارات خلفية (Backhoes)', 'Loaders and backhoe excavators'),
        t('حفر الخنادق للمرافق تحت الأرضية', 'Trenching for underground utilities'),
        t('إزالة التربة والردم والدمك', 'Soil removal, backfilling, and compaction'),
        t('تنسيق كامل مع أعمال التدعيم وسحب المياه', 'Full coordination with shoring and dewatering works'),
      ],
      image: dewateringPumpsImg,
    },
  ];

  return (
    <div className={isArabic ? 'font-cairo' : 'font-roboto'}>
      <SEO page={seo.services} language={language} />

      <PageHeader
        language={language}
        eyebrow={t('خدماتنا', 'Our Services')}
        title={t('أربع خدمات. إتقان كامل.', 'Four services. Mastered.')}
        subtitle={t(
          'لا نقدم كل شيء. نقدم بالتحديد ما نجيده: المرحلة الأولى والأكثر أهمية في أي مشروع إنشائي.',
          "We don't do everything. We do exactly what we're best at: the earliest, most critical stage of any construction project."
        )}
        image={siteOverviewImg}
        imageAlt={t('موقع خدمات تدعيمكو', 'Tadeemco services site')}
      />

      {/* Quick nav */}
      <section className="section-padding-sm bg-muted border-b border-border">
        <div className="container-width">
          <div className="flex flex-wrap gap-3 justify-center">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group inline-flex items-center gap-3 bg-white px-5 py-3 border border-border hover:border-accent hover:shadow-md transition-all"
              >
                <span className="w-8 h-8 text-accent flex-shrink-0">
                  <s.Icon className="w-full h-full" />
                </span>
                <span className="font-bold text-foreground">{s.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Per-service deep sections */}
      {services.map((s, idx) => {
        const isImageLeft = idx % 2 === 0;
        return (
          <section
            key={s.id}
            id={s.id}
            className={`section-padding scroll-mt-24 ${idx % 2 === 0 ? 'bg-background' : 'bg-muted'}`}
          >
            <div className="container-width">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start ${
                isImageLeft && !isArabic ? '' :
                !isImageLeft && !isArabic ? 'lg:[&>*:first-child]:order-2' :
                isImageLeft && isArabic ? 'lg:[&>*:first-child]:order-2' : ''
              }`}>
                <div>
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-auto shadow-lg aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                </div>
                <div className={isArabic ? 'text-right' : 'text-left'}>
                  <div className={`flex items-center gap-4 mb-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 text-accent flex-shrink-0">
                      <s.Icon className="w-8 h-8" />
                    </div>
                    <p className="eyebrow !mb-0">{s.tag}</p>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-foreground mb-5 text-balance">
                    {s.title}
                  </h2>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 text-pretty">
                    {s.intro}
                  </p>

                  <div className="bg-secondary/40 border-s-4 border-accent p-5 mb-6">
                    <p className="text-sm uppercase tracking-widest font-bold text-accent mb-2">
                      {t('متى نحتاجها', 'When you need it')}
                    </p>
                    <p className="text-foreground leading-relaxed text-pretty">{s.when}</p>
                  </div>

                  <p className="text-sm uppercase tracking-widest font-bold text-accent mb-3">
                    {t('كيف ننفذها', 'How we deliver')}
                  </p>
                  <ul className={`space-y-2.5 ${isArabic ? 'text-right' : 'text-left'}`}>
                    {s.howItems.map((item, i) => (
                      <li key={i} className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <span className="flex-shrink-0 w-5 h-5 bg-accent text-white flex items-center justify-center mt-0.5">
                          <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        </span>
                        <span className="text-foreground text-pretty">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="section-padding bg-primary text-white">
        <div className="container-width text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-5 text-balance">
            {t('لديك مشروع قادم؟', 'Have an upcoming project?')}
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
            {t(
              'شاركنا تفاصيل مشروعك وسنقدم لك خطة عمل وعرض سعر مفصل.',
              'Share your project details and we\'ll come back with a scope and detailed quote.'
            )}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary-solid">
              {t('اطلب عرض سعر', 'Request a Quote')}
              <Arrow className="h-5 w-5" />
            </Link>
            <Link to="/projects" className="btn-outline-light">
              {t('أعمالنا السابقة', 'Our Previous Work')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
