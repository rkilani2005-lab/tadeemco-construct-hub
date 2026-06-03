// CMS data access layer. Fetch functions return rows from Supabase; the
// CmsProvider (cms-context.tsx) seeds itself from the static fallback in
// company-data/seo-data so the SSG build and first paint always have real
// content for SEO, then overlays the live DB values on the client.

const getSupabase = async () => {
  if (typeof window === 'undefined') return null;
  const { supabase } = await import('@/integrations/supabase/client');
  return supabase;
};

export type Lang = 'ar' | 'en';

export interface SettingsShape {
  name: { ar: string; en: string };
  tagline: { ar: string; en: string };
  phones: string[];
  email: string;
  whatsapp: string;
  instagram: string;
  instagramUrl: string;
  address: { ar: string; en: string };
  logoUrl: string;
}

export interface MenuItem {
  id?: string;
  path: string;
  label_ar: string;
  label_en: string;
  icon: string;
  is_visible: boolean;
  sort_order: number;
}

export interface ServiceItem {
  id?: string;
  slug: string;
  title_ar: string;
  title_en: string;
  tag_ar: string;
  tag_en: string;
  description_ar: string;
  description_en: string;
  icon: string;
  image_url: string;
  is_visible: boolean;
  sort_order: number;
}

export interface ProjectItem {
  id?: string;
  slug: string;
  area_ar: string;
  area_en: string;
  contractor_ar: string;
  contractor_en: string;
  consultant_ar: string;
  consultant_en: string;
  type_ar: string;
  type_en: string;
  services: string[];
  image_url: string;
  is_visible: boolean;
  sort_order: number;
}

export interface EquipmentItem {
  id?: string;
  slug: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  image_url: string;
  is_visible: boolean;
  sort_order: number;
}

export interface ContractorItem {
  id?: string;
  name_ar: string;
  name_en: string;
  logo_url: string;
  is_visible: boolean;
  sort_order: number;
}

export interface SeoShape {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  keywords: { ar: string; en: string };
  ogImage: string;
}

export interface ContentValue {
  ar: string;
  en: string;
  field_type: string;
}

export const pick = (lang: Lang, v?: { ar?: string | null; en?: string | null } | null): string =>
  (lang === 'ar' ? v?.ar : v?.en) || v?.ar || v?.en || '';

// ── Fetchers ────────────────────────────────────────────────────────────────
export async function fetchSettings() {
  const supabase = await getSupabase();
  if (!supabase) return null;
  const { data } = await supabase.from('site_settings').select('*').eq('id', true).maybeSingle();
  return data;
}
export async function fetchMenu() {
  const supabase = await getSupabase();
  if (!supabase) return [];
  const { data } = await supabase.from('menu_items').select('*').eq('is_visible', true).order('sort_order');
  return data ?? [];
}
export async function fetchServices() {
  const supabase = await getSupabase();
  if (!supabase) return [];
  const { data } = await supabase.from('services').select('*').eq('is_visible', true).order('sort_order');
  return data ?? [];
}
export async function fetchProjects() {
  const supabase = await getSupabase();
  if (!supabase) return [];
  const { data } = await supabase.from('projects').select('*').eq('is_visible', true).order('sort_order');
  return data ?? [];
}
export async function fetchEquipment() {
  const supabase = await getSupabase();
  if (!supabase) return [];
  const { data } = await supabase.from('equipment').select('*').eq('is_visible', true).order('sort_order');
  return data ?? [];
}
export async function fetchContractors() {
  const supabase = await getSupabase();
  if (!supabase) return [];
  const { data } = await supabase.from('contractors').select('*').eq('is_visible', true).order('sort_order');
  return data ?? [];
}
export async function fetchSeo() {
  const supabase = await getSupabase();
  if (!supabase) return [];
  const { data } = await supabase.from('seo_meta').select('*');
  return data ?? [];
}
export async function fetchContent() {
  const supabase = await getSupabase();
  if (!supabase) return [];
  const { data } = await supabase.from('site_content').select('*').order('sort_order');
  return data ?? [];
}
