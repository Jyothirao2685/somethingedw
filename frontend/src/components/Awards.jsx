import { motion } from 'framer-motion';
import awardImg from '../../../new images/award.jpeg';
import newAwardImg from '../../../new images/IMG_1262.JPG.jpeg';
import dlfImg from '../../../new images/dlf-min.jpg';
import changeNameImg from '../../../new images/change name.jpg';

const Awards = () => {
  return (
    <section className="py-24 bg-zinc-50 border-b border-zinc-200 relative overflow-hidden">
      
      {/* Premium Atmospheric Glows */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[50%] bg-brand-orange/15 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[50%] bg-brand-blue/15 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 max-w-[1200px] text-center relative z-10">
        <span className="text-brand-orange font-semibold tracking-widest uppercase text-xs mb-4 block">Excellence Recognized</span>
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-12 tracking-tight">
          Award-Winning Service
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Image 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2.5rem] shadow-2xl shadow-brand-blue/10 border border-white/80 relative group bg-white/60 backdrop-blur-2xl p-4 transition-all duration-300 hover:shadow-brand-orange/10"
          >
            <div className="relative overflow-hidden rounded-[2rem] w-full aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3]">
              <img 
                src={awardImg} 
                alt="Adroit Award" 
                className="w-full h-full object-cover object-center rounded-[2rem] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Image 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2.5rem] shadow-2xl shadow-brand-blue/10 border border-white/80 relative group bg-white/60 backdrop-blur-2xl p-4 transition-all duration-300 hover:shadow-brand-orange/10"
          >
            <div className="relative overflow-hidden rounded-[2rem] w-full aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3]">
              <img 
                src={newAwardImg} 
                alt="Adroit Excellence Award" 
                className="w-full h-full object-cover object-center rounded-[2rem] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Image 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2.5rem] shadow-2xl shadow-brand-blue/10 border border-white/80 relative group bg-white/60 backdrop-blur-2xl p-4 transition-all duration-300 hover:shadow-brand-orange/10"
          >
            <div className="relative overflow-hidden rounded-[2rem] w-full aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3]">
              <img 
                src={dlfImg} 
                alt="DLF Award" 
                className="w-full h-full object-cover object-center rounded-[2rem] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Image 4 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2.5rem] shadow-2xl shadow-brand-blue/10 border border-white/80 relative group bg-white/60 backdrop-blur-2xl p-4 transition-all duration-300 hover:shadow-brand-orange/10"
          >
            <div className="relative overflow-hidden rounded-[2rem] w-full aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/3]">
              <img 
                src={changeNameImg} 
                alt="Adroit Recognition" 
                className="w-full h-full object-cover object-center rounded-[2rem] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
