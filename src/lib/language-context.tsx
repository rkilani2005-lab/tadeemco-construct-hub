import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Arabic is the primary audience — matches the corporate profile and default dir=rtl.
  // During SSG, the server-rendered HTML will be in Arabic. On hydration, the user's
  // selection (if any, driven by LanguageToggle) takes over.
  const [language, setLanguage] = useState<Language>('ar');
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside <LanguageProvider />');
  }
  return ctx;
};
