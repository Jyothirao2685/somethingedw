import pool from '../config/db.js';

const properties = [
  {
    slug: "risland-sky-mansion",
    title: "Risland Sky Mansion",
    location: "Chhatarpur, Delhi",
    price: "₹5.49 Cr",
    price_per_sqft: "₹12,500/sqft",
    status: "Ready to Move",
    type: "Luxury Apartments",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&q=80",
    ],
    developer: "Risland India",
    configurations: ["3 BHK", "4 BHK", "5 BHK Penthouses"],
    area: "2,200 – 5,800 sq.ft.",
    floors: "G + 40 Floors",
    possession: "December 2025",
    rera: "DLRERA2022P0012345",
    highlights: [
      "Panoramic views of the Aravalli range",
      "World-class clubhouse with pool & spa",
      "24/7 concierge & valet services",
      "Triple-height grand lobby",
      "Private elevator lobbies per floor",
      "IGBC Green Platinum certified",
    ],
    about: "Risland Sky Mansion is a landmark luxury residential development nestled in the lush greenery of Chhatarpur. Designed by internationally acclaimed architects, this iconic tower offers an unparalleled living experience with breathtaking views, premium finishes, and world-class amenities.",
    priority: 10,
    show_on_home: 1
  },
  {
    slug: "dlf-one-midtown",
    title: "DLF One MidTown",
    location: "Moti Nagar, Delhi",
    price: "₹3.55 Cr",
    price_per_sqft: "₹18,000/sqft",
    status: "Under Construction",
    type: "Premium Residences",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    ],
    developer: "DLF Limited",
    configurations: ["2 BHK", "3 BHK", "4 BHK"],
    area: "1,200 – 2,800 sq.ft.",
    floors: "G + 36 Floors",
    possession: "March 2026",
    rera: "DLRERA2023P0054321",
    highlights: [
      "Strategically located in Central Delhi",
      "DLF's iconic branding & legacy",
      "Landscaped greens & water features",
      "Premium imported marble flooring",
    ],
    about: "DLF One MidTown is DLF's prestigious residential enclave in the heart of Delhi, offering superbly designed homes that seamlessly combine modern living with exceptional convenience.",
    priority: 8,
    show_on_home: 1
  },
  {
    slug: "trump-towers",
    title: "Trump Towers",
    location: "Golf Course Extension, Gurugram",
    price: "₹5.56 Cr",
    price_per_sqft: "₹22,000/sqft",
    status: "Ready to Move",
    type: "Ultra-Luxury Apartments",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80",
    ],
    developer: "IREO Pvt. Ltd. (Trump Brand)",
    configurations: ["3 BHK", "4 BHK", "Penthouses"],
    area: "3,100 – 8,000 sq.ft.",
    floors: "G + 47 Floors",
    possession: "Ready",
    rera: "HRERA2021P0087654",
    highlights: [
      "Branded residences by The Trump Organization",
      "Private pools in select penthouses",
      "24-hour concierge & butler service",
    ],
    about: "Trump Towers, Gurugram is one of India's most prestigious branded residences, carrying the globally renowned Trump Organization legacy.",
    priority: 9,
    show_on_home: 1
  },
  {
    slug: "damac-dubai",
    title: "DAMAC Dubai",
    location: "Dubai, UAE",
    price: "On Request",
    price_per_sqft: "On Request",
    status: "Multiple Projects",
    type: "International Luxury",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80",
    gallery: [],
    developer: "DAMAC Properties",
    configurations: ["Studio", "1 BHK", "2 BHK", "3 BHK", "Villas"],
    area: "450 – 12,000 sq.ft.",
    floors: "Multiple Towers",
    possession: "Varies by Project",
    rera: "Dubai RERA Approved",
    highlights: [
      "Global investment opportunity in UAE",
      "0% income & capital gains tax",
      "Guaranteed rental yields of 6–8%",
    ],
    about: "Adroit Group is an exclusive channel partner for DAMAC Properties in Dubai, offering Indian HNI investors unparalleled access to some of Dubai's most prestigious residential developments.",
    priority: 5,
    show_on_home: 0
  },
  {
    slug: "godrej-connaught",
    title: "Godrej Connaught",
    location: "New Delhi",
    price: "On Request",
    price_per_sqft: "On Request",
    status: "Coming Soon",
    type: "Premium Residences",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    gallery: [],
    developer: "Godrej Properties",
    configurations: ["2 BHK", "3 BHK", "4 BHK"],
    area: "On Request",
    floors: "G + 30 Floors",
    possession: "2027",
    rera: "Registration Awaited",
    highlights: [
      "Godrej brand reliability & trust",
      "Prime Central Delhi location",
      "Walking distance from Connaught Place",
    ],
    about: "Godrej Connaught is an eagerly anticipated upcoming development by Godrej Properties in the heart of New Delhi.",
    priority: 7,
    show_on_home: 1
  },
  {
    slug: "leela-sky-villas",
    title: "Leela Sky Villas",
    location: "Central Delhi",
    price: "₹8.42 Cr",
    price_per_sqft: "₹32,000/sqft",
    status: "Limited Units",
    type: "Sky Villas",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80",
    gallery: [],
    developer: "The Leela Group",
    configurations: ["4 BHK Sky Villas", "5 BHK Penthouses"],
    area: "5,500 – 14,000 sq.ft.",
    floors: "G + 52 Floors",
    possession: "2026",
    rera: "DLRERA2023P0011122",
    highlights: [
      "The Leela's hallmark of absolute luxury",
      "Private plunge pools in every villa",
      "360° panoramic views of Delhi skyline",
    ],
    about: "Leela Sky Villas represents the absolute pinnacle of luxury living in the national capital.",
    priority: 10,
    show_on_home: 1
  }
];

async function migrate() {
  console.log('🚀 Starting migration...');
  for (const p of properties) {
    try {
      await pool.query(
        `INSERT INTO properties 
        (slug, title, location, price, price_per_sqft, status, type, image, gallery, developer, configurations, area, floors, possession, rera, highlights, about, priority, show_on_home, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          p.slug, p.title, p.location, p.price, p.price_per_sqft, p.status, p.type, 
          p.image, JSON.stringify(p.gallery), p.developer, JSON.stringify(p.configurations),
          p.area, p.floors, p.possession, p.rera, JSON.stringify(p.highlights),
          p.about, p.priority, p.show_on_home, 1
        ]
      );
      console.log(`✅ Migrated: ${p.title}`);
    } catch (err) {
      console.error(`❌ Failed: ${p.title} - ${err.message}`);
    }
  }
  console.log('🏁 Migration complete!');
  process.exit(0);
}

migrate();
