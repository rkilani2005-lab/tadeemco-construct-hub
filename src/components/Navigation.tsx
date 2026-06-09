import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageToggle } from './LanguageToggle';
import { Menu, X, Phone } from 'lucide-react';
import tadeemcoLogo from '@/assets/tadeemco-logo-new.jpg';
import { company } from '@/lib/company-data';
import { useCms } from '@/lib/cms-context';

interface NavigationProps {
  language: 'ar' | 'en';
  onLanguageChange: (lang: 'ar' | 'en') => void;
}

export const Navigation = ({ language, onLanguageChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isArabic = language === 'ar';
  const { menu, settings } = useCms();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = menu
    .filter((m) => m.is_visible)
    .map((m) => ({ href: m.path, label: isArabic ? m.label_ar : m.label_en }));

  const primaryPhone = settings.phones[0] ?? company.phones[0];
  const contactEmail = settings.email || company.email;

  return (
    <>
      {/* Top info strip — hidden on small screens */}
      <div className="hidden md:block bg-primary-dark text-white/90 text-sm" style={{ backgroundColor: 'hsl(var(--primary-dark))' }}>
        <div className="container-width py-2">
          <div className={`flex items-center justify-between gap-4`}>
            <div className="flex items-center gap-5">
              <a href={`tel:+965${primaryPhone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:text-accent transition-colors" dir="ltr">
                <Phone className="h-3.5 w-3.5" />
                <span className="font-semibold tabular-nums">{primaryPhone}</span>
              </a>
              <a href={`mailto:${contactEmail}`} className="hover:text-accent transition-colors">
                {contactEmail}
              </a>
            </div>
            <div className="text-xs uppercase tracking-widest opacity-75">
              {isArabic ? 'لأعمال الحفر والتدعيم وسحب المياه الجوفية' : 'Drilling · Shoring · Dewatering'}
            </div>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <nav className={`sticky top-0 z-50 bg-white transition-shadow ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="container-width">
          <div className={`flex items-center justify-between py-3`}>
            <Link to="/" className="flex items-center gap-3 shrink-0" aria-label={company.name.en}>
              <img src={settings.logoUrl || tadeemcoLogo} alt={isArabic ? company.name.ar : company.name.en} className="h-14 w-auto" />
            </Link>

            {/* Desktop nav */}
            <div className={`hidden md:flex items-center gap-1`}>
              {navItems.map((item) => {
                const active = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`relative px-4 py-2 font-semibold text-base transition-colors ${
                      active ? 'text-accent' : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {item.label}
                    {active && <span className="absolute bottom-0 inset-x-4 h-0.5 bg-accent" />}
                  </Link>
                );
              })}
            </div>

            <div className={`hidden md:flex items-center gap-3`}>
              <LanguageToggle currentLang={language} onLanguageChange={onLanguageChange} />
              <Link to="/contact" className="btn-primary-solid !px-5 !py-2.5 !text-sm">
                {isArabic ? 'عرض سعر' : 'Get Quote'}
              </Link>
            </div>

            {/* Mobile: burger + lang */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageToggle currentLang={language} onLanguageChange={onLanguageChange} />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-foreground hover:text-primary"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-border">
              <div className={`flex flex-col pt-4 ${isArabic ? 'text-right' : 'text-left'}`}>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`py-3 px-2 font-semibold text-lg border-b border-border/40 last:border-0 ${
                      location.pathname === item.href ? 'text-accent' : 'text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link to="/contact" className="btn-primary-solid mt-4 w-full justify-center">
                  {isArabic ? 'اطلب عرض سعر' : 'Request a Quote'}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
