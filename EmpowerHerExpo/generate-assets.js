const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = {
  'icon.png': 1024,
  'splash.png': 2048,
  'adaptive-icon.png': 1024,
  'favicon.png': 32
};

async function generateAssets() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, 'assets', 'icon.svg'));
  
  for (const [filename, size] of Object.entries(sizes)) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, 'assets', filename));
  }
}

generateAssets().catch(console.error); 