import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

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
      <Globe className="h-4 w-4" />
      {currentLang === 'ar' ? 'English' : 'العربية'}
    </Button>
  );
};