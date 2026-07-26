import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { seo } from '@/lib/seo-data';
import { serviceIndex, type ServiceKey } from '@/lib/company-data';
import { useCms, useText, getProjectImage } from '@/lib/cms-context';

interface ProjectsProps {
  language: 'ar' | 'en';
}

type ServiceFilter = ServiceKey | 'all';

export const Projects = ({ language }: ProjectsProps) => {
  const isArabic = language === 'ar';
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  const t = (ar: string, en: string) => (isArabic ? ar : en);
  const text = useText();
  const tx = (key: string, ar: string, en: string) => text(key, language, t(ar, en));
  const cx = (key: string, ar: string, en: string) => text(key, language, t(ar, en));
  const [serviceFilter, setServiceFilter] = useState<ServiceFilter>('all');
  const [areaFilter, setAreaFilter] = useState<string>('all');

  // CMS-backed project list (falls back to static via the provider).
  const { projects: cmsProjects, services: cmsServices } = useCms();
  const projectList = useMemo(
    () => cmsProjects.filter((p) => p.is_visible !== false).map((p) => ({
      id: p.slug,
      area: { ar: p.area_ar, en: p.area_en },
      contractor: { ar: p.contractor_ar, en: p.contractor_en },
      consultant: (p.consultant_ar || p.consultant_en) ? { ar: p.consultant_ar, en: p.consultant_en } : undefined,
      type: { ar: p.type_ar, en: p.type_en },
      services: p.services,
      image: getProjectImage(p.slug, p.image_url),
    })),
    [cmsProjects],
  );
  const serviceLabel = (svc: string) =>
    (serviceIndex as Record<string, { ar: string; en: string }>)[svc]?.[isArabic ? 'ar' : 'en'] ?? svc;

  // Build the unique set of areas from the real project list
  const areas = useMemo(() => {
    const set = new Set<string>();
    projectList.forEach((p) => set.add(isArabic ? p.area.ar : p.area.en));
    return Array.from(set).sort();
  }, [isArabic, projectList]);

  const filtered = useMemo(() => {
    return projectList.filter((p) => {
      const area = isArabic ? p.area.ar : p.area.en;
      const matchesArea = areaFilter === 'all' || area === areaFilter;
      const matchesService = serviceFilter === 'all' || p.services.includes(serviceFilter);
      return matchesArea && matchesService;
    });
  }, [serviceFilter, areaFilter, isArabic, projectList]);

  // Filter chips follow the CMS service list, so retiring a service in the admin
  // removes its chip. Historic project tags still render via serviceLabel below.
  const serviceFilters: { key: ServiceFilter; label: string }[] = [
    { key: 'all', label: tx('projects.filter.all_services', 'جميع الخدمات', 'All Services') },
    ...cmsServices.map((s) => ({
      key: s.slug as ServiceFilter,
      label: (isArabic ? s.title_ar : s.title_en) || s.slug,
    })),
  ];

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className={isArabic ? 'font-cairo' : 'font-roboto'}>
      <SEO page={seo.projects} language={language} />

      {/* HERO */}
      <section className="bg-primary text-white py-16 md:py-20" style={{ backgroundColor: 'hsl(var(--primary))' }}>
        <div className={`container-width ${isArabic ? 'text-right' : 'text-left'}`}>
          <p className="eyebrow mb-4 text-accent">{tx('projects.hero.eyebrow', 'مشاريعنا', 'Our Projects')}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-5 text-balance max-w-4xl">
            {tx('projects.hero.title', 'مشاريع حقيقية. مقاولون رئيسيون حقيقيون.', 'Real projects. Real main contractors.')}
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl leading-relaxed">
            {t(
              'نعمل مع كبرى شركات المقاولات والمكاتب الاستشارية في الكويت على مشاريع سكنية، تجارية، صناعية، وحكومية في جميع المحافظات.',
              "We work with Kuwait's leading main contractors and consulting offices on residential, commercial, industrial, and institutional projects across all governorates."
            )}
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="bg-muted border-b border-border sticky top-[var(--nav-offset,0px)] z-30">
        <div className="container-width py-5 space-y-4">
          <div>
            <p className={`text-xs uppercase tracking-widest font-bold text-muted-foreground mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
              {tx('projects.filter.service', 'حسب الخدمة', 'By Service')}
            </p>
            <div className={"flex flex-wrap gap-2"}>
              {serviceFilters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setServiceFilter(f.key)}
                  className={`px-4 py-2 text-sm font-semibold transition-colors ${
                    serviceFilter === f.key
                      ? 'bg-accent text-white'
                      : 'bg-white border border-border hover:border-accent hover:text-accent'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className={`text-xs uppercase tracking-widest font-bold text-muted-foreground mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
              {tx('projects.filter.area', 'حسب المنطقة', 'By Area')}
            </p>
            <div className={"flex flex-wrap gap-2"}>
              <button
                onClick={() => setAreaFilter('all')}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  areaFilter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-white border border-border hover:border-primary hover:text-primary'
                }`}
              >
                {tx('projects.filter.all_areas', 'جميع المناطق', 'All Areas')}
              </button>
              {areas.map((a) => (
                <button
                  key={a}
                  onClick={() => setAreaFilter(a)}
                  className={`px-4 py-2 text-sm font-semibold transition-colors ${
                    areaFilter === a
                      ? 'bg-primary text-white'
                      : 'bg-white border border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="section-padding bg-background">
        <div className="container-width">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">
                {tx('projects.empty', 'لا توجد مشاريع مطابقة للفلاتر المختارة.', 'No projects match the selected filters.')}
              </p>
              <button
                onClick={() => { setServiceFilter('all'); setAreaFilter('all'); }}
                className="btn-ghost-primary"
              >
                {tx('projects.reset', 'إعادة تعيين الفلاتر', 'Reset filters')}
                <Arrow className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <p className={`text-sm text-muted-foreground mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                {t(`عرض ${filtered.length} من ${projectList.length} مشروع`, `Showing ${filtered.length} of ${projectList.length} projects`)}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <article key={p.id} className="card-project">
                    <div className="relative aspect-[4/3] overflow-hidden bg-primary/10">
                      <img
                        src={p.image}
                        alt={isArabic ? p.type.ar : p.type.en}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className={`absolute top-4 ${isArabic ? 'right-4' : 'left-4'} bg-accent text-white px-3 py-1 text-xs font-bold uppercase tracking-wide flex items-center gap-1.5`}>
                        <MapPin className="h-3 w-3" />
                        {isArabic ? p.area.ar : p.area.en}
                      </div>
                    </div>
                    <div className={`p-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {isArabic ? p.type.ar : p.type.en}
                      </h3>
                      <div className="space-y-1.5 mb-4 text-sm">
                        <p>
                          <span className="text-muted-foreground">{cx('common.label.main_contractor', 'المقاول الرئيسي:', 'Main Contractor:') + ' '}</span>
                          <span className="text-primary font-semibold">{isArabic ? p.contractor.ar : p.contractor.en}</span>
                        </p>
                        {p.consultant && (
                          <p>
                            <span className="text-muted-foreground">{cx('common.label.consultant', 'الاستشاري:', 'Consultant:') + ' '}</span>
                            <span className="text-primary font-semibold">{isArabic ? p.consultant.ar : p.consultant.en}</span>
                          </p>
                        )}
                      </div>
                      <div className={"flex flex-wrap gap-1.5"}>
                        {p.services.map((svc) => (
                          <span key={svc} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 font-semibold">
                            {serviceLabel(svc)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted section-padding-sm border-t border-border">
        <div className="container-width text-center">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-5 text-balance">
            {tx('projects.cta.heading', 'مستعدون لمشروعكم القادم؟', 'Ready for Your Next Project?')}
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            {t(
              'انضموا إلى قائمة المقاولين الرئيسيين الذين يثقون بنا في أعمال التأسيسات تحت الأرض.',
              "Join the main contractors who trust us for their substructure works."
            )}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn-primary-solid">
              {cx('common.cta.quote', 'اطلب عرض سعر', 'Request a Quote')}
              <Arrow className="h-5 w-5" />
            </Link>
            <Link to="/services" className="btn-secondary-solid">
              {cx('common.cta.services', 'خدماتنا', 'Our Services')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
