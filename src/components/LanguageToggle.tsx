import { Button } from '@/components/ui/button';

interface LanguageToggleProps {
  currentLang: 'ar' | 'en';
  onLanguageChange: (lang: 'ar' | 'en') => void;
}

export const LanguageToggle = ({ currentLang, onLanguageChange }: LanguageToggleProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onLanguageChange(currentLang === 'ar' ? 'en' : 'ar')}
      className="flex items-center gap-2 text-sm font-medium"
      aria-label={currentLang === 'ar' ? 'Switch to English' : 'Switch to Arabic'}
    >
      <span className="text-xl leading-none" role="img" aria-label={currentLang === 'ar' ? 'British Flag' : 'Kuwait Flag'}>
        {currentLang === 'ar' ? '🇬🇧' : '🇰🇼'}
      </span>
      <span className="hidden md:inline">{currentLang === 'ar' ? 'English' : 'العربية'}</span>
    </Button>
  );
};