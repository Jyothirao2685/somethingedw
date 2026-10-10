import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));
const blogs = JSON.parse(fs.readFileSync(path.join(__dirname, 'blogs.json'), 'utf-8'));

console.log('====================================================');
console.log('  ADROIT CMS - DIRECT API BLOG POST PUBLISHER');
console.log(`  Loaded ${blogs.length} blog posts to publish`);
console.log(`  Target API: ${config.apiUrl}/admin/blogs`);
console.log('====================================================\n');

async function runApiPublisher() {
  const headers = {
    'Content-Type': 'application/json',
    'x-admin-token': config.adminToken
  };

  // 1. Fetch existing blogs to avoid duplicate errors or update cleanly
  console.log('[1/2] Fetching existing blog posts from server...');
  let existingBlogs = [];
  try {
    const res = await fetch(`${config.apiUrl}/admin/blogs/all`, { headers });
    if (res.ok) {
      existingBlogs = await res.json();
      console.log(`   Found ${existingBlogs.length} existing blog post(s) on server.\n`);
    }
  } catch (err) {
    console.warn('   Could not fetch existing blogs, proceeding with direct creation:', err.message);
  }

  // Map existing slugs to id
  const slugToExisting = new Map();
  if (Array.isArray(existingBlogs)) {
    existingBlogs.forEach(b => {
      if (b.slug) slugToExisting.set(b.slug, b);
    });
  }

  console.log('[2/2] Publishing posts...');
  let successCount = 0;

  for (let index = 0; index < blogs.length; index++) {
    const post = blogs[index];
    const postNumber = index + 1;
    const title = post.Title || post.title;
    const slug = post.Slug || post.slug;

    // Normalizing tags to array
    let tags = post.Tags || post.tags || [];
    if (typeof tags === 'string') {
      tags = tags.split(',').map(t => t.trim()).filter(Boolean);
    }

    let content = post['Full Content'] || post.content || '';
    // Automatically sanitize raw markdown headings (##, #, etc.) so plain text renders cleanly
    content = content.split('\n').map(l => l.replace(/^\s*#{1,6}\s*/, '')).join('\n').replace(/\n{3,}/g, '\n\n').trim();

    const payload = {
      title: title,
      slug: slug,
      category: post.Category || post.category || '',
      category_color: (post['Category Color'] || post.category_color || 'orange').toLowerCase(),
      author: post.Author || post.author || 'Adroit Real Estate Services Editorial Team',
      read_time: post['Read Time'] || post.read_time || '5 min read',
      image: post['Cover Image URL'] || post.image || null,
      tags: tags,
      excerpt: post.Excerpt || post.excerpt || '',
      content: content,
      meta_title: post['Meta Title (Max 60 chars)'] || post.meta_title || '',
      meta_description: post['Meta Description (Max 160 chars)'] || post.meta_description || '',
      meta_keywords: post['Meta Keywords (comma separated)'] || post.meta_keywords || '',
      is_published: post.Published !== false && post.is_published !== 0 ? 1 : 0
    };

    const existing = slugToExisting.get(slug);
    const isUpdate = !!existing;
    const targetUrl = isUpdate ? `${config.apiUrl}/admin/blogs/${existing.id}` : `${config.apiUrl}/admin/blogs`;
    const method = isUpdate ? 'PUT' : 'POST';

    try {
      console.log(`▶ [${postNumber}/${blogs.length}] ${isUpdate ? 'Updating' : 'Creating'}: "${title}" (slug: ${slug})...`);
      const res = await fetch(targetUrl, {
        method,
        headers,
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      console.log(`   ✓ [${postNumber}/${blogs.length}] Successfully saved!\n`);
      successCount++;
    } catch (err) {
      console.error(`   ❌ Failed to save "${title}":`, err.message, '\n');
    }
  }

  console.log('====================================================');
  console.log(`  🎉 Finished: ${successCount}/${blogs.length} posts published successfully!`);
  console.log('====================================================');
}

runApiPublisher();
