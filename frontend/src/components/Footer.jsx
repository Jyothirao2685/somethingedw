import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { locationsList } from '../data/locationsData';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="container mx-auto px-6 section-padding pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="text-2xl font-playfair font-bold text-white mb-6 inline-block">
              Adroit Real Estate Services
            </Link>
            <p className="text-sm leading-relaxed mb-8">
              A premier real estate consulting practice focused on high-end residential, commercial, and strategic investment properties.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/14cx3tPBxjN/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all duration-300">
                <span className="sr-only">Facebook</span>
                <span className="text-lg">f</span>
              </a>
              <a href="https://x.com/adroitrealesta1?s=11&t=QupAU6wu4mFHf04mY6jy2A" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all duration-300">
                <span className="sr-only">Twitter / X</span>
                <span className="text-lg">X</span>
              </a>
              <a href="https://www.instagram.com/adroit__group?igsh=ejlibmQ3endpZ294&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-brand-orange hover:border-brand-orange hover:text-white transition-all duration-300">
                <span className="sr-only">Instagram</span>
                <span className="text-lg">in</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-playfair font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-brand-orange transition-colors flex items-center text-sm"><ArrowRight className="w-3 h-3 mr-2"/> About Us</Link></li>
              <li><Link to="/properties" className="hover:text-brand-orange transition-colors flex items-center text-sm"><ArrowRight className="w-3 h-3 mr-2"/> Properties</Link></li>
              <li><Link to="/contact" className="hover:text-brand-orange transition-colors flex items-center text-sm"><ArrowRight className="w-3 h-3 mr-2"/> Contact Us</Link></li>
              <li><Link to="/" className="hover:text-brand-orange transition-colors flex items-center text-sm"><ArrowRight className="w-3 h-3 mr-2"/> Careers</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-playfair font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-4">
              <li><Link to="/services/consulting-broking-collaborations" className="hover:text-brand-orange transition-colors flex items-center text-sm"><ArrowRight className="w-3 h-3 mr-2"/> Consulting, Broking & Collaborations</Link></li>
              <li><Link to="/services/interior-designing" className="hover:text-brand-orange transition-colors flex items-center text-sm"><ArrowRight className="w-3 h-3 mr-2"/> Interior Designing</Link></li>
              <li><Link to="/services/leasing-services" className="hover:text-brand-orange transition-colors flex items-center text-sm"><ArrowRight className="w-3 h-3 mr-2"/> Luxury Residential & Commercial Leasing</Link></li>
              <li><Link to="/services/property-management" className="hover:text-brand-orange transition-colors flex items-center text-sm"><ArrowRight className="w-3 h-3 mr-2"/> Property Management</Link></li>
              <li><Link to="/services/nri-investment-advisor" className="hover:text-brand-orange transition-colors flex items-center text-sm"><ArrowRight className="w-3 h-3 mr-2"/> NRI Investment Advisor</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-playfair font-semibold text-lg mb-6">Get In Touch</h4>
            <ul className="space-y-6">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-brand-orange mr-4 flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">Adroit Real Estate Services, 807 Sector 42<br/>Golf Course Road, Gurgaon, HR</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-brand-orange mr-4 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-2">
                  <a href="tel:+919999267833" className="text-sm hover:text-white transition-colors">+91-9999267833</a>
                  <a href="tel:+919810126216" className="text-sm hover:text-white transition-colors">+91-9810126216</a>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-brand-orange mr-4 flex-shrink-0" />
                <a href="mailto:info@adroitco.in" className="text-sm hover:text-white transition-colors">info@adroitco.in</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Location Tags Links Cloud Bar */}
        <div className="border-t border-slate-800/80 pt-8 pb-4">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-center">
            {locationsList.map((loc) => (
              <Link 
                key={loc.slug} 
                to={`/${loc.slug}`}
                className="text-xs text-slate-400 hover:text-brand-orange transition-colors duration-200"
              >
                {loc.name}
              </Link>
            ))}
          </div>
        </div>

      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-slate-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Adroit Real Estate Services. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
