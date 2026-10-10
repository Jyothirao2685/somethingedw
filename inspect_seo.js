async function inspectSites() {
  for (const site of ['https://adroitco.in', 'https://novaeventsco.com']) {
    console.log('=== ' + site + ' ===');
    try {
      const homeRes = await fetch(site);
      const homeHtml = await homeRes.text();
      console.log('Home HTTP status:', homeRes.status);
      const ga = homeHtml.match(/G-[A-Z0-9]+|UA-[0-9-]+/);
      console.log('Google Analytics tag:', ga ? ga[0] : 'None found');
      const gtm = homeHtml.match(/GTM-[A-Z0-9]+/);
      console.log('Google Tag Manager (GTM):', gtm ? gtm[0] : 'None found');
      const gVerify = homeHtml.match(/google-site-verification["']?\s*content=["']?([^"'>\s]+)/i);
      console.log('Google Site Verification:', gVerify ? gVerify[1] : 'None found');

      const robotsRes = await fetch(site + '/robots.txt');
      console.log('robots.txt HTTP status:', robotsRes.status);
      if (robotsRes.ok) {
        const text = await robotsRes.text();
        console.log('robots.txt:\n' + text.trim().slice(0, 200));
      }

      const sitemapRes = await fetch(site + '/sitemap.xml');
      console.log('sitemap.xml HTTP status:', sitemapRes.status);
      if (sitemapRes.ok) {
        const smText = await sitemapRes.text();
        console.log('sitemap.xml snippet:\n' + smText.trim().slice(0, 200));
      }
    } catch(e) {
      console.log('Error:', e.message);
    }
    console.log('\n');
  }
}
inspectSites();
