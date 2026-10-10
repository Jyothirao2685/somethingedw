import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));

function replaceBrand(text) {
  if (!text || typeof text !== 'string') return text;
  return text
    .replace(/Adroit Groups'/gi, "Adroit Real Estate Services'")
    .replace(/Adroit Group's/gi, "Adroit Real Estate Services'")
    .replace(/Adroit Groups\b/gi, 'Adroit Real Estate Services')
    .replace(/Adroit Group\b/gi, 'Adroit Real Estate Services');
}

async function updateAllBlogs() {
  const headers = {
    'Content-Type': 'application/json',
    'x-admin-token': config.adminToken
  };

  console.log('====================================================');
  console.log('  UPDATING BRAND NAME TO: "Adroit Real Estate Services"');
  console.log('====================================================\n');

  console.log('[1/3] Fetching all existing blogs from Adroit server...');
  const res = await fetch(`${config.apiUrl}/admin/blogs/all`, { headers });
  if (!res.ok) {
    throw new Error(`Failed to fetch blogs: ${res.status} ${await res.text()}`);
  }

  const blogs = await res.json();
  console.log(`Found ${blogs.length} blogs on server.\n`);

  let updatedServerCount = 0;

  for (const b of blogs) {
    const origTitle = b.title || '';
    const origAuthor = b.author || '';
    const origExcerpt = b.excerpt || '';
    const origContent = b.content || '';
    const origMetaTitle = b.meta_title || '';
    const origMetaDesc = b.meta_description || '';
    const origMetaKeywords = b.meta_keywords || '';

    let origTags = b.tags;
    if (typeof origTags === 'string') {
      try {
        origTags = JSON.parse(origTags);
      } catch (e) {
        origTags = origTags.split(',').map(t => t.trim()).filter(Boolean);
      }
    }
    if (!Array.isArray(origTags)) {
      origTags = [];
    }

    const newTitle = replaceBrand(origTitle);
    const newAuthor = replaceBrand(origAuthor);
    const newExcerpt = replaceBrand(origExcerpt);
    const newContent = replaceBrand(origContent);
    const newMetaKeywords = replaceBrand(origMetaKeywords);
    
    let newMetaTitle = replaceBrand(origMetaTitle);
    if (newMetaTitle.length > 60) {
      newMetaTitle = newMetaTitle.slice(0, 58).trim();
    }

    let newMetaDesc = replaceBrand(origMetaDesc);
    if (newMetaDesc.length > 160) {
      newMetaDesc = newMetaDesc.slice(0, 158).trim();
    }

    const newTags = origTags.map(t => replaceBrand(t));

    const isChanged = (
      newTitle !== origTitle ||
      newAuthor !== origAuthor ||
      newExcerpt !== origExcerpt ||
      newContent !== origContent ||
      newMetaTitle !== origMetaTitle ||
      newMetaDesc !== origMetaDesc ||
      newMetaKeywords !== origMetaKeywords ||
      JSON.stringify(newTags) !== JSON.stringify(origTags)
    );

    if (isChanged) {
      console.log(`▶ Updating Blog ID ${b.id} (${b.slug})...`);
      
      const payload = {
        title: newTitle,
        slug: b.slug,
        category: b.category || '',
        category_color: (b.category_color || 'orange').toLowerCase(),
        author: newAuthor || 'Adroit Real Estate Services Editorial Team',
        read_time: b.read_time || '6 min read',
        image: b.image || null,
        tags: newTags,
        excerpt: newExcerpt,
        content: newContent,
        meta_title: newMetaTitle,
        meta_description: newMetaDesc,
        meta_keywords: newMetaKeywords,
        is_published: b.is_published !== 0 ? 1 : 0
      };

      const putRes = await fetch(`${config.apiUrl}/admin/blogs/${b.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload)
      });

      if (!putRes.ok) {
        const err = await putRes.text();
        console.error(`   ❌ Failed to update Blog ID ${b.id}: ${putRes.status} ${err}`);
      } else {
        console.log(`   ✓ Successfully updated Blog ID ${b.id} on server!`);
        updatedServerCount++;
      }
    } else {
      console.log(`  - Blog ID ${b.id} (${b.slug}) already up to date.`);
    }
  }

  console.log(`\n[2/3] Server updates complete: ${updatedServerCount}/${blogs.length} blogs modified.\n`);

  // [3/3] Update local JSON files
  console.log('[3/3] Updating local workspace JSON files...');

  const localFiles = [
    'blogs.json',
    'adroit_post_1.json',
    'adroit_post_2.json',
    'adroit_post_3.json',
    'adroit_post_4.json',
    'adroit_post_5.json',
    'adroit_new_post.json'
  ];

  let localUpdatedFiles = 0;

  for (const filename of localFiles) {
    const filepath = path.join(__dirname, filename);
    if (!fs.existsSync(filepath)) continue;

    const raw = fs.readFileSync(filepath, 'utf-8');
    const updated = replaceBrand(raw);
    if (updated !== raw) {
      fs.writeFileSync(filepath, updated, 'utf-8');
      console.log(`   ✓ Updated local file: ${filename}`);
      localUpdatedFiles++;
    } else {
      console.log(`   - No changes needed for: ${filename}`);
    }
  }

  console.log(`\nLocal files updated: ${localUpdatedFiles}/${localFiles.length}`);
  console.log('\n====================================================');
  console.log('  🎉 ALL BLOG POSTS UPDATED TO "Adroit Real Estate Services"');
  console.log('====================================================\n');
}

updateAllBlogs().catch(err => {
  console.error('Fatal error updating brand name:', err);
  process.exit(1);
});
