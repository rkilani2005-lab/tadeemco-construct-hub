import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from './LanguageToggle';
import { Menu, X, Phone, Mail, Printer } from 'lucide-react';
import tadeemcoLogo from '@/assets/tadeemco-logo-new.jpg';

interface NavigationProps {
  language: 'ar' | 'en';
  onLanguageChange: (lang: 'ar' | 'en') => void;
}

export const Navigation = ({ language, onLanguageChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = {
    ar: [
      { href: '/contact', label: 'تواصل معنا' },
      { href: '/equipment', label: 'المعدات' },
      { href: '/projects', label: 'مشاريعنا' },
      { href: '/services', label: 'خدماتنا' },
      { href: '/about', label: 'من نحن' },
    ],
    en: [
      { href: '/about', label: 'About Us' },
      { href: '/services', label: 'Services' },
      { href: '/projects', label: 'Projects' },
      { href: '/equipment', label: 'Equipment' },
      { href: '/contact', label: 'Contact' },
    ],
  };

  const items = navigationItems[language];

  return (
    <nav className="sticky top-0 z-50">
      {/* Main Navigation - Dark Navy */}
      <div className="bg-primary shadow-md">
        <div className="container-width">
          <div className="flex items-center justify-between py-4">
            {/* Logo - Far Left */}
            <Link to="/" className="flex items-center">
              <img 
                src={tadeemcoLogo} 
                alt={language === 'ar' ? 'شركة تدعيمكو' : 'Tadeemco Company'} 
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation - Center */}
            <div className={`hidden md:flex items-center gap-8 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
              {items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`font-medium text-lg transition-professional ${
                    location.pathname === item.href
                      ? 'text-white'
                      : 'text-white/80 hover:text-white'
                  } ${language === 'ar' ? 'font-cairo' : 'font-roboto'}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Language Toggle - Far Right */}
            <div className="hidden md:flex items-center">
              <LanguageToggle currentLang={language} onLanguageChange={onLanguageChange} />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <LanguageToggle currentLang={language} onLanguageChange={onLanguageChange} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-white/80"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className={`flex flex-col space-y-4 ${language === 'ar' ? 'items-end' : 'items-start'}`}>
                {items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-medium transition-professional px-4 py-2 ${
                      location.pathname === item.href
                        ? 'text-white bg-white/20 rounded-lg'
                        : 'text-white/80 hover:text-white'
                    } ${language === 'ar' ? 'font-cairo text-right' : 'font-roboto text-left'}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Bar - Light Blue */}
      <div className="bg-secondary">
        <div className="container-width">
          <div className={`flex items-center justify-between gap-2 md:gap-6 py-3 text-xs md:text-sm font-medium ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
            <Link to="/contact#contact-form" className={`text-secondary-foreground hover:text-secondary-foreground/80 transition-professional font-medium whitespace-nowrap ${language === 'ar' ? 'font-cairo' : 'font-roboto'}`}>
              {language === 'ar' ? 'تواصل معنا' : 'Contact us'}
            </Link>
            <div className={`flex items-center gap-2 md:gap-6 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
              <a href="mailto:info@tadeemco.com" className="flex items-center gap-1 md:gap-2 text-secondary-foreground hover:text-secondary-foreground/80 transition-professional">
                <Mail className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">info@tadeemco.com</span>
              </a>
              <a href="tel:90001662" className="flex items-center gap-1 md:gap-2 text-secondary-foreground hover:text-secondary-foreground/80 transition-professional">
                <span className="hidden md:inline">{language === 'ar' ? 'مكتب الكويت:' : 'Kuwait Office:'}</span>
                <Phone className="h-3 w-3 md:h-4 md:w-4" />
                <span className="whitespace-nowrap">90001662</span>
              </a>
              <a href="tel:92223657" className="flex items-center gap-1 md:gap-2 text-secondary-foreground hover:text-secondary-foreground/80 transition-professional">
                <Phone className="h-3 w-3 md:h-4 md:w-4" />
                <span className="whitespace-nowrap">92223657</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};