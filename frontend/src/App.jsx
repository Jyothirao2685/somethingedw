import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';
import PropertyDetail from './pages/PropertyDetail';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import Team from './pages/Team';
import LocationDetail from './pages/LocationDetail';
import Footer from './components/Footer';
import BookConsultationFAB from './components/BookConsultationFAB';
import SEO from './components/SEO';

// Admin
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminProperties from './pages/admin/AdminProperties';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminFilters from './pages/admin/AdminFilters';

// Public layout wrapper
const PublicLayout = () => (
  <div className="flex flex-col min-h-screen relative">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
    <BookConsultationFAB />
  </div>
);

function App() {
  return (
    <Router>
      <SEO />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="enquiries" element={<AdminEnquiries />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="filters" element={<AdminFilters />} />
        </Route>

        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/properties/:slug" element={<PropertyDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
          {/* Dedicated Location Landing Pages (e.g., /atlanta, /alpharetta) */}
          <Route path="/:slug" element={<LocationDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
