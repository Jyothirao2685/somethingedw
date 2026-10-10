import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/contact`, formData);
      setStatus({ type: 'success', msg: 'Thank you for your inquiry. A senior advisor will contact you shortly.' });
      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', msg: 'Unable to process your request at this moment. Please call us directly.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-24 bg-zinc-50 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl mt-12">
        <div className="bg-white rounded-sm shadow-xl shadow-slate-900/5 flex flex-col-reverse md:flex-row border border-slate-200 overflow-hidden">
          
          {/* Info Side */}
          <div className="md:w-5/12 bg-slate-900 text-white p-12 lg:p-16 flex flex-col justify-center relative">
            <div className="relative z-10">
              <span className="text-brand-orange font-semibold tracking-widest uppercase text-xs mb-4 block">Connect with Us</span>
              <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-6 tracking-tight">Schedule an Advisory Session</h2>
              <p className="text-slate-400 font-light mb-12 leading-relaxed">
                Experience unparalleled personalized guidance. Connect with our senior real estate advisors to discuss premium acquisitions or leasing opportunities.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-5">
                  <div className="mt-1">
                    <MapPin className="w-6 h-6 text-brand-orange" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest mb-1.5">Headquarters</div>
                    <div className="font-medium text-slate-100 leading-relaxed">Adroit Group, 807 Sector 42<br/>Golf Course Road, Gurgaon, HR</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-5">
                  <div className="mt-1">
                    <Phone className="w-6 h-6 text-brand-orange" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest mb-1.5">Direct Line</div>
                    <div className="flex flex-col gap-2">
                      <a href="tel:+919999267833" className="font-medium text-slate-100 hover:text-brand-orange transition-colors">+91-9999267833</a>
                      <a href="tel:+919810126216" className="font-medium text-slate-100 hover:text-brand-orange transition-colors">+91-9810126216</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-5">
                  <div className="mt-1">
                    <Mail className="w-6 h-6 text-brand-orange" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest mb-1.5">Electronic Mail</div>
                    <a href="mailto:info@adroitco.in" className="font-medium text-slate-100 hover:text-brand-orange transition-colors">info@adroitco.in</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:w-7/12 p-12 lg:p-16 bg-white">
            <h3 className="text-2xl font-playfair font-bold text-slate-900 mb-8">Send an Inquiry</h3>
            
            {status.msg && (
              <div className={`mb-8 p-4 border rounded-sm text-sm ${status.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
                {status.msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 bg-zinc-50 border border-slate-200 rounded-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors text-slate-900 placeholder-slate-400"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  className="w-full px-4 py-3 bg-zinc-50 border border-slate-200 rounded-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors text-slate-900 placeholder-slate-400"
                  placeholder="+91-0000000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Message</label>
                <textarea 
                  rows="4"
                  className="w-full px-4 py-3 bg-zinc-50 border border-slate-200 rounded-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors resize-none text-slate-900 placeholder-slate-400"
                  placeholder="How can our comprehensive services assist you?"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Submit Inquiry <Send className="w-4 h-4 ml-2" /></>
                )}
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
