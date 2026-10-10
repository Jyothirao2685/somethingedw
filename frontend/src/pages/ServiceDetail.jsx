import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import { ArrowLeft, BarChart, Eye, Shield, Users, Wrench, PieChart, Clock, Globe, Handshake, TrendingUp, Briefcase, FileText, Armchair, Monitor, Key } from 'lucide-react';

const iconMap = {
  "bar-chart": BarChart,
  "eye": Eye,
  "shield": Shield,
  "users": Users,
  "tool": Wrench,
  "pie-chart": PieChart,
  "clock": Clock,
  "globe": Globe,
  "handshake": Handshake,
  "trending-up": TrendingUp,
  "briefcase": Briefcase,
  "file-text": FileText,
  "sofa": Armchair,
  "monitor": Monitor,
  "key": Key
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = servicesData[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={service.heroImage} 
            alt={service.title} 
            className="w-full h-full object-cover scale-105 transform motion-safe:animate-[pulse_10s_ease-in-out_infinite]" 
          />
          <div className="absolute inset-0 bg-zinc-900/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-[1200px] text-center pt-20">
          <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors text-sm font-semibold tracking-wide uppercase">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
          >
            {service.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto font-light"
          >
            {service.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-10 md:-mt-16 z-20 container mx-auto px-4 sm:px-6 max-w-[1000px]">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl p-4 sm:p-8 md:p-12 border border-zinc-100 grid grid-cols-2 md:flex md:flex-row justify-between items-center gap-4 md:gap-4 divide-x divide-zinc-100 md:divide-x">
          {service.stats.map((stat, idx) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
              key={idx} 
              className={`text-center px-2 ${idx === 2 && service.stats.length === 3 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-orange mb-1 tracking-tight">{stat.value}</div>
              <div className="text-[9px] sm:text-[10px] md:text-sm font-semibold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 container mx-auto px-6 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-zinc-900 mb-6 tracking-tight">Overview</h2>
            <div className="w-20 h-1 bg-brand-orange mb-8"></div>
            <p className="text-lg text-zinc-600 leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {service.features.map((feature, idx) => {
                const IconComponent = iconMap[feature.iconName] || Eye;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    key={idx} 
                    className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-xl hover:border-zinc-300 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center mb-6 group-hover:bg-brand-orange group-hover:text-white text-zinc-900 transition-colors duration-300">
                      <IconComponent className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <h4 className="text-lg font-bold text-zinc-900 mb-3 tracking-tight">{feature.title}</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Consultation CTA - Bottom for mobile */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 lg:mt-24 bg-zinc-50 p-8 sm:p-12 rounded-[2.5rem] border border-zinc-100 text-center max-w-4xl mx-auto"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-4 tracking-tight">Ready to elevate your portfolio?</h3>
          <p className="text-zinc-500 mb-8 max-w-xl mx-auto">Connect with our specialized team to discuss your tailored requirements and secure your premium investment future.</p>
          <Link to="/contact" className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-zinc-900 text-white font-medium transition-all duration-300 hover:bg-brand-orange hover:shadow-xl hover:-translate-y-1">
            Schedule Consultation
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default ServiceDetail;
