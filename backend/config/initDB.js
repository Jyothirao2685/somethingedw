import pool from './db.js';
import fs from 'fs';

const initDB = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('✅ Connected to MySQL. Initializing tables...');

    // Admin users
    await conn.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('superadmin', 'admin', 'editor') DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('  ✓ admin_users table ready');

    // Seed default admin
    const [existing] = await conn.query("SELECT id FROM admin_users WHERE username = 'admin'");
    if (existing.length === 0) {
      await conn.query("INSERT INTO admin_users (username, password, role) VALUES ('admin', 'admin123', 'superadmin')");
      console.log('  ✓ default admin seeded (admin / admin123)');
    }

    // Enquiries
    await conn.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255),
        message TEXT,
        property_interest VARCHAR(255),
        status ENUM('new', 'contacted', 'qualified', 'closed') DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('  ✓ enquiries table ready');

    // Properties
    await conn.query(`
      CREATE TABLE IF NOT EXISTS properties (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        location VARCHAR(255),
        price VARCHAR(100),
        price_per_sqft VARCHAR(100),
        status VARCHAR(100),
        type VARCHAR(100),
        category VARCHAR(50) DEFAULT 'residential',
        image VARCHAR(1000),
        gallery JSON,
        developer VARCHAR(255),
        configurations JSON,
        area VARCHAR(100),
        floors VARCHAR(100),
        possession VARCHAR(100),
        rera VARCHAR(255),
        highlights JSON,
        about TEXT,
        meta_title VARCHAR(255),
        meta_description TEXT,
        meta_keywords VARCHAR(500),
        priority INT DEFAULT 0,
        show_on_home TINYINT(1) DEFAULT 0,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('  ✓ properties table ready');

    // Add category column if missing
    try {
      await conn.query("ALTER TABLE properties ADD COLUMN category VARCHAR(50) DEFAULT 'residential'");
      console.log('  ✓ added category column to properties table');
    } catch (e) {
      if (e.code !== 'ER_DUP_FIELDNAME') {
        console.error('Error adding category column:', e.message);
      }
    }

    // Blog posts
    await conn.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        excerpt TEXT,
        content LONGTEXT,
        category VARCHAR(100),
        category_color VARCHAR(20) DEFAULT 'orange',
        author VARCHAR(255) DEFAULT 'Adroit Team',
        image VARCHAR(1000),
        tags JSON,
        read_time VARCHAR(50),
        meta_title VARCHAR(255),
        meta_description TEXT,
        meta_keywords VARCHAR(500),
        is_published TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('  ✓ blog_posts table ready');

    // Activity Logs
    await conn.query(`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        admin_id INT,
        action VARCHAR(255),
        details TEXT,
        ip_address VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('  ✓ activity_logs table ready');

    // Testimonials
    await conn.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255),
        content TEXT NOT NULL,
        rating INT DEFAULT 5,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('  ✓ testimonials table ready');

    // Locations (Dynamic Filters)
    await conn.query(`
      CREATE TABLE IF NOT EXISTS locations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        is_active TINYINT(1) DEFAULT 1
      )
    `);
    console.log('  ✓ locations table ready');

    // Seed initial locations
    const [lCount] = await conn.query("SELECT COUNT(*) as count FROM locations");
    if (lCount[0].count === 0) {
      const initialLocations = ['Delhi', 'Gurugram', 'Dubai'];
      for (const name of initialLocations) {
        await conn.query("INSERT INTO locations (name) VALUES (?)", [name]);
      }
      console.log('  ✓ initial locations seeded');
    }

    // Property Categories (Dynamic Filters)
    await conn.query(`
      CREATE TABLE IF NOT EXISTS property_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        is_active TINYINT(1) DEFAULT 1
      )
    `);
    console.log('  ✓ property_categories table ready');

    // Seed initial categories
    const [cCount] = await conn.query("SELECT COUNT(*) as count FROM property_categories");
    if (cCount[0].count === 0) {
      const initialCategories = [
        { name: 'Residential', slug: 'residential' },
        { name: 'Commercial', slug: 'commercial' }
      ];
      for (const cat of initialCategories) {
        await conn.query("INSERT INTO property_categories (name, slug) VALUES (?, ?)", [cat.name, cat.slug]);
      }
      console.log('  ✓ initial categories seeded');
    }

    // Seed initial testimonials
    const [tCount] = await conn.query("SELECT COUNT(*) as count FROM testimonials");
    if (tCount[0].count === 0) {
      const initialTestimonials = [
        {
          name: 'Navnit Singh',
          role: 'Property Investor',
          content: 'I would highly recommend Adroit real estate for all your current and future real estate needs. You can expect a very professional and trustworthy service. They have helped me purchase 2 properties over a period of 5 years.'
        },
        {
          name: 'Manish Dhawan',
          role: 'NRI Client',
          content: 'Thorough professionals and exceptional services. The team understood my rigorous requirements well and managed every detail for me as I was not living in India. Highly recommend their real estate practice.'
        },
        {
          name: 'Ashwarya Sinha',
          role: 'Homeowner',
          content: 'The professionalism exhibited by the team is unmatched. They went out of their way to understand our specific requirements and guided us through the complex documentation and legal formalities flawlessly.'
        }
      ];
      for (const t of initialTestimonials) {
        await conn.query("INSERT INTO testimonials (name, role, content) VALUES (?, ?, ?)", [t.name, t.role, t.content]);
      }
      console.log('  ✓ initial testimonials seeded');
    }

    // Legacy leads table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        phone VARCHAR(20),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('  ✓ leads table ready');

    console.log('✅ Database initialized successfully.');

    // Auto-migration removed.

    // Massive Property Seeder
    if (fs.existsSync('seed_flag.txt')) {
      console.log('🌱 Seed flag found! Injecting 11 properties into the database...');
      const newProperties = [
        {
          slug: 'bptp-downtown-66-sector-66-gurgaon',
          title: 'BPTP Downtown 66',
          location: 'Sector 66, Gurgaon, Haryana 122001',
          price: 'Price on Request',
          price_per_sqft: 'Price on Request',
          status: 'Under Construction',
          type: 'High-Rise Residential',
          category: 'residential',
          image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80',
          gallery: JSON.stringify([]),
          developer: 'BPTP Group',
          configurations: JSON.stringify(['3 BHK', '3.5 BHK', '4 BHK']),
          area: '4.23 - 5 Acres',
          floors: 'G + 38 to 42 Floors',
          possession: 'October 2032',
          rera: 'GGM/981/713/2025/84 DATED 19.09.2025',
          highlights: JSON.stringify(['1.35 lakh sq. ft. Club Downtown-66', 'Designed by Aedas', 'IGBC Platinum pre-certification', 'Seismic Zone V standards']),
          about: 'BPTP Downtown 66 represents a significant evolution in the BPTP Group\'s portfolio, moving toward a sculptural, high-transparency architectural language. Situated in Sector 66, Gurgaon, the project is strategically positioned within a mature urban corridor that balances corporate proximity with residential tranquility.',
          meta_title: 'BPTP Downtown 66 | Ultra-Luxury 3 & 4 BHK Apartments Sector 66 Gurgaon',
          meta_description: 'Explore BPTP Downtown 66 in Sector 66, Gurgaon. Featuring 3.5 & 4 BHK luxury residences designed by Aedas with a 1.35 lakh sq. ft. clubhouse and iconic glass towers.',
          meta_keywords: 'BPTP Downtown 66, Sector 66 Gurgaon luxury flats, BPTP 3.5 BHK Gurgaon, Aedas designed apartments Gurgaon, luxury real estate Sector 66.',
          priority: 11,
          show_on_home: 1,
          is_active: 1
        },
        {
          slug: 'bptp-verti-greens-sector-102-gurgaon',
          title: 'BPTP Amstoria Verti Greens',
          location: 'Sector 102, Dwarka Expressway, Gurgaon',
          price: 'Price on Request',
          price_per_sqft: 'Price on Request',
          status: 'New Launch',
          type: 'Residential High-Rise',
          category: 'residential',
          image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80',
          gallery: JSON.stringify([]),
          developer: 'BPTP Limited',
          configurations: JSON.stringify(['2 BHK', '3 BHK']),
          area: '9.43 - 12.05 Acres',
          floors: 'G + 45 Floors',
          possession: 'June 2032',
          rera: 'RC/REP/HARERA/GGM/910/642/2025/13',
          highlights: JSON.stringify(['15 Sky Gardens', 'Seismic Zone V compliance', '10.33 feet floor-to-floor height', 'Vertical Lutyens Greens theme']),
          about: 'BPTP Amstoria Verti Greens, located in Sector 102 along the Dwarka Expressway, represents a specialized high-rise phase within the larger Amstoria township. The project is conceptualized around "Vertical Greens", seeking to integrate the lushness of traditional sprawling estates into a vertical, modern format.',
          meta_title: 'BPTP Verti Greens | Luxury Vertical Garden Living Sector 102 Gurgaon',
          meta_description: 'Discover BPTP Amstoria Verti Greens in Sector 102, Dwarka Expressway. Ultra-luxury 2 & 3 BHK apartments with 15 sky gardens and Seismic Zone V compliance.',
          meta_keywords: 'BPTP Verti Greens, Sector 102 Gurgaon, Dwarka Expressway luxury apartments, BPTP Amstoria, vertical garden apartments Gurgaon.',
          priority: 10,
          show_on_home: 1,
          is_active: 1
        },
        {
          slug: 'godrej-miraya-sector-43-golf-course-road-gurgaon',
          title: 'Godrej Miraya',
          location: 'Sector 43, Golf Course Road, Gurgaon 122022',
          price: 'Price on Request',
          price_per_sqft: 'Price on Request',
          status: 'Under Construction',
          type: 'Ultra-Luxury Residential',
          category: 'residential',
          image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
          gallery: JSON.stringify([]),
          developer: 'Godrej Properties',
          configurations: JSON.stringify(['3 BHK + Utility', '4 BHK + Utility']),
          area: '5.16 Acres',
          floors: 'G + 31 to 32 Floors',
          possession: 'September 2031',
          rera: 'Granted 24.09.2024',
          highlights: JSON.stringify(['Only 2 apartments per floor', '36,000 sq. ft. Clubhouse', 'Boutique ultra-luxury', 'Prime Golf Course Road location']),
          about: 'Godrej Miraya is a boutique ultra-luxury project designed for a specific cohort of UHNW buyers who prioritize scarcity and high-level privacy over large-scale community living. With only three towers and 248 exclusive units, the project ensures each resident enjoys a high unit-to-acreage ratio.',
          meta_title: 'Godrej Miraya | Ultra-Luxury 3 & 4 BHK Golf Course Road Gurgaon',
          meta_description: 'Godrej Miraya in Sector 43 offers exclusive 3 & 4 BHK residences with only 2 apartments per floor. Experience super-luxury on Gurgaon’s Golf Course Road.',
          meta_keywords: 'Godrej Miraya, Sector 43 Gurgaon, Golf Course Road luxury flats, Godrej Miraya price, ultra-luxury apartments Gurgaon.',
          priority: 9,
          show_on_home: 1,
          is_active: 1
        },
        {
          slug: 'dlf-the-camellias-sector-42-gurgaon',
          title: 'DLF The Camellias',
          location: 'Sector 42, Golf Course Road, Gurgaon',
          price: 'Price on Request',
          price_per_sqft: 'Price on Request',
          status: 'Ready To Move',
          type: 'Super-Luxury Residential',
          category: 'residential',
          image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
          gallery: JSON.stringify([]),
          developer: 'DLF Group',
          configurations: JSON.stringify(['4 BHK', '5 BHK', '6 BHK Penthouses']),
          area: '16 - 17.5 Acres',
          floors: 'G + 38 Floors',
          possession: 'Completed',
          rera: 'Registered',
          highlights: JSON.stringify(['LEED Platinum Certified', 'Designed by Hafeez Contractor', 'Bungalow-sized residences', '75% open space with 5.7-hectare park']),
          about: 'DLF The Camellias is not merely a residential project; it is a globally recognized trophy asset that has set the benchmark for luxury real estate in India. It features bungalow-sized residences that range from 7,196 sq. ft. to a staggering 16,500 sq. ft. for the penthouses.',
          meta_title: 'DLF The Camellias | India\'s Most Prestigious Super-Luxury Address',
          meta_description: 'DLF The Camellias in Sector 42, Gurgaon offers ready-to-move 4, 5 & 6 BHK luxury apartments and penthouses with LEED Platinum certification.',
          meta_keywords: 'DLF Camellias, Sector 42 Gurgaon, super-luxury flats India, Golf Course Road penthouses, DLF The Camellias price.',
          priority: 8,
          show_on_home: 1,
          is_active: 1
        },
        {
          slug: 'dlf-the-arbour-sector-63-gurgaon',
          title: 'DLF The Arbour',
          location: 'Sector 63, Golf Course Extension Road, Gurgaon',
          price: 'Price on Request',
          price_per_sqft: 'Price on Request',
          status: 'Under Construction',
          type: 'Premium High-Rise Residential',
          category: 'residential',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
          gallery: JSON.stringify([]),
          developer: 'DLF India',
          configurations: JSON.stringify(['4 BHK']),
          area: '25 - 28 Acres',
          floors: 'G + 39 Floors',
          possession: 'August 2029',
          rera: 'RC/REP/HARERA/GGM/671/403/2023/15',
          highlights: JSON.stringify(['1.25 lakh sq. ft. clubhouse', 'Seismic Zone V Compliance', '85% open area', '3 EV parking spaces per apartment']),
          about: 'DLF The Arbour marks DLF’s highly anticipated return to the high-rise residential segment in Gurgaon. The project captures the demand for modern, fully-loaded luxury apartments in a rapidly developing commercial hub with two apartments to a core ensuring every home is a corner unit.',
          meta_title: 'DLF The Arbour | 4 BHK Luxury Apartments Sector 63 Gurgaon',
          meta_description: 'Explore DLF The Arbour in Sector 63, Gurgaon. Ultra-luxurious 4 BHK homes with 1.25 lakh sq. ft. clubhouse and Seismic Zone V structural design.',
          meta_keywords: 'DLF The Arbour, Sector 63 Gurgaon, Golf Course Extension Road luxury flats, DLF Arbour price, 4 BHK Gurgaon luxury.',
          priority: 7,
          show_on_home: 1,
          is_active: 1
        },
        {
          slug: 'dlf-privana-west-sector-76-gurgaon',
          title: 'DLF Privana West',
          location: 'Sector 76, Gurgaon 122004',
          price: 'Price on Request',
          price_per_sqft: 'Price on Request',
          status: 'Under Construction',
          type: 'Integrated Luxury Residential',
          category: 'residential',
          image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80',
          gallery: JSON.stringify([]),
          developer: 'DLF Homes',
          configurations: JSON.stringify(['4 BHK', 'Penthouses']),
          area: '12.5 - 12.6 Acres',
          floors: 'G + 41 Floors',
          possession: 'December 2028',
          rera: 'GGM/819/551/2024/46',
          highlights: JSON.stringify(['Low-density (63 units/acre)', 'Aravalli hill views', 'Interiors by GA Group London', '9.9 ft wide balconies']),
          about: 'DLF Privana is an expansive residential ecosystem designed as part of a larger 116.29-acre integrated township, offering residents a blend of urban sophistication and natural serenity given its proximity to the Aravalli hills.',
          meta_title: 'DLF Privana West | Luxury 4 BHK Apartments Sector 76 Gurgaon',
          meta_description: 'DLF Privana West in Sector 76 offers 4 BHK luxury residences with views of the Aravallis. Low-density living with world-class amenities near NH-48.',
          meta_keywords: 'DLF Privana West, Sector 76 Gurgaon, luxury high-rise Gurgaon, DLF Privana price, 4 BHK Sector 76.',
          priority: 6,
          show_on_home: 1,
          is_active: 1
        },
        {
          slug: 'conscient-elaira-sector-80-gurgaon',
          title: 'Conscient Elaira Residences',
          location: 'Sector 80, New Gurgaon, Haryana',
          price: 'Price on Request',
          price_per_sqft: 'Price on Request',
          status: 'New Launch',
          type: 'Luxury Residential Apartments',
          category: 'residential',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
          gallery: JSON.stringify([]),
          developer: 'Conscient Infrastructure',
          configurations: JSON.stringify(['3 BHK', '3 BHK+Study', '4 BHK']),
          area: '5.5 - 5.56 Acres',
          floors: 'G + 34 Floors',
          possession: 'March 2029',
          rera: 'RC/REP/HARERA/GGM/917/649/2025/20',
          highlights: JSON.stringify(['Designed by Benoy', '75,000 sq. ft. clubhouse', 'Smart home technology', 'Infinity pool & fitness center']),
          about: 'Conscient Elaira Residences represents a significant collaboration with the world-renowned architectural firm Benoy. This project is designed for an elite cohort that seeks a balance between modern technology and natural tranquility, offering breathtaking views of the Aravalli hills.',
          meta_title: 'Conscient Elaira Residences | 3 & 4 BHK Luxury Apartments Sector 80 Gurgaon',
          meta_description: 'Conscient Elaira in Sector 80, Gurgaon offers Benoy-designed 3 & 4 BHK luxury homes. Experience smart home living with an infinity pool and Aravalli views.',
          meta_keywords: 'Conscient Elaira, Sector 80 Gurgaon, luxury apartments New Gurgaon, Conscient Elaira price, smart homes Gurgaon.',
          priority: 5,
          show_on_home: 0,
          is_active: 1
        },
        {
          slug: 'sobha-aranya-sector-80-gurgaon',
          title: 'Sobha Aranya',
          location: 'Sector 80, Gurgaon, Haryana 122101',
          price: 'Price on Request',
          price_per_sqft: 'Price on Request',
          status: 'New Launch',
          type: 'Super-Luxury Golf Residences',
          category: 'residential',
          image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80',
          gallery: JSON.stringify([]),
          developer: 'Sobha Limited',
          configurations: JSON.stringify(['3 BHK', '4 BHK Golf Apartments']),
          area: '14.81 - 31.28 Acres',
          floors: 'G + 43 to 46 Floors',
          possession: 'December 2030',
          rera: 'RC/REP/HARERA/GGM/808/540/2024/35',
          highlights: JSON.stringify(['All units golf-facing', '85% dedicated to greenery', 'Peripheral traffic-free driveway', '75,000 sq. ft. clubhouse']),
          about: 'Sobha Aranya is a super-luxury residential development situated parallel to NH-48 and adjacent to the expansive 270-acre Karma Lakelands. This project is designed as an "aristocratic" destination for those who value privacy, nature, and the sport of golf.',
          meta_title: 'Sobha Aranya | Super-Luxury 3 & 4 BHK Golf Apartments Sector 80 Gurgaon',
          meta_description: 'Sobha Aranya in Sector 80 offers golf-facing super-luxury apartments adjacent to Karma Lakelands. Experience aristocratic living with 85% open spaces.',
          meta_keywords: 'Sobha Aranya, Sector 80 Gurgaon, golf apartments Gurgaon, Sobha Aranya price, luxury flats parallel to NH-8.',
          priority: 4,
          show_on_home: 0,
          is_active: 1
        },
        {
          slug: 'sobha-crescent-sector-63a-gurgaon',
          title: 'Sobha Crescent',
          location: 'Sector 63A, Golf Course Extension Road, Gurgaon',
          price: 'Price on Request',
          price_per_sqft: 'Price on Request',
          status: 'Upcoming',
          type: 'Luxury Residential Township',
          category: 'residential',
          image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80',
          gallery: JSON.stringify([]),
          developer: 'Sobha Limited',
          configurations: JSON.stringify(['2 BHK', '3 BHK', '3.5 BHK', '4 BHK']),
          area: '12 Acres',
          floors: 'G + 42 Floors',
          possession: 'March 2030',
          rera: 'GGM/1054/786/2026/26 DATED 03.04.2026',
          highlights: JSON.stringify(['Authentic Vastu principles', 'Over 40 lifestyle amenities', 'Infinity-edge pool', 'Imported marble flooring']),
          about: 'Sobha Crescent is an upcoming landmark township located in the high-demand Sector 63A on the Golf Course Extension Road. This project redefines luxury through a 12-acre development that balances modern architectural aesthetics with functional urban living.',
          meta_title: 'Sobha Crescent | Luxury 3 & 4 BHK Apartments Sector 63A Gurgaon',
          meta_description: 'Discover Sobha Crescent in Sector 63A, Gurgaon. Premium Vastu-compliant homes on Golf Course Extension Road with an infinity pool and 40+ amenities.',
          meta_keywords: 'Sobha Crescent, Sector 63A Gurgaon, Golf Course Extension Road flats, Sobha Crescent price, luxury residences Gurgaon.',
          priority: 3,
          show_on_home: 0,
          is_active: 1
        },
        {
          slug: 'emaar-serenity-hills-sector-86-gurgaon',
          title: 'Emaar Serenity Hills',
          location: 'Sector 86, New Gurgaon, Gurgaon',
          price: 'Price on Request',
          price_per_sqft: 'Price on Request',
          status: 'New Launch',
          type: 'Luxury Resort Residences',
          category: 'residential',
          image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
          gallery: JSON.stringify([]),
          developer: 'Emaar India',
          configurations: JSON.stringify(['3 BHK', '4 BHK']),
          area: '25.9 - 27 Acres',
          floors: 'G + 39 Floors',
          possession: 'September 2032',
          rera: 'GGM/994/726/2025/97 DATED 16.10.2025',
          highlights: JSON.stringify(['8-acre Central Green Paradise', '87% open spaces', 'IGBC Platinum pre-certified', '45+ fast EV charging stations']),
          about: 'Emaar Serenity Hills is a high-end residential development characterized by its "Resort-style" living and a massive commitment to open green spaces. The project is designed for families seeking an upscale, peaceful environment without sacrificing connectivity to major business districts.',
          meta_title: 'Emaar Serenity Hills | 3 & 4 BHK Resort Living Sector 86 Gurgaon',
          meta_description: 'Explore Emaar Serenity Hills in Sector 86, Gurgaon. Featuring 8 acres of central greens, 11 ft floor heights, and IGBC Platinum sustainability standards.',
          meta_keywords: 'Emaar Serenity Hills, Sector 86 Gurgaon, Emaar luxury flats, resort living Gurgaon, 3 BHK Sector 86.',
          priority: 2,
          show_on_home: 0,
          is_active: 1
        },
        {
          slug: 'homeland-regalia-sector-77-mohali',
          title: 'Homeland Regalia',
          location: 'Sector 77, International Airport Road, Mohali, Punjab',
          price: 'Price on Request',
          price_per_sqft: 'Price on Request',
          status: 'Under Construction',
          type: 'Hyper-Luxury Residential',
          category: 'residential',
          image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
          gallery: JSON.stringify([]),
          developer: 'S A Global / Homeland Group',
          configurations: JSON.stringify(['3 BHK', '4 BHK', '5 BHK', 'Penthouses']),
          area: '10+ Acres',
          floors: 'G + 15 to 24 Floors',
          possession: 'Dec 2028',
          rera: 'PBRERA-SAS81-PR0757',
          highlights: JSON.stringify(['Designed by Hafeez Contractor', 'Private elevators opening directly into apartments', 'Indoor skating rink & temp-controlled pools', 'Endorsed by cultural icons']),
          about: 'Homeland Regalia represents a new paradigm of "Hyper-Luxury" in the Tricity region. It is envisioned as a symbol of aristocratic living, catering to the elite of Punjab with an unprecedented level of privacy and child-centric facilities.',
          meta_title: 'Homeland Regalia Mohali | Hyper-Luxury 3, 4, 5 BHK Penthouses',
          meta_description: 'Homeland Regalia in Sector 77, Mohali is the crown jewel of Punjab. Designed by Hafeez Contractor, featuring private lifts and world-class concierge.',
          meta_keywords: 'Homeland Regalia, Sector 77 Mohali, luxury flats Mohali, Homeland Mohali price, Hafeez Contractor Mohali.',
          priority: 1,
          show_on_home: 0,
          is_active: 1
        }
      ];

      for (const p of newProperties) {
        await conn.query(
          `INSERT INTO properties 
          (slug, title, location, price, price_per_sqft, status, type, category, image, gallery, developer, configurations, area, floors, possession, rera, highlights, about, meta_title, meta_description, meta_keywords, priority, show_on_home, is_active)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE title=VALUES(title)`,
          [
            p.slug, p.title, p.location, p.price, p.price_per_sqft, p.status, p.type, p.category, p.image, p.gallery, p.developer, p.configurations, p.area, p.floors, p.possession, p.rera, p.highlights, p.about, p.meta_title, p.meta_description, p.meta_keywords, p.priority, p.show_on_home, p.is_active
          ]
        );
      }
      
      fs.unlinkSync('seed_flag.txt');
      console.log('✅ 11 Properties successfully injected!');
    }

    // Commercial Property Seeder
    if (fs.existsSync('seed_commercial_flag.txt')) {
      console.log('🏢 Commercial Seed flag found! Injecting 3 commercial properties...');
      const commercialProperties = [
        {
          slug: 'aipl-autograph-sector-66-gurgaon',
          title: 'AIPL Autograph',
          location: 'Sector 66, Golf Course Extension Road, Gurgaon, Haryana 122101',
          price: 'Price on Request',
          price_per_sqft: 'Price on Request',
          status: 'Under Construction',
          type: "Commercial / Grade 'A' Office",
          category: 'commercial',
          image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
          gallery: JSON.stringify([]),
          developer: 'AIPL (Advance India Projects Limited)',
          configurations: JSON.stringify(['Office Spaces', 'Retail Shops', 'Food Court']),
          area: '6.1375 Acres',
          floors: 'G + 24 Floors',
          possession: 'April 2026',
          rera: 'GGM/481/213/2021/49',
          highlights: JSON.stringify(['IGBC Platinum Pre-certified', 'Triple Height Entrance Lobby', 'Destination Controlled Elevators', 'Energy-Efficient Glass Facade']),
          about: 'A new-generation corporate landmark designed to celebrate business. The project features unique floor plates ranging from 12,000 to 50,000 sq. ft. to maximize workspace efficiency and natural light. It offers a state-of-the-art business center and premium retail storefronts with excellent visibility on the Golf Course Extension Road.',
          meta_title: "AIPL Autograph | Grade 'A' Office & Retail Spaces Sector 66 Gurgaon",
          meta_description: 'Invest in AIPL Autograph in Sector 66, Gurgaon. IGBC Platinum pre-certified commercial project featuring premium office and retail spaces on Golf Course Extension Road.',
          meta_keywords: 'AIPL Autograph, Sector 66 Gurgaon commercial, Grade A office Gurgaon, AIPL Autograph RERA, commercial property Sector 66.',
          priority: 12,
          show_on_home: 1,
          is_active: 1
        },
        {
          slug: 'homeland-cp-67-sector-67-mohali',
          title: 'Unity Homeland CP 67',
          location: 'Sector 67, International Airport Road, Mohali, Punjab',
          price: 'Price on Request',
          price_per_sqft: 'Price on Request',
          status: 'Ready To Move',
          type: 'Mixed-use Commercial',
          category: 'commercial',
          image: 'https://images.unsplash.com/photo-1519419691348-3b3433c4c20e?auto=format&fit=crop&q=80',
          gallery: JSON.stringify([]),
          developer: 'Unity Homeland Group',
          configurations: JSON.stringify(['Office Spaces', 'Retail Shops', 'Food Court', 'Serviced Apartments', 'PVR Multiplex']),
          area: '4.19 Acres',
          floors: '11 Floors',
          possession: 'Completed',
          rera: 'PBRERA-SAS81-PC0045',
          highlights: JSON.stringify(["Mohali's First Pillarless Banquet", '1000+ Car Parking Spaces', "Mohali's First Luxury Hospitality Venture", '100% Leased Asset Portfolio']),
          about: 'A symbol of productivity and progress where life, work, and entertainment converge. CP 67 is the natural choice for institutional investors, hosting Grade-A offices fully leased to multinational giants including Honda, Adani, and Pearson. It offers a world-class brand mix comparable to the finest commercial complexes in the country.',
          meta_title: 'Homeland CP 67 Mohali | Ready to Move Offices & Retail Mall',
          meta_description: 'Unity Homeland CP 67 in Sector 67 Mohali offers premium office spaces, high-street retail, and serviced apartments on the International Airport Road.',
          meta_keywords: 'Homeland CP 67, CP67 Mohali, Mohali commercial property, CP 67 mall, office space Mohali Airport Road.',
          priority: 13,
          show_on_home: 1,
          is_active: 1
        },
        {
          slug: 'homeland-global-park-sector-75-mohali',
          title: 'Homeland Global Park',
          location: 'Sector 75, International Airport Road, Mohali, Punjab',
          price: 'Price on Request',
          price_per_sqft: 'Price on Request',
          status: 'Under Construction',
          type: 'Mixed-use (Retail, Office, Residential)',
          category: 'commercial',
          image: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&q=80',
          gallery: JSON.stringify([]),
          developer: 'Homeland Group',
          configurations: JSON.stringify(['Studio Apartments', 'Boutique Offices', 'Retail Units', '2 BHK Residences']),
          area: '15 Acres',
          floors: '20 Floors',
          possession: '2028 - 2030',
          rera: 'PBRERA-SAS81-PC0325',
          highlights: JSON.stringify(["India's Largest Indoor Arena", 'Ultra-Luxury Shopping Mall', '6% Assured Returns Till Possession', 'Vastu-compliant North/East Entrances']),
          about: 'A future-ready integrated township spread over 15 acres. This landmark development unites a luxury promenade of international brands with executive office environments and fully furnished serviced residences. It is designed to foster positive energy through Vastu principles while providing an unparalleled lifestyle for visionaries.',
          meta_title: 'Homeland Global Park Mohali | Luxury Mall, Offices & Serviced Flats',
          meta_description: 'Explore Homeland Global Park in Sector 75, Mohali. Punjab\'s iconic 15-acre development featuring an ultra-luxury mall, Grade-A offices, and serviced apartments.',
          meta_keywords: 'Homeland Global Park, Sector 75 Mohali, mixed-use project Mohali, luxury retail Mohali, Homeland Global Park RERA.',
          priority: 14,
          show_on_home: 1,
          is_active: 1
        }
      ];

      for (const p of commercialProperties) {
        await conn.query(
          `INSERT INTO properties 
          (slug, title, location, price, price_per_sqft, status, type, category, image, gallery, developer, configurations, area, floors, possession, rera, highlights, about, meta_title, meta_description, meta_keywords, priority, show_on_home, is_active)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE title=VALUES(title)`,
          [
            p.slug, p.title, p.location, p.price, p.price_per_sqft, p.status, p.type, p.category, p.image, p.gallery, p.developer, p.configurations, p.area, p.floors, p.possession, p.rera, p.highlights, p.about, p.meta_title, p.meta_description, p.meta_keywords, p.priority, p.show_on_home, p.is_active
          ]
        );
      }
      
      fs.unlinkSync('seed_commercial_flag.txt');
      console.log('✅ 3 Commercial Properties successfully injected!');
    }

    // ── GLOBAL PRICE SCRUBBING ──
    // Ensure no legacy prices remain in the database
    await pool.query("UPDATE properties SET price = 'Price on Request', price_per_sqft = 'Price on Request' WHERE price LIKE '₹%' OR price_per_sqft LIKE '₹%'");
    console.log('  ✓ Legacy prices scrubbed from database');

  } catch (err) {
    console.error('❌ DB init failed:', err.message);
    console.error('   Make sure MySQL is running and the "adroitdatabase" database exists.');
    console.error('   Run: mysql -u root < database.sql\n');
  } finally {
    if (conn) conn.release();
  }
};

export default initDB;
