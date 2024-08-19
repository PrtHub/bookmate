import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary'; 

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { 
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});

const upload = multer({ storage });

export default upload;
