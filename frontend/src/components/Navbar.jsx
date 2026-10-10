import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transparentOrigins = ['/'];
  const isTransparent = transparentOrigins.includes(location.pathname) && !isScrolled;

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent py-4 md:py-6' : 'bg-white/90 backdrop-blur-md border-b border-zinc-100 py-3 md:py-4 shadow-sm'}`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src="/media/logo.png" 
            alt="Adroit" 
            className="h-10 md:h-12 w-auto transition-all duration-300 object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {['Home', 'Properties', 'Team', 'Blog', 'Contact'].map((item) => (
            <Link 
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
              className={`text-sm font-medium transition-colors hover:text-brand-orange ${isTransparent ? 'text-white/80 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              {item}
            </Link>
          ))}
          
          <a href="tel:+919999267833" className={`text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-300 ${isTransparent ? 'bg-white text-zinc-900 hover:bg-brand-orange hover:text-white' : 'bg-zinc-900 text-white hover:bg-brand-orange'}`}>
            Book Consultation
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-zinc-900" />
          ) : (
            <Menu className={`w-6 h-6 transition-colors duration-300 ${isTransparent ? 'text-zinc-900' : 'text-zinc-900'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-zinc-100 shadow-xl py-6 px-6 flex flex-col space-y-4 overflow-hidden"
          >
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-zinc-900 font-medium py-2">Home</Link>
            <Link to="/properties" onClick={() => setMobileMenuOpen(false)} className="text-zinc-900 font-medium py-2">Properties</Link>
            <Link to="/team" onClick={() => setMobileMenuOpen(false)} className="text-zinc-900 font-medium py-2">Team</Link>
            <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="text-zinc-900 font-medium py-2">Blog</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-zinc-900 font-medium py-2">Contact</Link>
            <a href="tel:+919999267833" className="bg-zinc-900 text-white mt-4 text-center py-3 rounded-xl font-medium">Book Consultation</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
