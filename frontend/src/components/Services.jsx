import { Building, Building2, Handshake, Key, Paintbrush, ArrowUpRight, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Real estate Consulting, Broking & Collaborations",
      description: "Comprehensive end-to-end support for luxury property transactions, construction projects, and strategic collaborations.",
      icon: <Building className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} />,
      colSpan: "col-span-2",
      dark: true,
      slug: "consulting-broking-collaborations"
    },
    {
      title: "Property Management",
      description: "Tailored management solutions ensuring pristine property operations.",
      icon: <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-900" strokeWidth={1.5} />,
      colSpan: "col-span-1",
      dark: false,
      slug: "property-management"
    },
    {
      title: "Luxury Residential & Commercial Leasing",
      description: "Ensuring premium property receives the extensive market exposure.",
      icon: <Key className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-900" strokeWidth={1.5} />,
      colSpan: "col-span-1",
      dark: false,
      slug: "leasing-services"
    },
    {
      title: "Interior Designing",
      description: "Bespoke residential and office interior design services.",
      icon: <Paintbrush className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-900" strokeWidth={1.5} />,
      colSpan: "col-span-1",
      dark: false,
      slug: "interior-designing"
    },
    {
      title: "NRI Investment Advisor",
      description: "Specialized consulting for Non-Resident Indians to navigate the market.",
      icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-900" strokeWidth={1.5} />,
      colSpan: "col-span-1",
      dark: false,
      slug: "nri-investment-advisor"
    }
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-zinc-50 border-b border-zinc-200 relative overflow-hidden">
      
      {/* Architectural Dotted Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at center, #f37b12 1px, transparent 1px)`, backgroundSize: '32px 32px' }}></div>

      {/* Premium Atmospheric Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] bg-brand-blue/15 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[70%] bg-brand-orange/15 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="container mx-auto px-4 sm:px-6 max-w-[1200px] relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <span className="text-brand-orange font-semibold tracking-widest uppercase text-xs mb-4 block">Our Expertise</span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4 md:mb-6 tracking-tight">
              Comprehensive Services
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {services.map((service, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={idx} 
              onClick={() => navigate(`/services/${service.slug}`)}
              className={`cursor-pointer p-4 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-500 flex flex-col group relative overflow-hidden ${service.colSpan} ${
                service.dark 
                  ? "bg-zinc-900 border-zinc-800 hover:shadow-2xl hover:shadow-zinc-900/20" 
                  : "bg-white/60 backdrop-blur-2xl border-white/80 hover:border-white hover:shadow-xl hover:shadow-brand-blue/10 hover:bg-white/80"
              }`}
            >
              {service.dark && (
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-orange/20 blur-[80px] group-hover:bg-brand-orange/30 transition-colors duration-700"></div>
              )}
              
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 ${
                service.dark ? "bg-white/10 border border-white/10 backdrop-blur-sm" : "bg-gradient-to-br from-white to-zinc-50 border border-white shadow-sm"
              }`}>
                {service.icon}
              </div>
              
              <h3 className={`text-xl md:text-2xl font-bold mb-4 tracking-tight ${service.dark ? "text-white" : "text-zinc-900"}`}>
                {service.title}
              </h3>
              
              <p className={`leading-relaxed text-sm md:text-base flex-grow ${service.dark ? "text-zinc-400" : "text-zinc-500"}`}>
                {service.description}
              </p>

              <div className="mt-8 flex justify-end items-end">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  service.dark 
                    ? "bg-white/10 text-white group-hover:bg-brand-orange group-hover:-rotate-12 group-hover:scale-110" 
                    : "bg-zinc-50 text-zinc-400 border border-zinc-100 group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white group-hover:-rotate-12 group-hover:scale-110"
                }`}>
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
