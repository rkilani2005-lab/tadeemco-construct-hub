import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import heroImg from '@/assets/real/hero/hero-drilling-sunrise.jpg';
import coastalSiteImg from '@/assets/real/hero/hero-coastal-site.jpg';
import pumpFleetImg from '@/assets/real/equipment/pump-fleet.jpg';
import { company } from '@/lib/company-data';
import { useCms, useText, getProjectImage } from '@/lib/cms-context';
import { IconShoring, IconDewatering, IconWaterproofing, IconExcavation } from '@/components/ServiceIcons';
import { SEO } from '@/components/SEO';
import { seo } from '@/lib/seo-data';

// Maps a service slug / icon key to its custom SVG icon component.
const SERVICE_ICONS: Record<string, typeof IconShoring> = {
  shoring: IconShoring,
  dewatering: IconDewatering,
  waterproofing: IconWaterproofing,
  excavation: IconExcavation,
};

interface HomeProps {
  language: 'ar' | 'en';
}

export const Home = ({ language }: HomeProps) => {
  const isArabic = language === 'ar';
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  const t = <T,>(ar: T, en: T): T => (isArabic ? ar : en);

  const { settings, services: cmsServices, projects: cmsProjects, contractors, equipment } = useCms();
  const text = useText();
  const tx = (key: string, ar: string, en: string) => text(key, language, t(ar, en));

  // Static service copy doubles as the SSG/SEO fallback; CMS values overlay it
  // per-field when present so the admin can edit titles/taglines/descriptions.
  const baseServices = [
    {
      key: 'shoring',
      title: t('التدعيم', 'Shoring'),
      tag: t('تدعيم هندسي للحفريات', 'Engineered excavation support'),
      desc: t(
        'تركيب الخوازيق المعدنية والألواح الخشبية وفقاً لمعايير هندسية دقيقة لتثبيت جوانب الموقع ومنع انهيار التربة.',
        'Installation of steel piles and timber sheeting per strict engineering standards to stabilize excavation sides and prevent soil collapse.'
      ),
    },
    {
      key: 'dewatering',
      title: t('سحب المياه الجوفية', 'Groundwater Dewatering'),
      tag: t('بيئة عمل جافة وآمنة', 'Safe, dry working conditions'),
      desc: t(
        'خفض منسوب المياه الجوفية قبل أعمال الحفر العميق لضمان استقرار الموقع وتسهيل تنفيذ أعمال الأساسات والأدوار السفلية.',
        'Lowering the groundwater table before deep excavation to stabilize the site and enable safe foundation and basement works.'
      ),
    },
    {
      key: 'waterproofing',
      title: t('العازل المائي', 'Waterproofing'),
      tag: t('حماية طويلة الأمد للمنشآت', 'Long-term protection for structures'),
      desc: t(
        'أنظمة عزل متطورة للأساسات والجدران تحت الأرضية لحماية المنشأة من الرطوبة والمياه الجوفية خلال العمر التشغيلي.',
        'Advanced insulation systems for foundations and below-grade walls, protecting the structure from moisture and groundwater throughout its service life.'
      ),
    },
    {
      key: 'excavation',
      title: t('أعمال الحفر', 'Excavation'),
      tag: t('حفر متخصص لجميع أنواع التربة', 'Specialized excavation for all soil conditions'),
      desc: t(
        'أعمال حفر الأساسات العميقة، الخنادق، والقنوات باستخدام معدات متطورة ومهندسين ذوي خبرة في التربة الكويتية.',
        'Deep foundation excavation, trenching, and channeling with advanced equipment and engineers experienced in Kuwaiti ground conditions.'
      ),
    },
  ];

  const cmsBySlug = Object.fromEntries(cmsServices.map((s) => [s.slug, s]));
  const services = baseServices.map((s) => {
    const c = cmsBySlug[s.key];
    return {
      key: s.key,
      Icon: SERVICE_ICONS[c?.icon || s.key] || SERVICE_ICONS[s.key],
      title: (isArabic ? c?.title_ar : c?.title_en) || s.title,
      tag: (isArabic ? c?.tag_ar : c?.tag_en) || s.tag,
      desc: (isArabic ? c?.description_ar : c?.description_en) || s.desc,
    };
  });
  const serviceTitle = (slug: string) =>
    services.find((s) => s.key === slug)?.title ?? slug;

  const featuredProjects = cmsProjects.slice(0, 6);

  // Phones/contact from CMS settings, falling back to the static company data.
  const phones = settings.phones.length ? settings.phones : company.phones;
  const email = settings.email || company.email;
  const instagram = settings.instagram || company.instagram;
  const instagramUrl = settings.instagramUrl || company.instagramUrl;
  const whatsapp = settings.whatsapp || company.whatsapp;
  const address = isArabic
    ? settings.address.ar || company.address.ar
    : settings.address.en || company.address.en;

  // Equipment highlight bullets: prefer the live equipment list, else a curated
  // static fallback (keeps the SSG HTML populated for SEO).
  const equipmentBullets = equipment.length
    ? equipment.map((e) => (isArabic ? e.name_ar : e.name_en)).filter(Boolean)
    : [
        t('مضخات طرد مركزي عالية الكفاءة', 'High-capacity centrifugal pumps'),
        t('مضخات غاطسة متنوعة الأحجام', 'Submersible pumps in all sizes'),
        t('أنظمة الآبار النقطية (Wellpoint)', 'Wellpoint dewatering systems'),
        t('مضخات تفريغ HÜDIG-CELLE الألمانية', 'HÜDIG-CELLE Germany vacuum pumps'),
        t('معدات تدعيم فولاذية وخشبية', 'Steel and timber shoring materials'),
      ];

  // Hero title: keep the stylized two-line / accent layout by default; if an
  // admin overrides the title in the CMS, render their custom text instead.
  const heroTitleDefault = t('لأعمال الحفر والتدعيم وسحب المياه الجوفية', 'Drilling, Shoring & Groundwater Dewatering');
  const heroTitle = text('home.hero.title', language, heroTitleDefault);
  const heroIsDefault = heroTitle.trim() === heroTitleDefault.trim();

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className={isArabic ? 'font-cairo' : 'font-roboto'}>
      <SEO page={seo.home} language={language} />
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[48vh] md:min-h-[55vh] lg:min-h-[58vh] flex items-center overflow-hidden">
        {/* Full-bleed hero image, no color tint */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt={t('موقع حفر تابع لشركة تدعيمكو', 'Tadeemco drilling site')}
            className="w-full h-full object-cover object-center"
            loading="eager"
            {...({ fetchpriority: 'high' } as any)}
          />
          {/* Subtle dark-only scrim for text legibility — no blue tint.
              Darker on the text side, fading to transparent on the opposite side. */}
          <div
            className={`absolute inset-0 ${
              isArabic
                ? 'bg-gradient-to-l from-black/60 via-black/30 to-transparent'
                : 'bg-gradient-to-r from-black/60 via-black/30 to-transparent'
            }`}
            aria-hidden
          />
        </div>

        <div
          className={`absolute top-0 ${isArabic ? 'left-0' : 'right-0'} h-2 w-48 bg-accent z-10`}
          aria-hidden
        />

        <div className={`container-width relative z-10 py-12 md:py-16 ${isArabic ? 'text-right' : 'text-left'}`}>
          <div className="max-w-4xl">
            <p className="eyebrow mb-5 text-white/90">
              <span className="text-accent">{tx('home.hero.eyebrow', 'شركة تدعيمكو', 'TADEEMCO')}</span>
            </p>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-5 text-balance">
              {heroIsDefault ? (
                isArabic ? (
                  <>
                    لأعمال الحفر<br />
                    والتدعيم وسحب<br />
                    <span className="text-accent">المياه الجوفية</span>
                  </>
                ) : (
                  <>
                    Drilling, Shoring &<br />
                    <span className="text-accent">Groundwater Dewatering</span>
                  </>
                )
              ) : (
                heroTitle
              )}
            </h1>
            <p className="text-white/85 text-base md:text-lg mb-7 max-w-2xl leading-relaxed text-pretty">
              {tx(
                'home.hero.subtitle',
                'متخصصون في أعمال التأسيسات تحت الأرض في دولة الكويت. نعمل مع كبرى شركات المقاولات والمكاتب الاستشارية على تنفيذ أعقد مراحل البناء بأعلى معايير الجودة والسلامة.',
                'Substructure specialists serving the State of Kuwait. We partner with leading main contractors and consulting offices to deliver the most demanding early-stage construction work to the highest quality and safety standards.'
              )}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary-solid">
                {t('اطلب عرض سعر', 'Request a Quote')}
                <Arrow className="h-5 w-5" />
              </Link>
              <a href={`tel:${whatsapp}`} className="btn-outline-light">
                {t('اتصل بنا', 'Call Us')}
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT STRIP ═══════════ */}
      <section className="bg-primary text-white">
        <div className="container-width py-6 md:py-8">
          <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 ${isArabic ? 'md:flex-row-reverse' : ''}`}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:+965${phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-white/90 hover:text-accent transition-colors"
                  dir="ltr"
                >
                  <Phone className="h-4 w-4" />
                  <span className="font-semibold tabular-nums">{phone}</span>
                </a>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-white/90 hover:text-accent transition-colors">
                <Mail className="h-4 w-4" />
                <span>{email}</span>
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/90 hover:text-accent transition-colors">
                <Instagram className="h-4 w-4" />
                <span>{instagram}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES — 4 services only ═══════════ */}
      <section className="section-padding bg-background">
        <div className="container-width">
          <div className={`max-w-3xl mb-16 ${isArabic ? 'text-right ml-auto' : 'text-left'}`}>
            <p className="eyebrow mb-4">{tx('home.services.eyebrow', 'خدماتنا', 'Our Services')}</p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 text-balance">
              {tx('home.services.heading', 'حلول متكاملة لأعمال ما تحت الأرض.', 'End-to-end solutions for every substructure challenge.')}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {tx(
                'home.services.intro',
                'لا نقدم كل شيء. نقدم بالتحديد ما نجيده: المراحل الأولى والأكثر أهمية في أي مشروع إنشائي.',
                "We don't do everything. We do exactly what we're best at: the earliest, most critical stages of any construction project."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <Link key={s.key} to="/services" className="card-service group block">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                  <s.Icon className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-accent text-sm font-semibold mb-4 uppercase tracking-wide">{s.tag}</p>
                <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">{s.desc}</p>
                <span className="btn-ghost-primary">
                  {t('التفاصيل', 'Learn more')}
                  <Arrow className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURED PROJECTS ═══════════ */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 ${isArabic ? 'md:flex-row-reverse' : ''}`}>
            <div className={`max-w-2xl ${isArabic ? 'text-right' : 'text-left'}`}>
              <p className="eyebrow mb-4">{tx('home.projects.eyebrow', 'مشاريع منجزة', 'Completed Projects')}</p>
              <h2 className="text-4xl md:text-5xl font-black text-foreground text-balance">
                {tx('home.projects.heading', 'نعمل مع أفضل المقاولين في الكويت', "Trusted by Kuwait's leading contractors")}
              </h2>
            </div>
            <Link to="/projects" className="btn-secondary-solid whitespace-nowrap">
              {t('جميع المشاريع', 'All Projects')}
              <Arrow className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((p) => (
              <article key={p.slug} className="card-project group">
                <div className="relative aspect-[4/3] overflow-hidden bg-primary/10">
                  <img
                    src={getProjectImage(p.slug, p.image_url)}
                    alt={isArabic ? p.type_ar : p.type_en}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className={`absolute top-4 ${isArabic ? 'right-4' : 'left-4'} bg-accent text-accent-foreground px-3 py-1 text-xs font-bold uppercase tracking-wide`}>
                    {isArabic ? p.area_ar : p.area_en}
                  </div>
                </div>
                <div className={`p-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {isArabic ? p.type_ar : p.type_en}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {t('المقاول الرئيسي:', 'Main Contractor:')}{' '}
                    <span className="text-primary font-semibold">
                      {isArabic ? p.contractor_ar : p.contractor_en}
                    </span>
                  </p>
                  <div className={`flex flex-wrap gap-1.5 ${isArabic ? 'justify-end' : ''}`}>
                    {p.services.map((svcKey) => (
                      <span key={svcKey} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 font-semibold">
                        {serviceTitle(svcKey)}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CONTRACTORS STRIP ═══════════ */}
      <section className="section-padding-sm bg-background border-y border-border">
        <div className="container-width">
          <p className="eyebrow mb-6">{tx('home.contractors.eyebrow', 'من يعمل معنا', 'Who Works With Us')}</p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
            {contractors.map((c, i) => (
              <span key={i} className="text-base md:text-lg font-bold text-muted-foreground hover:text-primary transition-colors">
                {isArabic ? c.name_ar : c.name_en}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ EQUIPMENT ═══════════ */}
      <section className="section-padding bg-background">
        <div className="container-width">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isArabic ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <div className={isArabic ? 'text-right' : 'text-left'}>
              <p className="eyebrow mb-4">{tx('home.equipment.eyebrow', 'معداتنا', 'Our Equipment')}</p>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 text-balance">
                {tx('home.equipment.heading', 'أسطول كامل من المعدات الألمانية المتخصصة', 'A full fleet of specialized German equipment')}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 text-pretty">
                {tx(
                  'home.equipment.intro',
                  'نعتمد على معدات من أفضل الشركات المصنعة حول العالم، يقودها فريق من المهندسين والفنيين ذوي الخبرة الطويلة في أعمال التأسيسات تحت الأرض.',
                  "We operate equipment from the world's leading manufacturers, deployed by a team of engineers and technicians with deep experience in substructure works."
                )}
              </p>
              <ul className="space-y-3 mb-10">
                {equipmentBullets.map((item, i) => (
                  <li key={i} className={`flex items-start gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="flex-shrink-0 w-6 h-6 bg-accent text-white flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4" strokeWidth={3} />
                    </span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/equipment" className="btn-secondary-solid">
                {t('استعرض المعدات', 'View Equipment')}
                <Arrow className="h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <img
                src={pumpFleetImg}
                alt={t('أسطول مضخات تدعيمكو', 'Tadeemco pump fleet')}
                className="w-full h-auto shadow-lg"
              />
              <div className={`absolute -bottom-6 ${isArabic ? '-left-6' : '-right-6'} bg-accent text-accent-foreground p-6 max-w-xs shadow-accent hidden md:block`}>
                <p className="text-sm uppercase tracking-wide font-bold opacity-90">
                  {t('مصنوع في ألمانيا', 'Made in Germany')}
                </p>
                <p className="text-lg font-bold mt-1">HÖDIG-CELLE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={coastalSiteImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ backgroundColor: 'hsl(var(--primary-dark) / 0.92)' }} />
        </div>
        <div className="relative container-width section-padding text-center text-white">
          <p className="eyebrow mb-6 justify-center">{tx('home.cta.eyebrow', 'تواصل معنا', 'Get in Touch')}</p>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-balance">
            {tx('home.cta.heading', 'جاهزون لمشروعكم القادم', 'Ready for your next project')}
          </h2>
          <p className="text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
            {tx(
              'home.cta.subtitle',
              'تحدث مع فريقنا الهندسي للحصول على استشارة مجانية وعرض سعر دقيق لمشروعك.',
              'Talk to our engineering team for a free consultation and accurate quote for your project.'
            )}
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Link to="/contact" className="btn-primary-solid">
              {t('اطلب عرض سعر', 'Request a Quote')}
              <Arrow className="h-5 w-5" />
            </Link>
            <a href={`tel:${whatsapp}`} className="btn-outline-light">
              <Phone className="h-5 w-5" />
              {t('اتصل الآن', 'Call Now')}
            </a>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-white/80 text-sm">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {address}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
