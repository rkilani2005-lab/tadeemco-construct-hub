import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/PageHeader';
import { seo } from '@/lib/seo-data';
import pumpFleetImg from '@/assets/real/equipment/pump-fleet.jpg';
import dewateringPumpsImg from '@/assets/real/equipment/dewatering-pumps.jpg';
import excavatorImg from '@/assets/real/equipment/excavator.jpg';
import siteOverviewImg from '@/assets/real/equipment/site-overview.jpg';

interface EquipmentProps {
  language: 'ar' | 'en';
}

export const Equipment = ({ language }: EquipmentProps) => {
  const isArabic = language === 'ar';
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  const t = (ar: string, en: string) => (isArabic ? ar : en);

  const categories = [
    {
      id: 'pumps',
      title: t('المضخات المتخصصة', 'Specialized Pumps'),
      image: dewateringPumpsImg,
      desc: t(
        'مجموعة كاملة من المضخات عالية الكفاءة لجميع احتياجات سحب المياه الجوفية — من المشاريع الصغيرة إلى مواقع الحفر العميقة.',
        'A complete range of high-capacity pumps for every dewatering need — from small projects to deep-excavation sites.'
      ),
      items: [
        t('مضخات طرد مركزي عالية السعة', 'High-capacity centrifugal pumps'),
        t('مضخات غاطسة بأقطار ٤، ٦، ٨ بوصات', 'Submersible pumps in 4", 6", 8" diameters'),
        t('مضخات الضغط العالي', 'High-pressure pumps'),
        t('مضخات تفريغ (Vacuum Pumps)', 'Vacuum pumps'),
        t('مضخات احتياطية للاستمرار ٢٤/٧', 'Backup pumps for 24/7 operation'),
      ],
    },
    {
      id: 'hudig',
      title: t('مضخات HÜDIG-CELLE الألمانية', 'HÜDIG-CELLE German Pumps'),
      image: pumpFleetImg,
      desc: t(
        'أسطول من مضخات الشركة الألمانية HÜDIG — المصنع الرائد عالمياً في تقنيات سحب المياه الجوفية منذ أكثر من ٧٠ عاماً. تُعد المعيار الذهبي في المشاريع الكبرى.',
        'A fleet from HÜDIG of Germany — the world-leading manufacturer of groundwater dewatering technology for over 70 years. The gold standard for major projects.'
      ),
      items: [
        t('وحدات تفريغ بسعات متنوعة', 'Vacuum units in various capacities'),
        t('أنظمة الآبار النقطية المتكاملة', 'Complete wellpoint system packages'),
        t('أنابيب شفط وتوزيع محفورة حقلياً', 'Field-drilled suction and distribution piping'),
        t('صيانة دورية وقطع غيار أصلية', 'Regular maintenance and original spare parts'),
        t('نقل وتركيب سريع بين المواقع', 'Fast transport and installation between sites'),
      ],
    },
    {
      id: 'wellpoint',
      title: t('أنظمة الآبار النقطية', 'Wellpoint Systems'),
      image: siteOverviewImg,
      desc: t(
        'أنظمة متكاملة لخفض منسوب المياه الجوفية حول محيط الحفر. الحل الأمثل للمواقع التي تتطلب بيئة عمل جافة تماماً.',
        'Complete systems for lowering groundwater around the excavation perimeter. The optimal solution for sites requiring a fully dry working environment.'
      ),
      items: [
        t('آبار نقطية بأقطار متنوعة', 'Wellpoints in multiple diameters'),
        t('أنابيب رأسية وأفقية للتوزيع', 'Riser and header distribution piping'),
        t('أجهزة مراقبة مستوى المياه (Piezometers)', 'Water-level monitoring piezometers'),
        t('معدات الحفر والتركيب المتخصصة', 'Specialized drilling and installation equipment'),
        t('نقاط تفريغ وفق المعايير البيئية', 'Environmentally compliant discharge points'),
      ],
    },
    {
      id: 'shoring',
      title: t('معدات التدعيم', 'Shoring Equipment'),
      image: excavatorImg,
      desc: t(
        'مجموعة شاملة من معدات التدعيم لضمان سلامة أعمال الحفر وحماية المنشآت المجاورة.',
        'A comprehensive set of shoring materials to ensure excavation safety and protect adjacent structures.'
      ),
      items: [
        t('خوازيق فولاذية (Steel Sheet Piles)', 'Steel sheet piles'),
        t('دعائم فولاذية قابلة للتعديل', 'Adjustable steel struts'),
        t('ألواح خشبية ومعدنية للتدعيم الجانبي', 'Timber and metal sheeting for lateral support'),
        t('أنظمة تدعيم هيدروليكية للمواقع الضيقة', 'Hydraulic shoring systems for confined sites'),
        t('معدات التركيب والإزالة', 'Installation and extraction equipment'),
      ],
    },
  ];

  return (
    <div className={isArabic ? 'font-cairo' : 'font-roboto'}>
      <SEO page={seo.equipment} language={language} />

      <PageHeader
        language={language}
        eyebrow={t('معداتنا', 'Our Equipment')}
        title={t('أسطول ألماني الصنع', 'A German-engineered fleet')}
        subtitle={t(
          'نعتمد على معدات من أفضل الشركات المصنعة حول العالم — يقودها فريق من المهندسين والفنيين ذوي الخبرة الطويلة في أعمال التأسيسات تحت الأرض.',
          "We operate equipment from the world's leading manufacturers, deployed by engineers and technicians with deep experience in substructure works."
        )}
        image={pumpFleetImg}
        imageAlt={t('أسطول مضخات تدعيمكو', 'Tadeemco pump fleet')}
      />

      {/* Brand highlight — HÜDIG */}
      <section className="section-padding-sm bg-primary text-white">
        <div className="container-width">
          <div className={`flex flex-col md:flex-row items-center gap-6 ${isArabic ? 'md:flex-row-reverse' : ''}`}>
            <div className="bg-accent px-6 py-4 flex-shrink-0">
              <p className="text-xs uppercase tracking-widest font-bold opacity-90 mb-1">
                {t('مصنوع في ألمانيا', 'Made in Germany')}
              </p>
              <p className="text-2xl font-black">HÜDIG · Celle</p>
            </div>
            <p className={`text-white/85 text-base md:text-lg leading-relaxed max-w-3xl ${isArabic ? 'text-right' : 'text-left'}`}>
              {t(
                'نعتمد على مضخات HÜDIG-CELLE الألمانية — الرائدة عالمياً في تقنيات سحب المياه الجوفية منذ عام ١٩٥٠. هذه المعدات تُستخدم في أكبر مشاريع البنية التحتية حول العالم.',
                'We operate HÜDIG-CELLE German pumps — a world leader in groundwater dewatering technology since 1950. This equipment is deployed on the largest infrastructure projects worldwide.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.map((cat, idx) => (
        <section key={cat.id} id={cat.id} className={`section-padding scroll-mt-24 ${idx % 2 === 0 ? 'bg-background' : 'bg-muted'}`}>
          <div className="container-width">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              idx % 2 === (isArabic ? 1 : 0) ? '' : 'lg:[&>*:first-child]:order-2'
            }`}>
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-auto shadow-lg aspect-[4/3] object-cover"
                loading="lazy"
              />
              <div className={isArabic ? 'text-right' : 'text-left'}>
                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-5 text-balance">
                  {cat.title}
                </h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 text-pretty">
                  {cat.desc}
                </p>
                <ul className="space-y-2.5">
                  {cat.items.map((item, i) => (
                    <li key={i} className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <span className="flex-shrink-0 w-5 h-5 bg-accent text-white flex items-center justify-center mt-0.5">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-padding bg-muted">
        <div className="container-width text-center">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-5 text-balance">
            {t('المعدات الصحيحة لمشروعك', 'The right equipment for your project')}
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            {t(
              'شاركنا تفاصيل مشروعك ونوع التربة وعمق الحفر، وسنوصي بالمعدات الأنسب.',
              'Share your project details, soil type, and excavation depth — we\'ll recommend the right equipment package.'
            )}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary-solid">
              {t('تحدث مع مهندس', 'Talk to an Engineer')}
              <Arrow className="h-5 w-5" />
            </Link>
            <Link to="/services" className="btn-secondary-solid">
              {t('استعرض الخدمات', 'View Services')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
