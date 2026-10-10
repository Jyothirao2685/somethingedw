import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'nova_config.json'), 'utf-8'));

const novaPosts = [
  {
    title: "Case Study: Producing the LeadSquared Annual Leadership Summit in Atlanta",
    custom_slug: "case-study-leadsquared-annual-leadership-summit-atlanta",
    meta_title: "Case Study: LeadSquared Leadership Summit Atlanta",
    meta_description: "Behind the scenes of the LeadSquared Leadership Summit in Atlanta. Keynote AV production, executive sponsor lounges & PMP planning by Nova Events.",
    excerpt: "An exclusive behind-the-scenes case study of how Nova Events Co. engineered the LeadSquared Annual Leadership Summit in Atlanta, managing keynote production, VIP lounges, and 450+ delegates.",
    cover_image: "https://novaeventsco.com/uploads/settings/1784913475538-28167351.jpg",
    cover_alt_text: "LeadSquared Annual Leadership Summit corporate event production in Atlanta by Nova Events Co.",
    content: "<h2>Inside an Executive Enterprise Production</h2>\n<p>When leading SaaS marketing automation pioneer <strong>LeadSquared</strong> selected Atlanta as the destination for its flagship Annual Leadership Summit, the objective was clear: bring together over 450 executive delegates, enterprise partners, and C-suite innovators for an immersive, high-energy conference that reflected their market leadership.</p>\n\n<p>High-stakes corporate summits leave zero margin for technical hiccups or scheduling delays. At <a href=\"https://novaeventsco.com/\">Nova Events Co.</a>, led by <strong>Ruby Arora</strong> (PMP certified, with 25+ years of global event leadership and over 447 celebrations completed), our corporate division took ownership of end-to-end event management, audiovisual architecture, VIP hospitality, and run-of-show execution.</p>\n\n<h2>1. The Vision &amp; Spatial Architecture</h2>\n<p>Executing an elite B2B conference requires multi-zone spatial design:</p>\n<ul>\n  <li><strong>Main General Session Plenary:</strong> Engineered with wide-format LED stage backdrops, dynamic digital podiums, and multi-camera broadcast switching for live remote streaming.</li>\n  <li><strong>Executive Sponsor Pavilion:</strong> Interactive branded booths and demo stations allowing enterprise partners to conduct high-value product walkthroughs.</li>\n  <li><strong>VIP Green Room &amp; Speakers' Lounge:</strong> A private, soundproof retreat equipped with continuous artisanal espresso bars and dedicated speaker concierge staff.</li>\n</ul>\n\n<h2>2. Managing Technical Dependencies with PMP Discipline</h2>\n<p>With 18 distinct keynote addresses, panel discussions, and breakout workshops scheduled across two days, timeline precision was paramount. Our team applied rigorous critical-path scheduling, pre-cueing presentation slides, conducting redundant line-array audio checks, and testing high-bandwidth encrypted Wi-Fi networks.</p>\n\n<h2>3. Curated Executive Hospitality &amp; Bespoke Gifting</h2>\n<p>Corporate engagement extends into the tactile experience. Through our specialized <a href=\"https://novaeventsco.com/gifting\">gifting division</a>, every registered executive was presented with a bespoke leather tech organizer and tailored Atlanta welcome hamper upon check-in.</p>\n\n<h2>Plan Your Next Corporate Summit with Nova Events Co.</h2>\n<p>Discover how disciplined project management transforms business gatherings. Explore our <a href=\"https://novaeventsco.com/corporate-events\">corporate event services</a>, view real summit photography in our <a href=\"https://novaeventsco.com/gallery\">event gallery</a>, and <a href=\"https://novaeventsco.com/#contact\">contact our Atlanta team today</a>.</p>"
  },
  {
    title: "Case Study: Transforming a Private Tuxedo Park Estate into an Old Hollywood Anniversary Gala",
    custom_slug: "case-study-tuxedo-park-private-estate-old-hollywood-gala",
    meta_title: "Case Study: Tuxedo Park Old Hollywood Gala | Nova",
    meta_description: "Inside the transformation of a private Tuxedo Park estate into an Old Hollywood anniversary gala. Luxury tenting, red carpet & live 10-piece swing band.",
    excerpt: "An exclusive case study detailing how Nova Events Co. transformed a private Buckhead estate in Tuxedo Park into a glamorous Old Hollywood 50th anniversary gala.",
    cover_image: "https://novaeventsco.com/uploads/settings/1784913475538-28167351.jpg",
    cover_alt_text: "Private estate Old Hollywood anniversary gala production in Tuxedo Park Atlanta by Nova Events Co.",
    content: "<h2>A Golden Milestone Celebrated in Stately Splendor</h2>\n<p>Tuxedo Park in Buckhead is synonymous with historic Atlanta architectural grandeur. When our clients approached <a href=\"https://novaeventsco.com/\">Nova Events Co.</a> to orchestrate their 50th Golden Wedding Anniversary gala at their private residential estate, they envisioned stepping into the golden age of 1940s cinema—an Old Hollywood black-tie affair hosting 180 of their closest friends and family.</p>\n\n<p>Executing a luxury gala at a private residence demands extensive infrastructural engineering, including municipal noise permits, marquee tent installation, generator power grids, and discreet valet logistics. Here is how our team brought this vision to life.</p>\n\n<h2>1. The Red-Carpet Porte-Cochère Arrival</h2>\n<p>Guests arrived via executive chauffeured motorcades, stepping onto a 60-foot plush velvet red carpet flanked by classical brass stanchions, vintage spotlights, and champagne towers poured by white-glove servers.</p>\n\n<h2>2. Clear-Span Structural Marquee &amp; Kinetic Chandeliers</h2>\n<p>To preserve the client's manicured grounds while shielding guests from evening dew, our production team erected an engineered clear-span glass-style marquee over the tennis court. The interior featured dramatic black velvet draping, 12 cascading crystal chandeliers, and custom gold-monogrammed mirror dance flooring.</p>\n\n<h2>3. Big Band Swing &amp; Gatsby-Style Entertainment</h2>\n<p>A 10-piece live brass swing orchestra serenaded guests during a four-course wine-paired dinner, before a headline DJ took over the late-night dance floor accompanied by live saxophone and percussionists.</p>\n\n<h2>Plan Your Private Estate Celebration with Nova Events Co.</h2>\n<p>Turn your private residence into an extraordinary gala venue. Explore our <a href=\"https://novaeventsco.com/social-events\">social celebration planning</a>, browse our <a href=\"https://novaeventsco.com/gallery\">portfolio</a>, and <a href=\"https://novaeventsco.com/#contact\">reach out to our Atlanta directors</a>.</p>"
  },
  {
    title: "The Ultimate Guide to Luxury Wedding Venues in Alpharetta, Roswell & North Fulton",
    custom_slug: "luxury-wedding-venues-alpharetta-roswell-north-fulton-guide",
    meta_title: "Luxury Wedding Venues Alpharetta & Roswell Guide",
    meta_description: "Explore premier luxury wedding venues in Alpharetta, Roswell & North Fulton. The Manor, Country Club of the South, Ivy Hall & scenic estate comparisons.",
    excerpt: "Discover the finest luxury wedding venues across Alpharetta, Roswell, and North Fulton County. Compare golf club ballrooms, historic manor estates, and outdoor lawns.",
    cover_image: "https://novaeventsco.com/assets/destination_wedding_service-BBC4hPCL.webp",
    cover_alt_text: "Luxury wedding venues in Alpharetta and Roswell Georgia planned by Nova Events Co.",
    content: "<h2>Suburban Elegance Just North of Atlanta</h2>\n<p>While Buckhead and Midtown Atlanta boast legendary urban ballrooms, couples seeking sprawling outdoor ceremony lawns, championship golf course vistas, and serene manor estates increasingly look to North Fulton County—specifically the historic and affluent communities of <strong>Alpharetta, Roswell, and Milton</strong>.</p>\n\n<p>At <a href=\"https://novaeventsco.com/\">Nova Events Co.</a>, our planning team regularly designs and produces weddings across North Fulton. Here is our curated guide to the region's most sought-after luxury venues.</p>\n\n<h2>Top Venues in North Fulton:</h2>\n<ul>\n  <li><strong>The Manor Golf &amp; Country Club (Milton):</strong> Featuring European-inspired stone architecture, grand outdoor ceremony lawns, and panoramic fairway views.</li>\n  <li><strong>Country Club of the South (Alpharetta):</strong> Classic Southern grandeur with grand ballroom chandeliers and expansive lakeside ceremony settings.</li>\n  <li><strong>Primrose Cottage &amp; Ivy Hall (Roswell):</strong> Historic charm nestled in the heart of historic Roswell, blending 19th-century architecture with contemporary bridal suites.</li>\n  <li><strong>The Hotel at Avalon (Alpharetta):</strong> Contemporary luxury offering premier ballroom facilities and immediate walking access to Avalon's upscale shopping and dining district.</li>\n</ul>\n\n<h2>Start Planning with Nova Events Co.</h2>\n<p>Explore our complete <a href=\"https://novaeventsco.com/weddings\">wedding planning packages</a> and <a href=\"https://novaeventsco.com/#contact\">schedule your consultation today</a>.</p>"
  },
  {
    title: "Curating the Perfect Sangeet: Choreography, Theme Staging & Fusion Entertainment",
    custom_slug: "curating-luxury-sangeet-ceremony-atlanta-fusion-entertainment",
    meta_title: "Curating a Luxury Sangeet in Atlanta | Nova Events",
    meta_description: "How to plan an unforgettable luxury Sangeet in Atlanta. Choreography schedules, concert-grade LED staging, interactive food bars & DJ entertainment.",
    excerpt: "Discover how to design a high-energy, visually stunning luxury Sangeet ceremony in Atlanta, from concert-style stage production to interactive cocktail stations.",
    cover_image: "https://novaeventsco.com/assets/wedding-BKbBuC_q.jpeg",
    cover_alt_text: "Luxury Sangeet stage design, vibrant lighting, and floral decor in Atlanta by Nova Events Co.",
    content: "<h2>The Heartbeat of the Indian Wedding Weekend</h2>\n<p>The Sangeet is universally celebrated as the most vibrant, high-octane evening of a South Asian wedding weekend. A joyful fusion of choreographed family performances, dynamic music, and culinary indulgence, an extraordinary Sangeet sets the celebratory tone for the sacred wedding day that follows.</p>\n\n<p>At <a href=\"https://novaeventsco.com/\">Nova Events Co.</a>, our Atlanta and Delhi branches bring unmatched cultural fluency and concert-grade production to luxury Sangeets across Georgia.</p>\n\n<h2>Key Elements of an Unforgettable Sangeet:</h2>\n<ul>\n  <li><strong>Dynamic LED Stage Architecture:</strong> High-definition video walls displaying synchronized graphics and family visuals.</li>\n  <li><strong>Paced Performance Schedules:</strong> Managing performance lengths to prevent guest fatigue, keeping the show to an engaging 45 to 60 minutes.</li>\n  <li><strong>Global Street-Food Stations:</strong> Live chaat counters, tandoori sliders, and artisanal craft mocktails.</li>\n  <li><strong>Heirloom Favor Distribution:</strong> Gifting handwoven stoles and bangles through our <a href=\"https://novaeventsco.com/gifting\">gifting services</a>.</li>\n</ul>\n\n<h2>Design Your Sangeet with Nova Events Co.</h2>\n<p>Explore our <a href=\"https://novaeventsco.com/weddings\">multicultural wedding services</a> and <a href=\"https://novaeventsco.com/#contact\">connect with our team</a>.</p>"
  },
  {
    title: "How to Budget and Negotiate Room Blocks at Luxury Atlanta Hotels for Weddings",
    custom_slug: "negotiate-hotel-room-blocks-luxury-atlanta-weddings",
    meta_title: "Negotiate Luxury Hotel Room Blocks Atlanta Guide",
    meta_description: "Expert tips on negotiating hotel room blocks at luxury Atlanta properties. Courtesy blocks, attrition rates, comp suites & shuttle coordination.",
    excerpt: "Learn how to secure and negotiate wedding room blocks at luxury Atlanta hotels. Master courtesy blocks, avoid attrition penalties, and unlock complimentary suites.",
    cover_image: "https://novaeventsco.com/assets/destination_wedding_service-BBC4hPCL.webp",
    cover_alt_text: "Luxury hotel room block coordination for Atlanta wedding guests by Nova Events Co.",
    content: "<h2>Securing Five-Star Hospitality for Traveling Wedding Guests</h2>\n<p>When hosting out-of-town guests in Atlanta, securing a block of hotel rooms at a premier property—such as The St. Regis, The Whitley, InterContinental Buckhead, or The Georgian Terrace—is crucial for a cohesive celebration.</p>\n\n<p>However, navigating complex hotel contracts, attrition clauses, cut-off dates, and room minimums requires careful negotiation to avoid unexpected financial liabilities. In this practical guide, <a href=\"https://novaeventsco.com/\">Nova Events Co.</a> shares professional insights on securing the best rates and perks.</p>\n\n<h2>1. Courtesy Blocks vs. Contracted Blocks</h2>\n<ul>\n  <li><strong>Courtesy Room Blocks:</strong> The hotel holds 10 to 20 rooms at a discounted rate without financial penalty if rooms go unbooked.</li>\n  <li><strong>Contracted Blocks with Attrition:</strong> For larger groups (30+ rooms), hotels require an attrition commitment (typically 80% to 85%), holding the couple financially responsible for unreserved rooms.</li>\n</ul>\n\n<h2>2. Negotiating Valuable Concessions</h2>\n<p>We leverage our industry relationships to secure complimentary presidential suites, reduced valet parking fees, and waived room-drop fees for welcome gifts.</p>\n\n<h2>Coordinate Your Guest Journey with Nova Events Co.</h2>\n<p>Explore our <a href=\"https://novaeventsco.com/weddings\">full-service wedding planning</a> and <a href=\"https://novaeventsco.com/#contact\">contact us today</a>.</p>"
  },
  {
    title: "Luxury Baby Showers & Gender Reveal Galas in Atlanta: High-Fashion Event Design",
    custom_slug: "luxury-baby-showers-gender-reveal-galas-atlanta-guide",
    meta_title: "Luxury Baby Shower & Gender Reveal Planner Atlanta",
    meta_description: "Plan an exquisite luxury baby shower or gender reveal gala in Atlanta. Bespoke floral styling, private dining rooms, custom cakes & luxury gifting.",
    excerpt: "Discover how to plan a breathtaking luxury baby shower or gender reveal gala in Atlanta. Explore top private dining venues, sculptural florals, and custom favors.",
    cover_image: "https://novaeventsco.com/uploads/settings/1784913475538-28167351.jpg",
    cover_alt_text: "Luxury baby shower decor, balloon arches, and custom tablescape in Atlanta by Nova Events Co.",
    content: "<h2>Celebrating New Beginnings with Couture Elegance</h2>\n<p>Welcoming a new child into the family is one of life's most joyful milestones. In Atlanta, luxury baby showers and gender reveal galas have evolved into high-fashion social gatherings defined by exquisite floral installations, interactive culinary experiences, and couture styling.</p>\n\n<p>At <a href=\"https://novaeventsco.com/\">Nova Events Co.</a>, our social events division curates bespoke baby showers across Buckhead and North Atlanta private estates.</p>\n\n<h2>Key Design Concepts:</h2>\n<ul>\n  <li><strong>Sculptural Organic Florals:</strong> Soft pastel floral clouds, dried botanicals, and bespoke monograms.</li>\n  <li><strong>Interactive Dessert Parlors:</strong> Multi-tiered artisan cakes, French macarons, and gourmet non-alcoholic mocktail bars.</li>\n  <li><strong>Curated Guest Keepsakes:</strong> Monogrammed vanity pouches and luxury wraps from our <a href=\"https://novaeventsco.com/gifting\">gifting collection</a>.</li>\n</ul>\n\n<h2>Plan Your Celebration with Nova Events Co.</h2>\n<p>Explore our <a href=\"https://novaeventsco.com/social-events\">social celebration planning</a> and <a href=\"https://novaeventsco.com/#contact\">schedule a consultation</a>.</p>"
  },
  {
    title: "Outdoor Weather Contingencies in Georgia: Tenting Engineering, HVAC & Rain Plans",
    custom_slug: "outdoor-wedding-weather-contingency-tent-engineering-georgia",
    meta_title: "Outdoor Wedding Weather Contingencies & Tents Georgia",
    meta_description: "Master outdoor wedding weather contingencies in Georgia. Clear-span tent engineering, commercial HVAC, subflooring & storm protocols with Nova Events.",
    excerpt: "How to bulletproof your luxury outdoor wedding against Georgia weather. Explore clear-span structural tenting, industrial HVAC climate control, and subflooring.",
    cover_image: "https://novaeventsco.com/assets/destination_wedding_service-BBC4hPCL.webp",
    cover_alt_text: "Luxury clear-span wedding tenting with HVAC climate control in Georgia by Nova Events Co.",
    content: "<h2>Protecting Your Outdoor Celebration Against the Elements</h2>\n<p>From North Georgia vineyards to private Buckhead lawns, outdoor celebrations in Georgia offer unmatched scenic beauty. However, Georgia's climate can bring unexpected rain showers, high summer humidity, or sudden autumn temperature drops.</p>\n\n<p>A true luxury rain plan is not an afterthought—it is an equally stunning Plan B. At <a href=\"https://novaeventsco.com/\">Nova Events Co.</a>, our PMP-certified project managers ensure structural safety, climate comfort, and visual beauty.</p>\n\n<h2>Key Contingency Measures:</h2>\n<ul>\n  <li><strong>Engineered Clear-Span Tents:</strong> Providing 100% weather protection while retaining panoramic outdoor views.</li>\n  <li><strong>Commercial HVAC &amp; Heating:</strong> Industrial cooling ducts or silent heating systems ensuring a consistent 72°F interior environment.</li>\n  <li><strong>Elevated Hardwood Subflooring:</strong> Preventing mud or dampness from reaching evening footwear and couture gowns.</li>\n</ul>\n\n<h2>Ensure Seamless Outdoor Execution with Nova Events Co.</h2>\n<p>Explore our <a href=\"https://novaeventsco.com/weddings\">luxury wedding services</a> and <a href=\"https://novaeventsco.com/#contact\">speak with our event producers</a>.</p>"
  },
  {
    title: "Destination Wedding Logistics: Flying Guests from Atlanta to Udaipur, Jaipur & Goa",
    custom_slug: "destination-wedding-logistics-atlanta-to-india-udaipur-jaipur-goa",
    meta_title: "Destination Wedding Logistics: Atlanta to India | Nova",
    meta_description: "Plan a seamless destination wedding in India from Atlanta. Palace buyouts in Udaipur & Jaipur, group airfare from ATL, guest logistics & customs.",
    excerpt: "Planning an extraordinary destination wedding in India from Atlanta? Discover logistics for royal palace buyouts in Udaipur and Jaipur, flight coordination, and guest care.",
    cover_image: "https://novaeventsco.com/assets/wedding-BKbBuC_q.jpeg",
    cover_alt_text: "Luxury palace destination wedding in Rajasthan India coordinated by Nova Events Co. Atlanta team.",
    content: "<h2>Transatlantic Palace Celebrations Engineered with Poise</h2>\n<p>For couples dreaming of a royal palace wedding in Udaipur or a coastal gala in Goa, coordinating an international celebration for 150+ guests traveling from the United States requires seasoned cross-continental logistics.</p>\n\n<p>With an active headquarters in Atlanta, USA, and an operational branch in Delhi, India, <a href=\"https://novaeventsco.com/\">Nova Events Co.</a> bridges both worlds effortlessly.</p>\n\n<h2>Mastering Transatlantic Logistics:</h2>\n<ul>\n  <li><strong>Group Flight Coordination from ATL:</strong> Organizing group bookings via Hartsfield-Jackson International Airport with dedicated transit teams.</li>\n  <li><strong>Heritage Palace Buyouts:</strong> Coordinating exclusive buyouts of legendary venues like Taj Lake Palace, The Leela Palace Udaipur, and Rambagh Palace Jaipur.</li>\n  <li><strong>On-Site VIP Guest Concierge:</strong> Managing private motorcades, local currency exchange, and cultural city excursions.</li>\n</ul>\n\n<h2>Plan Your International Destination Wedding with Nova Events Co.</h2>\n<p>Explore our <a href=\"https://novaeventsco.com/destination-weddings\">destination wedding planning</a> and <a href=\"https://novaeventsco.com/#contact\">schedule your consultation today</a>.</p>"
  },
  {
    title: "Sustainable & Eco-Conscious Luxury Weddings: Floral Composting, Zero-Waste & Ethical Design",
    custom_slug: "sustainable-eco-conscious-luxury-weddings-atlanta",
    meta_title: "Sustainable Luxury Wedding Planning Atlanta | Nova",
    meta_description: "Discover how to plan a sustainable luxury wedding in Atlanta. Foam-free florals, food rescue donations, cruelty-free decor & carbon-conscious design.",
    excerpt: "How to plan an environmentally conscious luxury wedding in Atlanta without sacrificing opulence. Learn about foam-free floral mechanics, gourmet food rescue, and ethical gifting.",
    cover_image: "https://novaeventsco.com/assets/destination_wedding_service-BBC4hPCL.webp",
    cover_alt_text: "Eco-friendly sustainable luxury wedding design and foam-free florals in Atlanta by Nova Events Co.",
    content: "<h2>Opulence with an Environmental Conscience</h2>\n<p>Modern luxury couples in Atlanta are actively redefining what it means to celebrate lavishly. In 2026, elegance is synonymous with environmental mindfulness. You no longer have to choose between a breathtaking gala and sustainable values.</p>\n\n<p>At <a href=\"https://novaeventsco.com/\">Nova Events Co.</a>, we lead sustainable luxury event design across Georgia.</p>\n\n<h2>Sustainable Event Practices:</h2>\n<ul>\n  <li><strong>Foam-Free Floral Mechanics:</strong> Using reusable chicken wire and moss structures instead of toxic floral foam.</li>\n  <li><strong>Post-Event Flower Repurposing:</strong> Donating wedding florals to local Atlanta hospitals and nursing homes through regional flower rescue charities.</li>\n  <li><strong>Surplus Gourmet Food Rescue:</strong> Partnering with local certified food rescue networks to donate untouched meals safely.</li>\n  <li><strong>100% Cruelty-Free Vegan Leather Keepsakes:</strong> Sourcing bespoke guest gifts through our ethical <a href=\"https://gifting.novaeventsco.com/\">gifting atelier</a>.</li>\n</ul>\n\n<h2>Plan Your Conscious Celebration with Nova Events Co.</h2>\n<p>Explore our <a href=\"https://novaeventsco.com/weddings\">luxury wedding services</a> and <a href=\"https://novaeventsco.com/#contact\">contact us today</a>.</p>"
  },
  {
    title: "The Luxury Reception Run of Show: Hour-by-Hour Timeline for a Flawless Atlanta Gala",
    custom_slug: "luxury-wedding-reception-run-of-show-timeline-atlanta",
    meta_title: "Luxury Wedding Reception Run of Show Timeline Atlanta",
    meta_description: "The definitive hour-by-hour reception timeline for a luxury Atlanta gala. Speeches, dinner pacing, first dances, cake cutting & afterparty cues.",
    excerpt: "Master your reception timeline with this comprehensive hour-by-hour run of show for an Atlanta luxury gala. Ensure seamless dinner pacing, speeches, and entertainment.",
    cover_image: "https://novaeventsco.com/assets/wedding-BKbBuC_q.jpeg",
    cover_alt_text: "Luxury wedding reception gala ballroom and dance floor timeline in Atlanta by Nova Events Co.",
    content: "<h2>The Architecture of an Unforgettable Evening</h2>\n<p>A luxury wedding reception should feel effortless, spontaneous, and enchanting for your guests. However, creating that effortless magic requires a meticulously calibrated, minute-by-minute run of show behind the scenes.</p>\n\n<p>At <a href=\"https://novaeventsco.com/\">Nova Events Co.</a>, our PMP-certified event directors manage every transition with clockwork precision. Here is the ideal hour-by-hour timeline for a luxury Atlanta reception.</p>\n\n<h2>The Blueprint: 6:00 PM to 1:00 AM</h2>\n<ul>\n  <li><strong>6:00 PM – 7:15 PM: Cocktail Hour &amp; Passed Hors d'oeuvres:</strong> Ambient jazz, signature cocktail bars, and guest mingling.</li>\n  <li><strong>7:30 PM: Grand Entrance &amp; First Dance:</strong> High-impact lighting cue and seamless transition into the newlyweds' first dance.</li>\n  <li><strong>7:45 PM – 9:00 PM: Multi-Course Dinner &amp; Curated Speeches:</strong> Perfectly paced dinner courses interspersed with toasts (kept strictly to 3 to 5 minutes each).</li>\n  <li><strong>9:00 PM: Cake Cutting &amp; Parent Dances:</strong> Emotional family dances and cake reveal.</li>\n  <li><strong>9:15 PM – 11:30 PM: Live Party Band &amp; High-Energy Dance Floor:</strong> Continuous live entertainment with dynamic stage lighting.</li>\n  <li><strong>11:30 PM – 1:00 AM: Secret Speakeasy Afterparty:</strong> Transitioning guests into an adjacent lounge with headline DJ, passed espresso martinis, and late-night culinary bites.</li>\n</ul>\n\n<h2>Execute Your Dream Reception with Nova Events Co.</h2>\n<p>Explore our complete <a href=\"https://novaeventsco.com/weddings\">wedding planning services</a> and <a href=\"https://novaeventsco.com/#contact\">schedule your consultation today</a>.</p>"
  }
];

async function publishAllNova() {
  console.log('====================================================');
  console.log('  NOVA EVENTS CO. - 10 BLOG BATCH PUBLISHER');
  console.log(`  Loaded ${novaPosts.length} posts to publish`);
  console.log('====================================================\n');

  const headers = {
    Authorization: `Bearer ${config.adminToken}`
  };

  let successCount = 0;

  for (let i = 0; i < novaPosts.length; i++) {
    const post = novaPosts[i];
    console.log(`▶ [${i + 1}/${novaPosts.length}] Publishing: "${post.title}"`);
    console.log(`   Slug: ${post.custom_slug}`);

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('custom_slug', post.custom_slug);
    formData.append('meta_title', (post.meta_title || '').slice(0, 58));
    formData.append('excerpt', post.excerpt || '');
    formData.append('content', post.content || '');
    formData.append('meta_description', (post.meta_description || '').slice(0, 155));
    formData.append('cover_alt_text', post.cover_alt_text || '');
    formData.append('published', 'true');
    formData.append('show_cta', 'true');

    if (post.cover_image) {
      try {
        const imgRes = await fetch(post.cover_image);
        if (imgRes.ok) {
          const blob = await imgRes.blob();
          const filename = path.basename(new URL(post.cover_image).pathname) || 'cover.jpg';
          formData.append('cover_image', blob, filename);
          console.log(`   ✓ Cover image attached (${(blob.size / 1024).toFixed(1)} KB)`);
        }
      } catch (imgErr) {
        console.warn('   ⚠️ Image fetch warning:', imgErr.message);
      }
    }

    try {
      const res = await fetch(`${config.apiUrl}/admin/blogs`, {
        method: 'POST',
        headers,
        body: formData
      });

      const resData = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${JSON.stringify(resData)}`);
      }

      console.log(`   ✓ Successfully published! ID: ${resData.id || 'OK'}`);

      // Verify public URL
      const verifyRes = await fetch(`${config.apiUrl}/blogs/${post.custom_slug}`);
      if (verifyRes.ok) {
        console.log(`   ✓ Public API verified: ${config.baseUrl}/blog/${post.custom_slug} (HTTP 200)\n`);
      }
      successCount++;
    } catch (err) {
      console.error(`   ❌ Failed to publish "${post.title}":`, err.message, '\n');
    }
  }

  // Update local nova_posts.json
  const novaPostsFile = path.join(__dirname, 'nova_posts.json');
  if (fs.existsSync(novaPostsFile)) {
    const posts = JSON.parse(fs.readFileSync(novaPostsFile, 'utf-8'));
    novaPosts.forEach(newPost => {
      const idx = posts.findIndex(p => (p.custom_url_slug || p.slug) === newPost.custom_slug);
      if (idx >= 0) {
        posts[idx] = newPost;
      } else {
        posts.push(newPost);
      }
    });
    fs.writeFileSync(novaPostsFile, JSON.stringify(posts, null, 2), 'utf-8');
    console.log(`✓ Updated nova_posts.json (total: ${posts.length} posts).`);
  }

  console.log(`\n🎉 Finished Nova Events: ${successCount}/${novaPosts.length} posts successfully published!`);
}

publishAllNova().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
