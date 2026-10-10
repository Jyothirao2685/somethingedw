import { useState, useEffect } from 'react';
import { Trash2, Phone, Mail, Clock, Filter } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;
const token = () => localStorage.getItem('adminToken');
const headers = () => ({ 'Content-Type': 'application/json', 'x-admin-token': token() });

const statusColors = {
  new: 'bg-blue-50 text-blue-600',
  contacted: 'bg-amber-50 text-amber-600',
  qualified: 'bg-emerald-50 text-emerald-600',
  closed: 'bg-zinc-100 text-zinc-500',
};

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filter, setFilter] = useState('all');

  const load = async () => {
    try {
      const res = await fetch(`${API}/admin/enquiries`, { headers: headers() });
      const data = await res.json();
      if (Array.isArray(data)) setEnquiries(data);
    } catch {}
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await fetch(`${API}/admin/enquiries/${id}/status`, { method: 'PATCH', headers: headers(), body: JSON.stringify({ status }) });
    load();
  };

  const remove = async (id) => {
    if (!confirm('Delete this enquiry?')) return;
    await fetch(`${API}/admin/enquiries/${id}`, { method: 'DELETE', headers: headers() });
    load();
  };

  const filtered = filter === 'all' ? enquiries : enquiries.filter(e => e.status === filter);

  return (
    <div>
      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Filter className="w-4 h-4 text-zinc-400" />
        {['all', 'new', 'contacted', 'qualified', 'closed'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${filter === s ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-500 border border-zinc-200 hover:border-zinc-400'}`}>
            {s} {s !== 'all' && `(${enquiries.filter(e => e.status === s).length})`}
            {s === 'all' && `(${enquiries.length})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-zinc-100 p-12 text-center text-zinc-400">
          No enquiries found.
        </div>
      )}

      <div className="space-y-4">
        {filtered.map(eq => (
          <div key={eq.id} className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-base font-bold text-zinc-900">{eq.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${statusColors[eq.status] || statusColors.new}`}>{eq.status}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{eq.phone}</span>
                  {eq.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{eq.email}</span>}
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{new Date(eq.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                {eq.property_interest && <p className="text-xs text-brand-orange mt-2 font-medium">Interested in: {eq.property_interest}</p>}
                {eq.message && <p className="text-sm text-zinc-600 mt-2 bg-zinc-50 rounded-xl p-3">{eq.message}</p>}
              </div>

              <div className="flex items-center gap-2">
                <select value={eq.status} onChange={e => updateStatus(eq.id, e.target.value)}
                  className="text-xs border border-zinc-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-brand-orange">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="closed">Closed</option>
                </select>
                <button onClick={() => remove(eq.id)} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEnquiries;
