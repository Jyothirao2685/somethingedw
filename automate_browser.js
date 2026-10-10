import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load configuration and blog posts
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));
const blogs = JSON.parse(fs.readFileSync(path.join(__dirname, 'blogs.json'), 'utf-8'));

console.log('====================================================');
console.log('  ADROIT CMS - AUTOMATED BLOG POST PUBLISHER');
console.log(`  Loaded ${blogs.length} blog posts to publish`);
console.log(`  Target CMS: ${config.blogsUrl}`);
console.log('====================================================\n');

async function runAutomation() {
  let browser;
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

    const context = await browser.newContext({
      viewport: null
    });

    const page = await context.newPage();

    // Listen for any native browser alert dialogs
    page.on('dialog', async (dialog) => {
      console.log(`   [Dialog Alert]: ${dialog.message()}`);
      await dialog.accept();
    });

    console.log('[1/3] Authenticating session...');
    await page.goto(config.baseUrl + '/admin', { waitUntil: 'domcontentloaded' });
    await page.evaluate((authData) => {
      localStorage.setItem('adminToken', authData.token);
      localStorage.setItem('adminUser', JSON.stringify(authData.user));
    }, { token: config.adminToken, user: config.adminUser });

    console.log('[2/3] Navigating to Blog Management...');
    await page.goto(config.blogsUrl, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for the "New Post" button to be visible
    const newPostBtn = page.locator('button:has-text("New Post")');
    await newPostBtn.waitFor({ state: 'visible', timeout: 15000 });
    console.log('[3/3] Dashboard loaded successfully. Starting publication flow...\n');

    for (let index = 0; index < blogs.length; index++) {
      const post = blogs[index];
      const postNumber = index + 1;
      const title = post.Title || post.title;
      console.log(`----------------------------------------------------`);
      console.log(`▶ [${postNumber}/${blogs.length}] Processing: "${title}"`);

      // 1. Click "+ New Post"
      await newPostBtn.click();

      // 2. Wait for the "New Blog Post" modal
      await page.waitForSelector('text="New Blog Post"', { timeout: 10000 });
      await page.waitForTimeout(200);

      // Helper to fill input fields by selector
      const fillInput = async (selector, value) => {
        if (value === undefined || value === null) return;
        const el = page.locator(selector).first();
        if (await el.count() > 0) {
          await el.fill(String(value));
        }
      };

      // 3. Fill Title *
      await fillInput('div:has(> label:has-text("Title *")) input', title);

      // 4. Fill Slug *
      const slug = post.Slug || post.slug;
      await fillInput('input[placeholder="my-blog-post"], div:has(> label:has-text("Slug *")) input', slug);

      // 5. Fill Category
      const category = post.Category || post.category;
      await fillInput('div:has(> label:text-is("Category")) input', category);

      // 6. Select Category Color (orange, blue, green)
      const color = (post['Category Color'] || post.category_color || 'orange').toLowerCase();
      const colorBtn = page.locator(`button:text-is("${color}")`).first();
      if (await colorBtn.count() > 0) {
        await colorBtn.click();
      }

      // 7. Fill Author
      const author = post.Author || post.author || 'Adroit Real Estate Services Editorial Team';
      await fillInput('div:has(> label:text-is("Author")) input', author);

      // 8. Fill Read Time
      const readTime = post['Read Time'] || post.read_time || '5 min read';
      await fillInput('input[placeholder="5 min read"], div:has(> label:text-is("Read Time")) input', readTime);

      // 9. Fill Cover Image URL
      const coverImage = post['Cover Image URL'] || post.image || '';
      await fillInput('div:has(> label:text-is("Cover Image URL")) input', coverImage);

      // 10. Fill Tags (comma-separated)
      let tags = post.Tags || post.tags || '';
      if (Array.isArray(tags)) tags = tags.join(', ');
      await fillInput('div:has(> label:has-text("Tags")) input', tags);

      // 11. Fill Excerpt
      const excerpt = post.Excerpt || post.excerpt || '';
      await fillInput('div:has(> label:text-is("Excerpt")) textarea', excerpt);

      // 12. Fill Full Content
      let content = post['Full Content'] || post.content || '';
      content = content.split('\n').map(l => l.replace(/^\s*#{1,6}\s*/, '')).join('\n').replace(/\n{3,}/g, '\n\n').trim();
      await fillInput('div:has(> label:text-is("Full Content")) textarea', content);

      // 13. Fill Meta Title
      const metaTitle = post['Meta Title (Max 60 chars)'] || post.meta_title || '';
      await fillInput('div:has(> label:has-text("Meta Title")) input', metaTitle);

      // 14. Fill Meta Description
      const metaDescription = post['Meta Description (Max 160 chars)'] || post.meta_description || '';
      await fillInput('div:has(> label:has-text("Meta Description")) textarea', metaDescription);

      // 15. Fill Meta Keywords
      const metaKeywords = post['Meta Keywords (comma separated)'] || post.meta_keywords || '';
      await fillInput('div:has(> label:has-text("Meta Keywords")) input', metaKeywords);

      // 16. Ensure Published checkbox is set
      const isPublished = post.Published !== false && post.is_published !== 0;
      const checkbox = page.locator('label:has-text("Published") input[type="checkbox"]');
      if (await checkbox.count() > 0) {
        const currentlyChecked = await checkbox.isChecked();
        if (currentlyChecked !== isPublished) {
          await checkbox.setChecked(isPublished);
        }
      }

      // 17. Scroll down to "Save Post" button
      const saveBtn = page.locator('button[type="submit"]:has-text("Save Post")');
      await saveBtn.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      // 18. Click Save Post and wait for API response
      console.log(`   Submitting "${title}"...`);
      const [apiResponse] = await Promise.all([
        page.waitForResponse(
          (resp) => resp.url().includes('/api/admin/blogs') && (resp.status() === 200 || resp.status() === 201),
          { timeout: 20000 }
        ),
        saveBtn.click()
      ]);

      console.log(`   ✓ Server response status: ${apiResponse.status()}`);

      // 19. Wait for modal to close
      await page.waitForSelector('text="New Blog Post"', { state: 'detached', timeout: 10000 }).catch(() => {});
      console.log(`   ✓ [${postNumber}/${blogs.length}] Completed: "${title}"`);

      // 20. Pause between posts for smoothness
      if (index < blogs.length - 1) {
        await page.waitForTimeout(config.delayBetweenPostsMs || 1500);
      }
    }

    console.log(`\n====================================================`);
    console.log(`  🎉 SUCCESS: All ${blogs.length} blog posts published successfully!`);
    console.log(`====================================================\n`);

    // Keep browser open briefly
    await page.waitForTimeout(4000);

  } catch (error) {
    console.error('\n❌ Automation error:', error);
    process.exitCode = 1;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

runAutomation();
