const multer = require('multer');

// Define the storage for the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/songs'); // Directory where audio files will be stored
  },
  filename: (req, file, cb) => {
    // Create a unique filename using the original name and current timestamp
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Create the multer instance with the defined storage
const upload = multer({ storage });

export default upload;
