import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, Tag, Share2, Link as LinkIcon, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import LazyImage from '../components/LazyImage';

const API_BASE = import.meta.env.VITE_API_URL;

const BlogPostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const getFullUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${import.meta.env.VITE_BASE_URL}${url}`;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_BASE}/blogs/${slug}`);
        const data = await res.json();
        if (res.ok) {
          setPost(data);
          // ── SEO INJECTION ──
          document.title = data.meta_title || `${data.title} | Adroit Group Blog`;
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) metaDesc.setAttribute('content', data.meta_description || data.excerpt);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();

    // Reset SEO on unmount
    return () => {
      document.title = 'Adroit Group | Luxury Real Estate Delhi NCR';
    };
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-12 h-12 animate-spin text-brand-orange" />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h2 className="text-3xl font-bold text-zinc-900 mb-4">Post Not Found</h2>
      <button onClick={() => navigate('/blog')} className="btn-primary">Back to Blog</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Header */}
      <header className="relative pt-32 pb-20 overflow-hidden bg-zinc-950">
        <div className="absolute top-0 left-[-10%] w-[50%] h-full bg-brand-orange/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 max-w-[900px] relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-brand-orange transition-colors mb-8 group text-sm">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-zinc-500 text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.read_time}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8 tracking-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue font-bold">
                {post.author[0]}
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm">{post.author}</p>
                <p className="text-zinc-500 text-xs">Expert Contributor</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 max-w-[800px] mt-12">
        {/* Featured Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 aspect-[16/9] bg-zinc-100"
        >
          <LazyImage src={getFullUrl(post.image)} alt={post.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Content */}
        <article className="prose prose-zinc prose-lg max-w-none prose-headings:text-zinc-900 prose-p:text-zinc-600 prose-strong:text-zinc-900 prose-a:text-brand-orange">
          <div className="whitespace-pre-line leading-relaxed text-zinc-600 text-lg">
            {post.content}
          </div>
        </article>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-zinc-100 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-500 text-sm hover:border-brand-orange hover:text-brand-orange transition-all cursor-default">
                <Tag className="w-3.5 h-3.5" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Newsletter Box */}
        <div className="mt-20 p-10 rounded-[2rem] bg-zinc-50 border border-zinc-100 text-center">
          <h3 className="text-xl font-bold text-zinc-900 mb-2">Enjoyed this article?</h3>
          <p className="text-zinc-500 mb-6">Join 5,000+ investors receiving our monthly luxury market report.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Email address" className="flex-1 px-5 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-brand-orange text-sm" />
            <button className="btn-primary py-3 px-8 text-sm">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
