import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  fetchSettings, fetchMenu, fetchServices, fetchProjects,
  fetchEquipment, fetchContractors, fetchSeo, fetchContent,
  type SettingsShape, type MenuItem, type ServiceItem, type ProjectItem,
  type EquipmentItem, type ContractorItem, type SeoShape, type ContentValue,
} from './cms';
import { company, projects as staticProjects, serviceIndex, mainContractors } from './company-data';
import { seo as staticSeo } from './seo-data';

// Bundled project images keyed by slug — used as a fallback when a DB project
// row has no uploaded image_url, so existing artwork is preserved.
const staticProjectImage: Record<string, string> = Object.fromEntries(
  staticProjects.map((p) => [p.id, p.image]),
);
export const getProjectImage = (slug: string, dbUrl?: string) =>
  dbUrl && dbUrl.length > 0 ? dbUrl : staticProjectImage[slug] || '';

// ── Static fallback (renders during SSG + before live fetch resolves) ─────────
const fallbackSettings: SettingsShape = {
  name: { ...company.name },
  tagline: { ...company.tagline },
  phones: [...company.phones],
  email: company.email,
  whatsapp: company.whatsapp,
  instagram: company.instagram,
  instagramUrl: company.instagramUrl,
  address: { ...company.address },
  logoUrl: '',
};

const fallbackMenu: MenuItem[] = [
  { path: '/about', label_ar: 'من نحن', label_en: 'About', icon: 'Info', is_visible: true, sort_order: 1 },
  { path: '/services', label_ar: 'خدماتنا', label_en: 'Services', icon: 'Wrench', is_visible: true, sort_order: 2 },
  { path: '/projects', label_ar: 'مشاريعنا', label_en: 'Projects', icon: 'Building2', is_visible: true, sort_order: 3 },
  { path: '/equipment', label_ar: 'المعدات', label_en: 'Equipment', icon: 'Truck', is_visible: true, sort_order: 4 },
  { path: '/contact', label_ar: 'تواصل معنا', label_en: 'Contact', icon: 'Phone', is_visible: true, sort_order: 5 },
];

// Services shown before the live CMS fetch resolves (and in the SSG output).
// This is an explicit list rather than every key of `serviceIndex`, because
// serviceIndex must keep retired slugs (e.g. waterproofing) so historic project
// tags still render a proper label — but a retired service must not appear as a
// service. Keep this in sync with the `services` table.
const fallbackServiceSlugs = ['shoring', 'dewatering', 'excavation'] as const;

const fallbackServices: ServiceItem[] = fallbackServiceSlugs.map(
  (slug, i) => ({
    slug,
    title_ar: serviceIndex[slug].ar,
    title_en: serviceIndex[slug].en,
    tag_ar: '', tag_en: '', description_ar: '', description_en: '',
    when_needed_ar: '', when_needed_en: '', methods_ar: [], methods_en: [],
    icon: slug, image_url: '', is_visible: true, sort_order: i + 1,
  }),
);

const fallbackProjects: ProjectItem[] = staticProjects.map((p, i) => ({
  slug: p.id,
  area_ar: p.area.ar, area_en: p.area.en,
  contractor_ar: p.contractor.ar, contractor_en: p.contractor.en,
  consultant_ar: p.consultant?.ar ?? '', consultant_en: p.consultant?.en ?? '',
  type_ar: p.type.ar, type_en: p.type.en,
  services: [...p.services], image_url: '', is_visible: true, sort_order: i + 1,
}));

const fallbackContractors: ContractorItem[] = mainContractors.map((c, i) => ({
  name_ar: c.ar, name_en: c.en, logo_url: '', is_visible: true, sort_order: i + 1,
}));

const fallbackSeo: Record<string, SeoShape> = Object.fromEntries(
  (['home', 'about', 'services', 'projects', 'equipment', 'contact'] as const).map((k) => {
    const s = staticSeo[k];
    return [s.path, { title: { ...s.title }, description: { ...s.description }, keywords: { ...s.keywords }, ogImage: '' }];
  }),
);

interface CmsData {
  ready: boolean;
  settings: SettingsShape;
  menu: MenuItem[];
  services: ServiceItem[];
  projects: ProjectItem[];
  equipment: EquipmentItem[];
  contractors: ContractorItem[];
  seo: Record<string, SeoShape>;
  content: Record<string, ContentValue>;
}

const initial: CmsData = {
  ready: false,
  settings: fallbackSettings,
  menu: fallbackMenu,
  services: fallbackServices,
  projects: fallbackProjects,
  equipment: [],
  contractors: fallbackContractors,
  seo: fallbackSeo,
  content: {},
};

const CmsContext = createContext<CmsData>(initial);

export const CmsProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<CmsData>(initial);

  useEffect(() => {
    // client-only; SSG render uses the static fallback above (good for SEO)
    let cancelled = false;
    (async () => {
      try {
        const [settings, menu, services, projects, equipment, contractors, seoRows, content] =
          await Promise.all([
            fetchSettings(), fetchMenu(), fetchServices(), fetchProjects(),
            fetchEquipment(), fetchContractors(), fetchSeo(), fetchContent(),
          ]);
        if (cancelled) return;

        const next: CmsData = { ...initial, ready: true };

        if (settings) {
          next.settings = {
            name: { ar: settings.name_ar || company.name.ar, en: settings.name_en || company.name.en },
            tagline: { ar: settings.tagline_ar || '', en: settings.tagline_en || '' },
            phones: settings.phones?.length ? settings.phones : [...company.phones],
            email: settings.email || company.email,
            whatsapp: settings.whatsapp || company.whatsapp,
            instagram: settings.instagram || company.instagram,
            instagramUrl: settings.instagram_url || company.instagramUrl,
            address: { ar: settings.address_ar || '', en: settings.address_en || '' },
            logoUrl: settings.logo_url || '',
          };
        }
        if (menu.length) next.menu = menu as MenuItem[];
        if (services.length) next.services = services as ServiceItem[];
        if (projects.length) next.projects = projects as ProjectItem[];
        if (equipment.length) next.equipment = equipment as EquipmentItem[];
        if (contractors.length) next.contractors = contractors as ContractorItem[];
        if (seoRows.length) {
          next.seo = { ...fallbackSeo };
          for (const r of seoRows) {
            next.seo[r.route] = {
              title: { ar: r.title_ar || '', en: r.title_en || '' },
              description: { ar: r.description_ar || '', en: r.description_en || '' },
              keywords: { ar: r.keywords_ar || '', en: r.keywords_en || '' },
              ogImage: r.og_image_url || '',
            };
          }
        }
        next.content = Object.fromEntries(
          content.map((c) => [c.key, { ar: c.value_ar || '', en: c.value_en || '', field_type: c.field_type }]),
        );

        setData(next);
      } catch {
        // network/RLS issue → keep the static fallback; site still works
        setData((d) => ({ ...d, ready: true }));
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return <CmsContext.Provider value={data}>{children}</CmsContext.Provider>;
};

export const useCms = () => useContext(CmsContext);

// Convenience hook: editable free-form text by key, with a literal fallback so
// pages render correctly even before the row exists in the DB.
export const useText = () => {
  const { content } = useCms();
  return (key: string, lang: 'ar' | 'en', fallback = '') => {
    const v = content[key];
    if (!v) return fallback;
    return (lang === 'ar' ? v.ar : v.en) || fallback;
  };
};
