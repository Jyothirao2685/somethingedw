import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail, Quote, Target, Heart } from 'lucide-react';
import teamImg from '../../../new images/team.jpeg';

const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "With over 20 years in ultra-luxury real estate, John brings unparalleled expertise.",
  },
  {
    name: "Jane Smith",
    role: "Head of Sales",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "Jane specializes in exclusive properties and discreet transactions for high-net-worth clients.",
  },
  {
    name: "Michael Johnson",
    role: "Legal Advisor",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "Ensuring every transaction is rigorous, compliant, and completely seamless.",
  },
  {
    name: "Sarah Williams",
    role: "Interior Consultant",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "Sarah helps clients envision the true potential of their luxury properties.",
  }
];

const Team = () => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

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
            About <span className="text-brand-orange">Adroit</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg"
          >
            Discover our journey, our vision, and the dedicated professionals behind our seamless luxury real estate experiences.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-[1200px] mt-16 relative z-20 space-y-32">
        
        {/* Our Story Section */}
        <section className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-zinc-200/50 group">
              <div className="absolute inset-0 bg-brand-orange/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
              <img 
                src={teamImg} 
                alt="Adroit Team" 
                className="w-full h-auto aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2"
          >
            <span className="text-brand-orange font-semibold tracking-widest uppercase text-xs mb-4 block">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6 tracking-tight">
              A Legacy of Excellence in Luxury Real Estate.
            </h2>
            <p className="text-zinc-500 text-lg mb-6 leading-relaxed">
              Adroit Group was founded on a simple yet profound principle: to redefine the luxury real estate experience through unwavering integrity, unmatched market intelligence, and truly personalized service. 
            </p>
            <p className="text-zinc-500 text-lg mb-8 leading-relaxed">
              Over the years, we have grown from a boutique agency into a premier consultancy, trusted by the nation's most respected developers and discerning investors alike. We don't just sell properties; we build enduring relationships and curate lifestyles.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Target className="w-8 h-8 text-brand-blue flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-zinc-900 mb-1">Our Mission</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">To deliver exceptional value and seamless transactions for every client.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Heart className="w-8 h-8 text-brand-orange flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-zinc-900 mb-1">Our Values</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">Transparency, dedication, and an uncompromising commitment to quality.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Founder's Message */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-[3rem] p-8 md:p-16 border border-zinc-100 shadow-xl shadow-zinc-200/50 relative overflow-hidden"
          >
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
            
            <div className="flex flex-col gap-12 items-center relative z-10 text-center">
              
              <div className="max-w-3xl mx-auto">
                <span className="text-brand-orange font-semibold tracking-widest uppercase text-xs mb-4 block">A Message From Our Founders</span>
                <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-6 leading-tight relative inline-block">
                  <Quote className="w-8 h-8 text-brand-orange/20 absolute -top-4 -left-6" />
                  "Our vision is to transform the complex landscape of real estate into a journey of absolute clarity and confidence for our clients."
                  <Quote className="w-8 h-8 text-brand-orange/20 absolute -bottom-4 -right-6 rotate-180" />
                </h3>
                <p className="text-zinc-500 text-lg leading-relaxed mt-8">
                  When we established Adroit, we noticed a significant gap in the market for genuine, transparent consultancy. We built our foundation on trust, ensuring that every recommendation we make is backed by rigorous research and a deep understanding of our clients' aspirations. Your success in real estate is the true measure of our legacy.
                </p>
              </div>

              {/* Side-by-side Founder Profiles */}
              <div className="flex flex-col sm:flex-row justify-center gap-16 md:gap-32 mt-4 pt-12 border-t border-zinc-100 w-full max-w-4xl">
                {/* Founder 1 */}
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-60 md:w-64 md:h-80 mb-6 overflow-hidden rounded-2xl shadow-lg border border-zinc-100">
                    <img 
                      src="/media/founder1.webp" 
                      alt="Manmeet ( Dimpy ) Arora" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <h4 className="text-2xl font-bold text-zinc-900">Manmeet ( Dimpy ) Arora</h4>
                  <p className="text-brand-orange text-sm font-bold uppercase tracking-wider mt-1">Founder</p>
                </div>

                {/* Founder 2 */}
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-60 md:w-64 md:h-80 mb-6 overflow-hidden rounded-2xl shadow-lg border border-zinc-100">
                    <img 
                      src="/media/founder2.webp" 
                      alt="Deepak Sethi" 
                      className="w-full h-full object-cover scale-[1.3] object-top" 
                    />
                  </div>
                  <h4 className="text-2xl font-bold text-zinc-900">Deepak Sethi</h4>
                  <p className="text-brand-orange text-sm font-bold uppercase tracking-wider mt-1">Founder</p>
                </div>
              </div>

            </div>
          </motion.div>
        </section>


      </div>
    </div>
  );
};

export default Team;
