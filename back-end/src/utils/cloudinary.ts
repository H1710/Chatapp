import dotenv from 'dotenv';

dotenv.config();
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dorem3qka',
  api_key: '283865376779152',
  api_secret: 'Jf3xhuDzwgja9OuBmJFiLy2iXOI',
  secure: true,
});

export default cloudinary;
