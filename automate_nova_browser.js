import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load configuration and blog posts
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'nova_config.json'), 'utf-8'));
const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'nova_posts.json'), 'utf-8'));

// Check command line arguments: default to 1 post unless --all is specified
const args = process.argv.slice(2);
const runAll = args.includes('--all');
const postsToRun = runAll ? posts : [posts[0]];

console.log('====================================================');
console.log('  NOVA EVENTS CO. - BLOG AUTOMATION PUBLISHER');
console.log(`  Loaded ${posts.length} posts. Running: ${postsToRun.length} post(s)`);
console.log(`  Target CMS: ${config.adminUrl}`);
console.log('====================================================\n');

async function downloadImage(url, destPath) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download image: ${response.statusText}`);
  const arrayBuffer = await response.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
  return destPath;
}

async function runAutomation() {
  let browser;
  const tempFilesToClean = [];

  try {
    // Launch Chrome
    try {
      browser = await chromium.launch({
        channel: 'chrome',
        headless: config.browser.headless,
        slowMo: config.browser.slowMo || 80,
        args: ['--start-maximized']
      });
    } catch {
      browser = await chromium.launch({
        headless: config.browser.headless,
        slowMo: config.browser.slowMo || 80,
        args: ['--start-maximized']
      });
    }

    const context = await browser.newContext({ viewport: null });

    // Set sessionStorage before page scripts execute
    await context.addInitScript((token) => {
      sessionStorage.setItem('nova_admin_token', token);
    }, config.adminToken);

    const page = await context.newPage();

    page.on('dialog', async (dialog) => {
      console.log(`   [Dialog Alert]: ${dialog.message()}`);
      await dialog.accept();
    });

    console.log('[1/3] Navigating to Nova Admin Portal...');
    await page.goto(config.adminUrl, { waitUntil: 'networkidle', timeout: 30000 });

    // Click on "Blog Posts" in sidebar
    console.log('[2/3] Switching to Blog Posts tab...');
    const blogTab = page.locator('button:has-text("Blog Posts"), div:has-text("Blog Posts")').last();
    await blogTab.waitFor({ state: 'visible', timeout: 15000 });
    await blogTab.click();
    await page.waitForTimeout(600);

    // Helper to fill input fields by selector
    const fillInput = async (selector, value) => {
      if (value === undefined || value === null) return;
      const el = page.locator(selector).first();
      if (await el.count() > 0) {
        await el.fill(String(value));
      }
    };

    console.log('[3/3] Starting blog post creation...\n');

    for (let index = 0; index < postsToRun.length; index++) {
      const post = postsToRun[index];
      const postNumber = index + 1;
      console.log(`----------------------------------------------------`);
      console.log(`▶ [${postNumber}/${postsToRun.length}] Processing: "${post.title}"`);

      // 1. Title
      await fillInput('input[placeholder="Title"]', post.title);

      // 2. Custom URL Slug
      const slug = post.custom_url_slug || post.slug || '';
      await fillInput('input[placeholder="Custom URL Slug (Optional)"]', slug);

      // 3. Meta title (for SEO)
      const metaTitle = post.meta_title || '';
      await fillInput('input[placeholder="Meta title (for SEO)"]', metaTitle);

      // 4. Short excerpt (shown in listing)
      const excerpt = post.short_excerpt || post.excerpt || '';
      await fillInput('textarea[placeholder="Short excerpt (shown in listing)"]', excerpt);

      // 5. Blog Content (switch to HTML Code tab for pristine HTML injection)
      console.log('   Injecting HTML blog content...');
      const htmlCodeBtn = page.locator('button:has-text("HTML Code")').first();
      await htmlCodeBtn.click();
      await page.waitForTimeout(300);

      const htmlTextarea = page.locator('textarea.blog-html-editor').first();
      await htmlTextarea.fill(post.blog_content || post.content || '');

      // Switch back to Visual Editor for preview
      const visualBtn = page.locator('button:has-text("Visual Editor")').first();
      await visualBtn.click();
      await page.waitForTimeout(300);

      // 6. Meta description
      const metaDesc = post.meta_description || '';
      await fillInput('textarea[placeholder*="Meta description"], input[placeholder*="Meta description"]', metaDesc);

      // 7. Cover Image
      if (post.cover_image) {
        try {
          console.log(`   Preparing cover image: ${post.cover_image}`);
          let localImagePath = post.cover_image;
          if (post.cover_image.startsWith('http')) {
            const ext = path.extname(new URL(post.cover_image).pathname) || '.jpeg';
            localImagePath = path.join(__dirname, `temp_cover_${Date.now()}${ext}`);
            await downloadImage(post.cover_image, localImagePath);
            tempFilesToClean.push(localImagePath);
          }
          const fileInput = page.locator('input[type="file"]').first();
          await fileInput.setInputFiles(localImagePath);
          console.log('   ✓ Cover image attached!');
        } catch (imgErr) {
          console.warn('   ⚠️ Could not attach cover image:', imgErr.message);
        }
      }

      // 8. Cover Image Alt Text
      const altText = post.cover_image_alt_text || post.cover_alt_text || '';
      await fillInput('input[placeholder*="Cover Image Alt Text"]', altText);

      // 9. Publish immediately checkbox
      const publishCheck = page.locator('label:has-text("Publish immediately") input[type="checkbox"]').first();
      if (await publishCheck.count() > 0) {
        const shouldPublish = post.publish_immediately !== false;
        const isChecked = await publishCheck.isChecked();
        if (isChecked !== shouldPublish) {
          await publishCheck.setChecked(shouldPublish);
        }
      }

      // 10. Show Contact sidebar checkbox
      const ctaCheck = page.locator('label:has-text("Show Contact sidebar") input[type="checkbox"]').first();
      if (await ctaCheck.count() > 0) {
        const shouldShowCta = post.show_contact_sidebar !== false;
        const isChecked = await ctaCheck.isChecked();
        if (isChecked !== shouldShowCta) {
          await ctaCheck.setChecked(shouldShowCta);
        }
      }

      // 11. Scroll down to "Publish Post"
      const publishBtn = page.locator('button:has-text("Publish Post"), button:has-text("Update Post")').first();
      await publishBtn.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);

      // 12. Click "Publish Post" and wait for response
      console.log(`   Submitting "${post.title}"...`);
      const [apiResponse] = await Promise.all([
        page.waitForResponse(
          (resp) => resp.url().includes('/api/admin/blogs') && (resp.status() === 200 || resp.status() === 201),
          { timeout: 25000 }
        ),
        publishBtn.click()
      ]);

      const resJson = await apiResponse.json().catch(() => ({}));
      console.log(`   ✓ Server response status: ${apiResponse.status()} (${resJson.message || 'Saved'})`);
      console.log(`   ✓ [${postNumber}/${postsToRun.length}] Successfully Published: "${post.title}"\n`);

      if (index < postsToRun.length - 1) {
        await page.waitForTimeout(2000);
      }
    }

    console.log('====================================================');
    console.log(`  🎉 Finished: ${postsToRun.length} blog post(s) published!`);
    console.log('====================================================\n');

    // Keep browser open briefly so user can view
    await page.waitForTimeout(5000);

  } catch (error) {
    console.error('\n❌ Automation error:', error);
    process.exitCode = 1;
  } finally {
    // Cleanup temporary files
    for (const f of tempFilesToClean) {
      try { fs.unlinkSync(f); } catch {}
    }
    if (browser) {
      await browser.close();
    }
  }
}

runAutomation();
