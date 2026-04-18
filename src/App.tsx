import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { FloatingContact } from './components/FloatingContact';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Projects } from './pages/Projects';
import { Equipment } from './pages/Equipment';
import { Contact } from './pages/Contact';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <div
            className={language === 'ar' ? 'font-cairo' : 'font-roboto'}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            <Navigation language={language} onLanguageChange={setLanguage} />
            <main>
              <Routes>
                <Route path="/" element={<Home language={language} />} />
                <Route path="/about" element={<About language={language} />} />
                <Route path="/services" element={<Services language={language} />} />
                <Route path="/projects" element={<Projects language={language} />} />
                <Route path="/equipment" element={<Equipment language={language} />} />
                <Route path="/contact" element={<Contact language={language} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer language={language} />
            <FloatingContact language={language} />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
