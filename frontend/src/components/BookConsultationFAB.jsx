import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, MessageCircle, CalendarCheck, Send, CheckCircle, User, Loader2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL;

const BookingModal = ({ onClose }) => {
  const [mode, setMode] = useState('form'); // 'form' | 'success'
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', property_interest: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSubmitting(true);
    try {
      await fetch(`${API_BASE}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setMode('success');
    } catch {
      alert('Something went wrong. Please try calling us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-zinc-900/30 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="relative bg-zinc-950 px-8 pt-8 pb-10 overflow-hidden">
          <div className="absolute top-0 left-[-20%] w-[60%] h-full bg-brand-orange/30 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-[-20%] w-[60%] h-full bg-brand-blue/30 blur-[80px] rounded-full pointer-events-none" />
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <CalendarCheck className="w-5 h-5 text-brand-orange" />
              <span className="text-brand-orange text-xs font-semibold tracking-widest uppercase">Consultation</span>
            </div>
            <h2 className="text-2xl font-bold text-white leading-tight">
              {mode === 'success' ? 'Thank You!' : 'Expert Property Advice'}
            </h2>
            <p className="text-zinc-400 text-sm mt-1">
              {mode === 'success' ? 'We\'ll reach out to you shortly.' : 'Fill the form or connect with us directly.'}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-7">

          {/* SUCCESS */}
          {mode === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <p className="text-zinc-600 text-sm mb-6">Your enquiry has been received. Our team will contact you within 30 minutes during business hours.</p>
              <button onClick={onClose} className="btn-primary text-sm">Close</button>
            </motion.div>
          )}

          {/* ENQUIRY FORM */}
          {mode === 'form' && (
            <div className="flex flex-col gap-6">
              {/* QUICK CONNECT SECTION - NOW AT TOP */}
              <div className="pb-6 border-b border-zinc-100">
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:+919999267833"
                    className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-brand-orange/30 hover:bg-brand-orange/5 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center group-hover:bg-brand-orange transition-colors">
                      <Phone className="w-3.5 h-3.5 text-brand-orange group-hover:text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-tight">Call Now</span>
                  </a>

                  <a
                    href="https://wa.me/919999267833?text=Hi%2C%20I%20would%20like%20to%20book%20a%20property%20consultation."
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-emerald-400/30 hover:bg-emerald-50 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-500 group-hover:text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-tight">WhatsApp</span>
                  </a>
                </div>
                
                <div className="mt-4 text-center">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20">
                    <p className="text-[11px] font-bold text-brand-orange-dark tracking-tight">
                      +91 99992 67833 &nbsp;/&nbsp; +91 98101 26216
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 block">Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                      <input
                        type="text" required value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="Full Name"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-brand-orange transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 block">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                      <input
                        type="tel" required value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        placeholder="Mobile"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-brand-orange transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 block">Email (Optional)</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                    <input
                      type="email" value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-brand-orange transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 block">Message (Optional)</label>
                  <textarea
                    rows={2} value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us what you're looking for..."
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-brand-orange transition-all resize-none"
                  />
                </div>

                <button
                  type="submit" disabled={submitting}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-zinc-900 text-white font-bold text-[11px] uppercase tracking-wider hover:bg-brand-orange transition-colors disabled:opacity-60 mt-1"
                >
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  {submitting ? 'Submitting...' : 'Send Enquiry'}
                </button>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const BookConsultationFAB = () => {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-8 right-6 z-[100]"
          >
            <button
              id="fab-book-consultation"
              onClick={() => setModalOpen(true)}
              className="group relative flex items-center gap-3 pl-5 pr-6 py-3.5 rounded-full bg-zinc-900 text-white shadow-2xl shadow-zinc-900/40 hover:bg-brand-orange transition-all duration-300 hover:scale-105"
            >
              <span className="absolute -inset-1 rounded-full bg-brand-orange/20 animate-ping group-hover:hidden" />
              <CalendarCheck className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-semibold whitespace-nowrap">Talk to Expert</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalOpen && <BookingModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default BookConsultationFAB;
