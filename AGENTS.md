# Project Rules & Strategic Brand Guidelines

## 1. Mandatory Brand Guidelines for Adroit Real Estate Services
- **Always use "Adroit Real Estate Services"** instead of "Adroit Group" or "Adroit Groups".
- **Never** write "Adroit Group" or "Adroit Groups" in any blog post, title, slug, excerpt, content, tag, author attribution, or meta tag.
- The official author name for all Adroit blogs is: **`Adroit Real Estate Services Editorial Team`**.
- **Audit Context (Score: 25 -> Goal: 75+)**: Overcome severe brand dilution caused by unrelated tech/consulting firms by establishing **Adroit Real Estate Services** as the definitive luxury real estate authority in Delhi NCR, Gurugram, and international NRI corridors.
- Every blog post must deliver institutional-grade market intelligence, clear yields, and legal diligence to convert high-net-worth individuals (HNWIs) and family offices.

## 2. Mandatory Brand Guidelines for Nova Events Co.
- Brand name: **Nova Events Co.**
- Founder & Creative Director: **Ruby Arora** (PMP certified, 25+ years global experience, 447+ celebrations).
- **Audit Context (Score: 85 -> Goal: 95+)**: Capitalize on strong brand sentiment by addressing high-intent buyer searches (comparisons, in-depth FAQs, real-event case studies, client success stories, and luxury event planning trends).
- Always enforce `meta_description` length <= 155 characters to comply with MySQL VARCHAR(160) database limit.
- Ensure rich semantic HTML formatting with internal links to core service pages (`/weddings`, `/corporate-events`, `/social-events`, `/destination-weddings`, `/gifting`, `/gallery`).

## 3. Nova Gifting Site Guidelines (https://gifting.novaeventsco.com/)
- API Endpoint: `POST https://gifting.novaeventsco.com/api/create-blog.php`
- Authentication: `X-API-KEY: nova_secret_key_2026` or `Authorization: Bearer nova_secret_key_2026` or JSON field `"api_key": "nova_secret_key_2026"`
- Payload Fields:
  - Required: `title`, `content`
  - Optional: `slug`, `category` (default: 'Corporate Gifting'), `author` (default: 'Nova Editorial'), `status` ('published' or 'draft'), `excerpt`, `cover_image` (URL/path/base64/file)
- Returned URL format: `https://gifting.novaeventsco.com/novagifting/blog-post.php?slug=<SLUG>`
- Public Blog List: `https://gifting.novaeventsco.com/blog.php`
- Standing Instruction: **DO NOT post anything here until explicitly directed by the user.**
