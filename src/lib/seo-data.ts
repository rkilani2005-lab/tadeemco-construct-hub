// Centralized SEO data per page, bilingual.
// Keyword strategy: target Kuwait-specific construction search terms in both Arabic and English,
// since the Kuwait market searches in both languages. Arabic terms first (primary audience).

import { company } from './company-data';

export interface PageSEO {
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  keywords: { ar: string; en: string };
  path: string;
}

const SITE_URL = 'https://tadeemco.com';
const BRAND = 'شركة تدعيمكو | Tadeemco';

// Arabic keywords — what Kuwait construction buyers actually search for
const arKeywords = [
  'شركة تدعيمكو',
  'تدعيمكو الكويت',
  'نزح المياه الجوفية الكويت',
  'سحب المياه الجوفية',
  'أعمال التدعيم الكويت',
  'شركات التدعيم في الكويت',
  'حفر أساسات الكويت',
  'العازل المائي الكويت',
  'مقاولين أساسات الكويت',
  'شركات المقاولات الكويت',
  'خوازيق معدنية',
  'ويل بوينت الكويت',
  'wellpoint الكويت',
  'دعم جوانب الحفر',
];

// English keywords — for expat project managers, consultants, international contractors
const enKeywords = [
  'Tadeemco',
  'dewatering Kuwait',
  'groundwater dewatering Kuwait',
  'shoring contractor Kuwait',
  'excavation contractor Kuwait',
  'waterproofing Kuwait',
  'wellpoint system Kuwait',
  'steel piling Kuwait',
  'substructure specialist Kuwait',
  'foundation works Kuwait',
  'deep excavation Kuwait',
  'construction dewatering Kuwait',
  'Kuwait main contractor subcontractor',
  'HÜDIG pumps Kuwait',
];

export const seo = {
  siteUrl: SITE_URL,
  brand: BRAND,
  defaultOgImage: '/og-image.jpg',

  home: {
    title: {
      ar: 'تدعيمكو | متخصصون في نزح المياه والتدعيم وأعمال الحفر في الكويت',
      en: 'Tadeemco | Dewatering, Shoring & Excavation Specialists in Kuwait',
    },
    description: {
      ar: 'شركة تدعيمكو - متخصصون في نزح المياه الجوفية، التدعيم، العازل المائي، وأعمال الحفر في دولة الكويت. نعمل مع كبرى شركات المقاولات والمكاتب الاستشارية. اتصل ٩٠٠٠١٦٦٢',
      en: 'Tadeemco — substructure specialists for groundwater dewatering, shoring, waterproofing, and excavation in the State of Kuwait. Trusted by leading main contractors. Call 9000 1662.',
    },
    keywords: {
      ar: arKeywords.join('، '),
      en: enKeywords.join(', '),
    },
    path: '/',
  },

  about: {
    title: {
      ar: 'من نحن | شركة تدعيمكو - خبرة متخصصة في أعمال التأسيسات',
      en: 'About Us | Tadeemco — Substructure Experts in Kuwait',
    },
    description: {
      ar: 'شركة كويتية متخصصة في أعمال التأسيسات تحت الأرض. خبرة طويلة مع المقاولين الرئيسيين والمكاتب الاستشارية في تنفيذ أعقد مراحل البناء.',
      en: 'A Kuwaiti specialist in substructure and early-stage construction works. Long track record with main contractors and consulting offices on the most demanding foundation projects.',
    },
    keywords: {
      ar: 'شركة تدعيمكو، خبرة هندسية، مقاول تأسيسات، الكويت',
      en: 'Tadeemco company, engineering expertise, substructure contractor Kuwait',
    },
    path: '/about',
  },

  services: {
    title: {
      ar: 'خدماتنا | نزح المياه، التدعيم، العازل، الحفر - تدعيمكو الكويت',
      en: 'Our Services | Dewatering, Shoring, Waterproofing, Excavation — Tadeemco Kuwait',
    },
    description: {
      ar: 'أربع خدمات متخصصة: نزح المياه الجوفية، أعمال التدعيم، العازل المائي، وأعمال الحفر. معدات ألمانية وفريق هندسي متخصص.',
      en: 'Four specialized services: groundwater dewatering, shoring works, waterproofing, and excavation. German equipment and a dedicated engineering team.',
    },
    keywords: {
      ar: 'نزح المياه الجوفية، أعمال التدعيم، العازل المائي، أعمال الحفر، ويل بوينت',
      en: 'groundwater dewatering, shoring works, waterproofing, excavation, wellpoint system',
    },
    path: '/services',
  },

  projects: {
    title: {
      ar: 'مشاريعنا | أعمال منجزة في الكويت - تدعيمكو',
      en: 'Our Projects | Completed Works in Kuwait — Tadeemco',
    },
    description: {
      ar: 'مشاريع منجزة لتدعيمكو مع كبرى شركات المقاولات: الغانم، SSH، كي بي الهندسية، أبيات، الأحمدية، وغيرها في جميع مناطق الكويت.',
      en: "Tadeemco's completed projects with Kuwait's leading contractors: Al-Ghanim, SSH International, KB Engineering, Abyat, Al-Ahmadiya, and more, across all Kuwait governorates.",
    },
    keywords: {
      ar: 'مشاريع تدعيمكو، أعمال سابقة، الكويت، مقاولين',
      en: 'Tadeemco projects, completed works, Kuwait contractors',
    },
    path: '/projects',
  },

  equipment: {
    title: {
      ar: 'معداتنا | مضخات HÜDIG ألمانية وأنظمة تدعيم - تدعيمكو',
      en: 'Our Equipment | HÜDIG German Pumps & Shoring Systems — Tadeemco',
    },
    description: {
      ar: 'أسطول كامل من المعدات المتخصصة: مضخات HÜDIG-CELLE الألمانية، أنظمة الآبار النقطية، مضخات غاطسة، ومعدات تدعيم فولاذية.',
      en: 'A complete fleet of specialized equipment: HÜDIG-CELLE German pumps, wellpoint systems, submersible pumps, and steel shoring materials.',
    },
    keywords: {
      ar: 'مضخات HÜDIG، ويل بوينت، معدات تدعيم، مضخات غاطسة',
      en: 'HÜDIG pumps, wellpoint system, shoring equipment, submersible pumps Kuwait',
    },
    path: '/equipment',
  },

  contact: {
    title: {
      ar: 'تواصل معنا | شركة تدعيمكو الكويت - عرض سعر مجاني',
      en: 'Contact Us | Tadeemco Kuwait — Free Quote',
    },
    description: {
      ar: `تواصل مع شركة تدعيمكو للحصول على استشارة مجانية وعرض سعر لمشروعك. ${company.phones.join(' | ')} | ${company.email}`,
      en: `Contact Tadeemco for a free consultation and quote for your project. Phones: ${company.phones.join(' | ')}. Email: ${company.email}.`,
    },
    keywords: {
      ar: 'تواصل تدعيمكو، عرض سعر، استشارة، الكويت',
      en: 'contact Tadeemco, free quote, consultation, Kuwait',
    },
    path: '/contact',
  },

  inquiry: {
    title: {
      ar: 'استفسار | شركة تدعيمكو الكويت',
      en: 'Inquiry | Tadeemco Kuwait',
    },
    description: {
      ar: 'أرسل استفسارك مباشرةً إلى شركة تدعيمكو وسنرد عليك في أقرب وقت.',
      en: 'Submit your inquiry directly to Tadeemco and we will get back to you as soon as possible.',
    },
    keywords: {
      ar: 'استفسار تدعيمكو، نموذج استفسار، الكويت',
      en: 'Tadeemco inquiry, inquiry form, Kuwait',
    },
    path: '/inquiry',
  },
} as const;

// JSON-LD LocalBusiness schema — critical for local search ranking
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': `${SITE_URL}/#organization`,
  name: 'Tadeemco',
  alternateName: 'شركة تدعيمكو',
  description:
    'Kuwaiti specialist in groundwater dewatering, shoring, waterproofing, and excavation works. Serving main contractors and consulting offices across the State of Kuwait.',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.jpg`,
  image: `${SITE_URL}/og-image.jpg`,
  email: company.email,
  telephone: company.phones.map((p) => `+965${p.replace(/\s/g, '')}`),
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Darwaza Building 51, Floor 6, Office 30',
    addressLocality: 'Kuwait City',
    addressCountry: 'KW',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Kuwait',
  },
  sameAs: [company.instagramUrl],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Construction Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Groundwater Dewatering', alternateName: 'نزح المياه الجوفية' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Shoring Works', alternateName: 'أعمال التدعيم' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Waterproofing', alternateName: 'العازل المائي' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Excavation Works', alternateName: 'أعمال الحفر' },
      },
    ],
  },
};
