import fs from 'fs';

const files = ['SEO_VISIBILITY_IMPACT_REPORT.md', 'runner.js'];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let text = fs.readFileSync(f, 'utf8');
    text = text
      .replace(/Adroit Groups'/gi, "Adroit Real Estate Services'")
      .replace(/Adroit Group's/gi, "Adroit Real Estate Services'")
      .replace(/Adroit Groups\b/gi, 'Adroit Real Estate Services')
      .replace(/Adroit Group\b/gi, 'Adroit Real Estate Services');
    fs.writeFileSync(f, text, 'utf8');
    console.log('Updated', f);
  }
});
