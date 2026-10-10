import { useState, useEffect } from 'react';
import { Plus, Trash2, MapPin, Tag, Loader2, RefreshCw } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;
const token = () => localStorage.getItem('adminToken');
const headers = () => ({ 'Content-Type': 'application/json', 'x-admin-token': token() });

const AdminFilters = () => {
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLocation, setNewLocation] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [locRes, catRes] = await Promise.all([
        fetch(`${API}/filters/locations`),
        fetch(`${API}/filters/categories`)
      ]);
      setLocations(await locRes.json());
      setCategories(await catRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addLocation = async (e) => {
    e.preventDefault();
    if (!newLocation) return;
    setSaving(true);
    try {
      const res = await fetch(`${API}/admin/filters/locations`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ name: newLocation })
      });
      if (res.ok) {
        setNewLocation('');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    if (!newCategory) return;
    setSaving(true);
    try {
      const res = await fetch(`${API}/admin/filters/categories`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ name: newCategory })
      });
      if (res.ok) {
        setNewCategory('');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (type, id) => {
    if (!window.confirm(`Remove this ${type}? This may affect existing property filters.`)) return;
    try {
      const res = await fetch(`${API}/admin/filters/${type}s/${id}`, {
        method: 'DELETE',
        headers: headers()
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading && locations.length === 0) {
    return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-brand-orange" /></div>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">Filter Management</h2>
          <p className="text-zinc-500 mt-1">Control the locations and property categories shown on the website</p>
        </div>
        <button onClick={fetchData} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
          <RefreshCw className={`w-5 h-5 text-zinc-400 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Locations Section */}
        <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">Locations</h3>
          </div>

          <form onSubmit={addLocation} className="flex gap-2 mb-8">
            <input 
              type="text" value={newLocation}
              onChange={e => setNewLocation(e.target.value)}
              placeholder="Add new location (e.g. Dubai)"
              className="flex-1 px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-100 focus:outline-none focus:border-brand-orange transition-all text-sm"
            />
            <button 
              disabled={saving}
              className="bg-zinc-900 text-white p-3 rounded-xl hover:bg-brand-orange transition-colors disabled:opacity-50"
            >
              <Plus className="w-5 h-5" />
            </button>
          </form>

          <div className="space-y-2">
            {locations.map(loc => (
              <div key={loc.id} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 border border-transparent hover:border-zinc-200 transition-all group">
                <span className="text-zinc-700 font-medium">{loc.name}</span>
                <button 
                  onClick={() => deleteItem('location', loc.id)}
                  className="p-2 text-red-400 hover:text-red-600 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
              <Tag className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">Property Categories</h3>
          </div>

          <form onSubmit={addCategory} className="flex gap-2 mb-8">
            <input 
              type="text" value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              placeholder="Add category (e.g. Penthouse)"
              className="flex-1 px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-100 focus:outline-none focus:border-brand-orange transition-all text-sm"
            />
            <button 
              disabled={saving}
              className="bg-zinc-900 text-white p-3 rounded-xl hover:bg-brand-orange transition-colors disabled:opacity-50"
            >
              <Plus className="w-5 h-5" />
            </button>
          </form>

          <div className="space-y-2">
            {categories.map(cat => (
              <div key={cat.id} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 border border-transparent hover:border-zinc-200 transition-all group">
                <span className="text-zinc-700 font-medium">{cat.name}</span>
                <button 
                  onClick={() => deleteItem('category', cat.id)}
                  className="p-2 text-red-400 hover:text-red-600 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminFilters;
