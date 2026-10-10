import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, 'local_listing_citation_distribution_report.md');
const outputPdf = path.join(__dirname, 'local_listing_citation_distribution_report.pdf');

function buildHtmlDocument(markdownHtml) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Local Listing & Citation Distribution Audit</title>
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1f2937;
      background-color: #ffffff;
      line-height: 1.6;
      font-size: 12.5px;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    /* Formal Document Header */
    .document-header {
      border-bottom: 2px solid #111827;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }

    .doc-classification {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #6b7280;
      margin-bottom: 6px;
    }

    .doc-title {
      font-size: 22px;
      font-weight: 800;
      color: #111827;
      margin: 0 0 6px 0;
      letter-spacing: -0.3px;
      line-height: 1.25;
    }

    .doc-subtitle {
      font-size: 13px;
      color: #4b5563;
      margin: 0;
      font-weight: 400;
    }

    /* Metadata Specification Grid */
    .meta-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
      font-size: 11.5px;
    }

    .meta-table td {
      padding: 6px 10px;
      border: 1px solid #e5e7eb;
      background-color: #f9fafb;
    }

    .meta-table td.label {
      font-weight: 600;
      color: #374151;
      width: 22%;
      background-color: #f3f4f6;
    }

    .meta-table td.value {
      color: #111827;
    }

    /* Notice Box */
    .status-notice {
      border: 1px solid #d1d5db;
      background-color: #f9fafb;
      padding: 14px 18px;
      margin: 20px 0;
      border-left: 4px solid #1f2937;
    }

    .status-notice-title {
      font-size: 12px;
      font-weight: 700;
      color: #111827;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    .status-notice-body {
      font-size: 12px;
      color: #374151;
      line-height: 1.5;
    }

    /* Typography */
    h1 {
      font-size: 16px;
      font-weight: 700;
      color: #111827;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 6px;
      margin-top: 26px;
      margin-bottom: 12px;
      page-break-after: avoid;
    }

    h2 {
      font-size: 14px;
      font-weight: 700;
      color: #111827;
      margin-top: 20px;
      margin-bottom: 8px;
      page-break-after: avoid;
    }

    h3 {
      font-size: 12.5px;
      font-weight: 600;
      color: #1f2937;
      margin-top: 14px;
      margin-bottom: 6px;
      page-break-after: avoid;
    }

    p {
      margin: 0 0 10px 0;
      color: #374151;
      text-align: justify;
    }

    ul, ol {
      margin: 0 0 12px 0;
      padding-left: 20px;
      color: #374151;
    }

    li {
      margin-bottom: 4px;
    }

    strong {
      color: #111827;
      font-weight: 600;
    }

    /* Structured Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0 18px 0;
      font-size: 11px;
      border: 1px solid #d1d5db;
      page-break-inside: avoid;
    }

    th {
      background-color: #f3f4f6;
      color: #111827;
      font-weight: 600;
      text-align: left;
      padding: 8px 10px;
      border: 1px solid #d1d5db;
    }

    td {
      padding: 7px 10px;
      border: 1px solid #e5e7eb;
      color: #374151;
      vertical-align: top;
    }

    tr:nth-child(even) td {
      background-color: #f9fafb;
    }

    hr {
      border: none;
      border-top: 1px solid #e5e7eb;
      margin: 20px 0;
    }

    @page {
      size: A4;
      margin: 20mm 16mm 20mm 16mm;
    }

    @media print {
      body {
        background: transparent;
      }
      h1, h2, h3 {
        page-break-after: avoid;
      }
      table, .status-notice {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="document-header">
    <div class="doc-classification">AUDIT REPORT &bull; DIGITAL ASSET SYNDICATION</div>
    <div class="doc-title">Local Listing &amp; Citation Distribution Audit</div>
    <div class="doc-subtitle">Distribution Setup, Pre-Activation Audit &amp; Publishing Roadmap</div>
    
    <table class="meta-table">
      <tr>
        <td class="label">Target Entities</td>
        <td class="value">Adroit Real Estate Services | Nova Events Co. | Nova Events Co. Gifting</td>
      </tr>
      <tr>
        <td class="label">Syndication Hub</td>
        <td class="value">EZlocal Distribution Network</td>
      </tr>
      <tr>
        <td class="label">Current Status</td>
        <td class="value"><strong>Edge of Completion</strong> (Staged &bull; Pre-Activation)</td>
      </tr>
      <tr>
        <td class="label">Action Required</td>
        <td class="value">Zero-Charge Account Verification (Estimated 5 Minutes)</td>
      </tr>
    </table>
  </div>

  <div class="status-notice">
    <div class="status-notice-title">Status Summary: Pre-Activation Stage</div>
    <div class="status-notice-body">
      Business listings and directory profiles across all three client properties have been assembled and staged on EZlocal. A major backlink and content foundation is already complete. The project is at the edge of final completion. The remaining administrative step is attaching a verification payment method to activate live syndication across the 40+ direct listing sources and downstream directory network.
    </div>
  </div>

  <div class="content-body">
    ${markdownHtml}
  </div>
</body>
</html>
  `;
}

async function generateCleanCitationPdf() {
  console.log('====================================================');
  console.log('  GENERATING PROFESSIONAL AUDIT CITATION PDF');
  console.log('====================================================\n');

  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Input file not found: ${inputFile}`);
    process.exit(1);
  }

  const mdContent = fs.readFileSync(inputFile, 'utf-8');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('about:blank');

  await page.addScriptTag({ url: 'https://cdn.jsdelivr.net/npm/marked/marked.min.js' });

  const renderedHtmlBody = await page.evaluate((markdown) => {
    return marked.parse(markdown);
  }, mdContent);

  const fullHtml = buildHtmlDocument(renderedHtmlBody);
  await page.setContent(fullHtml, { waitUntil: 'networkidle' });

  await page.pdf({
    path: outputPdf,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20mm',
      bottom: '20mm',
      left: '16mm',
      right: '16mm'
    },
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 8px; color: #6b7280; width: 100%; display: flex; justify-content: space-between; padding: 0 16mm; letter-spacing: 0.5px; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px;">
        <span>AUDIT REPORT: LOCAL LISTING &amp; CITATION DISTRIBUTION</span>
        <span>EZLOCAL NETWORK DEPLOYMENT</span>
      </div>
    `,
    footerTemplate: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 8px; color: #6b7280; width: 100%; display: flex; justify-content: space-between; padding: 0 16mm; letter-spacing: 0.5px; border-top: 1px solid #e5e7eb; padding-top: 4px;">
        <span>CONFIDENTIAL &bull; PREPARED FOR CLIENT EXECUTIVE REVIEW</span>
        <span>PAGE <span class="pageNumber"></span> OF <span class="totalPages"></span></span>
      </div>
    `
  });

  await page.close();
  await browser.close();

  const stats = fs.statSync(outputPdf);
  console.log(`✓ PDF successfully generated: ${outputPdf}`);
  console.log(`✓ File size: ${(stats.size / 1024).toFixed(1)} KB\n`);
  console.log('🎉 Done!');
}

generateCleanCitationPdf().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});
