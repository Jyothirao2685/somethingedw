import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import teamImg from '../../../new images/team.jpeg';

const OurTeam = () => {
  return (
    <section className="py-24 bg-zinc-50 border-b border-zinc-200 relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at center, #0872b8 1px, transparent 1px)`, backgroundSize: '32px 32px' }}></div>

      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
        <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-24 items-center">
          
          {/* Left Side: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/2"
          >
            <span className="text-brand-orange font-semibold tracking-widest uppercase text-xs mb-4 block">Dedicated Professionals</span>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Delivering a seamless luxury real estate experience.
            </h2>
            <p className="text-zinc-500 text-lg mb-8 leading-relaxed">
              Our expert team brings decades of combined experience in ultra-luxury real estate. We manage every single detail of your property journey—from initial consulting and rigorous legal vetting to the final seamless handover.
            </p>
            
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                <span className="text-zinc-700 font-medium">End-to-end transaction management</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                <span className="text-zinc-700 font-medium">Unparalleled market insights & analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                <span className="text-zinc-700 font-medium">100% transparent and discreet service</span>
              </div>
            </div>
            
            <Link to="/team">
              <button className="btn-primary">
                Meet The Team
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </Link>
          </motion.div>

          {/* Right Side: Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/2"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-zinc-200/50 group">
              <div className="absolute inset-0 bg-brand-orange/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
              <img 
                src={teamImg} 
                alt="Adroit Real Estate Team" 
                loading="lazy"
                decoding="async"
                className="w-full h-auto aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Decorative Accent */}
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-brand-orange/40 to-transparent blur-[40px] pointer-events-none z-10"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default OurTeam;
