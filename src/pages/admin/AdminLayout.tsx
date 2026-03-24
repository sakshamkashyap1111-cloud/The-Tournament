import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Trophy,
  Users,
  Ticket,
  BarChart3,
  FileText,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Tournaments", path: "/admin/tournaments", icon: Trophy },
  { label: "Registrations", path: "/admin/registrations", icon: Users },
  { label: "Coupons", path: "/admin/coupons", icon: Ticket },
  { label: "Leaderboard", path: "/admin/leaderboard", icon: BarChart3 },
  { label: "Blog", path: "/admin/blog", icon: FileText },
];

const AdminLayout = () => {
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary font-display animate-pulse">Loading...</div>
      </div>
    );
  }

  // TODO: Re-enable auth guard after testing
  // if (!user) {
  //   return <Navigate to="/admin/login" replace />;
  // }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link to="/admin" className="font-display text-lg font-bold text-primary uppercase">
            Admin Panel
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-foreground">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-body font-semibold transition-all ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {active && <ChevronRight className="h-3 w-3 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border">
          <p className="text-xs text-muted-foreground font-body truncate mb-2 px-3">{user.email}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full justify-start text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
          <Link to="/">
            <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground mt-1">
              ← Back to Site
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen">
        {/* Mobile topbar */}
        <div className="md:hidden sticky top-0 z-30 bg-card border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="text-foreground">
            <Menu size={22} />
          </button>
          <span className="font-display text-sm font-bold text-primary uppercase">Admin</span>
        </div>

        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
