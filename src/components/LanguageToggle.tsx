import { Button } from '@/components/ui/button';
import kuwaitFlag from '@/assets/kuwait-flag.png';
import ukFlag from '@/assets/uk-flag.png';

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
      <img 
        src={currentLang === 'ar' ? ukFlag : kuwaitFlag}
        alt={currentLang === 'ar' ? 'British Flag' : 'Kuwait Flag'}
        className="w-6 h-4 object-cover rounded-sm"
      />
      <span className="hidden md:inline">{currentLang === 'ar' ? 'English' : 'العربية'}</span>
    </Button>
  );
};