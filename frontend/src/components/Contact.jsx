import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // WhatsApp redirect with form data
    const msg = `Hello Adroit Group,%0AName: ${form.name}%0APhone: ${form.phone}%0AEmail: ${form.email}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/919999267833?text=${msg}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5 text-brand-orange" strokeWidth={1.5} />,
      label: "Call Us",
      value: "+91 99992 67833 / +91 98101 26216",
      href: "tel:+919999267833"
    },
    {
      icon: <Mail className="w-5 h-5 text-brand-blue" strokeWidth={1.5} />,
      label: "Email Us",
      value: "info@adroitgroup.in",
      href: "mailto:info@adroitgroup.in"
    },
    {
      icon: <MapPin className="w-5 h-5 text-brand-orange" strokeWidth={1.5} />,
      label: "Visit Us",
      value: "Adroit Group, 807 Sector 42, Golf Course Road, Gurgaon, HR",
      href: "https://maps.google.com/?q=Adroit+Group+807+Sector+42+Gurgaon"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-white border-b border-zinc-200 relative overflow-hidden">

      {/* Premium Atmospheric Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] bg-brand-orange/15 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] bg-brand-blue/15 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-orange font-semibold tracking-widest uppercase text-xs mb-4 block">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
            Let's Find Your Dream Property
          </h2>
          <p className="text-zinc-500 text-lg max-w-xl mx-auto leading-relaxed">
            Reach out to our expert team today for a confidential consultation.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-2/5 flex flex-col gap-6"
          >
            {/* Brand Statement */}
            <div className="bg-white/60 backdrop-blur-2xl p-8 rounded-3xl border border-white/80 shadow-lg shadow-brand-blue/5">
              <div className="w-12 h-1 bg-gradient-to-r from-brand-orange to-brand-blue rounded-full mb-6"></div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight">
                Your Vision, Our Expertise
              </h3>
              <p className="text-zinc-500 leading-relaxed text-sm">
                With decades of experience in Delhi NCR's ultra-luxury real estate market, Adroit Group is your most trusted advisor. We're available 7 days a week for private consultations.
              </p>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-4">
              {contactInfo.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/60 backdrop-blur-2xl p-5 rounded-2xl border border-white/80 shadow-md shadow-brand-blue/5 flex items-center gap-4 group hover:shadow-xl hover:shadow-brand-orange/10 hover:bg-white/80 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-white to-zinc-50 border border-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wide mb-0.5">{item.label}</div>
                    <div className="text-zinc-800 font-semibold text-sm">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-3/5"
          >
            <div className="bg-white/60 backdrop-blur-2xl p-8 md:p-10 rounded-3xl border border-white/80 shadow-xl shadow-brand-blue/5">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <CheckCircle2 className="w-16 h-16 text-brand-orange mb-4" strokeWidth={1.5} />
                  <h3 className="text-2xl font-bold text-zinc-900 mb-2">Message Sent!</h3>
                  <p className="text-zinc-500">Our team will be in touch with you very shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Full Name</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                        className="px-4 py-3 rounded-xl bg-white/80 border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Phone Number</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                        className="px-4 py-3 rounded-xl bg-white/80 border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="px-4 py-3 rounded-xl bg-white/80 border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Your Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="I'm looking for a luxury apartment in DLF Privana South..."
                      className="px-4 py-3 rounded-xl bg-white/80 border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-3 h-14 px-10 rounded-2xl bg-gradient-to-r from-brand-orange-dark to-brand-orange text-white font-semibold text-sm hover:shadow-xl hover:shadow-brand-orange/30 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                    Send Message via WhatsApp
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
