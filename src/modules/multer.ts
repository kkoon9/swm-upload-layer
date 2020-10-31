import multer from 'multer';
import fs from 'fs';

try {
  fs.mkdirSync(`${__dirname}/../uploads`);
} catch (e) {
  if (e.code !== 'EEXIST') throw e;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({
  dest: 'src/uploads/',
  storage
});

export default upload;
