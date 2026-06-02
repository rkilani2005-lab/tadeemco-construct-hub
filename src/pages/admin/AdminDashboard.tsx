import { Link } from 'react-router-dom';
import { useAdminAuth } from '@/lib/admin-auth';
import {
  Settings, FileText, Menu as MenuIcon, Wrench, Building2, Truck, Users, Search,
} from 'lucide-react';

const cards = [
  { to: '/admin/settings', label: 'Site Settings', desc: 'Company name, phones, email, address, logo, social links.', icon: Settings },
  { to: '/admin/content', label: 'Page Content', desc: 'Headings and paragraphs across the site (AR + EN).', icon: FileText },
  { to: '/admin/menu', label: 'Navigation Menu', desc: 'Menu items, labels, icons, order and visibility.', icon: MenuIcon },
  { to: '/admin/services', label: 'Services', desc: 'The four service cards — titles, descriptions, icons.', icon: Wrench },
  { to: '/admin/projects', label: 'Projects', desc: 'Completed projects, contractors, images.', icon: Building2 },
  { to: '/admin/equipment', label: 'Equipment', desc: 'Fleet and equipment listings.', icon: Truck },
  { to: '/admin/contractors', label: 'Contractors', desc: 'The "who works with us" strip.', icon: Users },
  { to: '/admin/seo', label: 'SEO', desc: 'Per-page titles, descriptions, keywords, OG image.', icon: Search },
];

export const AdminDashboard = () => {
  const { user } = useAdminAuth();
  return (
    <div>
      <h1 className="text-2xl font-black text-foreground">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Signed in as {user?.email}. Choose a section to edit. Changes save to the live database and
        appear on the site immediately; a redeploy bakes them into the static pages for SEO.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.to} to={c.to}
                className="group rounded-lg border border-border bg-white p-5 transition-shadow hover:shadow-md">
            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white">
              <c.icon className="h-5 w-5" />
            </div>
            <h2 className="font-bold text-foreground">{c.label}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
