import { useState, useEffect } from 'react';
import { MessageSquare, Building2, FileText, TrendingUp } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;
const token = () => localStorage.getItem('adminToken');
const headers = () => ({ 'Content-Type': 'application/json', 'x-admin-token': token() });

const Dashboard = () => {
  const [stats, setStats] = useState({ enquiries: 0, properties: 0, blogs: 0, newLeads: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const [eq, pr, bl] = await Promise.all([
          fetch(`${API}/admin/enquiries`, { headers: headers() }).then(r => r.json()),
          fetch(`${API}/admin/properties`, { headers: headers() }).then(r => r.json()),
          fetch(`${API}/admin/blogs/all`, { headers: headers() }).then(r => r.json()),
        ]);
        setStats({
          enquiries: Array.isArray(eq) ? eq.length : 0,
          properties: Array.isArray(pr) ? pr.length : 0,
          blogs: Array.isArray(bl) ? bl.length : 0,
          newLeads: Array.isArray(eq) ? eq.filter(e => e.status === 'new').length : 0,
        });
      } catch { /* DB might not be connected yet */ }
    };
    load();
  }, []);

  const cards = [
    { label: 'Total Enquiries', value: stats.enquiries, icon: MessageSquare, color: 'brand-orange', bg: 'bg-brand-orange/10' },
    { label: 'New Leads', value: stats.newLeads, icon: TrendingUp, color: 'emerald-500', bg: 'bg-emerald-50' },
    { label: 'Properties', value: stats.properties, icon: Building2, color: 'brand-blue', bg: 'bg-brand-blue/10' },
    { label: 'Blog Posts', value: stats.blogs, icon: FileText, color: 'violet-500', bg: 'bg-violet-50' },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(c => (
          <div key={c.label} className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                <c.icon className={`w-5 h-5 text-${c.color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-zinc-900">{c.value}</p>
            <p className="text-sm text-zinc-500 mt-1">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-white rounded-2xl border border-zinc-100 p-8 text-center">
        <p className="text-zinc-400">Welcome to the Adroit CMS. Use the sidebar to manage enquiries, properties, and blog posts.</p>
      </div>
    </div>
  );
};

export default Dashboard;
