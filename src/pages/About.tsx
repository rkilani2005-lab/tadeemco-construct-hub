import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Target, Users, Award, Wrench, CheckCircle2 } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { seo } from '@/lib/seo-data';
import { useCms, useText } from '@/lib/cms-context';
import heroImg from '@/assets/real/hero/hero-coastal-site.jpg';
import teamImg from '@/assets/real/hero/hero-drilling-sunrise.jpg';

interface AboutProps {
  language: 'ar' | 'en';
}

export const About = ({ language }: AboutProps) => {
  const isArabic = language === 'ar';
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  const t = (ar: string, en: string) => (isArabic ? ar : en);
  const { contractors } = useCms();
  const text = useText();
  const tx = (key: string, ar: string, en: string) => text(key, language, t(ar, en));

  const approach = [
    {
      Icon: Target,
      title: tx('about.approach.1.title', 'تخصص عميق', 'Deep Specialization'),
      desc: tx(
        'about.approach.1.desc',
        'أربع خدمات فقط — وكل واحدة منها أتقنها فريقنا بالكامل. لا نتنافس في كل مجال، بل نقود مجالنا.',
        "Just four services — and our team has mastered each of them fully. We don't compete across the board; we lead in our specialty."
      ),
    },
    {
      Icon: Users,
      title: tx('about.approach.2.title', 'فريق هندسي مختص', 'Dedicated Engineering Team'),
      desc: tx(
        'about.approach.2.desc',
        'مهندسون وفنيون ذوو خبرة طويلة في ظروف التربة الكويتية ومنسوب المياه الجوفية المرتفع.',
        "Engineers and technicians with long experience in Kuwaiti soil conditions and the high water table."
      ),
    },
    {
      Icon: Wrench,
      title: tx('about.approach.3.title', 'معدات ألمانية متخصصة', 'Specialized German Equipment'),
      desc: tx(
        'about.approach.3.desc',
        'أسطول كامل من مضخات HÜDIG-CELLE الألمانية وأنظمة التدعيم الصناعية. لا نستأجر — نملك ونصون.',
        "A full fleet of HÜDIG-CELLE German pumps and industrial shoring systems. We own and maintain — we don't rent."
      ),
    },
    {
      Icon: Award,
      title: tx('about.approach.4.title', 'ثقة المقاولين الرئيسيين', "Main Contractors' Trust"),
      desc: tx(
        'about.approach.4.desc',
        'شراكات طويلة الأمد مع أهم شركات المقاولات والمكاتب الاستشارية في الكويت.',
        "Long-standing partnerships with Kuwait's top main contractors and consulting offices."
      ),
    },
  ];

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className={isArabic ? 'font-cairo' : 'font-roboto'}>
      <SEO page={seo.about} language={language} />

      {/* HERO */}
      <section className="relative bg-primary text-white overflow-hidden" style={{ backgroundColor: 'hsl(var(--primary))' }}>
        <div className="absolute inset-0 opacity-20">
          <img src={heroImg} alt="" className="w-full h-full object-cover" loading="eager" />
        </div>
        <div className={`container-width relative z-10 py-16 md:py-24 ${isArabic ? 'text-right' : 'text-left'}`}>
          <p className="eyebrow mb-4 text-accent">{tx('about.hero.eyebrow', 'من نحن', 'About Us')}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-balance max-w-4xl">
            {tx(
              'about.hero.title',
              'متخصصون في أعمال التأسيسات تحت الأرض في الكويت',
              'Substructure specialists in the State of Kuwait'
            )}
          </h1>
          <p className="text-white/85 text-base md:text-lg max-w-3xl leading-relaxed">
            {tx(
              'about.hero.subtitle',
              'شركة تدعيمكو شركة كويتية متخصصة في أعمال الحفر والتدعيم وسحب المياه الجوفية والعازل المائي — أي المراحل الأولى والأكثر أهمية في دورة حياة أي مشروع إنشائي.',
              'Tadeemco is a Kuwaiti specialist in excavation, shoring, groundwater dewatering, and waterproofing — the earliest and most critical phases in any construction project lifecycle.'
            )}
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="section-padding bg-background">
        <div className="container-width">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isArabic ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <div className={isArabic ? 'text-right' : 'text-left'}>
              <p className="eyebrow mb-4">{tx('about.story.eyebrow', 'قصتنا', 'Our Story')}</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6 text-balance">
                {tx('about.story.heading', 'قصة شركة بُنيت على التخصص', 'A company built on focus')}
              </h2>
              <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
                <p>
                  {tx(
                    'about.story.p1',
                    'تأسست تدعيمكو لتقدم خدمة متخصصة واحدة بأعلى مستوى: المراحل الأولى من البناء — أعمال الحفر، تدعيم جوانب الحفر، سحب المياه الجوفية، وعزل الأساسات.',
                    "Tadeemco was founded to do one thing exceptionally well: the earliest stages of construction — excavation, shoring, groundwater dewatering, and foundation waterproofing."
                  )}
                </p>
                <p>
                  {tx(
                    'about.story.p2',
                    'هذه المراحل تحدد نجاح أو فشل المشروع. أي تقصير فيها ينعكس على سلامة الموقع وجودة المنشأة ومدة التنفيذ والتكلفة. لهذا نعمل عليها بمعايير هندسية صارمة ومعدات متخصصة.',
                    "These phases determine a project's success or failure. Any shortcut here affects site safety, structural integrity, timeline, and cost. So we approach them with strict engineering standards and dedicated specialized equipment."
                  )}
                </p>
                <p>
                  {tx(
                    'about.story.p3',
                    'زبائننا ليسوا أصحاب المنازل، بل شركات المقاولات الرئيسية والمكاتب الاستشارية — المهنيون الذين يعرفون الفرق بين المقاول المتخصص والمقاول العام.',
                    "Our customers aren't homeowners — they're main contractors and consulting offices. Professionals who know the difference between a specialist subcontractor and a general one."
                  )}
                </p>
              </div>
            </div>
            <div className="relative">
              <img src={teamImg} alt={t('موقع تدعيمكو', 'Tadeemco site')} className="w-full h-auto shadow-lg aspect-[4/3] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          <div className={`max-w-3xl mb-14 ${isArabic ? 'text-right ms-auto' : 'text-left'}`}>
            <p className="eyebrow mb-4">{tx('about.approach.eyebrow', 'نهجنا', 'Our Approach')}</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 text-balance">
              {tx('about.approach.heading', 'كيف نعمل', 'How we work')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approach.map((a, i) => (
              <div key={i} className="card-industrial p-8 bg-white">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 text-accent mb-5">
                  <a.Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{a.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="section-padding bg-background">
        <div className="container-width">
          <div className={`max-w-3xl mb-12 ${isArabic ? 'text-right ms-auto' : 'text-left'}`}>
            <p className="eyebrow mb-4">{tx('about.partners.eyebrow', 'من يعمل معنا', 'Who Works With Us')}</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 text-balance">
              {tx('about.partners.heading', 'نعمل مع أفضل المقاولين والمكاتب الاستشارية في الكويت', "Partnering with Kuwait's top contractors and consultants")}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {tx(
                'about.partners.intro',
                'المقاولون الرئيسيون الذين اختاروا تدعيمكو كمقاول متخصص لمشاريعهم:',
                'Main contractors who have chosen Tadeemco as their specialist subcontractor:'
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-5">
            {contractors.map((c, i) => (
              <div key={i} className={`flex items-center gap-2 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span className="text-lg font-bold text-foreground">
                  {isArabic ? c.name_ar : c.name_en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white section-padding-sm" style={{ backgroundColor: 'hsl(var(--primary))' }}>
        <div className="container-width text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-5 text-balance">
            {tx('about.cta.heading', 'تريد أن تصبح شريكنا القادم؟', 'Want to be our next partner?')}
          </h2>
          <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
            {tx(
              'about.cta.subtitle',
              'تحدث مع فريقنا الهندسي للحصول على استشارة مجانية وعرض سعر لمشروعك.',
              'Talk to our engineering team for a free consultation and quote for your project.'
            )}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary-solid">
              {t('اطلب عرض سعر', 'Request a Quote')}
              <Arrow className="h-5 w-5" />
            </Link>
            <Link to="/projects" className="btn-outline-light">
              {t('شاهد مشاريعنا', 'See Our Projects')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
