import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import tadeemcoLogo from '@/assets/tadeemco-logo-transparent.png';
import { company, serviceIndex } from '@/lib/company-data';

interface FooterProps {
  language: 'ar' | 'en';
}

export const Footer = ({ language }: FooterProps) => {
  const isArabic = language === 'ar';
  const t = (ar: string, en: string) => (isArabic ? ar : en);

  const services = Object.entries(serviceIndex).map(([key, val]) => ({
    key,
    label: isArabic ? val.ar : val.en,
  }));

  const quickLinks = [
    { href: '/about', label: t('من نحن', 'About') },
    { href: '/services', label: t('خدماتنا', 'Services') },
    { href: '/projects', label: t('مشاريعنا', 'Projects') },
    { href: '/equipment', label: t('المعدات', 'Equipment') },
    { href: '/contact', label: t('تواصل معنا', 'Contact') },
  ];

  return (
    <footer className="bg-primary-dark text-white" style={{ backgroundColor: 'hsl(var(--primary-dark))' }}>
      {/* Accent top bar */}
      <div className="h-1.5 bg-accent" />

      <div className="container-width py-16">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ${isArabic ? 'text-right' : 'text-left'}`}>
          {/* Brand block */}
          <div className="lg:col-span-1">
            <div className={`flex items-center gap-3 mb-5 ${isArabic ? 'justify-end' : ''}`}>
              <img src={tadeemcoLogo} alt={company.name.en} className="h-20 w-20 object-contain" />
            </div>
            <h3 className="text-xl font-bold mb-3">{isArabic ? company.name.ar : company.name.en}</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              {isArabic ? company.tagline.ar : company.tagline.en}
            </p>
            <p className="text-white/60 text-sm leading-relaxed mt-3">
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
                  <Link to="/services" className="text-white/80 hover:text-accent transition-colors text-sm">
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
                  <Link to={link.href} className="text-white/80 hover:text-accent transition-colors text-sm">
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
              <li className={`flex items-start gap-2.5 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span className="text-white/80 leading-relaxed">
                  {isArabic ? company.address.ar : company.address.en}
                </span>
              </li>
              <li>
                <div className={`flex items-start gap-2.5 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <Phone className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1" dir="ltr">
                    {company.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:+965${p.replace(/\s/g, '')}`}
                        className="text-white/80 hover:text-accent transition-colors tabular-nums font-medium"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li className={`flex items-center gap-2.5 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${company.email}`} className="text-white/80 hover:text-accent transition-colors">
                  {company.email}
                </a>
              </li>
              <li className={`flex items-center gap-2.5 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Instagram className="h-4 w-4 shrink-0 text-accent" />
                <a
                  href={company.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-accent transition-colors"
                >
                  {company.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-white/60 ${isArabic ? 'md:flex-row-reverse' : ''}`}>
            <p>© {new Date().getFullYear()} {isArabic ? company.name.ar : company.name.en}. {t('جميع الحقوق محفوظة.', 'All rights reserved.')}</p>
            <p className="uppercase tracking-widest">{t('دولة الكويت', 'State of Kuwait')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
