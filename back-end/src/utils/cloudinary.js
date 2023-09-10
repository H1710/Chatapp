const dotenv = require('dotenv');

dotenv.config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dorem3qka',
  api_key: '283865376779152',
  api_secret: 'Jf3xhuDzwgja9OuBmJFiLy2iXOI',
  secure: true,
});

module.exports = cloudinary;
