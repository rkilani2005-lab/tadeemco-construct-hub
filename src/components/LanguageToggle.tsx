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
    >
      <span className="text-lg">{currentLang === 'ar' ? '🇬🇧' : '🇰🇼'}</span>
      <span className="hidden md:inline">{currentLang === 'ar' ? 'English' : 'العربية'}</span>
    </Button>
  );
};