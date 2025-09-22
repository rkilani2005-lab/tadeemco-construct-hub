import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from './LanguageToggle';
import { Menu, X } from 'lucide-react';
import tadeemcoLogo from '@/assets/tadeemco-logo.png';

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
      { href: '/', label: 'الرئيسية' },
    ],
    en: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About Us' },
      { href: '/services', label: 'Services' },
      { href: '/projects', label: 'Projects' },
      { href: '/equipment', label: 'Equipment' },
      { href: '/contact', label: 'Contact' },
    ],
  };

  const items = navigationItems[language];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
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
          <div className={`hidden md:flex items-center gap-6 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`font-medium transition-professional hover:text-primary ${
                  location.pathname === item.href
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-foreground'
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
            >
              {isMenuOpen ? <X /> : <Menu />}
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
                  className={`font-medium transition-professional hover:text-primary px-4 py-2 ${
                    location.pathname === item.href
                      ? 'text-primary bg-secondary rounded-lg'
                      : 'text-foreground'
                  } ${language === 'ar' ? 'font-cairo text-right' : 'font-roboto text-left'}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};