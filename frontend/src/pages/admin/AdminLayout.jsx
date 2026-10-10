import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Building2, FileText, MessageSquare, LogOut, Menu, X, ChevronRight, SlidersHorizontal } from 'lucide-react';

const NAV = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { label: 'Enquiries', icon: MessageSquare, path: '/admin/enquiries' },
  { label: 'Properties', icon: Building2, path: '/admin/properties' },
  { label: 'Blog Posts', icon: FileText, path: '/admin/blogs' },
  { label: 'Testimonials', icon: MessageSquare, path: '/admin/testimonials' },
  { label: 'Filters', icon: SlidersHorizontal, path: '/admin/filters' },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('adminUser') || '{}');

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) navigate('/admin');
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center text-white font-bold text-sm">A</div>
            <span className="text-white font-bold text-lg">Adroit CMS</span>
          </Link>
          <button className="lg:hidden text-zinc-400" onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
        </div>

        <nav className="px-4 py-6 space-y-1">
          {NAV.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? 'bg-brand-orange/10 text-brand-orange' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}>
                <item.icon className="w-5 h-5" />
                {item.label}
                {active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue font-bold text-xs">{(user.username || 'A')[0].toUpperCase()}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium truncate">{user.username}</p>
              <p className="text-xs text-zinc-500">{user.role}</p>
            </div>
            <button onClick={logout} className="text-zinc-500 hover:text-red-400 transition-colors"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-zinc-200 flex items-center px-6 gap-4">
          <button className="lg:hidden text-zinc-600" onClick={() => setSidebarOpen(true)}><Menu className="w-5 h-5" /></button>
          <h2 className="text-lg font-bold text-zinc-900">{NAV.find(n => n.path === location.pathname)?.label || 'Admin'}</h2>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
