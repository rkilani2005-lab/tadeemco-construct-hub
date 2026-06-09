import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import tadeemcoLogo from '@/assets/tadeemco-logo-transparent.png';
import { company, serviceIndex } from '@/lib/company-data';
import { useCms } from '@/lib/cms-context';

interface FooterProps {
  language: 'ar' | 'en';
}

export const Footer = ({ language }: FooterProps) => {
  const isArabic = language === 'ar';
  const t = (ar: string, en: string) => (isArabic ? ar : en);
  const { settings, services: cmsServices, menu } = useCms();

  const services = (cmsServices.length
    ? cmsServices.filter((s) => s.is_visible).map((s) => ({ key: s.slug, label: isArabic ? s.title_ar : s.title_en }))
    : Object.entries(serviceIndex).map(([key, val]) => ({ key, label: isArabic ? val.ar : val.en })));

  const quickLinks = (menu.length
    ? menu.filter((m) => m.is_visible).map((m) => ({ href: m.path, label: isArabic ? m.label_ar : m.label_en }))
    : [
        { href: '/about', label: t('من نحن', 'About') },
        { href: '/services', label: t('خدماتنا', 'Services') },
        { href: '/projects', label: t('مشاريعنا', 'Projects') },
        { href: '/equipment', label: t('المعدات', 'Equipment') },
        { href: '/contact', label: t('تواصل معنا', 'Contact') },
      ]);

  const brandName = isArabic ? (settings.name.ar || company.name.ar) : (settings.name.en || company.name.en);
  const tagline = isArabic ? (settings.tagline.ar || company.tagline.ar) : (settings.tagline.en || company.tagline.en);
  const address = isArabic ? (settings.address.ar || company.address.ar) : (settings.address.en || company.address.en);
  const phones = settings.phones.length ? settings.phones : company.phones;
  const contactEmail = settings.email || company.email;
  const instagramUrl = settings.instagramUrl || company.instagramUrl;
  const instagramHandle = settings.instagram || company.instagram;

  return (
    <footer className="bg-white text-foreground border-t border-border">
      {/* Accent top bar — orange pops strongly against white */}
      <div className="h-1.5 bg-accent" />

      <div className="container-width py-16">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ${isArabic ? 'text-right' : 'text-left'}`}>
          {/* Brand block */}
          <div className="lg:col-span-1">
            <div className={`flex items-center gap-3 mb-5 ${isArabic ? 'justify-end' : ''}`}>
              <img src={tadeemcoLogo} alt={company.name.en} className="h-20 w-20 object-contain" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">{brandName}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {tagline}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mt-3">
              {isArabic ? company.shortPositioning.ar : company.shortPositioning.en}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm uppercase tracking-widest font-bold text-accent mb-5">
              {t('خدماتنا', 'Our Services')}
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.key}>
                  <Link to="/services" className="text-foreground/80 hover:text-accent transition-colors text-sm">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm uppercase tracking-widest font-bold text-accent mb-5">
              {t('روابط سريعة', 'Quick Links')}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-foreground/80 hover:text-accent transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-widest font-bold text-accent mb-5">
              {t('تواصل معنا', 'Contact')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className={`flex items-start gap-2.5`}>
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span className="text-foreground/80 leading-relaxed">
                  {address}
                </span>
              </li>
              <li>
                <div className={`flex items-start gap-2.5`}>
                  <Phone className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1" dir="ltr">
                    {phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:+965${p.replace(/\s/g, '')}`}
                        className="text-foreground/80 hover:text-accent transition-colors tabular-nums font-medium"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li className={`flex items-center gap-2.5`}>
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${contactEmail}`} className="text-foreground/80 hover:text-accent transition-colors">
                  {contactEmail}
                </a>
              </li>
              <li className={`flex items-center gap-2.5`}>
                <Instagram className="h-4 w-4 shrink-0 text-accent" />
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/80 hover:text-accent transition-colors"
                >
                  {instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-muted-foreground`}>
            <p>© {new Date().getFullYear()} {brandName}. {t('جميع الحقوق محفوظة.', 'All rights reserved.')}</p>
            <p className="uppercase tracking-widest">{t('دولة الكويت', 'State of Kuwait')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
