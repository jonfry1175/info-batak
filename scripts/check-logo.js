
const sharp = require('sharp');
sharp('public/logo.png').metadata().then(m => console.log(m));
