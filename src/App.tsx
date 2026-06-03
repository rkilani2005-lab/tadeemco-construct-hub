import { Suspense, lazy } from 'react';
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

const AdminRoot = lazy(() => import('./components/admin/AdminShell').then((m) => ({ default: m.AdminRoot })));
const AdminShell = lazy(() => import('./components/admin/AdminShell').then((m) => ({ default: m.AdminShell })));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then((m) => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const SettingsEditor = lazy(() => import('./pages/admin/SettingsEditor').then((m) => ({ default: m.SettingsEditor })));
const ContentEditor = lazy(() => import('./pages/admin/ContentEditor').then((m) => ({ default: m.ContentEditor })));
const MenuEditor = lazy(() => import('./pages/admin/MenuEditor').then((m) => ({ default: m.MenuEditor })));
const ServicesEditor = lazy(() => import('./pages/admin/ServicesEditor').then((m) => ({ default: m.ServicesEditor })));
const ProjectsEditor = lazy(() => import('./pages/admin/ProjectsEditor').then((m) => ({ default: m.ProjectsEditor })));
const EquipmentEditor = lazy(() => import('./pages/admin/EquipmentEditor').then((m) => ({ default: m.EquipmentEditor })));
const ContractorsEditor = lazy(() => import('./pages/admin/ContractorsEditor').then((m) => ({ default: m.ContractorsEditor })));
const SeoEditor = lazy(() => import('./pages/admin/SeoEditor').then((m) => ({ default: m.SeoEditor })));

const adminElement = (element: JSX.Element) => (
  <Suspense fallback={null}>{element}</Suspense>
);

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
  {
    // Admin CMS — client-only subtree, excluded from SSG prerender (see main.tsx).
    // Lives outside the public Layout so it has its own auth shell and no public chrome.
    path: '/admin',
    element: adminElement(<AdminRoot />),
    children: [
      { path: 'login', element: adminElement(<AdminLogin />) },
      {
        element: adminElement(<AdminShell />),
        children: [
          { index: true, element: adminElement(<AdminDashboard />) },
          { path: 'settings', element: adminElement(<SettingsEditor />) },
          { path: 'content', element: adminElement(<ContentEditor />) },
          { path: 'menu', element: adminElement(<MenuEditor />) },
          { path: 'services', element: adminElement(<ServicesEditor />) },
          { path: 'projects', element: adminElement(<ProjectsEditor />) },
          { path: 'equipment', element: adminElement(<EquipmentEditor />) },
          { path: 'contractors', element: adminElement(<ContractorsEditor />) },
          { path: 'seo', element: adminElement(<SeoEditor />) },
        ],
      },
    ],
  },
];

// Default export matches the vite-react-ssg README pattern:
//   import routes from './App'
export default routes;
