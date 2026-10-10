import { useState, useRef } from 'react';
import { Award, ShieldCheck, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const About = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-24 bg-white border-b border-zinc-200 relative overflow-hidden">

      {/* Unique Topographic/Plot SVG Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10c20 20 40-20 60 0s20 40 0 60-40-20-60 0-20-40 0-60z' fill='none' stroke='%230872b8' stroke-width='1'/%3E%3Cpath d='M20 20c15 15 30-15 45 0s15 30 0 45-30-15-45 0-15-30 0-45z' fill='none' stroke='%230872b8' stroke-width='0.5'/%3E%3Cpath d='M30 30c10 10 20-10 30 0s10 20 0 30-20-10-30 0-10-20 0-30z' fill='none' stroke='%230872b8' stroke-width='0.5'/%3E%3C/svg%3E")`, backgroundSize: '150px 150px' }}></div>

      {/* Ambient Background Warmth */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-brand-orange/5 blur-[120px] rounded-full mix-blend-multiply pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* Left Side: Team Image Box + Trust Elements */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/3 flex flex-col gap-6"
          >
            {/* Small Video Box */}
            <div 
              onClick={toggleMute}
              className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-zinc-200 bg-zinc-100 relative group cursor-pointer"
            >
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/media/about-adroit.mp4" type="video/mp4" />
              </video>

              {/* Click to Unmute Overlay */}
              <AnimatePresence>
                {isMuted && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                  >
                    <div className="bg-zinc-900/60 backdrop-blur-md px-5 py-2.5 rounded-full flex items-center gap-3 border border-white/10 shadow-2xl">
                      <VolumeX className="w-4 h-4 text-white animate-pulse" />
                      <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">Click to unmute</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Custom Video Controls Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 z-30">
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-orange-dark to-brand-orange flex items-center justify-center text-white hover:scale-110 transition-all shadow-xl shadow-brand-orange/40 border border-brand-orange-light/30"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                    className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-blue-dark to-brand-blue flex items-center justify-center text-white hover:scale-110 transition-all shadow-xl shadow-brand-blue/40 border border-brand-blue-light/30"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-zinc-200 flex items-start gap-4 shadow-sm">
              <ShieldCheck className="w-8 h-8 text-brand-blue flex-shrink-0" strokeWidth={1.5} />
              <div>
                <h4 className="font-bold text-zinc-900 mb-1">100% Certified</h4>
                <p className="text-sm text-zinc-500">Authorized by top developers across Delhi NCR.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Trusting Us Text & Awards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-2/3"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Why Investors Trust Us.
            </h2>
            <p className="text-zinc-500 text-lg mb-6 leading-relaxed">
              Adroit Group has built an unshakeable reputation in the Delhi NCR real estate sector. Our clients—spanning luxury home buyers to institutional investors—trust our profound market knowledge and unwavering integrity when executing high-value transactions.
            </p>
            <p className="text-zinc-500 text-lg mb-10 leading-relaxed">
              We exclusively partner with the nation's most respected developers, ensuring every property we represent meets the highest standards of architectural excellence, legality, and premium living. Building trust isn't just a strategy; it's the core foundation of our entire legacy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-zinc-200 shadow-sm">
                <Award className="w-8 h-8 text-brand-orange mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-zinc-900 mb-2">Recognised by DLF</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  We cherish our long-standing partnership with DLF, having served as their premier channel partner across numerous prestigious projects.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-zinc-200 shadow-sm">
                <Award className="w-8 h-8 text-brand-blue mb-4" strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-zinc-900 mb-2">Platinum Channel Partner</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Proud to receive the Platinum award from Risland India, cementing our presence in luxury real estate.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
