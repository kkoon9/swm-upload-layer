import { Router } from 'express';
import pdf from 'pdf-poppler';
import fs from 'fs';
import rimraf from 'rimraf';
import getArray from '../modules/getArray';
import upload from '../modules/multer';

const router = Router();

router.post('/upload', upload.any(), async (req, res) => {
  const { filename } = req.files[0];
  const filePath = filename.split('.pdf')[0];
  const file = `./src/uploads/${filename}`;
  const opts = {
    format: 'png',
    out_dir: `${__dirname}/../${filePath}`,
    out_prefix: filePath,
    page: null,
    combinedImage: true
  };
  try {
    fs.mkdirSync(`${__dirname}/../${filePath}`);
  } catch (e) {
    if (e.code !== 'EEXIST') throw e;
  }
  await pdf.convert(file, opts)
    .then(async () => {
      // console.log(`${filePath} Successfully converted`);
    })
    .then(async () => {
      const result = await getArray(filePath);
      // 디렉터리 삭제
      rimraf(`${__dirname}/../${filePath}`);
      res.json({
        success: true,
        data: result
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

export default router;
