import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { locationsData, locationsList } from '../data/locationsData';
import { 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  ArrowRight,
  Check
} from 'lucide-react';

const LocationDetail = () => {
  const { slug } = useParams();
  const location = locationsData[slug?.toLowerCase()];

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'United States',
    city: '',
    serviceType: 'Luxury Residential',
    timeline: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location) {
      setForm(prev => ({
        ...prev,
        city: location.name,
        country: location.country === 'USA' ? 'United States' : 'India'
      }));
    }
  }, [slug, location]);

  if (!location) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedMsg = `*New Location Inquiry (${location.name})*%0A*Name:* ${form.name}%0A*Email:* ${form.email}%0A*Phone:* ${form.phone}%0A*Location:* ${form.city}, ${form.country}%0A*Interest:* ${form.serviceType}%0A*Timeline:* ${form.timeline || 'Immediate'}%0A*Details:* ${form.message}`;
    window.open(`https://wa.me/919999267833?text=${formattedMsg}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({
      name: '',
      email: '',
      phone: '',
      country: 'United States',
      city: location.name,
      serviceType: 'Luxury Residential',
      timeline: '',
      message: ''
    });
  };

  const scrollToContact = () => {
    const contactElement = document.getElementById('location-contact-form');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={location.heroImage} 
            alt={`Real Estate in ${location.name}`} 
            className="w-full h-full object-cover scale-105 transform motion-safe:animate-[pulse_10s_ease-in-out_infinite]" 
          />
          <div className="absolute inset-0 bg-zinc-950/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-[1200px] text-center pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 backdrop-blur-md mb-6"
          >
            <span className="text-xs font-semibold text-brand-orange tracking-widest uppercase">
              Adroit Real Estate Services
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight font-playfair uppercase"
          >
            {location.heroTitle}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto font-light leading-relaxed"
          >
            {location.heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* ── 2. THREE PILLARS HIGHLIGHT BAR ── */}
      <section className="relative -mt-10 md:-mt-14 z-20 container mx-auto px-4 sm:px-6 max-w-[1100px]">
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl p-6 sm:p-8 md:p-10 border border-zinc-100 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-zinc-100">
          
          <div className="flex items-center justify-center gap-3 pt-2 md:pt-0">
            <Building2 className="w-5 h-5 text-brand-orange flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-zinc-800 uppercase">
              Local Expertise
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 md:pt-0">
            <ShieldCheck className="w-5 h-5 text-brand-orange flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-zinc-800 uppercase">
              Flawless Execution
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4 md:pt-0">
            <Sparkles className="w-5 h-5 text-brand-orange flex-shrink-0" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-zinc-800 uppercase">
              Luxury Standard
            </span>
          </div>

        </div>
      </section>

      {/* ── 3. SERVICES & INQUIRY CARD SECTION ── */}
      <section className="py-20 md:py-28 container mx-auto px-6 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Services & Overview */}
          <div className="lg:w-3/5">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-6 tracking-tight font-playfair">
              {location.overviewTitle}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-brand-orange to-brand-blue mb-8 rounded-full"></div>
            
            <div className="space-y-6 text-zinc-600 text-base sm:text-lg leading-relaxed">
              {location.overviewParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* Right Column: Curate Your Vision Sticky Card */}
          <div className="lg:w-2/5 w-full sticky top-28">
            <div className="bg-gradient-to-b from-white to-zinc-50/80 p-8 sm:p-10 rounded-3xl border border-zinc-200/80 shadow-2xl shadow-zinc-900/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange to-brand-blue"></div>
              
              <h3 className="text-2xl font-bold text-zinc-900 mb-3 tracking-tight font-playfair">
                Curate Your Vision
              </h3>
              <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                Ready to plan your next real estate acquisition in {location.name}? We would love to make your investment journey seamless and rewarding.
              </p>

              <ul className="space-y-3.5 mb-8">
                {location.curateBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-center text-sm font-medium text-zinc-700">
                    <span className="w-5 h-5 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <button
                onClick={scrollToContact}
                className="w-full inline-flex items-center justify-center gap-2 h-14 rounded-2xl bg-zinc-950 text-white font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-brand-orange hover:shadow-xl hover:shadow-brand-orange/25 group cursor-pointer"
              >
                <span>INQUIRE NOW</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. LEAD CAPTURE / CONTACT FORM ── */}
      <section id="location-contact-form" className="py-20 md:py-28 bg-zinc-50 border-t border-zinc-200 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-brand-orange/10 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-brand-blue/10 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-brand-orange font-semibold tracking-widest uppercase text-xs mb-3 block">
              We'd Love To Hear From You
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight font-playfair uppercase">
              TELL US ABOUT YOUR INVESTMENT REQUIREMENTS.
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Left: Contact Info */}
            <div className="lg:w-2/5 flex flex-col gap-6">
              <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-2">Get in Touch</span>
                <h3 className="text-2xl font-bold text-zinc-900 mb-3 tracking-tight font-playfair">
                  Let's Create Something <span className="text-brand-orange">Extraordinary</span>
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Ready to invest or acquire luxury real estate in {location.name}? Tell us about your goals and our team of senior advisors will craft a bespoke proposal tailored just for you.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Location</div>
                    <div className="text-sm font-semibold text-zinc-800">Adroit Real Estate Services, Sector 42, Golf Course Road, Gurgaon, HR</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Email</div>
                    <a href="mailto:info@adroitco.in" className="text-sm font-semibold text-zinc-800 hover:text-brand-orange transition-colors">info@adroitco.in</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Direct Line</div>
                    <div className="flex flex-col text-sm font-semibold text-zinc-800">
                      <a href="tel:+919999267833" className="hover:text-brand-orange transition-colors">+91-9999267833</a>
                      <a href="tel:+919810126216" className="hover:text-brand-orange transition-colors">+91-9810126216</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Lead Capture Form */}
            <div className="lg:w-3/5 w-full">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200 shadow-xl">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <CheckCircle2 className="w-16 h-16 text-brand-orange mb-4 animate-bounce" strokeWidth={1.5} />
                    <h3 className="text-2xl font-bold text-zinc-900 mb-2 font-playfair">Thank You for Connecting!</h3>
                    <p className="text-zinc-500 max-w-md">Our senior real estate advisory team for {location.name} will reach out to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="px-4 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:border-brand-orange focus:bg-white transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="px-4 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:border-brand-orange focus:bg-white transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Mobile Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="+1 (555) 000-0000 / +91 99992 67833"
                        className="px-4 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:border-brand-orange focus:bg-white transition-all"
                      />
                    </div>

                    {/* Country & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Country</label>
                        <input
                          type="text"
                          name="country"
                          value={form.country}
                          onChange={handleChange}
                          placeholder="United States / India"
                          className="px-4 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:border-brand-orange focus:bg-white transition-all"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">City</label>
                        <input
                          type="text"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          placeholder={location.name}
                          className="px-4 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:border-brand-orange focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Service Type & Timeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Service Type</label>
                        <select
                          name="serviceType"
                          value={form.serviceType}
                          onChange={handleChange}
                          className="px-4 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:border-brand-orange focus:bg-white transition-all"
                        >
                          <option value="Luxury Residential">Luxury Residential Acquisition</option>
                          <option value="Commercial Real Estate">Commercial Real Estate / Leasing</option>
                          <option value="NRI Investment Advisory">NRI Investment Advisory</option>
                          <option value="Property Management">Property Management</option>
                          <option value="Interior Designing">Turnkey Interior Designing</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Target Timeline</label>
                        <input
                          type="text"
                          name="timeline"
                          value={form.timeline}
                          onChange={handleChange}
                          placeholder="Immediate / Within 3 Months"
                          className="px-4 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:border-brand-orange focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Tell Us More About Your Requirements</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder={`Describe your ideal property, budget, or advisory requirements in ${location.name}...`}
                        className="px-4 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm focus:outline-none focus:border-brand-orange focus:bg-white transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-2xl bg-zinc-950 text-white font-semibold text-sm hover:bg-brand-orange hover:shadow-xl hover:shadow-brand-orange/25 transition-all duration-300 mt-2 cursor-pointer"
                    >
                      <span>LET'S TALK</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default LocationDetail;
