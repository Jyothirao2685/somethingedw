import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building, Home as HomeIcon, ArrowRight, CheckCircle2, Sprout } from 'lucide-react';

const PropertyCategories = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const categories = [
    {
      id: 'residential',
      title: 'Residential Excellence',
      subtitle: 'Premium Living Spaces',
      description: 'Discover unparalleled luxury in our curated selection of residential properties. From sprawling villas to high-rise penthouses, we find the perfect home for your lifestyle.',
      icon: <HomeIcon className="w-8 h-8" />,
      features: ['Ultra-Luxury Villas', 'Premium Penthouses', 'Exclusive Apartments', 'Gated Communities'],
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=react-1.2.1&auto=format&fit=crop&w=1000&q=80',
      color: 'brand-orange',
      bgGlow: 'bg-brand-orange/20'
    },
    {
      id: 'commercial',
      title: 'Commercial Ventures',
      subtitle: 'Strategic Business Spaces',
      description: 'Elevate your business with our premium commercial real estate portfolio. Strategically located offices, retail spaces, and corporate hubs designed for success.',
      icon: <Building className="w-8 h-8" />,
      features: ['Corporate Offices', 'Premium Retail Spaces', 'Co-working Hubs', 'Strategic Plots'],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=react-1.2.1&auto=format&fit=crop&w=1000&q=80',
      color: 'brand-blue',
      bgGlow: 'bg-brand-blue/20'
    },
    {
      id: 'agricultural',
      title: 'Agricultural Land',
      subtitle: 'Prime Farmland & Green Investments',
      description: 'Invest in fertile agricultural land across Delhi NCR and beyond. From managed farmhouses to large-scale agri plots, we connect you with nature\'s most enduring asset class.',
      icon: <Sprout className="w-8 h-8" />,
      features: ['Managed Farmhouses', 'Agri-Investment Plots', 'Green Belt Land', 'Orchard Estates'],
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=react-1.2.1&auto=format&fit=crop&w=1000&q=80',
      color: 'emerald-500',
      bgGlow: 'bg-emerald-500/20'
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-zinc-950 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}></div>
      
      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 tracking-widest uppercase mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
            Buying & Selling Portfolio
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight"
          >
            Discover Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">Investment</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              key={category.id}
              className="relative group rounded-[2.5rem] overflow-hidden"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Image & Overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className={`w-full h-full object-cover transition-transform duration-1000 ${hoveredIndex === index ? 'scale-110' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-zinc-950/70 transition-opacity duration-500 group-hover:bg-zinc-950/50"></div>
                <div className={`absolute inset-0 ${category.bgGlow} mix-blend-overlay transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6 sm:p-8 lg:p-10 h-full flex flex-col min-h-[350px] sm:min-h-[400px] border border-white/10 rounded-[2.5rem] bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent">
                
                <div className="mb-auto">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md bg-white/10 border border-white/20 text-white transition-transform duration-500 ${hoveredIndex === index ? '-translate-y-2' : ''}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">{category.title}</h3>
                  <p className={`text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider uppercase mb-3 sm:mb-4 ${index === 0 ? 'text-brand-orange' : index === 1 ? 'text-brand-blue' : 'text-emerald-400'}`}>
                    {category.subtitle}
                  </p>
                  <p className="text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed mb-4 max-w-sm">
                    {category.description}
                  </p>
                </div>

                <div className="md:hidden mt-2 mb-6">
                  <ul className="grid grid-cols-2 gap-2">
                    {category.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center text-zinc-300 text-[10px]">
                        <CheckCircle2 className={`w-3 h-3 mr-2 shrink-0 ${index === 0 ? 'text-brand-orange' : index === 1 ? 'text-brand-blue' : 'text-emerald-400'}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <AnimatePresence>
                  <div className="hidden md:block">
                    {hoveredIndex === index && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-2 mb-6">
                          {category.features.map((feature, fIdx) => (
                            <motion.li 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: fIdx * 0.1 }}
                              key={fIdx} 
                              className="flex items-center text-zinc-300 text-sm"
                            >
                              <CheckCircle2 className={`w-4 h-4 mr-3 ${index === 0 ? 'text-brand-orange' : index === 1 ? 'text-brand-blue' : 'text-emerald-400'}`} />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </AnimatePresence>

                <div className="mt-auto pt-6 border-t border-white/10">
                  <button 
                    onClick={() => navigate(`/properties?type=${category.id}`)}
                    className="flex items-center justify-between w-full group/btn"
                  >
                    <span className="text-white font-semibold tracking-wide">Explore {category.id === 'residential' ? 'Residences' : category.id === 'commercial' ? 'Commercial' : 'Agri Land'}</span>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${index === 0 ? 'bg-brand-orange group-hover/btn:bg-white group-hover/btn:text-brand-orange' : index === 1 ? 'bg-brand-blue group-hover/btn:bg-white group-hover/btn:text-brand-blue' : 'bg-emerald-500 group-hover/btn:bg-white group-hover/btn:text-emerald-500'} text-white`}>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyCategories;
