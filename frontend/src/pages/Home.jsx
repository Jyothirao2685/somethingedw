import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import About from '../components/About';
import OurTeam from '../components/OurTeam';
import Awards from '../components/Awards';
import Services from '../components/Services';
import FeaturedProperties from '../components/FeaturedProperties';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import PropertyCategories from '../components/PropertyCategories';

const Home = () => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="relative">
      {/* Modern Structural Hero */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 px-6 overflow-hidden bg-white border-b border-zinc-200">
        {/* Creative Architectural Backgrounds */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {/* Premium Atmospheric Glows */}
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-orange/20 blur-[150px] rounded-full pointer-events-none z-0"></div>
          <div className="absolute top-[10%] right-[-10%] w-[60%] h-[60%] bg-brand-blue/15 blur-[150px] rounded-full pointer-events-none z-0"></div>

          {/* Architectural "Building" Blocks (Subtle geometric shapes) */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="hidden md:block absolute bottom-0 left-[5%] w-32 h-[60vh] bg-gradient-to-t from-zinc-50 to-white/0 border-r border-t border-zinc-200/50 rounded-tr-3xl shadow-[20px_0_60px_-15px_rgba(0,0,0,0.05)] transform skew-x-[-3deg]"
          />
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
            className="hidden md:block absolute bottom-0 left-[20%] w-48 h-[45vh] bg-gradient-to-t from-brand-orange/5 to-white/0 border-r border-t border-brand-orange/10 rounded-tr-3xl shadow-[30px_0_80px_-20px_rgba(243,123,18,0.05)] transform skew-x-[-3deg]"
          />
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.1 }}
            className="hidden md:block absolute bottom-[-10%] right-[10%] w-64 h-[70vh] bg-gradient-to-t from-brand-blue/5 to-white/0 border-l border-t border-brand-blue/10 rounded-tl-[4rem] shadow-[-30px_0_80px_-20px_rgba(8,114,184,0.05)] transform skew-x-[4deg]"
          />
        </div>

        <div className="container mx-auto max-w-[1200px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-600 tracking-wide mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
              Ultra-Luxury Real Estate
            </div>

            <h1 className="text-4xl md:text-7xl font-bold text-zinc-900 mb-6 md:mb-8 tracking-tight leading-[1.1] md:leading-[1.05]">
              Curating the finest <br className="hidden md:block" />
              <span className="text-gradient">properties in Delhi NCR.</span>
            </h1>

            <p className="text-base md:text-xl text-zinc-500 mb-8 md:mb-12 max-w-2xl mx-auto font-light leading-relaxed px-4 md:px-0">
              We exclusively represent the most prestigious residential and commercial investments. Defined by service, driven by outstanding results.
            </p>


            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/properties" className="w-full sm:w-auto">
                <button className="btn-primary w-full">
                  Explore Portfolio
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <button className="btn-secondary w-full">
                  Book Consultation
                </button>
              </Link>
            </div>
          </motion.div>
        </div>


      </section>

      <About />
      <OurTeam />
      <Awards />
      <Services />
      <PropertyCategories />
      <FeaturedProperties />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default Home;
