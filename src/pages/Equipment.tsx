import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { seo } from '@/lib/seo-data';
import { company } from '@/lib/company-data';
import { useCms, useText } from '@/lib/cms-context';
import pumpFleetImg from '@/assets/real/equipment/pump-fleet.jpg';
import dewateringPumpsImg from '@/assets/real/equipment/dewatering-pumps.jpg';
import excavatorImg from '@/assets/real/equipment/excavator.jpg';
import siteImg from '@/assets/real/equipment/site-overview.jpg';

interface EquipmentProps {
  language: 'ar' | 'en';
}

export const Equipment = ({ language }: EquipmentProps) => {
  const isArabic = language === 'ar';
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  const t = (ar: string, en: string) => (isArabic ? ar : en);
  const text = useText();
  const tx = (key: string, ar: string, en: string) => text(key, language, t(ar, en));
  const cx = tx;

  const baseCategories = [
    {
      id: 'vacuum',
      image: pumpFleetImg,
      title: t('مضخات التفريغ HÜDIG-CELLE', 'HÜDIG-CELLE Vacuum Pumps'),
      tag: t('صنع ألماني · قلب أسطولنا', 'German-made · The heart of our fleet'),
      desc: t(
        'مضخات تفريغ صناعية من شركة HÜDIG-CELLE الألمانية، من أعرق الشركات المتخصصة في معدات نزح المياه الجوفية عالمياً. تُستخدم مع أنظمة الآبار النقطية لخفض منسوب المياه بكفاءة عالية.',
        "Industrial vacuum pumps from HÜDIG-CELLE Germany — one of the world's most established manufacturers specialized in dewatering equipment. Deployed with wellpoint systems for high-efficiency water-table lowering."
      ),
      specs: isArabic
        ? ['قدرة شفط عالية', 'عمل مستمر ٢٤/٧', 'محركات ديزل موثوقة', 'محمولة على عجلات للتنقل السريع', 'صيانة منتظمة داخلياً']
        : ['High suction capacity', 'Continuous 24/7 operation', 'Reliable diesel engines', 'Wheel-mounted for rapid mobilization', 'Maintained in-house on a regular schedule'],
    },
    {
      id: 'centrifugal',
      image: dewateringPumpsImg,
      title: t('مضخات الطرد المركزي', 'Centrifugal Pumps'),
      tag: t('للتدفقات العالية', 'For high-flow applications'),
      desc: t(
        'مضخات طرد مركزي عالية الكفاءة للتعامل مع التدفقات الكبيرة من المياه الجوفية والسطحية، في أعمال الحفر العميق والمواقع القريبة من البحر.',
        'High-efficiency centrifugal pumps for handling large flows of groundwater and surface water, used on deep excavations and coastal sites.'
      ),
      specs: isArabic
        ? ['تدفق يصل إلى مئات الأمتار المكعبة/الساعة', 'متوفرة بقدرات متعددة', 'تعمل في ظروف مناخية قاسية', 'قابلة للتكوين في سلاسل متعددة']
        : ['Flow rates up to hundreds of cubic meters per hour', 'Multiple capacity options', 'Operates in harsh weather conditions', 'Configurable in multi-pump arrays'],
    },
    {
      id: 'submersible',
      image: siteImg,
      title: t('المضخات الغاطسة', 'Submersible Pumps'),
      tag: t('حلول نزح دقيقة', 'Precision dewatering solutions'),
      desc: t(
        'مضخات غاطسة بأحجام وقدرات متنوعة للمواقف التي تحتاج إلى نزح نقطي أو معالجة مياه محدودة المساحة — كالحفريات الضيقة والأدوار السفلية.',
        'Submersible pumps in a range of sizes and capacities for situations that call for point-source dewatering or confined-space water handling — narrow excavations, basement cavities, etc.'
      ),
      specs: isArabic
        ? ['أحجام متعددة من الصغيرة إلى الكبيرة', 'تشغيل كهربائي صامت', 'مقاومة للملوحة (المياه الجوفية الكويتية)', 'سهلة التركيب والاسترجاع']
        : ['Multiple sizes from small to large', 'Silent electric operation', 'Salt-water resistant (Kuwaiti groundwater)', 'Easy installation and retrieval'],
    },
    {
      id: 'shoring',
      image: excavatorImg,
      title: t('معدات التدعيم', 'Shoring Equipment'),
      tag: t('فولاذ صناعي ثقيل', 'Heavy industrial steel'),
      desc: t(
        'أنظمة تدعيم فولاذية ومواد تسنيد لحماية جوانب الحفريات العميقة ومنع انهيار التربة، مع دعامات قابلة للتعديل وألواح تدعيم تناسب مختلف أنواع التربة.',
        'Steel shoring systems and shielding materials to protect deep excavation sides and prevent soil collapse. Adjustable struts and shoring panels suited to various soil conditions.'
      ),
      specs: isArabic
        ? ['دعامات فولاذية قابلة للتعديل', 'ألواح تدعيم معدنية', 'دعامات هيدروليكية للحفريات العميقة', 'قوالب خرسانة مسلحة', 'معدات حماية جانبية للمباني المجاورة']
        : ['Adjustable steel struts', 'Metal shoring panels', 'Hydraulic struts for deep excavations', 'Reinforced concrete formwork', 'Lateral-protection equipment for adjacent structures'],
    },
  ];

  // Overlay editable CMS fields (title, description, image) onto the rich static
  // categories by position. Specs and tag stay as fallback (not modeled in CMS).
  const { equipment: cmsEquipment } = useCms();
  const visibleEquipment = cmsEquipment.filter((e) => e.is_visible !== false);
  const categories = baseCategories.map((c, i) => {
    const o = visibleEquipment[i];
    if (!o) return c;
    const cmsSpecs = isArabic ? o.specs_ar : o.specs_en;
    const cmsTag = isArabic ? o.tag_ar : o.tag_en;
    return {
      ...c,
      title: (isArabic ? o.name_ar : o.name_en) || c.title,
      desc: (isArabic ? o.description_ar : o.description_en) || c.desc,
      tag: cmsTag || c.tag,
      specs: (cmsSpecs && cmsSpecs.length) ? cmsSpecs : c.specs,
      image: o.image_url || c.image,
    };
  });

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className={isArabic ? 'font-cairo' : 'font-roboto'}>
      <SEO page={seo.equipment} language={language} />

      {/* HERO */}
      <section className="bg-primary text-white py-16 md:py-20" style={{ backgroundColor: 'hsl(var(--primary))' }}>
        <div className={`container-width ${isArabic ? 'text-right' : 'text-left'}`}>
          <p className="eyebrow mb-4 text-accent">{tx('equipment.hero.eyebrow', 'معداتنا', 'Our Equipment')}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-balance max-w-4xl">
            {tx('equipment.hero.title', 'أسطول متخصص، ليس مستأجراً', 'A specialist fleet, not a rental shop')}
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl leading-relaxed">
            {t(
              'نملك معداتنا ونصونها داخلياً. هذا يعني جاهزية فورية لأي مشروع، تحكماً كاملاً بجدول التشغيل، وعمراً تشغيلياً أطول لأننا نعرف كل قطعة بالتفصيل.',
              'We own our equipment and maintain it in-house. That means instant availability for any project, full control over the operational schedule, and longer service life because we know every piece in detail.'
            )}
          </p>
        </div>
      </section>

      {/* FEATURED: HÜDIG-CELLE callout */}
      <section className="bg-accent text-white section-padding-sm">
        <div className={`container-width flex flex-col md:flex-row items-center gap-8 ${isArabic ? 'text-right' : ''}`}>
          <div className="md:flex-1">
            <p className="text-white/90 text-xs uppercase tracking-widest font-bold mb-2">
              {tx('equipment.lead_label', 'الشركة المصنعة الرئيسية', 'Lead Manufacturer')}
            </p>
            <p className="font-black text-3xl md:text-4xl mb-3">HÜDIG · CELLE, GERMANY</p>
            <p className="text-white/90 text-lg leading-relaxed max-w-2xl">
              {t(
                'أسطولنا يعتمد بشكل رئيسي على مضخات HÜDIG-CELLE — من أكثر الشركات الألمانية المتخصصة خبرةً في معدات نزح المياه الجوفية في العالم.',
                'Our fleet is primarily HÜDIG-CELLE — one of the most experienced specialist German manufacturers of dewatering equipment in the world.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      {categories.map((c, i) => {
        const alt = i % 2 === 0;
        return (
          <section
            key={c.id}
            className={`section-padding ${i % 2 === 0 ? 'bg-background' : 'bg-muted'}`}
          >
            <div className="container-width">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isArabic ? (alt ? '' : 'lg:[&>*:first-child]:order-2') : (alt ? '' : 'lg:[&>*:first-child]:order-2')}`}>
                <div className={isArabic ? 'text-right' : 'text-left'}>
                  <p className="text-accent text-sm font-bold uppercase tracking-wide mb-2">{c.tag}</p>
                  <h2 className="text-3xl md:text-4xl font-black text-foreground mb-5 text-balance">{c.title}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-7 text-pretty">{c.desc}</p>
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {tx('equipment.specs_label', 'المواصفات الرئيسية', 'Key Specifications')}
                  </h3>
                  <ul className="space-y-2.5">
                    {c.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 bg-accent text-white flex items-center justify-center mt-0.5">
                          <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        </span>
                        <span className="text-foreground">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-auto aspect-[4/3] object-cover shadow-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="bg-primary text-white section-padding-sm" style={{ backgroundColor: 'hsl(var(--primary))' }}>
        <div className="container-width text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-5 text-balance">
            {tx('equipment.cta.heading', 'تحتاج معدات متخصصة لمشروعك؟', 'Need specialized equipment for your project?')}
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
            {t(
              'أسطولنا جاهز وفريقنا الهندسي مستعد لتحديد المعدات المناسبة لظروف موقعك.',
              "Our fleet is ready and our engineering team is on hand to spec the right equipment for your site conditions."
            )}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary-solid">
              {cx('common.cta.quote', 'اطلب عرض سعر', 'Request a Quote')}
              <Arrow className="h-5 w-5" />
            </Link>
            <a href={`tel:${company.whatsapp}`} className="btn-outline-light">
              <Phone className="h-5 w-5" />
              {cx('common.cta.call', 'اتصل بنا', 'Call Us')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
