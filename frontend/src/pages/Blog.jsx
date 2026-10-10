import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, User, Tag, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LazyImage from '../components/LazyImage';

const API_BASE = import.meta.env.VITE_API_URL;

const categoryColors = {
  orange: {
    badge: 'bg-brand-orange/10 text-brand-orange',
    dot: 'bg-brand-orange',
  },
  blue: {
    badge: 'bg-brand-blue/10 text-brand-blue',
    dot: 'bg-brand-blue',
  },
  green: {
    badge: 'bg-emerald-50 text-emerald-600',
    dot: 'bg-emerald-500',
  },
};

const ALL_CATEGORIES = ['All', 'Market Trends', 'International', "Buyer's Guide", 'Insights', 'Commercial', 'Finance'];

const Blog = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getFullUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${import.meta.env.VITE_BASE_URL}${url}`;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_BASE}/blogs`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setAllPosts(data);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filtered =
    activeCategory === 'All'
      ? allPosts
      : allPosts.filter((p) => p.category === activeCategory);

  const featured = filtered.length > 0 ? filtered[0] : null;
  const rest = filtered.length > 1 ? filtered.slice(1) : [];

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative pt-36 pb-24 overflow-hidden bg-zinc-950">
        <div className="absolute top-0 left-[-10%] w-[50%] h-[60%] bg-brand-orange/20 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-[-10%] w-[50%] h-[60%] bg-brand-blue/20 blur-[160px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 max-w-[1200px] relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-brand-orange mb-6"
          >
            <span className="w-5 h-px bg-brand-orange" />
            Market Intelligence
            <span className="w-5 h-px bg-brand-orange" />
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight"
          >
            Insights &amp; <span className="text-gradient">Market Trends</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 text-lg max-w-xl mx-auto"
          >
            Expert analysis, investment guides, and the latest from India's premier luxury real estate landscape.
          </motion.p>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section className="sticky top-[64px] z-30 bg-white/90 backdrop-blur-md border-b border-zinc-100 shadow-sm">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-zinc-900 text-white shadow-md'
                    : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white min-h-[400px]">
        <div className="container mx-auto px-6 max-w-[1200px]">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-brand-orange" />
            </div>
          ) : (
            <>
              {/* ── Featured Post ── */}
              {featured && (
                <motion.div
                  key={featured.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => navigate(`/blog/${featured.slug}`)}
                  className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[2rem] overflow-hidden border border-zinc-100 shadow-lg shadow-zinc-900/5 mb-16 cursor-pointer hover:shadow-xl hover:shadow-brand-orange/10 transition-all duration-300"
                >
                  <div className="relative h-72 lg:h-auto overflow-hidden">
                    <LazyImage
                      src={getFullUrl(featured.image)}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
                  </div>
                  <div className="flex flex-col justify-center p-10 bg-zinc-50">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[featured.category_color]?.badge || categoryColors.orange.badge}`}>
                        {featured.category}
                      </span>
                      <span className="text-zinc-400 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {featured.read_time}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight mb-4 group-hover:text-brand-orange transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-zinc-500 text-base leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <User className="w-4 h-4" />
                        <span>{featured.author}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:border-zinc-900 group-hover:text-white transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Grid ── */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((post, idx) => {
                    const colors = categoryColors[post.category_color] || categoryColors.orange;
                    return (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, delay: idx * 0.08 }}
                        onClick={() => navigate(`/blog/${post.slug}`)}
                        className="group cursor-pointer bg-white rounded-[1.75rem] border border-zinc-100 shadow-sm hover:shadow-lg hover:shadow-brand-orange/8 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                      >
                        <div className="relative h-52 overflow-hidden">
                          <LazyImage
                            src={getFullUrl(post.image)}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/30 to-transparent" />
                          <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${colors.badge} backdrop-blur-md`}>
                            {post.category}
                          </span>
                        </div>
                        <div className="flex flex-col flex-1 p-6">
                          <h3 className="text-base font-bold text-zinc-900 leading-snug mb-3 group-hover:text-brand-orange transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-zinc-500 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                            {post.excerpt}
                          </p>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-5">
                              {post.tags.map((tag) => (
                                <span key={tag} className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-500">
                                  <Tag className="w-2.5 h-2.5" />{tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                            <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                              <Clock className="w-3 h-3" /> {post.read_time}
                            </div>
                            <div className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:border-zinc-900 group-hover:text-white transition-all duration-300">
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              )}

              {filtered.length === 0 && (
                <div className="text-center py-24 text-zinc-400">
                  <p className="text-lg">No posts in this category yet.</p>
                </div>
              )}
            </>
          )}

          {/* ── Newsletter CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20 relative rounded-[2rem] overflow-hidden bg-zinc-950 p-12 md:p-16 text-center"
          >
            <div className="absolute top-0 left-[-10%] w-[50%] h-full bg-brand-orange/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-[-10%] w-[50%] h-full bg-brand-blue/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Stay Ahead of the Market</h2>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">Get exclusive market reports and investment insights delivered to your inbox every month.</p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                />
                <button className="px-7 py-3 rounded-full bg-brand-orange text-white font-semibold text-sm hover:bg-brand-orange-dark transition-colors whitespace-nowrap">
                  Subscribe Free
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
