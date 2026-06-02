import { Outlet, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { AdminAuthProvider, useAdminAuth } from '@/lib/admin-auth';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard, Settings, FileText, Menu as MenuIcon, Wrench,
  Building2, Truck, Users, Search, LogOut, ExternalLink, Loader2,
} from 'lucide-react';

const nav = [
  { to: '/admin', end: true, label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/settings', label: 'Site Settings', icon: Settings },
  { to: '/admin/content', label: 'Page Content', icon: FileText },
  { to: '/admin/menu', label: 'Navigation Menu', icon: MenuIcon },
  { to: '/admin/services', label: 'Services', icon: Wrench },
  { to: '/admin/projects', label: 'Projects', icon: Building2 },
  { to: '/admin/equipment', label: 'Equipment', icon: Truck },
  { to: '/admin/contractors', label: 'Contractors', icon: Users },
  { to: '/admin/seo', label: 'SEO', icon: Search },
];

/** Provider for the whole /admin subtree (login + guarded pages). */
export const AdminRoot = () => (
  <AdminAuthProvider>
    <div className="min-h-screen bg-muted/40 font-roboto" dir="ltr">
      <Sonner />
      <Outlet />
    </div>
  </AdminAuthProvider>
);

/** Guarded layout: redirects non-admins to login, renders sidebar + content. */
export const AdminShell = () => {
  const { session, isAdmin, loading, signOut } = useAdminAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }
  if (!session || !isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-white md:flex">
        <div className="border-b border-border px-5 py-4">
          <p className="text-lg font-black" style={{ color: 'hsl(var(--primary))' }}>Tadeemco</p>
          <p className="text-xs text-muted-foreground">Content Management</p>
        </div>
        <nav className="flex-1 space-y-0.5 p-3">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="space-y-1 border-t border-border p-3">
          <a href="/" target="_blank" rel="noreferrer"
             className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
            <ExternalLink className="h-4 w-4" /> View site
          </a>
          <button
            onClick={async () => { await signOut(); navigate('/admin/login'); }}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border bg-white px-4 py-3 md:hidden">
          <span className="font-black" style={{ color: 'hsl(var(--primary))' }}>Tadeemco CMS</span>
          <Button variant="ghost" size="sm" onClick={async () => { await signOut(); navigate('/admin/login'); }}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        <main className="flex-1 p-4 md:p-8">
          <div className="mx-auto max-w-4xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
