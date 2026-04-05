import { Navigate, Link, Outlet, useLocation } from 'react-router-dom';
import { Package, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/admin/dashboard', icon: Package, label: 'Products' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex min-h-[60vh] items-center justify-center animate-pulse text-muted-foreground">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex min-h-[60vh]">
      {/* Sidebar */}
      <aside className="w-56 border-r border-border bg-card p-4 space-y-2 hidden md:block">
        <h2 className="font-heading text-lg font-semibold mb-4 px-2">Admin</h2>
        {navItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-body transition-colors',
              location.pathname === item.to
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
        <button
          onClick={signOut}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-body text-muted-foreground hover:text-destructive hover:bg-muted w-full transition-colors mt-8"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card flex">
        {navItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              'flex-1 flex flex-col items-center py-2 text-xs font-body',
              location.pathname === item.to ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <item.icon className="h-4 w-4 mb-1" />
            {item.label}
          </Link>
        ))}
        <button onClick={signOut} className="flex-1 flex flex-col items-center py-2 text-xs text-muted-foreground">
          <LogOut className="h-4 w-4 mb-1" />
          Logout
        </button>
      </div>

      {/* Content */}
      <main className="flex-1 p-6 pb-20 md:pb-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
