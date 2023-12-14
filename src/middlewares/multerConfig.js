import multer from 'multer';


const storage = multer.diskStorage({
 
  destination: function (req, file, cb) {
    cb(null, 'img/profile');
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const fileStorage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, 'img/houses'); // Directorio para archivos
  
  },
  
  filename: function (req, file, cb) {
    
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const photoUpload = multer({
 
  limits: {
    fileSize: 1024 * 1024 * 10, 
  },
  
  storage: storage,
});


const housephotopload = multer({ storage: fileStorage });


export  {
  photoUpload,
  housephotopload
};
