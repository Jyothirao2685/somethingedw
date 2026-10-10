import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'nova_config.json'), 'utf-8'));
const postFiles = [
  'nova_post_6.json',
  'nova_post_7.json',
  'nova_post_8.json',
  'nova_post_9.json',
  'nova_post_10.json'
];

async function publishNovaPosts() {
  const headers = {
    Authorization: `Bearer ${config.adminToken}`
  };

  console.log('Fetching existing blogs from Nova Events...');
  let existingBlogs = [];
  try {
    const res = await fetch(`${config.apiUrl}/blogs?limit=50`);
    if (res.ok) {
      const data = await res.json();
      existingBlogs = data.data || [];
      console.log(`Found ${existingBlogs.length} existing blogs on Nova Events.`);
    }
  } catch (err) {
    console.warn('Could not fetch existing blogs:', err.message);
  }

  const slugMap = new Map();
  existingBlogs.forEach(b => {
    if (b.slug) slugMap.set(b.slug, b);
  });

  const publishedPosts = [];

  for (const file of postFiles) {
    const post = JSON.parse(fs.readFileSync(path.join(__dirname, file), 'utf-8'));
    const slug = post.custom_url_slug || post.slug || '';
    const existing = slugMap.get(slug);
    const isUpdate = !!existing;

    console.log(`\n▶ [${isUpdate ? 'Updating' : 'Creating'}] "${post.title}"`);
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

    console.log(`   Sending ${method} to ${targetUrl}...`);
    const res = await fetch(targetUrl, {
      method,
      headers,
      body: formData
    });

    const resData = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(`Failed to save post ${slug}: ${res.status} ${JSON.stringify(resData)}`);
    }

    console.log(`   ✓ Success! Post ID: ${resData.id || existing?.id || 'OK'}`);
    publishedPosts.push(post);

    // Verify public accessibility
    const verifyRes = await fetch(`${config.apiUrl}/blogs/${slug}`);
    if (verifyRes.ok) {
      console.log(`   ✓ Verified public API: ${config.baseUrl}/blog/${slug} (HTTP ${verifyRes.status})`);
    } else {
      console.warn(`   ⚠️ Public API returned HTTP ${verifyRes.status}`);
    }
  }

  // Update local nova_posts.json
  const novaPostsFile = path.join(__dirname, 'nova_posts.json');
  if (fs.existsSync(novaPostsFile)) {
    const posts = JSON.parse(fs.readFileSync(novaPostsFile, 'utf-8'));
    publishedPosts.forEach(newPost => {
      const idx = posts.findIndex(p => (p.custom_url_slug || p.slug) === (newPost.custom_url_slug || newPost.slug));
      if (idx >= 0) {
        posts[idx] = newPost;
      } else {
        posts.push(newPost);
      }
    });
    fs.writeFileSync(novaPostsFile, JSON.stringify(posts, null, 2), 'utf-8');
    console.log(`\n✓ Updated nova_posts.json (total: ${posts.length} posts).`);
  }

  console.log('\n🎉 All 5 Nova Events posts published successfully!');
}

publishNovaPosts().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
