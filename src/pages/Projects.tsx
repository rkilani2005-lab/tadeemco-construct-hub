import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building2, ArrowRight, ArrowLeft } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { PageHeader } from '@/components/PageHeader';
import { seo } from '@/lib/seo-data';
import { projects, serviceIndex, type ServiceKey } from '@/lib/company-data';
import coastalImg from '@/assets/real/hero/hero-coastal-site.jpg';

interface ProjectsProps {
  language: 'ar' | 'en';
}

type FilterKey = 'all' | ServiceKey;

export const Projects = ({ language }: ProjectsProps) => {
  const isArabic = language === 'ar';
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  const t = (ar: string, en: string) => (isArabic ? ar : en);

  const [filter, setFilter] = useState<FilterKey>('all');

  const filters: { key: FilterKey; label: string }[] = [
    { key: 'all', label: t('جميع المشاريع', 'All Projects') },
    { key: 'shoring', label: t(serviceIndex.shoring.ar, serviceIndex.shoring.en) },
    { key: 'dewatering', label: t(serviceIndex.dewatering.ar, serviceIndex.dewatering.en) },
    { key: 'waterproofing', label: t(serviceIndex.waterproofing.ar, serviceIndex.waterproofing.en) },
    { key: 'excavation', label: t(serviceIndex.excavation.ar, serviceIndex.excavation.en) },
  ];

  const visible = useMemo(() => {
    if (filter === 'all') return projects;
    return projects.filter((p) => p.services.includes(filter));
  }, [filter]);

  return (
    <div className={isArabic ? 'font-cairo' : 'font-roboto'}>
      <SEO page={seo.projects} language={language} />

      <PageHeader
        language={language}
        eyebrow={t('مشاريعنا', 'Our Projects')}
        title={t('أعمال منجزة لدى كبرى المقاولين', "Work delivered for Kuwait's leading contractors")}
        subtitle={t(
          'كل مشروع في هذه القائمة تم تنفيذه مع شركة مقاولات رئيسية أو مكتب استشاري معروف في الكويت — لا مشاريع وهمية، لا أمثلة افتراضية.',
          'Every project listed here was delivered alongside a well-known main contractor or consulting office in Kuwait — no fictional projects, no illustrative examples.'
        )}
        image={coastalImg}
        imageAlt={t('موقع مشاريع تدعيمكو', 'Tadeemco project site')}
      />

      {/* Filter bar */}
      <section className="section-padding-sm bg-background border-b border-border sticky top-[var(--nav-height,0px)] z-30">
        <div className="container-width">
          <div className={`flex flex-wrap gap-2 ${isArabic ? 'justify-end' : 'justify-start'}`}>
            {filters.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-4 py-2 text-sm font-bold transition-all ${
                    active
                      ? 'bg-accent text-accent-foreground shadow-accent'
                      : 'bg-secondary text-secondary-foreground hover:bg-accent/10'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <p className={`mt-4 text-sm text-muted-foreground ${isArabic ? 'text-right' : 'text-left'}`}>
            {t(
              `يعرض ${visible.length} من أصل ${projects.length} مشروع`,
              `Showing ${visible.length} of ${projects.length} projects`
            )}
          </p>
        </div>
      </section>

      {/* Project grid */}
      <section className="section-padding bg-muted">
        <div className="container-width">
          {visible.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">
              {t('لا توجد مشاريع ضمن هذا التصنيف حالياً.', 'No projects in this category yet.')}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map((p) => (
                <article key={p.id} className="card-project group">
                  <div className="relative aspect-[4/3] overflow-hidden bg-primary/10">
                    <img
                      src={p.image}
                      alt={isArabic ? p.type.ar : p.type.en}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className={`absolute top-3 ${isArabic ? 'right-3' : 'left-3'} bg-accent text-accent-foreground px-2.5 py-1 text-xs font-bold uppercase tracking-wide`}>
                      {isArabic ? p.area.ar : p.area.en}
                    </div>
                  </div>
                  <div className={`p-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      {isArabic ? p.type.ar : p.type.en}
                    </h3>
                    <div className={`flex items-start gap-2 text-sm text-muted-foreground mb-1.5 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                      <span>{isArabic ? p.area.ar : p.area.en}</span>
                    </div>
                    <div className={`flex items-start gap-2 text-sm text-muted-foreground mb-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <Building2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                      <span className="text-pretty">
                        <span className="text-foreground font-semibold">
                          {isArabic ? p.contractor.ar : p.contractor.en}
                        </span>
                        {p.consultant && (
                          <span className="block text-xs mt-0.5 opacity-80">
                            {t('استشاري:', 'Consultant:')}{' '}
                            {isArabic ? p.consultant.ar : p.consultant.en}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className={`flex flex-wrap gap-1.5 ${isArabic ? 'justify-end' : ''}`}>
                      {p.services.map((svcKey) => (
                        <span key={svcKey} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 font-semibold">
                          {isArabic ? serviceIndex[svcKey].ar : serviceIndex[svcKey].en}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-width text-center">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-5 text-balance">
            {t('مشروعك القادم هنا', 'Your next project belongs here')}
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            {t(
              'نحن جاهزون للانضمام إلى قائمة المقاولين الرئيسيين الذين نعمل معهم — ننفذ باحترافية، في الوقت المحدد، بأعلى معايير السلامة.',
              "We're ready to join the roster of main contractors we work with — delivered professionally, on schedule, to the highest safety standards."
            )}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary-solid">
              {t('اطلب عرض سعر', 'Request a Quote')}
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
