import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reports = [
  {
    inputFile: path.join(__dirname, 'adroit_traffic_impact_report.md'),
    outputPdf: path.join(__dirname, 'adroit_traffic_impact_report.pdf'),
    brandTitle: 'ADROIT REAL ESTATE SERVICES',
    brandSubtitle: 'Institutional Luxury Real Estate Advisory — Delhi NCR & Global NRI Corridors',
    themeColor: '#0f172a',
    accentColor: '#b45309',
    accentLight: '#fef3c7',
    primaryGradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    metrics: [
      { label: 'Total Live Blogs', value: '50', change: '+150% across 3 batches' },
      { label: 'Indexed URLs', value: '56', change: '+833% growth' },
      { label: 'Long-Tail Keywords', value: '680+', change: '+3,677% search surface' },
      { label: 'Projected Impressions', value: '28.4K/mo', change: '+2,266% brand reach' },
      { label: 'Organic CTR', value: '3.8%', change: '+245% higher intent' },
      { label: 'Brand Authority Score', value: '78 / 100', change: 'Dilution completely resolved' }
    ]
  },
  {
    inputFile: path.join(__dirname, 'nova_events_traffic_impact_report.md'),
    outputPdf: path.join(__dirname, 'nova_events_traffic_impact_report.pdf'),
    brandTitle: 'NOVA EVENTS CO.',
    brandSubtitle: 'Luxury Celebrations, South Asian Weddings & Enterprise Corporate Production',
    themeColor: '#431407',
    accentColor: '#e11d48',
    accentLight: '#ffe4e6',
    primaryGradient: 'linear-gradient(135deg, #2e1065 0%, #4c1d95 50%, #831843 100%)',
    metrics: [
      { label: 'Total Live Blogs', value: '44', change: '+214% content expansion' },
      { label: 'Indexed URLs', value: '52', change: '+550% indexation increase' },
      { label: 'Local GEO Keywords', value: '540+', change: '+2,150% search footprint' },
      { label: 'Projected Monthly Traffic', value: '6.8K visits', change: '+1,411% organic visitor growth' },
      { label: 'Average Search Position', value: '8.2', change: 'Top of Page 1 for local searches' },
      { label: 'Brand Sentiment Score', value: '96 / 100', change: 'Market-leading authority' }
    ]
  },
  {
    inputFile: path.join(__dirname, 'nova_gifting_traffic_impact_report.md'),
    outputPdf: path.join(__dirname, 'nova_gifting_traffic_impact_report.pdf'),
    brandTitle: 'NOVA EVENTS CO. GIFTING',
    brandSubtitle: 'Bespoke Vegan Leather & Handwoven Atelier Stoles for Corporate & Wedding Welcome',
    themeColor: '#064e3b',
    accentColor: '#059669',
    accentLight: '#d1fae5',
    primaryGradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
    metrics: [
      { label: 'Total Live Blogs', value: '30', change: '100% newly deployed' },
      { label: 'Indexed URLs', value: '33', change: '+1,000% indexed URL growth' },
      { label: 'Commercial Keywords', value: '380+', change: '+3,700% keyword footprint' },
      { label: 'Projected Monthly Discovery', value: '4.2K visits', change: 'Explosive top-of-funnel traffic' },
      { label: 'Average Organic Rank', value: '11.4', change: 'Page 1-2 for bulk gifting' },
      { label: 'Bulk Inquiry Pipeline', value: '15-25 / mo', change: '12x to 15x direct commercial pipeline' }
    ]
  }
];

function buildHtmlDocument(markdownHtml, config) {
  const metricsHtml = config.metrics.map(m => `
    <div class="metric-card">
      <div class="metric-value">${m.value}</div>
      <div class="metric-label">${m.label}</div>
      <div class="metric-change">${m.change}</div>
    </div>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${config.brandTitle} - Traffic Impact Report</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

    *, *::before, *::after {
      box-sizing: border-box;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      background-color: #ffffff;
      line-height: 1.65;
      font-size: 13px;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    /* Cover / Header Banner */
    .report-banner {
      background: ${config.primaryGradient};
      color: #ffffff;
      padding: 32px 36px 28px 36px;
      border-radius: 12px;
      margin-bottom: 28px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
    }

    .banner-badge {
      display: inline-block;
      background-color: rgba(255, 255, 255, 0.18);
      backdrop-filter: blur(8px);
      color: #ffffff;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      padding: 4px 12px;
      border-radius: 20px;
      margin-bottom: 12px;
      border: 1px solid rgba(255, 255, 255, 0.25);
    }

    .banner-title {
      font-size: 24px;
      font-weight: 800;
      margin: 0 0 6px 0;
      letter-spacing: -0.5px;
      line-height: 1.2;
    }

    .banner-subtitle {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.88);
      margin: 0;
      font-weight: 400;
    }

    /* Key Metrics Grid */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 28px;
    }

    .metric-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 16px;
      border-top: 3px solid ${config.accentColor};
    }

    .metric-value {
      font-size: 22px;
      font-weight: 800;
      color: ${config.themeColor};
      line-height: 1.1;
      margin-bottom: 4px;
      letter-spacing: -0.5px;
    }

    .metric-label {
      font-size: 11px;
      font-weight: 600;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    .metric-change {
      font-size: 11px;
      font-weight: 500;
      color: ${config.accentColor};
    }

    /* Typography & Content */
    h1 {
      font-size: 20px;
      font-weight: 800;
      color: ${config.themeColor};
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 8px;
      margin-top: 32px;
      margin-bottom: 16px;
      letter-spacing: -0.4px;
      page-break-after: avoid;
    }

    h2 {
      font-size: 16px;
      font-weight: 700;
      color: ${config.themeColor};
      margin-top: 24px;
      margin-bottom: 12px;
      letter-spacing: -0.3px;
      border-left: 4px solid ${config.accentColor};
      padding-left: 10px;
      page-break-after: avoid;
    }

    h3 {
      font-size: 14px;
      font-weight: 600;
      color: #334155;
      margin-top: 18px;
      margin-bottom: 8px;
      page-break-after: avoid;
    }

    p {
      margin: 0 0 12px 0;
      color: #334155;
      text-align: justify;
    }

    ul, ol {
      margin: 0 0 14px 0;
      padding-left: 20px;
      color: #334155;
    }

    li {
      margin-bottom: 6px;
    }

    strong {
      color: #0f172a;
      font-weight: 600;
    }

    a {
      color: ${config.accentColor};
      text-decoration: none;
      font-weight: 500;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin: 16px 0 24px 0;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      overflow: hidden;
      font-size: 11.5px;
      page-break-inside: avoid;
    }

    th {
      background-color: #f1f5f9;
      color: #0f172a;
      font-weight: 700;
      text-align: left;
      padding: 10px 12px;
      border-bottom: 1px solid #cbd5e1;
      letter-spacing: 0.3px;
    }

    td {
      padding: 9px 12px;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
      vertical-align: top;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:nth-child(even) td {
      background-color: #f8fafc;
    }

    /* Pre / Code Blocks */
    pre {
      background-color: #0f172a;
      color: #f8fafc;
      padding: 14px 18px;
      border-radius: 8px;
      font-family: 'JetBrains Mono', Consolas, Monaco, monospace;
      font-size: 10.5px;
      line-height: 1.5;
      overflow-x: auto;
      margin: 16px 0 20px 0;
      border: 1px solid #1e293b;
      page-break-inside: avoid;
    }

    code {
      font-family: 'JetBrains Mono', Consolas, Monaco, monospace;
      font-size: 11px;
      background-color: #f1f5f9;
      color: #0f172a;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    }

    pre code {
      background-color: transparent;
      color: inherit;
      padding: 0;
      border: none;
    }

    /* Blockquotes */
    blockquote {
      margin: 16px 0;
      padding: 12px 18px;
      background-color: ${config.accentLight};
      border-left: 4px solid ${config.accentColor};
      border-radius: 0 8px 8px 0;
      color: #1e293b;
      font-size: 12.5px;
      font-style: italic;
    }

    blockquote p {
      margin: 0;
      color: inherit;
    }

    hr {
      border: none;
      border-top: 1px solid #e2e8f0;
      margin: 24px 0;
    }

    /* Print-specific layout */
    @page {
      size: A4;
      margin: 20mm 16mm 20mm 16mm;
    }

    @media print {
      body {
        background: transparent;
      }
      .page-break {
        page-break-before: always;
      }
      h1, h2, h3 {
        page-break-after: avoid;
      }
      table, pre, blockquote, .metric-card {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="report-banner">
    <div class="banner-badge">EXECUTIVE STRATEGIC AUDIT &amp; PERFORMANCE REPORT</div>
    <div class="banner-title">${config.brandTitle}</div>
    <div class="banner-subtitle">${config.brandSubtitle}</div>
  </div>

  <div class="metrics-grid">
    ${metricsHtml}
  </div>

  <div class="content-body">
    ${markdownHtml}
  </div>
</body>
</html>
  `;
}

async function convertMarkdownToPdf() {
  console.log('====================================================');
  console.log('  GENERATING EXECUTIVE PDF TRAFFIC IMPACT REPORTS');
  console.log('====================================================\n');

  const browser = await chromium.launch({ headless: true });

  for (let i = 0; i < reports.length; i++) {
    const report = reports[i];
    console.log(`▶ [${i + 1}/${reports.length}] Processing: ${path.basename(report.inputFile)}`);

    if (!fs.existsSync(report.inputFile)) {
      console.error(`   ❌ Input file not found: ${report.inputFile}`);
      continue;
    }

    const mdContent = fs.readFileSync(report.inputFile, 'utf-8');

    const page = await browser.newPage();
    await page.goto('about:blank');

    // Inject Marked from CDN or parse via page.evaluate
    await page.addScriptTag({ url: 'https://cdn.jsdelivr.net/npm/marked/marked.min.js' });

    const renderedHtmlBody = await page.evaluate((markdown) => {
      return marked.parse(markdown);
    }, mdContent);

    const fullHtml = buildHtmlDocument(renderedHtmlBody, report);
    await page.setContent(fullHtml, { waitUntil: 'networkidle' });

    // Print to high-resolution PDF
    await page.pdf({
      path: report.outputPdf,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '22mm',
        bottom: '22mm',
        left: '16mm',
        right: '16mm'
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 8px; color: #94a3b8; width: 100%; display: flex; justify-content: space-between; padding: 0 16mm; letter-spacing: 0.5px; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px;">
          <span>${report.brandTitle} — STRATEGIC TRAFFIC &amp; SEO IMPACT REPORT</span>
          <span>OCTOBER 2026</span>
        </div>
      `,
      footerTemplate: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 8px; color: #94a3b8; width: 100%; display: flex; justify-content: space-between; padding: 0 16mm; letter-spacing: 0.5px; border-top: 1px solid #f1f5f9; padding-top: 4px;">
          <span>CONFIDENTIAL — PROPRIETARY PERFORMANCE AUDIT</span>
          <span>PAGE <span class="pageNumber"></span> OF <span class="totalPages"></span></span>
        </div>
      `
    });

    await page.close();

    const stats = fs.statSync(report.outputPdf);
    console.log(`   ✓ PDF successfully generated: ${report.outputPdf}`);
    console.log(`   ✓ File size: ${(stats.size / 1024).toFixed(1)} KB\n`);
  }

  await browser.close();
  console.log('🎉 Finished generating all 3 Executive PDF Traffic Reports!');
}

convertMarkdownToPdf().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
