import { useState, useEffect } from 'react';
import { ArrowUpRight, MapPin, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LazyImage from './LazyImage';

const API_BASE = import.meta.env.VITE_API_URL;

const FeaturedProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`${API_BASE}/properties/featured-homes`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setProperties(data);
        }
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const getFullUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${import.meta.env.VITE_BASE_URL}${url}`;
  };

  return (
    <section className="py-16 bg-white border-b border-zinc-200 relative overflow-hidden">
      
      {/* Geometric Building Watermark Background */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 200V80h40v120M60 200V40h60v160M120 200v-80h40v80' fill='none' stroke='%230872b8' stroke-width='4'/%3E%3Cpath d='M30 90h20M30 110h20M30 130h20M30 150h20M30 170h20M70 50h40M70 70h40M70 90h40M70 110h40M70 130h40M70 150h40M70 170h40M130 130h20M130 150h20M130 170h20' stroke='%23f37b12' stroke-width='2'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }}></div>

      {/* Premium Atmospheric Glows */}
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[50%] bg-brand-orange/15 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[50%] bg-brand-blue/15 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
              Featured Portfolio
            </h2>
            <p className="text-zinc-500 text-lg">
              Explore our highly curated selection of exceptional properties.
            </p>
          </div>
          <button 
            onClick={() => navigate('/properties')}
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-brand-orange transition-colors"
          >
            View All Projects
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-brand-orange" />
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 text-zinc-400">
            No properties found in the database. Add some from the Admin Panel.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={prop.id} 
                onClick={() => navigate(`/properties/${prop.slug}`)}
                className="group cursor-pointer bg-white/60 backdrop-blur-2xl p-4 rounded-[2rem] border border-white/80 shadow-lg shadow-brand-blue/5 hover:shadow-xl hover:shadow-brand-orange/10 hover:bg-white/80 transition-all duration-300"
              >
                <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6 bg-zinc-100">
                  <LazyImage 
                    src={getFullUrl(prop.image)} 
                    alt={prop.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out" 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-zinc-900 font-bold text-[9px] tracking-wider shadow-sm uppercase z-10">
                    {prop.type}
                  </div>
                </div>
                
                <div className="px-2">
                  <h3 className="text-lg font-bold text-zinc-900 tracking-tight group-hover:text-brand-orange transition-colors">
                    {prop.title}
                  </h3>
                  <div className="flex items-center text-zinc-400 text-xs mt-1 mb-4">
                    <MapPin className="w-3 h-3 mr-1 text-brand-orange" />
                    {prop.location}
                  </div>

                  <div className="flex gap-4 py-3 border-t border-zinc-50 mb-2">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-tighter">Config</span>
                      <span className="text-[11px] font-bold text-zinc-700">
                        {Array.isArray(prop.configurations) ? prop.configurations[0] : prop.configurations?.split(',')[0] || 'Premium'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-tighter">Area</span>
                      <span className="text-[11px] font-bold text-zinc-700">{prop.area || 'On Request'}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest">Explore</span>
                    <div className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:border-zinc-900 group-hover:text-white transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-12 flex justify-center md:hidden">
            <button 
              onClick={() => navigate('/properties')}
              className="btn-secondary w-full"
            >
              View All Projects
            </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
