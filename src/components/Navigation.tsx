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
    <>
      {/* Main Navigation - Dark Navy - Sticky */}
      <nav className="sticky top-0 z-50 bg-primary shadow-md">
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
              
              {/* Contact Information in Mobile Menu */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className={`bg-secondary p-4 rounded-lg ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  <h3 className={`text-lg font-bold text-secondary-foreground mb-4 ${language === 'ar' ? 'font-cairo' : 'font-roboto'}`}>
                    {language === 'ar' ? 'تواصل معنا اليوم' : 'Contact us today'}
                  </h3>
                  <div className="space-y-3 text-secondary-foreground">
                    <div>
                      <p className="font-semibold mb-1">{language === 'ar' ? 'مكتب الكويت:' : 'Kuwait Office:'}</p>
                      <a href="tel:90001662" className="flex items-center gap-2 hover:text-secondary-foreground/80">
                        <Phone className="h-4 w-4" />
                        <span>90001662</span>
                      </a>
                      <a href="tel:92223657" className="flex items-center gap-2 hover:text-secondary-foreground/80 mt-1">
                        <Phone className="h-4 w-4" />
                        <span>92223657</span>
                      </a>
                    </div>
                    <a href="mailto:info@tadeemco.com" className="flex items-center gap-2 hover:text-secondary-foreground/80">
                      <Mail className="h-4 w-4" />
                      <span>info@tadeemco.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Contact Bar - Light Blue - Scrolls Away */}
      <div className="bg-secondary">
        <div className="container-width">
          <div className={`md:flex items-center justify-between gap-2 md:gap-6 py-6 md:py-3 text-xs md:text-sm font-medium ${language === 'ar' ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
            <Link to="/contact#contact-form" className={`block md:inline text-secondary-foreground hover:text-secondary-foreground/80 transition-professional font-medium whitespace-nowrap mb-3 md:mb-0 text-base md:text-sm ${language === 'ar' ? 'font-cairo text-right' : 'font-roboto text-left'}`}>
              {language === 'ar' ? 'تواصل معنا' : 'Contact us'}
            </Link>
            <div className={`flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 ${language === 'ar' ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
              <a href="mailto:info@tadeemco.com" className="flex items-center gap-1 md:gap-2 text-secondary-foreground hover:text-secondary-foreground/80 transition-professional w-full md:w-auto">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>info@tadeemco.com</span>
              </a>
              <a href="tel:90001662" className="flex items-center gap-1 md:gap-2 text-secondary-foreground hover:text-secondary-foreground/80 transition-professional w-full md:w-auto">
                <span className="hidden md:inline">{language === 'ar' ? 'مكتب الكويت:' : 'Kuwait Office:'}</span>
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="whitespace-nowrap">90001662</span>
              </a>
              <a href="tel:92223657" className="flex items-center gap-1 md:gap-2 text-secondary-foreground hover:text-secondary-foreground/80 transition-professional w-full md:w-auto">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="whitespace-nowrap">92223657</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};