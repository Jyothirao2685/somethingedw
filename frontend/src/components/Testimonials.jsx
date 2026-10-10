import { useState, useEffect, useCallback } from 'react';
import { Quote, Loader2, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API = import.meta.env.VITE_API_URL;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${API}/testimonials`);
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, testimonials.length]);

  if (loading) return null;
  if (testimonials.length === 0) return null;

  return (
    <section className="section-padding bg-zinc-50 border-b border-zinc-200 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[60%] h-[60%] bg-brand-orange/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[20%] w-[60%] h-[60%] bg-brand-blue/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-orange font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Client Perspectives</span>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
            Endorsements of Trust
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white p-6 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] border border-zinc-100 shadow-xl shadow-zinc-200/50 flex flex-col items-center text-center"
              >
                <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-brand-orange/20 mb-6" />
                <p className="text-base sm:text-lg md:text-xl text-zinc-700 italic font-light leading-relaxed mb-8">
                  "{testimonials[currentIndex].content}"
                </p>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400 mb-3 border-2 border-white shadow-md">
                    <User className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 leading-tight">{testimonials[currentIndex].name}</h4>
                  <p className="text-[9px] sm:text-[10px] text-brand-orange font-bold uppercase tracking-widest mt-1.5">{testimonials[currentIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 px-4">
              {testimonials.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-brand-orange' : 'bg-zinc-200 hover:bg-zinc-300'}`}
                />
              ))}
            </div>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
