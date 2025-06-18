import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js'; // Don't forget .js extension in ESM

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'jw_products', // Cloudinary folder name
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

export default upload;
