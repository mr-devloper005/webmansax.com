/**
 * Copies one logo image to public/favicon.png, public/favico.png, and public/favicon.ico.
 * ChatGPT estuary URLs require a logged-in browser — save the image first, then run:
 *   node scripts/sync-brand-favicon.cjs "C:\\path\\to\\your-logo.png"
 */
const fs = require('fs')
const path = require('path')

const src = process.argv[2]
if (!src) {
  console.error('Usage: node scripts/sync-brand-favicon.cjs <path-to-image-file>')
  process.exit(1)
}

const resolved = path.resolve(src)
if (!fs.existsSync(resolved)) {
  console.error('File not found:', resolved)
  process.exit(1)
}

const publicDir = path.join(__dirname, '..', 'public')
const targets = ['favicon.png', 'favico.png', 'favicon.ico']

for (const name of targets) {
  const dest = path.join(publicDir, name)
  fs.copyFileSync(resolved, dest)
  console.log('Wrote', dest)
}

console.log('Done. Browsers often accept a PNG copied as favicon.ico; for a true multi-size .ico use an online converter if needed.')
