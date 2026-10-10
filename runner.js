import readline from 'readline';
import { fork } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);

if (args.includes('--nova-api')) {
  fork(path.join(__dirname, 'automate_nova_api.js'), args.filter(a => a !== '--nova-api'));
} else if (args.includes('--nova-browser')) {
  fork(path.join(__dirname, 'automate_nova_browser.js'), args.filter(a => a !== '--nova-browser'));
} else if (args.includes('--adroit-api')) {
  fork(path.join(__dirname, 'automate_api.js'));
} else if (args.includes('--adroit-browser')) {
  fork(path.join(__dirname, 'automate_browser.js'));
} else {
  console.log('======================================================');
  console.log('       MULTI-SITE BLOG AUTOMATION TOOL');
  console.log('======================================================');
  console.log('Select which site you would like to automate:\n');
  console.log('  [1] Nova Events Co. (novaeventsco.com)');
  console.log('      - 1A: Visual Browser Mode (Playwright)');
  console.log('      - 1B: Fast Direct API Mode\n');
  console.log('  [2] Adroit Real Estate Services (adroitco.in)');
  console.log('      - 2A: Visual Browser Mode (Playwright)');
  console.log('      - 2B: Fast Direct API Mode\n');
  console.log('------------------------------------------------------');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter choice (e.g. 1A, 1B, 2A, 2B) [Default: 1A]: ', (answer) => {
    rl.close();
    const choice = answer.trim().toUpperCase() || '1A';

    if (choice === '1B') {
      fork(path.join(__dirname, 'automate_nova_api.js'));
    } else if (choice === '1A' || choice === '1') {
      fork(path.join(__dirname, 'automate_nova_browser.js'));
    } else if (choice === '2B') {
      fork(path.join(__dirname, 'automate_api.js'));
    } else {
      fork(path.join(__dirname, 'automate_browser.js'));
    }
  });
}
