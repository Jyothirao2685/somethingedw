import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'nova_config.json'), 'utf-8'));
const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'nova_posts.json'), 'utf-8'));

const args = process.argv.slice(2);
const runAll = args.includes('--all');
const specificIndex = args.find(a => a.startsWith('--post='))?.split('=')[1];

let postsToRun = posts;
if (specificIndex !== undefined) {
  const idx = parseInt(specificIndex, 10);
  postsToRun = [posts[idx]];
} else if (!runAll && args.includes('--only-first')) {
  postsToRun = [posts[0]];
}

console.log('====================================================');
console.log('  NOVA EVENTS CO. - DIRECT API BLOG PUBLISHER');
console.log(`  Loaded ${posts.length} posts total.`);
console.log(`  Target API: ${config.apiUrl}/admin/blogs`);
console.log('====================================================\n');

async function runApiPublisher() {
  const headers = {
    Authorization: `Bearer ${config.adminToken}`
  };

  // 1. Fetch existing blogs to avoid duplicate errors and support updates
  console.log('[1/2] Checking existing blog posts on server...');
  let existingBlogs = [];
  try {
    const res = await fetch(`${config.apiUrl}/blogs?limit=50`);
    if (res.ok) {
      const data = await res.json();
      existingBlogs = data.data || [];
      console.log(`   Found ${existingBlogs.length} existing blog post(s) on server.\n`);
    }
  } catch (err) {
    console.warn('   Could not fetch existing blogs, proceeding with direct creation:', err.message);
  }

  const slugMap = new Map();
  existingBlogs.forEach(b => {
    if (b.slug) slugMap.set(b.slug, b);
  });

  console.log('[2/2] Publishing blog posts...');
  let successCount = 0;

  for (let index = 0; index < postsToRun.length; index++) {
    const post = postsToRun[index];
    const postNumber = index + 1;
    const slug = post.custom_url_slug || post.slug || '';
    const existing = slugMap.get(slug);
    const isUpdate = !!existing;

    console.log(`----------------------------------------------------`);
    console.log(`▶ [${postNumber}/${postsToRun.length}] ${isUpdate ? 'Updating' : 'Creating'}: "${post.title}"`);
    console.log(`   Slug: ${slug}`);

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('custom_slug', slug);
    formData.append('meta_title', (post.meta_title || '').slice(0, 58));
    formData.append('excerpt', post.short_excerpt || post.excerpt || '');
    formData.append('content', post.blog_content || post.content || '');
    formData.append('meta_description', (post.meta_description || '').slice(0, 155));
    formData.append('cover_alt_text', post.cover_image_alt_text || post.cover_alt_text || '');
    formData.append('published', post.publish_immediately !== false ? 'true' : 'false');
    formData.append('show_cta', post.show_contact_sidebar !== false ? 'true' : 'false');

    // Handle cover image download and attach as Blob/File
    if (post.cover_image) {
      try {
        console.log(`   Fetching cover image: ${post.cover_image}`);
        const imgRes = await fetch(post.cover_image);
        if (imgRes.ok) {
          const blob = await imgRes.blob();
          const filename = path.basename(new URL(post.cover_image).pathname) || 'cover.jpg';
          formData.append('cover_image', blob, filename);
          console.log(`   ✓ Cover image attached (${(blob.size / 1024).toFixed(1)} KB)`);
        }
      } catch (imgErr) {
        console.warn('   ⚠️ Could not attach image:', imgErr.message);
      }
    }

    const targetUrl = isUpdate ? `${config.apiUrl}/admin/blogs/${existing.id}` : `${config.apiUrl}/admin/blogs`;
    const method = isUpdate ? 'PUT' : 'POST';

    try {
      console.log(`   Sending ${method} request to ${targetUrl}...`);
      const res = await fetch(targetUrl, {
        method,
        headers,
        body: formData
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${JSON.stringify(data)}`);
      }

      console.log(`   ✓ [${postNumber}/${postsToRun.length}] Successfully ${isUpdate ? 'Updated' : 'Published'}! ID: ${data.id || existing?.id || 'Done'}\n`);
      successCount++;
    } catch (err) {
      console.error(`   ❌ Failed to process "${post.title}":`, err.message, '\n');
    }
  }

  console.log('====================================================');
  console.log(`  🎉 Finished: ${successCount}/${postsToRun.length} post(s) successfully processed!`);
  console.log('====================================================\n');
}

runApiPublisher();
