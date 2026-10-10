import { ShieldCheck, Target, Award, Gem } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    { title: "Trusted Advisors", desc: "Decades of profound experience navigating the Delhi NCR premium real estate market.", icon: <ShieldCheck className="w-6 h-6 text-brand-orange" strokeWidth={1.5} /> },
    { title: "Exclusive Access", desc: "Immediate access to highly coveted luxury and elite investment properties.", icon: <Gem className="w-6 h-6 text-brand-blue" strokeWidth={1.5} /> },
    { title: "End-to-End Support", desc: "Seamless confidential assistance from initial browsing through to property handover.", icon: <Target className="w-6 h-6 text-brand-orange" strokeWidth={1.5} /> },
    { title: "Award Winning", desc: "Recognized extensively by leading developers like DLF and Risland for absolute excellence.", icon: <Award className="w-6 h-6 text-brand-blue" strokeWidth={1.5} /> }
  ];

  return (
    <section className="py-16 bg-zinc-50 border-b border-zinc-200 relative overflow-hidden">
      
      {/* Diagonal Drafting Lines Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(45deg, #0872b8 0, #0872b8 1px, transparent 0, transparent 50%)`, backgroundSize: '16px 16px' }}></div>

      {/* Premium Atmospheric Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-orange/15 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-blue/15 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20">
          
          <div className="lg:w-1/2">
            <span className="text-brand-orange font-semibold tracking-widest uppercase text-xs mb-4 block">Our Standard</span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6 tracking-tight leading-tight">
              An Uncompromising <br />Commitment to Quality
            </h2>
            <div className="w-16 h-1 bg-brand-blue mb-6"></div>
            <p className="text-zinc-500 text-lg mb-8 leading-relaxed">
              We do not merely facilitate transactions; we cultivate lasting relationships. Our steadfast dedication to absolute excellence and unmatched market knowledge makes us your definitive real estate partner.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              {reasons.map((reason, idx) => (
                <div key={idx} className="flex flex-col bg-white/60 backdrop-blur-2xl p-5 rounded-3xl border border-white/80 shadow-lg shadow-brand-blue/5 hover:shadow-xl hover:shadow-brand-orange/10 hover:bg-white/80 transition-all duration-300 group">
                  <div className="mb-3 w-10 h-10 rounded-2xl bg-gradient-to-br from-white to-zinc-50 shadow-sm border border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {reason.icon}
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 mb-1.5 tracking-tight">{reason.title}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative mt-8 lg:mt-0 px-2 sm:px-0">
            <div className="relative h-[350px] md:h-[450px] w-full">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80" 
                alt="Luxury Real Estate Partner" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-3xl shadow-xl" 
              />
              
              {/* Floating Stat */}
              <div className="absolute -bottom-6 -left-2 sm:bottom-12 sm:-left-8 lg:-left-12 bg-white/80 backdrop-blur-2xl text-zinc-900 p-6 sm:p-8 shadow-2xl shadow-brand-blue/10 rounded-3xl border border-white max-w-[200px] sm:max-w-[240px]">
                <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue mb-1 sm:mb-2">1,000+</div>
                <div className="text-[10px] sm:text-xs font-bold tracking-wide text-zinc-500 uppercase">Satisfied Premium Clients</div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
