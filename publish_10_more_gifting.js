import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'gifting_config.json'), 'utf-8'));

const giftingPosts = [
  {
    title: "The Executive Onboarding Gift Box: Elevating New Hire Impressions with Custom Vegan Leather",
    slug: "executive-onboarding-gift-box-custom-vegan-leather",
    category: "Corporate Gifting",
    author: "Nova Editorial",
    status: "published",
    cover_image: "herosection.jpg",
    excerpt: "Discover how leading companies curate luxury executive onboarding gift boxes with customized vegan leather essentials to reinforce culture and boost employee retention.",
    content: "<h2>Day One Defines Employee Engagement</h2>\n<p>In the competitive war for top executive and engineering talent, an employee's first day sets the tone for their organizational journey. Arriving at a workstation to find an impersonal plastic pen and branded polyester t-shirt sends a message of indifference. Conversely, presenting a meticulously curated, personalized welcome box communicates immediate value, respect, and institutional excellence.</p>\n\n<p>At <a href=\"https://gifting.novaeventsco.com/\">Nova Events Co. Gifting</a>, our Atlanta atelier specializes in bespoke corporate onboarding collections crafted from 100% cruelty-free premium vegan leather.</p>\n\n<h2>1. Core Essentials for the Executive Onboarding Box:</h2>\n<ul>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=2\">Personalized Laptop Sleeve</a>:</strong> Custom-fitted for 13-inch or 15-inch executive MacBooks and ThinkPads, featuring padded microfiber lining, tailored perimeter stitching, and subtle blind debossing of the employee's name.</li>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=13\">Tech Organiser</a>:</strong> Keep charging bricks, USB-C adapters, and presentation dongles cleanly sorted with durable elastic loop organizers and zippered mesh pockets.</li>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=4\">Stella Card Wallet</a> or <a href=\"https://gifting.novaeventsco.com/product.html?id=3\">Business Card Holder</a>:</strong> An ultra-slim silhouette designed to hold executive corporate credit cards and credentials with timeless elegance.</li>\n  <li><strong>Personal Welcome Note:</strong> A hand-signed note from the CEO printed on textured archival cardstock with gold foil company insignia.</li>\n</ul>\n\n<h2>2. Cultivating Long-Term Loyalty &amp; Pride</h2>\n<p>When an executive pulls a personalized laptop sleeve from their briefcase during client meetings, they are carrying a daily tactile reminder of their company's high standards. Quality items are kept for years—not discarded.</p>\n\n<h2>3. Volume Tier Pricing &amp; Batch Delivery</h2>\n<p>We work with enterprise HR departments to establish scheduled quarterly onboarding shipments or on-demand drop-shipping directly to new hires' home addresses across the United States.</p>\n\n<h2>Elevate Your Onboarding Experience Today</h2>\n<ul>\n  <li><strong>Phone:</strong> <a href=\"tel:+13105700044\">+1 (310) 570-0044</a></li>\n  <li><strong>Email:</strong> <a href=\"mailto:ruby@novaeventsco.com\">ruby@novaeventsco.com</a></li>\n  <li><strong>Inquire Online:</strong> <a href=\"https://gifting.novaeventsco.com/#mainInquiryForm\">Request Onboarding Gifting Proposal</a></li>\n</ul>"
  },
  {
    title: "Luxury Bridesmaid Proposal & Thank-You Hampers: Bespoke Keepsakes They Will Cherish",
    slug: "luxury-bridesmaid-proposal-thank-you-hampers-keepsakes",
    category: "Wedding Favors",
    author: "Nova Editorial",
    status: "published",
    cover_image: "herosection.jpg",
    excerpt: "Curate elegant bridesmaid proposal boxes and wedding party thank-you gifts with personalized jewelry pouches, monogrammed stoles, and vegan leather keepsakes.",
    content: "<h2>Honoring the Women Standing by Your Side</h2>\n<p>Your bridal party consists of your closest confidantes—sisters, childhood friends, and mentors who have shared every milestone of your life. When asking them to stand beside you on your wedding day, presenting a generic gift box filled with disposable novelties doesn't match the depth of your friendship.</p>\n\n<p>At <a href=\"https://gifting.novaeventsco.com/\">Nova Events Co. Gifting</a>, we design heirloom bridesmaid proposal and thank-you hampers that blend timeless craftsmanship with personal sentiment.</p>\n\n<h2>1. Hero Keepsakes for Bridesmaid Boxes:</h2>\n<ul>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/premium-stoles.html\">Handwoven Silk &amp; Zari Stole</a>:</strong> A stunning, featherlight heirloom from our Atelier collection that bridesmaids can drape over their shoulders during morning ceremonies or evening receptions.</li>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=14\">Zippered Vanity Case</a> &amp; <a href=\"https://gifting.novaeventsco.com/product.html?id=11\">Transit Pouch</a>:</strong> Personalized with each bridesmaid's monogram, ideal for organizing wedding day makeup brushes, hair pins, and jewelry.</li>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=12\">Custom Photo Keychain</a>:</strong> A sentimental charm in vibrant salmon pink leather carrying a cherished photograph of your friendship.</li>\n  <li><strong>Artisanal Scent &amp; Self-Care:</strong> Organic soy candles hand-poured with white tea and jasmine, paired with botanical bath salts for pre-wedding relaxation.</li>\n</ul>\n\n<h2>2. Custom Packaging &amp; Presentation</h2>\n<p>Every bridesmaid box is assembled in rigid ivory linen boxes tied with hand-dyed silk ribbon, custom wax seals, and personalized calligraphed proposal cards.</p>\n\n<h2>Order Bespoke Bridesmaid Gifts</h2>\n<ul>\n  <li><strong>Phone:</strong> <a href=\"tel:+13105700044\">+1 (310) 570-0044</a> | <strong>Email:</strong> <a href=\"mailto:ruby@novaeventsco.com\">ruby@novaeventsco.com</a></li>\n  <li><strong>Browse the Atelier:</strong> <a href=\"https://gifting.novaeventsco.com/premium-stoles.html\">Explore Handwoven Stoles</a></li>\n  <li><strong>Inquire:</strong> <a href=\"https://gifting.novaeventsco.com/#mainInquiryForm\">Submit Bridal Party Gifting Request</a></li>\n</ul>"
  },
  {
    title: "The Art of Real Estate Closing Gifts: Memorable Keepsakes That Turn Homebuyers into Brand Ambassadors",
    slug: "real-estate-closing-gifts-homebuyers-brand-ambassadors",
    category: "Corporate Gifting",
    author: "Nova Editorial",
    status: "published",
    cover_image: "herosection.jpg",
    excerpt: "How top-producing real estate agents and luxury brokerage firms use bespoke vegan leather home and travel gifts to win lasting client loyalty and referrals.",
    content: "<h2>Transforming a Transaction into a Lifelong Referral Engine</h2>\n<p>In luxury residential brokerage, closing day is the emotional climax of a multi-month journey. Yet too many high-performing realtors celebrate a million-dollar transaction by handing their clients a bottle of champagne that is consumed in an hour, or a supermarket gift card that is forgotten in a week.</p>\n\n<p>The most successful luxury real estate advisors understand that a closing gift should be an enduring, tactile keepsake that resides permanently in the client's home or travels with them on vacation, keeping your brand top-of-mind for decades.</p>\n\n<p>At <a href=\"https://gifting.novaeventsco.com/\">Nova Events Co. Gifting</a>, we partner with premier residential brokerages to design memorable closing gift suites.</p>\n\n<h2>1. Exceptional Closing Gift Ideas:</h2>\n<ul>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=7\">Custom Embossed Leather Keychains</a>:</strong> Foil-stamped with the new home's coordinates or closing date, paired with brass hardware that holds their new front door keys.</li>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=5\">Couple Passport Covers</a> &amp; <a href=\"https://gifting.novaeventsco.com/product.html?id=0\">Personalised Luggage Tags</a>:</strong> A celebratory travel set congratulating the buyers on their next life journey, crafted from 100% cruelty-free vegan leather.</li>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=10\">Men's Toiletry Pouch</a> &amp; Vanity Set:</strong> High-utility luxury bathroom accessories ready for their new primary bathroom suite.</li>\n  <li><strong>Custom Home Portrait Folio:</strong> A leather-bound archival folio encasing an architectural watercolor portrait of the acquired residence.</li>\n</ul>\n\n<h2>2. Discreet Branding for Sophisticated Clients</h2>\n<p>Rather than placing loud logos on the exterior, our artisan monogramming places subtle branding on interior lining or certificate packaging, preserving the gift's status as a pure luxury item.</p>\n\n<h2>Partner with Nova Gifting for Client Closings</h2>\n<ul>\n  <li><strong>Call:</strong> <a href=\"tel:+13105700044\">+1 (310) 570-0044</a> | <strong>Email:</strong> <a href=\"mailto:ruby@novaeventsco.com\">ruby@novaeventsco.com</a></li>\n  <li><strong>Catalogue:</strong> <a href=\"https://gifting.novaeventsco.com/#catalogue\">View Full Product Catalogue</a></li>\n  <li><strong>Inquire:</strong> <a href=\"https://gifting.novaeventsco.com/#mainInquiryForm\">Open a Brokerage Gifting Account</a></li>\n</ul>"
  },
  {
    title: "Sourcing Handcrafted Cashmere & Pure Pashmina Stoles for Winter Celebrations",
    slug: "handcrafted-cashmere-pure-pashmina-stoles-winter-weddings",
    category: "Style & Craftsmanship",
    author: "Nova Editorial",
    status: "published",
    cover_image: "herosection.jpg",
    excerpt: "A master guide to pure Pashmina and cashmere wraps for winter weddings and seasonal corporate galas. Authenticity, loom techniques, and custom gift packaging.",
    content: "<h2>The Warmth of Ancestral Textile Mastery</h2>\n<p>Winter celebrations hold a magical allure—crisp evening air, glowing fireplace lounges, and candlelit ballrooms. Yet nothing distracts guests faster from an otherwise stunning outdoor ceremony or terrace cocktail reception than feeling cold. Providing authentic handwoven wraps elevates guest hospitality into an art form.</p>\n\n<p>At <a href=\"https://gifting.novaeventsco.com/premium-stoles.html\">The Atelier at Nova Events Co.</a>, our ancestral handloom artisans in Kashmir weave featherlight pashmina stoles that provide remarkable thermal warmth while draping like liquid silk.</p>\n\n<h2>1. The Anatomy of True Handcrafted Pashmina:</h2>\n<ul>\n  <li><strong>Origin of the Fiber:</strong> Sourced from the delicate underfleece of Changthangi mountain goats grazing in the Himalayan high altitudes of Ladakh at 14,000+ feet.</li>\n  <li><strong>Handloom Weaving:</strong> Spun on traditional wooden spinning wheels (charkhas) and handwoven on traditional pit looms without industrial machine friction.</li>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=109\">The Kashmiri Kani Weave</a>:</strong> Handcrafted using small wooden bobbins (tujis), where master artisans spend months creating intricate floral tapestries.</li>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=115\">Rare Both-Side Embroidery Stole</a>:</strong> An artisan miracle featuring flawless identical embroidery on both faces with zero visible knots.</li>\n</ul>\n\n<h2>2. Ideal Occasions for Pashmina Gifting:</h2>\n<p>Winter wedding ceremony wraps, mother-of-the-couple honors, VIP patron gala favors, and luxury holiday executive gifts.</p>\n\n<h2>3. Bespoke Packaging &amp; Monogrammed Ribbon Ties</h2>\n<p>Each Atelier stole arrives accompanied by an official Certificate of Authenticity, tucked into an embossed presentation box tied with personalized satin ribbons matching your wedding color palette.</p>\n\n<h2>Discover the Atelier Collection Today</h2>\n<ul>\n  <li><strong>Direct Orders:</strong> <a href=\"tel:+13105700044\">+1 (310) 570-0044</a> | <a href=\"mailto:ruby@novaeventsco.com\">ruby@novaeventsco.com</a></li>\n  <li><strong>Explore the Atelier:</strong> <a href=\"https://gifting.novaeventsco.com/premium-stoles.html\">View Handwoven Stoles</a></li>\n  <li><strong>Inquiry Form:</strong> <a href=\"https://gifting.novaeventsco.com/#mainInquiryForm\">Request Bulk Stole Quote</a></li>\n</ul>"
  },
  {
    title: "Sustainable Corporate Gifting: Why 100% Vegan Leather Outperforms Traditional Animal Hide",
    slug: "sustainable-corporate-gifting-vegan-leather-vs-animal-hide",
    category: "Corporate Gifting",
    author: "Nova Editorial",
    status: "published",
    cover_image: "herosection.jpg",
    excerpt: "Discover why leading global corporations are transitioning from traditional leather to high-durability, cruelty-free vegan leather accessories for corporate gifting.",
    content: "<h2>Aligning Corporate Gifting with Modern Environmental Values</h2>\n<p>As Environmental, Social, and Governance (ESG) criteria become central to corporate governance, executive leadership teams are re-evaluating every facet of their supply chains—including promotional gifts and corporate appreciation merchandise. Traditional animal leather production is resource-intensive and relies heavily on harsh chemical tanning processes.</p>\n\n<p>At <a href=\"https://gifting.novaeventsco.com/\">Nova Events Co. Gifting</a>, we are proud to offer exclusively <strong>100% premium vegan leather</strong> across our entire collection—delivering luxury texture, executive durability, and total peace of mind.</p>\n\n<h2>1. Why Vegan Leather Commands the Modern Advantage:</h2>\n<ul>\n  <li><strong>100% Cruelty-Free &amp; Ethical:</strong> Zero animal products used, aligning with inclusive corporate cultures that welcome vegan, vegetarian, and environmentally conscious employees and clients.</li>\n  <li><strong>Water-Resistant &amp; Stain-Proof:</strong> Unlike delicate animal suede or untreated leather that easily stains from rain or coffee splashes, our vegan leather wipes clean effortlessly with a damp cloth.</li>\n  <li><strong>Uniform Grain &amp; Flawless Monogramming:</strong> Precision engineered grain consistency ensures crisp, razor-sharp blind debossing and gold foil application on every single piece in a 1,000-unit bulk order.</li>\n  <li><strong>Durability without Cracking:</strong> Resistant to UV fading, moisture drying, and edge peeling, keeping items looking pristine through years of executive travel.</li>\n</ul>\n\n<h2>2. Featured Sustainable Executive Accessories:</h2>\n<ul>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=9\">Designer Laptop Bag</a>:</strong> Jacquard weave and sleek vegan leather designed for the modern commuter.</li>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=13\">Tech Organiser</a>:</strong> Keep cords and adapters organized on flights.</li>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=1\">Monogrammed AirPods Pro Cover</a>:</strong> Daily-use tech accessory with clip hardware.</li>\n</ul>\n\n<h2>Lead the Transition to Sustainable Gifting</h2>\n<ul>\n  <li><strong>Direct Inquiries:</strong> <a href=\"tel:+13105700044\">+1 (310) 570-0044</a> | <a href=\"mailto:ruby@novaeventsco.com\">ruby@novaeventsco.com</a></li>\n  <li><strong>Catalogue:</strong> <a href=\"https://gifting.novaeventsco.com/#catalogue\">Explore Sustainable Products</a></li>\n  <li><strong>Inquiry Form:</strong> <a href=\"https://gifting.novaeventsco.com/#mainInquiryForm\">Request Sustainable Gifting Sample</a></li>\n</ul>"
  },
  {
    title: "Creating Memorable Mehndi & Haldi Favors: Colorful Keepsakes for Indian Wedding Guests",
    slug: "memorable-mehndi-haldi-favors-colorful-indian-wedding-keepsakes",
    category: "Wedding Favors",
    author: "Nova Editorial",
    status: "published",
    cover_image: "herosection.jpg",
    excerpt: "Explore vibrant, artisan-crafted Mehndi and Haldi favors that blend Indian cultural heritage with contemporary luxury. Stoles, potli pouches, and custom favors.",
    content: "<h2>The Joy of Daytime Pre-Wedding Rituals</h2>\n<p>Haldi and Mehndi ceremonies are celebrated for their joyful exuberance, burst of marigold colors, playful dance, and intimate camaraderie. Guests attend expecting laughter, floral jewelry, and delicious festive fare. Elevating these daytime rituals with thoughtful, beautifully crafted favors creates an enduring impression of gracious family hospitality.</p>\n\n<p>At <a href=\"https://gifting.novaeventsco.com/\">Nova Events Co. Gifting</a>, our Atlanta design team blends authentic Indian textile heritage with contemporary luxury styling.</p>\n\n<h2>1. Most Beloved Mehndi &amp; Haldi Favor Concepts:</h2>\n<ul>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=113\">Signature Garden Border Stoles</a>:</strong> Lightweight Banarasi silk stoles with shimmering gold zari floral borders, gifted to women guests to drape over their shoulders during dance routines.</li>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=11\">Leather Transit &amp; Pencil Pouches</a>:</strong> Crafted in sunshine yellow, coral pink, and mint green vegan leather, perfect for carrying cosmetics and jewelry.</li>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=12\">Photo Keychains</a> &amp; Custom Charms:</strong> Stamped with celebratory motifs or the couple's wedding hashtag.</li>\n  <li><strong>Artisanal Ayurvedic Skincare:</strong> Custom jars of organic saffron and turmeric face scrubs, rosewater mists, and herbal massage oils for pre-wedding glow.</li>\n</ul>\n\n<h2>2. Festive Display Staging at the Venue</h2>\n<p>Rather than handing out gifts in bags, we design festive favor display stations featuring brass urlis filled with floating rose petals, colorful tiered lacquer trays, and custom signage inviting guests to select their favorites.</p>\n\n<h2>Plan Your Mehndi &amp; Haldi Gifting</h2>\n<ul>\n  <li><strong>Phone:</strong> <a href=\"tel:+13105700044\">+1 (310) 570-0044</a> | <strong>Email:</strong> <a href=\"mailto:ruby@novaeventsco.com\">ruby@novaeventsco.com</a></li>\n  <li><strong>Catalogue:</strong> <a href=\"https://gifting.novaeventsco.com/#catalogue\">View Product Catalogue</a></li>\n  <li><strong>Inquiry Form:</strong> <a href=\"https://gifting.novaeventsco.com/#mainInquiryForm\">Submit Mehndi Favor Order</a></li>\n</ul>"
  },
  {
    title: "Speaker & VIP Sponsor Appreciation Gifts for Conferences and Industry Summits",
    slug: "speaker-vip-sponsor-appreciation-gifts-conferences-summits",
    category: "Corporate Gifting",
    author: "Nova Editorial",
    status: "published",
    cover_image: "herosection.jpg",
    excerpt: "How conference organizers and corporate event directors design distinguished appreciation gift boxes for keynote speakers, panelists, and executive sponsors.",
    content: "<h2>Honoring Those Who Power Your Stage</h2>\n<p>Keynote speakers, industry luminaries, and executive sponsors invest tremendous time, intellectual property, and financial resources into making an enterprise summit successful. Handing a Fortune 500 keynote speaker a generic acrylic paperweight or plastic water bottle damages your conference brand perception.</p>\n\n<p>At <a href=\"https://gifting.novaeventsco.com/\">Nova Events Co. Gifting</a>, we help conference chairs and event producers design distinguished appreciation gift suites that convey deep institutional gratitude.</p>\n\n<h2>1. The Anatomy of an Executive Speaker Gift:</h2>\n<ul>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=2\">Custom Monogrammed Laptop Sleeve</a>:</strong> An executive everyday essential debossed with the speaker's initials and subtle summit insignia.</li>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=13\">Tech Organiser</a>:</strong> Multi-pocket accessory for cords and chargers, ideal for frequent flyer speakers.</li>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=4\">Stella Card Wallet</a>:</strong> Minimalist luxury wallet crafted in top-grain vegan leather.</li>\n  <li><strong>Locally Sourced Gourmet Accents:</strong> Single-origin Georgia artisanal chocolates, boutique roasted whole-bean coffee, and local wildflower honey.</li>\n</ul>\n\n<h2>2. VIP Green Room Delivery Protocol</h2>\n<p>We coordinate discreet room drops directly to speakers' luxury hotel suites prior to arrival or place gift boxes in the VIP Green Room with hand-penned thank-you cards signed by the conference chair.</p>\n\n<h2>Curate Speaker Gifts for Your Next Summit</h2>\n<ul>\n  <li><strong>Phone:</strong> <a href=\"tel:+13105700044\">+1 (310) 570-0044</a> | <strong>Email:</strong> <a href=\"mailto:ruby@novaeventsco.com\">ruby@novaeventsco.com</a></li>\n  <li><strong>Browse Catalogue:</strong> <a href=\"https://gifting.novaeventsco.com/#catalogue\">Explore Products</a></li>\n  <li><strong>Inquiry:</strong> <a href=\"https://gifting.novaeventsco.com/#mainInquiryForm\">Request Speaker Gift Proposal</a></li>\n</ul>"
  },
  {
    title: "Turnkey Nationwide Drop-Shipping for Remote Corporate Teams & Distributed Workforces",
    slug: "turnkey-nationwide-dropshipping-remote-corporate-teams-gifting",
    category: "Corporate Gifting",
    author: "Nova Editorial",
    status: "published",
    cover_image: "herosection.jpg",
    excerpt: "Simplify corporate holiday and milestone gifting for hybrid and remote employees with Nova Events Co.'s turnkey address collection, custom assembly, and nationwide direct-to-door fulfillment.",
    content: "<h2>Solving the Logistics Nightmare of Remote Gifting</h2>\n<p>In today's decentralized workplace, coordinating corporate gifting across dozens of cities and states can quickly overwhelm human resource and internal operations teams. Collecting home addresses, managing shipping carriers, tracking lost packages, and maintaining consistent packaging quality across 500 remote employees is an administrative headache.</p>\n\n<p>At <a href=\"https://gifting.novaeventsco.com/\">Nova Events Co. Gifting</a>, our turnkey nationwide drop-shipping solution handles every detail from inception to doorstep delivery.</p>\n\n<h2>1. How Our Nationwide Fulfillment Works:</h2>\n<ul>\n  <li><strong>Secure Address Portal:</strong> We provide a secure, GDPR and CCPA-compliant web portal where your employees verify their current shipping addresses and select custom personalization options (initials, color choices).</li>\n  <li><strong>Precision White-Glove Assembly:</strong> Every gift box is hand-assembled in our Atlanta atelier with custom branded crinkle fill, tissue wrapping, and debossed ribbon ties.</li>\n  <li><strong>Individual Courier Tracking:</strong> We dispatch packages via UPS/FedEx with real-time tracking dashboards accessible by your HR coordinator.</li>\n</ul>\n\n<h2>2. Popular Gifts for Remote Employees:</h2>\n<ul>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=13\">Tech Organiser</a>:</strong> Keep home workstations and remote travel gear sorted.</li>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=1\">Monogrammed AirPods Pro Cover</a>:</strong> Perfect for back-to-back Zoom calls and daily commutes.</li>\n  <li><strong><a href=\"https://gifting.novaeventsco.com/product.html?id=0\">Personalised Luggage Tag</a>:</strong> Inspiring future team offsites and leisure travel.</li>\n</ul>\n\n<h2>Streamline Your Remote Team Gifting Today</h2>\n<ul>\n  <li><strong>Phone:</strong> <a href=\"tel:+13105700044\">+1 (310) 570-0044</a> | <strong>Email:</strong> <a href=\"mailto:ruby@novaeventsco.com\">ruby@novaeventsco.com</a></li>\n  <li><strong>Catalogue:</strong> <a href=\"https://gifting.novaeventsco.com/#catalogue\">Explore Gifting Products</a></li>\n  <li><strong>Inquiry Form:</strong> <a href=\"https://gifting.novaeventsco.com/#mainInquiryForm\">Request Remote Gifting Consultation</a></li>\n</ul>"
  },
  {
    title: "Custom Debossing vs. Foil Stamping: Selecting the Perfect Personalization for Bulk Orders",
    slug: "custom-debossing-vs-foil-stamping-bulk-order-personalization",
    category: "Style & Craftsmanship",
    author: "Nova Editorial",
    status: "published",
    cover_image: "herosection.jpg",
    excerpt: "Compare blind debossing, gold foil, silver foil, and custom metal hardware charms. Learn which branding technique delivers the best aesthetic impact for corporate and wedding gifts.",
    content: "<h2>The Details That Define Exceptional Craftsmanship</h2>\n<p>Personalization is the bridge between a commercial product and a cherished keepsake. Yet selecting the right branding technique for your bulk order depends on your event tone, brand identity, and aesthetic vision. Should your logo or guest initials be subtly heat-pressed or illuminated in gleaming metallic gold?</p>\n\n<p>At <a href=\"https://gifting.novaeventsco.com/\">Nova Events Co. Gifting</a>, our artisans employ precision heat-stamping and debossing equipment to deliver crisp, durable personalization.</p>\n\n<h2>1. Blind Debossing: Understated Executive Sophistication</h2>\n<p>Blind debossing uses high heat and mechanical pressure to depress a custom metal die directly into our 100% vegan leather without adding pigment or foil:</p>\n<ul>\n  <li><strong>Aesthetic:</strong> Subtle, tactile, and quiet luxury. Perfect for C-suite executive accessories, law firms, and private equity gifts where overt branding feels inappropriate.</li>\n  <li><strong>Durability:</strong> Permanent and indestructible; will never scratch, peel, or fade over decades of daily use.</li>\n</ul>\n\n<h2>2. Metallic Foil Stamping (Gold, Silver, Rose Gold)</h2>\n<p>Foil stamping introduces a micro-thin layer of metallic pigment between the hot brass die and the leather surface:</p>\n<ul>\n  <li><strong>Aesthetic:</strong> Eye-catching, radiant, and glamorous. Highly favored for luxury wedding favors, festive holiday hampers, and bridal party keepsakes.</li>\n  <li><strong>Color Versatility:</strong> Available in rich yellow gold, champagne gold, platinum silver, and rose gold to match wedding stationery palettes.</li>\n</ul>\n\n<h2>3. Custom Metal Charms &amp; Hardware Accent</h2>\n<p>For items like our <a href=\"https://gifting.novaeventsco.com/product.html?id=6\">Premium Passport Sets</a> or <a href=\"https://gifting.novaeventsco.com/product.html?id=7\">Leather Keychains</a>, we pair foil-stamped name strips with custom antique brass, gold, or silver charms (airplanes, trees of life, crowns, anchors) for a multi-layered bespoke finish.</p>\n\n<h2>Explore Personalization Options for Your Order</h2>\n<ul>\n  <li><strong>Phone:</strong> <a href=\"tel:+13105700044\">+1 (310) 570-0044</a> | <strong>Email:</strong> <a href=\"mailto:ruby@novaeventsco.com\">ruby@novaeventsco.com</a></li>\n  <li><strong>Catalogue:</strong> <a href=\"https://gifting.novaeventsco.com/#catalogue\">View Product Details</a></li>\n  <li><strong>Inquiry Form:</strong> <a href=\"https://gifting.novaeventsco.com/#mainInquiryForm\">Request Sample Swatches</a></li>\n</ul>"
  },
  {
    title: "The Complete Wedding Gifting Timeline: When to Order Favors, Welcome Bags & VIP Keepsakes",
    slug: "complete-wedding-gifting-timeline-ordering-favors-welcome-bags",
    category: "Wedding Favors",
    author: "Nova Editorial",
    status: "published",
    cover_image: "herosection.jpg",
    excerpt: "A stress-free timeline guide for couples planning wedding favors, hotel welcome hampers, and bridal party gifts. From initial consultation to final venue delivery.",
    content: "<h2>Eliminating Last-Minute Gifting Panic</h2>\n<p>Among the countless decisions in wedding planning, gifting is frequently postponed until the final weeks before the wedding. This unfortunately leads to rushed orders, expedited shipping fees, limited customization options, and needless anxiety. Handcrafted luxury items, custom metal dies, and artisanal handloom stoles require dedicated production lead times.</p>\n\n<p>At <a href=\"https://gifting.novaeventsco.com/\">Nova Events Co. Gifting</a>, our team ensures your wedding gifting process is calm, organized, and delivered well ahead of your wedding weekend.</p>\n\n<h2>The Master Gifting Timeline:</h2>\n<ul>\n  <li><strong>6 to 9 Months Before: Strategy &amp; Curation</strong>\n    <br>Establish your gifting budget, determine recipient tiers (VIP bridal party, out-of-town hotel guests, all ceremony attendees), and explore product catalogues and material swatches.</li>\n  <li><strong>4 to 5 Months Before: Customization &amp; Sampling</strong>\n    <br>Select your core keepsakes—such as <a href=\"https://gifting.novaeventsco.com/product.html?id=0\">Personalised Luggage Tags</a> or <a href=\"https://gifting.novaeventsco.com/premium-stoles.html\">Atelier Stoles</a>. Finalize monogramming fonts, foil colors, and approve digital proofs and physical sample swatches.</li>\n  <li><strong>10 to 12 Weeks Before: Order Confirmation &amp; Production</strong>\n    <br>Lock in final quantities with a 10% to 15% buffer for last-minute RSVPs. Production commences in our workshop (4 to 6 weeks standard turnaround).</li>\n  <li><strong>3 to 4 Weeks Before: Delivery &amp; Assembly</strong>\n    <br>Your orders arrive fully quality-checked and packaged. Welcome bags are coordinated with local hotel concierges in Atlanta for room drops upon guest check-in.</li>\n</ul>\n\n<h2>Start Your Wedding Gifting Journey Today</h2>\n<ul>\n  <li><strong>Phone:</strong> <a href=\"tel:+13105700044\">+1 (310) 570-0044</a> | <strong>Email:</strong> <a href=\"mailto:ruby@novaeventsco.com\">ruby@novaeventsco.com</a></li>\n  <li><strong>Catalogue:</strong> <a href=\"https://gifting.novaeventsco.com/#catalogue\">Explore Full Catalogue</a></li>\n  <li><strong>Inquiry Form:</strong> <a href=\"https://gifting.novaeventsco.com/#mainInquiryForm\">Schedule Your Gifting Consultation</a></li>\n</ul>"
  }
];

async function publishAllGifting() {
  console.log('====================================================');
  console.log('  NOVA EVENTS CO. GIFTING - 10 NEW BLOG BATCH');
  console.log(`  Loaded ${giftingPosts.length} posts to publish`);
  console.log('====================================================\n');

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'X-API-KEY': config.apiKey
  };

  let successCount = 0;

  for (let i = 0; i < giftingPosts.length; i++) {
    const post = giftingPosts[i];
    console.log(`▶ [${i + 1}/${giftingPosts.length}] Publishing: "${post.title}"`);
    console.log(`   Slug: ${post.slug}`);

    const payload = {
      ...post,
      api_key: config.apiKey
    };

    try {
      const res = await fetch(config.apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error(`Invalid JSON: ${text}`);
      }

      if (!res.ok || !data.success) {
        throw new Error(`HTTP ${res.status}: ${JSON.stringify(data)}`);
      }

      console.log(`   ✓ Successfully published! ID: ${data.data?.id}`);
      
      const liveSlug = data.data?.slug || post.slug;
      const publicUrl = `${config.baseUrl}/blog-post.php?slug=${encodeURIComponent(liveSlug)}`;
      
      const verifyRes = await fetch(publicUrl);
      if (verifyRes.ok) {
        console.log(`   ✓ Public URL verified: ${publicUrl} (HTTP 200)\n`);
      }
      successCount++;
    } catch (err) {
      console.error(`   ❌ Failed to publish "${post.title}":`, err.message, '\n');
    }
  }

  // Update local gifting_posts.json
  const giftingPostsFile = path.join(__dirname, 'gifting_posts.json');
  let posts = [];
  if (fs.existsSync(giftingPostsFile)) {
    posts = JSON.parse(fs.readFileSync(giftingPostsFile, 'utf-8'));
  }
  giftingPosts.forEach(newPost => {
    const idx = posts.findIndex(p => p.slug === newPost.slug);
    if (idx >= 0) {
      posts[idx] = newPost;
    } else {
      posts.push(newPost);
    }
  });
  fs.writeFileSync(giftingPostsFile, JSON.stringify(posts, null, 2), 'utf-8');
  console.log(`✓ Updated gifting_posts.json (total: ${posts.length} posts).`);

  console.log(`\n🎉 Finished Nova Gifting: ${successCount}/${giftingPosts.length} posts successfully published!`);
}

publishAllGifting().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
