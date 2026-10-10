import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));
const postFiles = [
  'adroit_post_6.json',
  'adroit_post_7.json',
  'adroit_post_8.json',
  'adroit_post_9.json',
  'adroit_post_10.json'
];

async function publishAdroitPosts() {
  const headers = {
    'Content-Type': 'application/json',
    'x-admin-token': config.adminToken
  };

  console.log('Fetching existing blogs from Adroit...');
  let existingBlogs = [];
  try {
    const res = await fetch(`${config.apiUrl}/admin/blogs/all`, { headers });
    if (res.ok) {
      existingBlogs = await res.json();
      console.log(`Found ${existingBlogs.length} existing blogs.`);
    }
  } catch (err) {
    console.warn('Error fetching existing:', err.message);
  }

  const slugMap = new Map();
  existingBlogs.forEach(b => {
    if (b.slug) slugMap.set(b.slug, b);
  });

  const publishedPosts = [];

  for (const file of postFiles) {
    const postData = JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf-8'));
    const slug = postData.slug;
    const existing = slugMap.get(slug);
    const isUpdate = !!existing;
    const targetUrl = isUpdate ? `${config.apiUrl}/admin/blogs/${existing.id}` : `${config.apiUrl}/admin/blogs`;
    const method = isUpdate ? 'PUT' : 'POST';

    console.log(`\n▶ [${isUpdate ? 'Updating' : 'Creating'}] ${postData.title}`);
    console.log(`   Slug: ${slug}`);

    const res = await fetch(targetUrl, {
      method,
      headers,
      body: JSON.stringify(postData)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to save post ${slug}: ${res.status} ${errText}`);
    }

    const saved = await res.json().catch(() => ({}));
    console.log(`   ✓ Success! Saved ID: ${saved.id || existing?.id || 'OK'}`);
    publishedPosts.push(postData);

    // Verify public accessibility
    const verifyRes = await fetch(`${config.apiUrl}/blogs/${slug}`);
    if (verifyRes.ok) {
      console.log(`   ✓ Verified public API: ${config.baseUrl}/blog/${slug} (HTTP ${verifyRes.status})`);
    } else {
      console.warn(`   ⚠️ Public API returned HTTP ${verifyRes.status}`);
    }
  }

  // Update local blogs.json
  const blogsFile = path.join(__dirname, 'blogs.json');
  if (fs.existsSync(blogsFile)) {
    const blogs = JSON.parse(fs.readFileSync(blogsFile, 'utf-8'));
    publishedPosts.forEach(newPost => {
      const idx = blogs.findIndex(b => (b.slug || b.Slug) === newPost.slug);
      if (idx >= 0) {
        blogs[idx] = newPost;
      } else {
        blogs.push(newPost);
      }
    });
    fs.writeFileSync(blogsFile, JSON.stringify(blogs, null, 2), 'utf-8');
    console.log(`\n✓ Updated blogs.json (total: ${blogs.length} posts).`);
  }

  console.log('\n🎉 All 5 Adroit posts published successfully!');
}

publishAdroitPosts().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
