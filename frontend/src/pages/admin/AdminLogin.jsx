import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Loader2, Eye, EyeOff } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/admin/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data.user));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-brand-orange/20 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] bg-brand-blue/20 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-brand-orange" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-zinc-500 text-sm mt-1">Adroit Group CMS</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-5">
          {error && <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2.5">{error}</div>}

          <div>
            <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input type="text" required value={form.username} onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-orange transition-colors" placeholder="admin" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input type={showPw ? 'text' : 'password'} required value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-brand-orange transition-colors" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl bg-brand-orange text-white font-semibold text-sm hover:bg-brand-orange-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
