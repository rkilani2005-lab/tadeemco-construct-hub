// Centralized real data for Tadeemco — sourced directly from the company profile.
// Keep Arabic as primary; English is secondary. Used by Home, Projects, Contact, etc.

import project01 from '@/assets/real/projects/project-01.jpg';
import project02 from '@/assets/real/projects/project-02.jpg';
import project03 from '@/assets/real/projects/project-03.jpg';
import project04 from '@/assets/real/projects/project-04.jpg';
import project05 from '@/assets/real/projects/project-05.jpg';
import project06 from '@/assets/real/projects/project-06.jpg';
import project07 from '@/assets/real/projects/project-07.jpg';
import project08 from '@/assets/real/projects/project-08.jpg';
import project09 from '@/assets/real/projects/project-09.jpg';
import project10 from '@/assets/real/projects/project-10.jpg';
import project11 from '@/assets/real/projects/project-11.jpg';

export type ServiceKey = 'shoring' | 'dewatering' | 'waterproofing' | 'excavation';

export interface Bilingual {
  ar: string;
  en: string;
}

export interface Project {
  id: string;
  area: Bilingual;
  contractor: Bilingual;
  consultant?: Bilingual;
  type: Bilingual;
  services: ServiceKey[];
  image: string;
}

export const company = {
  name: { ar: 'شركة تدعيمكو', en: 'Tadeemco' },
  tagline: {
    ar: 'لأعمال الحفر والتدعيم وسحب المياه الجوفية',
    en: 'For Drilling, Shoring & Groundwater Dewatering',
  },
  shortPositioning: {
    ar: 'متخصصون في أعمال التأسيسات تحت الأرض للمقاولين الرئيسيين في دولة الكويت',
    en: 'Substructure specialists for main contractors across the State of Kuwait',
  },
  phones: ['9000 1662', '9222 3657', '9966 7785', '9088 8809'],
  email: 'info@tadeemco.com',
  instagram: '@tadeemco',
  instagramUrl: 'https://instagram.com/tadeemco',
  address: {
    ar: 'مدينة الكويت – مبنى الدروازة 51 – دور 6 – مكتب 30',
    en: 'Kuwait City – Dorwaza Building 51 – Floor 6 – Office 30',
  },
  // Primary WhatsApp number (Kuwait +965)
  whatsapp: '+96590001662',
} as const;

export const serviceIndex: Record<ServiceKey, { ar: string; en: string }> = {
  shoring: { ar: 'التدعيم', en: 'Shoring' },
  dewatering: { ar: 'سحب المياه الجوفية', en: 'Groundwater Dewatering' },
  waterproofing: { ar: 'العازل المائي', en: 'Waterproofing' },
  excavation: { ar: 'أعمال الحفر', en: 'Excavation' },
};

// Real projects — sourced from the corporate profile. Area + main contractor + consultant.
export const projects: Project[] = [
  {
    id: 'audi-showroom',
    area: { ar: 'الشويخ', en: 'Shuwaikh' },
    contractor: { ar: 'شركة الغانم انترناشيونال', en: 'Al-Ghanim International' },
    consultant: { ar: 'مكتب عوهة للاستشارات', en: 'Ooha Consulting Office' },
    type: { ar: 'معرض الأودي للسيارات', en: 'Audi Car Showroom' },
    services: ['dewatering', 'shoring', 'excavation'],
    image: project01,
  },
  {
    id: 'capital-tower',
    area: { ar: 'الأحمدية', en: 'Al-Ahmadiya' },
    contractor: { ar: 'شركة الأحمدية للمقاولات', en: 'Al-Ahmadiya Contracting' },
    type: { ar: 'برج العاصمة', en: 'Capital Tower' },
    services: ['dewatering', 'shoring'],
    image: project02,
  },
  {
    id: 'sakr-diwaniya',
    area: { ar: 'منطقة الصقر', en: 'Al-Sakr District' },
    contractor: { ar: 'شركة المتحدة الأولى', en: 'Al-Muttahida Al-Oula' },
    consultant: { ar: 'SSH International', en: 'SSH International' },
    type: { ar: 'ديوانية الصقر', en: 'Al-Sakr Diwaniya' },
    services: ['shoring', 'excavation'],
    image: project03,
  },
  {
    id: 'abyat-sulaibiya',
    area: { ar: 'الصليبية', en: 'Sulaibiya' },
    contractor: { ar: 'شركة أبيات ميغا ستور', en: 'Abyat Mega Store' },
    type: { ar: 'مشروع أبيات ميغا ستور', en: 'Abyat Mega Store Project' },
    services: ['dewatering', 'shoring'],
    image: project04,
  },
  {
    id: 'yazid-mosque',
    area: { ar: 'السالمية', en: 'Salmiya' },
    contractor: { ar: 'الشركة اللبنانية للروابط', en: 'Rawabit Lebanese Co.' },
    type: { ar: 'مسجد يزيد بن حارثة', en: 'Yazid Ibn Haritha Mosque' },
    services: ['dewatering', 'shoring', 'waterproofing'],
    image: project05,
  },
  {
    id: 'jassar-ice',
    area: { ar: 'الشويخ الصناعية', en: 'Shuwaikh Industrial' },
    contractor: { ar: 'المورد الكويتي', en: 'Al-Mawrid Al-Kuwaiti' },
    type: { ar: 'مصنع ثلج الجسار', en: 'Al-Jassar Ice Factory' },
    services: ['dewatering', 'excavation'],
    image: project06,
  },
  {
    id: 'taysir-building',
    area: { ar: 'الشويخ', en: 'Shuwaikh' },
    contractor: { ar: 'شركة كي بي الهندسية', en: 'KB Engineering' },
    type: { ar: 'مبنى التيسير', en: 'Al-Taysir Building' },
    services: ['shoring', 'excavation'],
    image: project07,
  },
  {
    id: 'sabah-salem',
    area: { ar: 'صباح السالم', en: 'Sabah Al-Salem' },
    contractor: { ar: 'مجموعة نوفل العقارية', en: 'Nofal Real Estate Group' },
    type: { ar: 'مبنى استثماري', en: 'Investment Building' },
    services: ['dewatering', 'shoring'],
    image: project08,
  },
  {
    id: 'khairan-towers',
    area: { ar: 'الخيران', en: 'Khairan' },
    contractor: { ar: 'شركة أوتلوك للمشاريع', en: 'Outlook Projects' },
    type: { ar: 'مشاريع أبراج الكهرباء', en: 'Electricity Tower Projects' },
    services: ['excavation', 'shoring'],
    image: project09,
  },
  {
    id: 'hessa-mubarak',
    area: { ar: 'حصة المبارك', en: 'Hessa Al-Mubarak' },
    contractor: { ar: 'شركة الأحمدية للمقاولات / الضاية', en: 'Al-Ahmadiya Contracting / Dayyah' },
    type: { ar: 'مشروع حصة المبارك', en: 'Hessa Al-Mubarak Project' },
    services: ['dewatering', 'shoring', 'waterproofing'],
    image: project10,
  },
  {
    id: 'rumaithiya',
    area: { ar: 'الرميثية', en: 'Rumaithiya' },
    contractor: { ar: 'شركة فلاش تي ماف للمقاولات', en: 'Flash TMAF Contracting' },
    type: { ar: 'مشروع الرميثية', en: 'Rumaithiya Project' },
    services: ['dewatering', 'shoring'],
    image: project11,
  },
];

// Unique contractor list for the "Who We Work With" strip
export const mainContractors: Bilingual[] = [
  { ar: 'الغانم انترناشيونال', en: 'Al-Ghanim International' },
  { ar: 'SSH International', en: 'SSH International' },
  { ar: 'شركة أبيات', en: 'Abyat' },
  { ar: 'كي بي الهندسية', en: 'KB Engineering' },
  { ar: 'الأحمدية للمقاولات', en: 'Al-Ahmadiya Contracting' },
  { ar: 'مجموعة نوفل العقارية', en: 'Nofal Real Estate Group' },
  { ar: 'المتحدة الأولى', en: 'Al-Muttahida Al-Oula' },
  { ar: 'أوتلوك للمشاريع', en: 'Outlook Projects' },
  { ar: 'فلاش تي ماف', en: 'Flash TMAF' },
  { ar: 'المورد الكويتي', en: 'Al-Mawrid Al-Kuwaiti' },
];
