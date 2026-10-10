import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Building2, Layers, Calendar, BadgeCheck, Phone, MessageCircle, CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import LazyImage from '../components/LazyImage';

const API_BASE = import.meta.env.VITE_API_URL;

const PropertyDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  const getFullUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${import.meta.env.VITE_BASE_URL}${url}`;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${API_BASE}/properties/${slug}`);
        const data = await res.json();
        if (res.ok) {
          setProperty(data);
          // ── SEO INJECTION ──
          document.title = data.meta_title || `${data.title} | Luxury Real Estate in ${data.location}`;
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) metaDesc.setAttribute('content', data.meta_description || data.about?.substring(0, 160));
        }
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();

    // Reset SEO on unmount
    return () => {
      document.title = 'Adroit Group | Luxury Real Estate Delhi NCR';
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-brand-orange" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-bold text-zinc-900 mb-4">Property Not Found</h2>
        <p className="text-zinc-500 mb-8">This property listing doesn't exist or may have been removed.</p>
        <button onClick={() => navigate('/properties')} className="btn-primary">View All Properties</button>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const msg = `Hello Adroit Group, I'm interested in ${property.title} at ${property.location}. Please share more details.`;
    window.open(`https://wa.me/919999267833?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">

      {/* Atmospheric Glows */}
      <div className="fixed top-[10%] left-[-10%] w-[50%] h-[50%] bg-brand-orange/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed top-[40%] right-[-10%] w-[50%] h-[50%] bg-brand-blue/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 pt-28 pb-24 px-6">
        <div className="container mx-auto max-w-[1200px]">

          {/* Back Button */}
          <button
            onClick={() => navigate('/properties')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-brand-orange transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </button>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-brand-orange font-semibold tracking-widest uppercase text-xs mb-3 block">{property.type}</span>
              <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight mb-3">{property.title}</h1>
              <div className="flex items-center gap-2 text-zinc-500">
                <MapPin className="w-4 h-4 text-brand-orange" strokeWidth={1.5} />
                <span className="text-base">{property.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                property.status === 'Ready to Move' || property.status === 'Ready' 
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                  : 'bg-brand-orange/10 text-brand-orange border border-brand-orange/20'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                {property.status}
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="mb-12">
            <div className="relative w-full aspect-[16/8] rounded-3xl overflow-hidden mb-4 bg-zinc-100 shadow-2xl shadow-zinc-200/50">
              <LazyImage
                src={property.gallery && property.gallery.length > 0 ? getFullUrl(property.gallery[activeImg]) : getFullUrl(property.image)}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {/* Nav Arrows */}
              {property.gallery && property.gallery.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg(i => (i - 1 + property.gallery.length) % property.gallery.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImg(i => (i + 1) % property.gallery.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center hover:bg-brand-orange hover:text-white transition-all shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {property.gallery && property.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`h-20 w-32 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all ${activeImg === idx ? 'border-brand-orange shadow-lg shadow-brand-orange/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <LazyImage src={getFullUrl(img)} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left: Details */}
            <div className="lg:col-span-2 flex flex-col gap-8">

              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/60 backdrop-blur-2xl p-8 rounded-3xl border border-white/80 shadow-lg"
              >
                <div className="w-10 h-1 bg-gradient-to-r from-brand-orange to-brand-blue rounded-full mb-5"></div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight">About this Property</h2>
                <p className="text-zinc-500 leading-relaxed whitespace-pre-line">{property.about}</p>
              </motion.div>

              {/* Key Specs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/60 backdrop-blur-2xl p-8 rounded-3xl border border-white/80 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-zinc-900 mb-6 tracking-tight">Key Details</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                  {[
                    { icon: <Building2 className="w-5 h-5 text-brand-orange" strokeWidth={1.5} />, label: "Developer", value: property.developer },
                    { icon: <Layers className="w-5 h-5 text-brand-blue" strokeWidth={1.5} />, label: "Configurations", value: Array.isArray(property.configurations) ? property.configurations.join(', ') : property.configurations },
                    { icon: <Building2 className="w-5 h-5 text-brand-orange" strokeWidth={1.5} />, label: "Area", value: property.area },
                    { icon: <Layers className="w-5 h-5 text-brand-blue" strokeWidth={1.5} />, label: "Floors", value: property.floors },
                    { icon: <Calendar className="w-5 h-5 text-brand-orange" strokeWidth={1.5} />, label: "Possession", value: property.possession },
                    { icon: <BadgeCheck className="w-5 h-5 text-brand-blue" strokeWidth={1.5} />, label: "RERA No.", value: property.rera },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-2 p-4 bg-zinc-50/80 rounded-2xl border border-zinc-100">
                      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                        {item.icon} {item.label}
                      </div>
                      <div className="text-sm font-bold text-zinc-900 leading-snug break-words">{item.value || 'N/A'}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Highlights */}
              {property.highlights && property.highlights.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/60 backdrop-blur-2xl p-8 rounded-3xl border border-white/80 shadow-lg"
                >
                  <h2 className="text-2xl font-bold text-zinc-900 mb-6 tracking-tight">Property Highlights</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {property.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-zinc-600 text-sm leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </div>

            {/* Right: Contact CTA */}
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="sticky top-28 flex flex-col gap-5"
              >
                <div className="bg-white/60 backdrop-blur-2xl p-8 rounded-3xl border border-white/80 shadow-xl">
                  <div className="text-2xl font-bold text-zinc-900 mb-6">Price on Request</div>

                  <button
                    onClick={handleWhatsApp}
                    className="w-full inline-flex items-center justify-center gap-3 h-14 rounded-2xl bg-gradient-to-r from-brand-orange-dark to-brand-orange text-white font-bold text-sm hover:shadow-xl hover:shadow-brand-orange/30 hover:scale-[1.02] transition-all duration-300 mb-3"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Enquire on WhatsApp
                  </button>

                  <a
                    href="tel:+919999267833"
                    className="w-full inline-flex items-center justify-center gap-3 h-14 rounded-2xl bg-zinc-50 border border-zinc-200 text-zinc-900 font-bold text-sm hover:bg-zinc-100 transition-all duration-300"
                  >
                    <Phone className="w-5 h-5 text-brand-blue" strokeWidth={1.5} />
                    Call an Expert
                  </a>

                  <p className="text-center text-xs text-zinc-400 mt-5">Consultation • No obligation • 100% confidential</p>
                </div>

                <div className="bg-white/60 backdrop-blur-2xl p-6 rounded-3xl border border-white/80 shadow-lg text-center">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue mb-1">1,000+</div>
                  <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wide">Satisfied Premium Clients</div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
