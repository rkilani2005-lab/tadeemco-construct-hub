import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { FloatingContact } from './FloatingContact';
import { LanguageProvider, useLanguage } from '@/lib/language-context';

// Keep the QueryClient outside the component so it's a singleton.
const queryClient = new QueryClient();

// Inner shell reads language from context, so it must live inside LanguageProvider.
const Shell = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <div
      className={language === 'ar' ? 'font-cairo' : 'font-roboto'}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <Navigation language={language} onLanguageChange={setLanguage} />
      <main>
        <Outlet />
      </main>
      <Footer language={language} />
      <FloatingContact language={language} />
    </div>
  );
};

/**
 * Root layout rendered at the top of the route tree. vite-react-ssg supplies
 * HelmetProvider and the Router at a higher level, so we must NOT re-wrap them
 * here or we'll end up with nested providers.
 */
export const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <LanguageProvider>
          <Shell />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
