import React, { useState, useEffect } from 'react';
import { Search, MapPin, SlidersHorizontal, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LazyImage from '../components/LazyImage';

const API_BASE = import.meta.env.VITE_API_URL;

const Properties = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || '');

  useEffect(() => {
    setTypeFilter(searchParams.get('type') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propRes, locRes, catRes] = await Promise.all([
          fetch(`${API_BASE}/properties`),
          fetch(`${API_BASE}/filters/locations`),
          fetch(`${API_BASE}/filters/categories`)
        ]);
        
        const props = await propRes.json();
        const locs = await locRes.json();
        const cats = await catRes.json();

        if (Array.isArray(props)) setProperties(props);
        if (Array.isArray(locs)) setLocations(locs);
        if (Array.isArray(cats)) setCategories(cats);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProperties = properties.filter(prop => {
    const matchesSearch = prop.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          prop.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === '' || prop.location.includes(locationFilter);
    
    let matchesType = true;
    if (typeFilter) {
      if (prop.category) {
        matchesType = prop.category.toLowerCase() === typeFilter.toLowerCase();
      } else {
        // Fallback for older entries without category
        if (typeFilter.toLowerCase() === 'residential') {
          matchesType = !prop.type?.toLowerCase().includes('commercial') && 
                        !prop.type?.toLowerCase().includes('office') &&
                        !prop.type?.toLowerCase().includes('retail');
        } else if (typeFilter.toLowerCase() === 'commercial') {
          matchesType = prop.type?.toLowerCase().includes('commercial') || 
                        prop.type?.toLowerCase().includes('office') ||
                        prop.type?.toLowerCase().includes('retail');
        } else {
          matchesType = prop.type?.toLowerCase().includes(typeFilter.toLowerCase());
        }
      }
    }

    return matchesSearch && matchesLocation && matchesType;
  });

  const getFullUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${import.meta.env.VITE_BASE_URL}${url}`;
  };

  return (
    <div className="pt-20 min-h-screen bg-zinc-50 pb-24 relative overflow-hidden">
      
      {/* Atmospheric Glows */}
      <div className="fixed top-0 left-[-10%] w-[50%] h-[50%] bg-brand-orange/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-[-10%] w-[50%] h-[50%] bg-brand-blue/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Page Header */}
      <div className="bg-zinc-950 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}></div>
        <div className="container mx-auto px-6 max-w-[1200px] text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Premium <span className="text-brand-orange">Portfolio</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg"
          >
            An exclusively curated selection of the finest real estate offerings in Delhi NCR and beyond.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-[1200px] -mt-10 relative z-20">
        {/* Filters Bar */}
        <div className="bg-white/80 backdrop-blur-xl p-5 rounded-3xl shadow-xl shadow-zinc-900/5 border border-white flex flex-col md:flex-row gap-4 mb-16">
          <div className="flex-1 relative flex items-center">
            <Search className="w-5 h-5 text-zinc-400 absolute left-4" />
            <input 
              type="text" 
              placeholder="Search by project name or location..." 
              className="w-full pl-12 pr-4 py-3.5 bg-zinc-50 border border-zinc-100 focus:outline-none focus:border-brand-orange transition-all rounded-2xl text-zinc-900 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-64 relative flex items-center">
            <SlidersHorizontal className="w-5 h-5 text-zinc-400 absolute left-4 pointer-events-none" />
            <select 
              className="w-full pl-12 pr-4 py-3.5 bg-zinc-50 border border-zinc-100 focus:outline-none focus:border-brand-orange transition-all appearance-none rounded-2xl text-zinc-900 text-sm"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map(loc => (
                <option key={loc.id} value={loc.name}>{loc.name}</option>
              ))}
            </select>
          </div>
          <div className="md:w-64 relative flex items-center">
            <SlidersHorizontal className="w-5 h-5 text-zinc-400 absolute left-4 pointer-events-none" />
            <select 
              className="w-full pl-12 pr-4 py-3.5 bg-zinc-50 border border-zinc-100 focus:outline-none focus:border-brand-orange transition-all appearance-none rounded-2xl text-zinc-900 text-sm"
              value={typeFilter}
              onChange={(e) => {
                const newType = e.target.value;
                setTypeFilter(newType);
                if (newType) {
                  setSearchParams({ type: newType });
                } else {
                  setSearchParams({});
                }
              }}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Listing Grid */}
        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-12 h-12 animate-spin text-brand-orange" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProperties.map((prop, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  key={prop.id} 
                  onClick={() => navigate(`/properties/${prop.slug}`)}
                  className="group bg-white rounded-[2.5rem] p-4 border border-zinc-100 hover:shadow-2xl hover:shadow-zinc-200 transition-all duration-500 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-zinc-100">
                    <LazyImage 
                      src={getFullUrl(prop.image)} 
                      alt={prop.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out" 
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-zinc-900 font-bold text-[10px] tracking-wider shadow-sm uppercase z-10">
                      {prop.type}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-zinc-900 mb-1 group-hover:text-brand-orange transition-colors">
                      {prop.title}
                    </h3>
                    <div className="flex items-center text-zinc-400 mb-4 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-brand-orange" strokeWidth={2} />
                      {prop.location}
                    </div>

                    {/* New Specifications Section */}
                    <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-zinc-50">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold mb-1">Configuration</p>
                        <p className="text-xs font-bold text-zinc-700 truncate">
                          {Array.isArray(prop.configurations) ? prop.configurations[0] : prop.configurations?.split(',')[0] || 'Premium'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold mb-1">Area</p>
                        <p className="text-xs font-bold text-zinc-700">{prop.area || 'On Request'}</p>
                      </div>
                    </div>

                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-[11px] font-bold text-brand-orange uppercase tracking-widest">View Details</span>
                      <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-300">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!loading && filteredProperties.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-zinc-200">
            <h3 className="text-xl font-bold text-zinc-900 mb-2">No properties match your search</h3>
            <p className="text-zinc-500">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
