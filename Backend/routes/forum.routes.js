const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forum.controller');
const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
    const allowedImageExtensions = ['.jpg', '.jpeg', '.png'];
    const allowedPdfExtensions = ['.pdf'];
    
    const fileExtension = path.extname(file.originalname).toLowerCase();
    console.log('fileExtension: ', fileExtension)
    
    if (allowedImageExtensions.includes(fileExtension)) {
      req.fileType = 'image'; // Marcar el tipo de archivo como imagen
      cb(null, true); // Aceptar el archivo de imagen
    } else if (allowedPdfExtensions.includes(fileExtension)) {
      req.fileType = 'pdf'; // Marcar el tipo de archivo como PDF
      cb(null, true); // Aceptar el archivo PDF
    } else {
      cb(new Error('El archivo debe ser una imagen (JPEG, PNG) o un PDF.'), false); // Rechazar el archivo
    }
};
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
  });

router.get('/posts', forumController.getPosts);
router.post('/posts', upload.single('file'), forumController.addPost);
router.post('/response', upload.single('file'), forumController.addResponse);

module.exports = router;