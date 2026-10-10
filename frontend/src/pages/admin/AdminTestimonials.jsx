import { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, EyeOff, X, Save, Loader2, Quote, User, Star } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;
const token = () => localStorage.getItem('adminToken');
const headers = () => ({ 'Content-Type': 'application/json', 'x-admin-token': token() });

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const initialForm = { name: '', role: '', content: '', rating: 5, is_active: 1 };
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API}/admin/testimonials?admin=true`, { headers: headers() });
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editing ? `${API}/admin/testimonials/${editing.id}` : `${API}/admin/testimonials`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: headers(),
        body: JSON.stringify(form)
      });
      if (res.ok) {
        fetchTestimonials();
        handleClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (t) => {
    setEditing(t);
    setForm({ ...t });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await fetch(`${API}/admin/testimonials/${id}`, { method: 'DELETE', headers: headers() });
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setEditing(null);
    setForm(initialForm);
    setShowModal(false);
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-brand-orange" /></div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Client Perspectives</h2>
          <p className="text-zinc-500 text-sm">Manage client testimonials and endorsements</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-brand-orange text-white px-4 py-2 rounded-lg hover:bg-brand-orange/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm relative group">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => handleEdit(t)} className="p-2 bg-zinc-100 rounded-lg hover:bg-brand-blue hover:text-white transition-colors">
                <Plus className="w-4 h-4 rotate-45" />
              </button>
              <button onClick={() => handleDelete(t.id)} className="p-2 bg-zinc-100 rounded-lg hover:bg-red-500 hover:text-white transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <Quote className="w-8 h-8 text-brand-orange/20 mb-4" />
            <p className="text-zinc-600 text-sm leading-relaxed mb-6 italic">"{t.content}"</p>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-zinc-900 font-bold text-sm">{t.name}</h4>
                <p className="text-zinc-500 text-xs">{t.role}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-zinc-50 flex justify-between items-center">
              <div className="flex gap-0.5">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-brand-orange text-brand-orange" />)}
              </div>
              <span className={`text-[10px] uppercase font-bold tracking-widest ${t.is_active ? 'text-emerald-500' : 'text-zinc-400'}`}>
                {t.is_active ? 'Active' : 'Hidden'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-zinc-900">{editing ? 'Edit' : 'New'} Testimonial</h3>
              <button onClick={handleClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5 block">Client Name</label>
                <input 
                  type="text" required value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-100 focus:outline-none focus:border-brand-orange transition-all text-sm"
                  placeholder="e.g. Navnit Singh"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5 block">Client Role</label>
                <input 
                  type="text" value={form.role}
                  onChange={e => setForm({...form, role: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-100 focus:outline-none focus:border-brand-orange transition-all text-sm"
                  placeholder="e.g. Property Investor"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5 block">Testimonial Content</label>
                <textarea 
                  required rows="4" value={form.content}
                  onChange={e => setForm({...form, content: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-100 focus:outline-none focus:border-brand-orange transition-all text-sm resize-none"
                  placeholder="Enter the client's endorsement..."
                />
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5 block">Rating (1-5)</label>
                  <select 
                    value={form.rating}
                    onChange={e => setForm({...form, rating: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-100 focus:outline-none focus:border-brand-orange transition-all text-sm"
                  >
                    {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5 block">Status</label>
                  <select 
                    value={form.is_active}
                    onChange={e => setForm({...form, is_active: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-100 focus:outline-none focus:border-brand-orange transition-all text-sm"
                  >
                    <option value={1}>Active / Visible</option>
                    <option value={0}>Hidden / Draft</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" onClick={handleClose}
                  className="flex-1 px-6 py-3 rounded-xl border border-zinc-200 text-zinc-600 font-bold hover:bg-zinc-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit" disabled={saving}
                  className="flex-1 bg-brand-orange text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-orange/90 transition-all flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {editing ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
