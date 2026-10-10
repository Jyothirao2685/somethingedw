import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = () => {
  const location = useLocation();

  useEffect(() => {
    let title = "Adroit Group | Luxury Real Estate Delhi NCR";
    let metaDescription = "Adroit Group - India's premier luxury real estate advisory in Delhi NCR, Gurugram, and International markets.";

    const path = location.pathname;

    if (path === '/') {
      title = "Luxury Real Estate Advisory Delhi NCR | Adroit";
      metaDescription = "Adroit Group – India’s premier luxury real estate advisory in Delhi NCR & Gurugram. Expert consultants for premium properties, NRI investment & leasing services.";
    } else if (path === '/properties' || path.startsWith('/properties/')) {
      // General properties title, but wait, specific properties will match startWith if I use it. 
      // User only provided title for /properties. I'll stick to exact match for /properties.
      if (path === '/properties') {
        title = "Luxury Properties for Sale Gurugram | Adroit";
        metaDescription = "Explore premium luxury properties for sale in Gurugram & Delhi NCR. From luxury flats on Golf Course Road to high-end residential projects – find your dream home today.";
      }
    } else if (path === '/services/interior-designing') {
      title = "Luxury Interior Designing Delhi NCR | Adroit";
      metaDescription = "Transform your home with Adroit’s luxury interior design services in Delhi-NCR & Gurugram. Premium designs crafted for high-end apartments & luxury residences.";
    } else if (path === '/services/leasing-services') {
      title = "Property Leasing Services Delhi NCR | Adroit";
      metaDescription = "Adroit Group offers expert property leasing services in Delhi-NCR and Gurugram. Find premium rental homes, luxury apartments & commercial spaces with ease.";
    } else if (path === '/services/property-management') {
      title = "Property Management Services Gurugram | Adroit";
      metaDescription = "Professional property management services in Gurugram & Delhi NCR. Adroit Group handles rental management, maintenance & luxury property care with full transparency.";
    } else if (path === '/services/nri-investment-advisor') {
      title = "NRI Property Investment Advisor India | Adroit";
      metaDescription = "Adroit Group – trusted NRI property investment advisor in India. Buy luxury real estate in Gurugram & Delhi NCR with expert NRI consultation & end-to-end support.";
    }

    document.title = title;
    
    let metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (!metaDescriptionTag) {
      metaDescriptionTag = document.createElement('meta');
      metaDescriptionTag.name = 'description';
      document.head.appendChild(metaDescriptionTag);
    }
    metaDescriptionTag.setAttribute('content', metaDescription);

  }, [location]);

  return null;
};

export default SEO;
