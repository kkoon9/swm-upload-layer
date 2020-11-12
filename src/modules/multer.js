const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,'src/uploads/');
  },
  filename: (req,file,cb) => {
    cb(null,file.originalname);
  }
});
const upload = multer({
  dest: 'src/uploads/',
  storage
});

module.exports = upload;