import { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, EyeOff, X, Save, Loader2 } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;
const token = () => localStorage.getItem('adminToken');
const headers = () => ({ 'Content-Type': 'application/json', 'x-admin-token': token() });

const empty = {
  slug: '', title: '', excerpt: '', content: '', category: '', category_color: 'orange',
  author: 'Adroit Team', image: '', tags: [], read_time: '', is_published: true,
  meta_title: '', meta_description: '', meta_keywords: '',
};

const COLORS = ['orange', 'blue', 'green'];

const AdminBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const res = await fetch(`${API}/admin/blogs/all`, { headers: headers() });
      const data = await res.json();
      if (Array.isArray(data)) setPosts(data);
    } catch {}
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm('Delete this blog post?')) return;
    await fetch(`${API}/admin/blogs/${id}`, { method: 'DELETE', headers: headers() });
    load();
  };

  const savePost = async (e) => {
    e.preventDefault();
    setSaving(true);
    const isNew = !editing.id;
    const url = isNew ? `${API}/admin/blogs` : `${API}/admin/blogs/${editing.id}`;
    const method = isNew ? 'POST' : 'PUT';
    const body = {
      ...editing,
      tags: typeof editing.tags === 'string' ? editing.tags.split(',').map(s => s.trim()).filter(Boolean) : editing.tags,
      is_published: editing.is_published ? 1 : 0,
    };
    try {
      await fetch(url, { method, headers: headers(), body: JSON.stringify(body) });
      setEditing(null);
      load();
    } catch { alert('Failed to save'); }
    setSaving(false);
  };

  const setField = (key, val) => setEditing(p => ({ ...p, [key]: val }));

  // ─── FORM ───
  if (editing) return (
    <div className="bg-white rounded-2xl border border-zinc-100 p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-zinc-900">{editing.id ? 'Edit Blog Post' : 'New Blog Post'}</h3>
        <button onClick={() => setEditing(null)} className="text-zinc-400 hover:text-zinc-900"><X className="w-5 h-5" /></button>
      </div>
      <form onSubmit={savePost} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-zinc-500 mb-1 block">Title *</label>
            <input type="text" required value={editing.title || ''} onChange={e => setField('title', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors" />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-500 mb-1 block">Slug *</label>
            <input type="text" required value={editing.slug || ''} onChange={e => setField('slug', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors"
              placeholder="my-blog-post" />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-500 mb-1 block">Category</label>
            <input type="text" value={editing.category || ''} onChange={e => setField('category', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors" />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-500 mb-1 block">Category Color</label>
            <div className="flex gap-2 mt-1">
              {COLORS.map(c => (
                <button key={c} type="button" onClick={() => setField('category_color', c)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize border transition-all ${editing.category_color === c ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 text-zinc-500 hover:border-zinc-400'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-500 mb-1 block">Author</label>
            <input type="text" value={editing.author || ''} onChange={e => setField('author', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors" />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-500 mb-1 block">Read Time</label>
            <input type="text" value={editing.read_time || ''} onChange={e => setField('read_time', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors"
              placeholder="5 min read" />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-zinc-500 mb-1 block">Cover Image URL</label>
          <input type="text" value={editing.image || ''} onChange={e => setField('image', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors" />
        </div>

        <div>
          <label className="text-xs font-medium text-zinc-500 mb-1 block">Tags (comma-separated)</label>
          <input type="text" value={Array.isArray(editing.tags) ? editing.tags.join(', ') : editing.tags || ''} onChange={e => setField('tags', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors"
            placeholder="Delhi NCR, Investment, Luxury" />
        </div>

        <div>
          <label className="text-xs font-medium text-zinc-500 mb-1 block">Excerpt</label>
          <textarea rows={2} value={editing.excerpt || ''} onChange={e => setField('excerpt', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors resize-none" />
        </div>

        <div>
          <label className="text-xs font-medium text-zinc-500 mb-1 block">Full Content</label>
          <textarea rows={8} value={editing.content || ''} onChange={e => setField('content', e.target.value)}
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
                placeholder="Post Title | Blog | Adroit Group" />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-500 mb-1 block">Meta Description (Max 160 chars)</label>
              <textarea rows={2} value={editing.meta_description || ''} onChange={e => setField('meta_description', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors resize-none"
                placeholder="Key takeaways from this post..." />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-500 mb-1 block">Meta Keywords (comma separated)</label>
              <input type="text" value={editing.meta_keywords || ''} onChange={e => setField('meta_keywords', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                placeholder="real estate trends, investment tips" />
            </div>
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={!!editing.is_published} onChange={e => setField('is_published', e.target.checked)} className="w-4 h-4 rounded accent-brand-orange" />
          <span className="text-sm text-zinc-700">Published</span>
        </label>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-brand-orange transition-colors disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Post'}
          </button>
          <button type="button" onClick={() => setEditing(null)} className="px-6 py-3 rounded-xl border border-zinc-200 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );

  // ─── LIST ───
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-zinc-500">{posts.length} blog posts</p>
        <button onClick={() => setEditing({ ...empty })}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-brand-orange transition-colors">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {posts.length === 0 && (
        <div className="bg-white rounded-2xl border border-zinc-100 p-12 text-center text-zinc-400">No blog posts yet.</div>
      )}

      <div className="space-y-4">
        {posts.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-zinc-100 p-5 shadow-sm flex flex-wrap items-center gap-4">
            {p.image && <img src={p.image} alt="" className="w-20 h-14 object-cover rounded-xl flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-zinc-900 text-sm truncate">{p.title}</h4>
                {!p.is_published && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-semibold">Draft</span>}
              </div>
              <p className="text-xs text-zinc-500">{p.category} · {p.author} · {p.read_time}</p>
            </div>

            <button onClick={() => setEditing({ ...p, tags: p.tags || [] })}
              className="px-3 py-1.5 text-xs font-medium text-brand-blue border border-brand-blue/20 rounded-lg hover:bg-brand-blue/5 transition-colors">Edit</button>

            <button onClick={() => remove(p.id)} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogs;
