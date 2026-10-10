import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'gifting_config.json'), 'utf-8'));
const postFile = path.join(__dirname, 'gifting_post_1.json');
const postData = JSON.parse(fs.readFileSync(postFile, 'utf-8'));

async function publishGiftingPost() {
  console.log('====================================================');
  console.log('  NOVA EVENTS CO. - GIFTING DIRECT API PUBLISHER');
  console.log(`  Target API: ${config.apiUrl}`);
  console.log(`  Title: "${postData.title}"`);
  console.log(`  Slug: ${postData.slug}`);
  console.log('====================================================\n');

  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'X-API-KEY': config.apiKey
  };

  const payload = {
    title: postData.title,
    content: postData.content,
    slug: postData.slug,
    category: postData.category || 'Corporate Gifting',
    author: postData.author || 'Nova Editorial',
    status: postData.status || 'published',
    excerpt: postData.excerpt,
    cover_image: postData.cover_image || 'herosection.jpg',
    api_key: config.apiKey
  };

  console.log('Sending POST request to Gifting API...');
  const res = await fetch(config.apiUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  });

  const text = await res.text();
  console.log(`HTTP Status: ${res.status}`);
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error(`Invalid JSON response: ${text}`);
  }

  if (!res.ok || !data.success) {
    throw new Error(`API Error: ${JSON.stringify(data)}`);
  }

  console.log('\n🎉 Successfully published to Gifting Catalogue!');
  console.log('Post ID:', data.data?.id);
  console.log('Post Slug:', data.data?.slug);
  console.log('API Returned URL:', data.data?.url);

  // Check public accessibility
  const liveSlug = data.data?.slug || postData.slug;
  const publicUrl = `${config.baseUrl}/blog-post.php?slug=${encodeURIComponent(liveSlug)}`;
  console.log(`\nVerifying public URL: ${publicUrl}`);
  
  const verifyRes = await fetch(publicUrl);
  console.log(`Public URL HTTP Status: ${verifyRes.status}`);
  if (verifyRes.ok) {
    console.log('✓ Public blog post is verified LIVE and accessible!');
  } else {
    console.warn('⚠️ Public URL returned non-200 status:', verifyRes.status);
  }

  // Also check blog listing page
  const listRes = await fetch(config.blogListUrl);
  if (listRes.ok) {
    const listHtml = await listRes.text();
    if (listHtml.includes(liveSlug)) {
      console.log('✓ Post is verified appearing on the main Blog Journal list (blog.php)!');
    }
  }
}

publishGiftingPost().catch(err => {
  console.error('Fatal Error:', err.message);
  process.exit(1);
});
