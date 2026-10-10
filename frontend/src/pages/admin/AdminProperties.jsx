import { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, EyeOff, Home, Star, X, Save, Loader2 } from 'lucide-react';
import ImageUpload from '../../components/admin/ImageUpload';

const API = import.meta.env.VITE_API_URL;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const token = () => localStorage.getItem('adminToken');
const headers = () => ({ 'Content-Type': 'application/json', 'x-admin-token': token() });

// Helper to show local vs remote images
const getFullUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${BASE_URL}${url}`;
};

const empty = {
  slug: '', title: '', location: '', price: '', price_per_sqft: '', status: '', type: '', category: 'residential',
  image: '', gallery: [], developer: '', configurations: [], area: '', floors: '',
  possession: '', rera: '', highlights: [], about: '', priority: 0, show_on_home: false, is_active: true,
  meta_title: '', meta_description: '', meta_keywords: '',
};

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);

  const load = async () => {
    try {
      const [propRes, locRes, catRes] = await Promise.all([
        fetch(`${API}/admin/properties`, { headers: headers() }),
        fetch(`${API}/filters/locations`),
        fetch(`${API}/filters/categories`)
      ]);

      const props = await propRes.json();
      const locs = await locRes.json();
      const cats = await catRes.json();

      if (Array.isArray(props)) setProperties(props);
      if (Array.isArray(locs)) setLocations(locs);
      if (Array.isArray(cats)) setCategories(cats);
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  useEffect(() => { load(); }, []);

  const toggle = async (id, field) => {
    await fetch(`${API}/admin/properties/${id}/toggle`, { method: 'PATCH', headers: headers(), body: JSON.stringify({ field }) });
    load();
  };

  const updatePriority = async (id, priority) => {
    await fetch(`${API}/admin/properties/${id}/priority`, { method: 'PATCH', headers: headers(), body: JSON.stringify({ priority: parseInt(priority) }) });
    load();
  };

  const remove = async (id) => {
    if (!confirm('Delete this property permanently?')) return;
    await fetch(`${API}/admin/properties/${id}`, { method: 'DELETE', headers: headers() });
    load();
  };

  const saveProperty = async (e) => {
    e.preventDefault();
    setSaving(true);
    const isNew = !editing.id;
    const url = isNew ? `${API}/admin/properties` : `${API}/admin/properties/${editing.id}`;
    const method = isNew ? 'POST' : 'PUT';
    // Parse comma-separated fields into arrays
    const body = {
      ...editing,
      gallery: typeof editing.gallery === 'string' ? editing.gallery.split(',').map(s => s.trim()).filter(Boolean) : editing.gallery,
      configurations: typeof editing.configurations === 'string' ? editing.configurations.split(',').map(s => s.trim()).filter(Boolean) : editing.configurations,
      highlights: typeof editing.highlights === 'string' ? editing.highlights.split(',').map(s => s.trim()).filter(Boolean) : editing.highlights,
    };
    try {
      await fetch(url, { method, headers: headers(), body: JSON.stringify(body) });
      setEditing(null);
      load();
    } catch { alert('Failed to save'); }
    setSaving(false);
  };

  const setField = (key, val) => setEditing(p => ({ ...p, [key]: val }));

  // ─── FORM MODAL ───
  if (editing) return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-zinc-900">{editing.id ? 'Edit Property' : 'Add New Property'}</h3>
        <button onClick={() => setEditing(null)} className="text-zinc-400 hover:text-zinc-900"><X className="w-5 h-5" /></button>
      </div>
      <form onSubmit={saveProperty} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['title', 'Title *', 'text', true], ['slug', 'Slug *', 'text', true],
            ['status', 'Status', 'text'], ['type', 'Type', 'text'], ['developer', 'Developer', 'text'],
            ['area', 'Area', 'text'], ['floors', 'Floors', 'text'], ['possession', 'Possession', 'text'],
            ['rera', 'RERA', 'text'],
          ].map(([key, label, type, req]) => (
            <div key={key}>
              <label className="text-xs font-medium text-zinc-500 mb-1 block">{label}</label>
              <input type={type} required={req} value={editing[key] || ''} onChange={e => setField(key, e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors" />
            </div>
          ))}

          <div>
            <label className="text-xs font-medium text-zinc-500 mb-1 block">Location</label>
            <select value={editing.location || ''} onChange={e => setField('location', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors">
              <option value="">Select Location</option>
              {locations.map(loc => (
                <option key={loc.id} value={loc.name}>{loc.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-500 mb-1 block">Category</label>
            <select value={editing.category || 'residential'} onChange={e => setField('category', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors">
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-100">
          <ImageUpload
            label="Main Project Image"
            currentImage={editing.image}
            onUpload={(url) => setField('image', url)}
          />
          <ImageUpload
            label="Project Gallery"
            currentImage={editing.gallery}
            multiple={true}
            onUpload={(urls) => setField('gallery', Array.isArray(urls) ? [...(editing.gallery || []), ...urls] : urls)}
          />
        </div>

        <div>
          <label className="text-xs font-medium text-zinc-500 mb-1 block">Configurations (comma-separated: 3 BHK, 4 BHK)</label>
          <input type="text" value={Array.isArray(editing.configurations) ? editing.configurations.join(', ') : editing.configurations || ''} onChange={e => setField('configurations', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors" />
        </div>

        <div>
          <label className="text-xs font-medium text-zinc-500 mb-1 block">Highlights (comma-separated)</label>
          <input type="text" value={Array.isArray(editing.highlights) ? editing.highlights.join(', ') : editing.highlights || ''} onChange={e => setField('highlights', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors" />
        </div>

        <div>
          <label className="text-xs font-medium text-zinc-500 mb-1 block">About</label>
          <textarea rows={4} value={editing.about || ''} onChange={e => setField('about', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors resize-none" />
        </div>

        {/* SEO SECTION */}
        <div className="pt-6 border-t border-zinc-100">
          <h4 className="text-sm font-bold text-zinc-900 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-brand-orange rounded-full"></span>
            SEO Optimization
          </h4>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-zinc-500 mb-1 block">Meta Title (Max 60 chars)</label>
              <input type="text" value={editing.meta_title || ''} onChange={e => setField('meta_title', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                placeholder="Property Name | Location | Adroit Group" />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-500 mb-1 block">Meta Description (Max 160 chars)</label>
              <textarea rows={2} value={editing.meta_description || ''} onChange={e => setField('meta_description', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors resize-none"
                placeholder="Luxury 3/4 BHK apartment in..." />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-500 mb-1 block">Meta Keywords (comma separated)</label>
              <input type="text" value={editing.meta_keywords || ''} onChange={e => setField('meta_keywords', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                placeholder="luxury apartments, real estate, delhi" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-zinc-500 mb-1 block">Priority (higher = first)</label>
            <input type="number" value={editing.priority || 0} onChange={e => setField('priority', parseInt(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors" />
          </div>
          <label className="flex items-center gap-2 mt-6 cursor-pointer">
            <input type="checkbox" checked={!!editing.show_on_home} onChange={e => setField('show_on_home', e.target.checked)} className="w-4 h-4 rounded accent-brand-orange" />
            <span className="text-sm text-zinc-700">Show on Homepage</span>
          </label>
          <label className="flex items-center gap-2 mt-6 cursor-pointer">
            <input type="checkbox" checked={editing.is_active !== false} onChange={e => setField('is_active', e.target.checked)} className="w-4 h-4 rounded accent-brand-orange" />
            <span className="text-sm text-zinc-700">Active</span>
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-brand-orange transition-colors disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Property'}
          </button>
          <button type="button" onClick={() => setEditing(null)} className="px-6 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );

  // ─── LIST VIEW ───
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-zinc-500">{properties.length} properties total</p>
        <button onClick={() => setEditing({ ...empty })}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-brand-orange transition-colors">
          <Plus className="w-4 h-4" /> Add Property
        </button>
      </div>

      {properties.length === 0 && (
        <div className="bg-white rounded-2xl border border-zinc-100 p-12 text-center text-zinc-400">No properties yet. Add your first one!</div>
      )}

      <div className="space-y-4">
        {properties.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-zinc-100 p-4 shadow-sm flex items-center gap-4 hover:border-zinc-300 transition-all">
            {p.image && <img src={getFullUrl(p.image)} alt="" className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />}

            <div className="flex-1 min-w-0 pr-4">
              <h4 className="font-bold text-zinc-900 text-sm truncate" title={p.title}>{p.title}</h4>
              <p className="text-[11px] text-zinc-500 truncate">{p.location} · {p.type}</p>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[9px] text-zinc-400 uppercase font-bold">Priority</span>
                <input type="number" value={p.priority} onChange={e => updatePriority(p.id, e.target.value)}
                  className="w-12 text-center text-xs border border-zinc-200 rounded-md py-1 focus:outline-none focus:border-brand-orange" />
              </div>

              <div className="flex items-center gap-2 border-l border-zinc-100 pl-4">
                <button onClick={() => toggle(p.id, 'show_on_home')} title="Show on homepage"
                  className={`p-2 rounded-lg transition-all ${p.show_on_home ? 'bg-brand-orange/10 text-brand-orange' : 'bg-zinc-50 text-zinc-300 hover:text-zinc-500'}`}>
                  <Home className="w-4 h-4" />
                </button>

                <button onClick={() => toggle(p.id, 'is_active')} title="Active/Inactive"
                  className={`p-2 rounded-lg transition-all ${p.is_active ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-400'}`}>
                  {p.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button onClick={() => setEditing({ ...p, gallery: p.gallery || [], configurations: p.configurations || [], highlights: p.highlights || [] })}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-zinc-900 rounded-lg hover:bg-brand-orange transition-colors">Edit</button>

                <button onClick={() => remove(p.id)} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
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

export default AdminProperties;
