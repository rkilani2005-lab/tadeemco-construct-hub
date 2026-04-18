import type { RouteObject } from 'react-router-dom';
import { Layout } from './components/Layout';
import { useLanguage } from './lib/language-context';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Projects } from './pages/Projects';
import { Equipment } from './pages/Equipment';
import { Contact } from './pages/Contact';
import NotFound from './pages/NotFound';

// Small wrappers that pull language from context and pass it to pages as a prop.
// Keeps page signatures unchanged so Lovable's code generation can keep the
// existing `{ language }: HomeProps` pattern without conflict.
const HomeRoute = () => { const { language } = useLanguage(); return <Home language={language} />; };
const AboutRoute = () => { const { language } = useLanguage(); return <About language={language} />; };
const ServicesRoute = () => { const { language } = useLanguage(); return <Services language={language} />; };
const ProjectsRoute = () => { const { language } = useLanguage(); return <Projects language={language} />; };
const EquipmentRoute = () => { const { language } = useLanguage(); return <Equipment language={language} />; };
const ContactRoute = () => { const { language } = useLanguage(); return <Contact language={language} />; };

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomeRoute /> },
      { path: 'about', element: <AboutRoute /> },
      { path: 'services', element: <ServicesRoute /> },
      { path: 'projects', element: <ProjectsRoute /> },
      { path: 'equipment', element: <EquipmentRoute /> },
      { path: 'contact', element: <ContactRoute /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];

// Default export matches the vite-react-ssg README pattern:
//   import routes from './App'
export default routes;
