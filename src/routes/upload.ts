import { Router } from 'express';
import fs from 'fs';
import rimraf from 'rimraf';
import { Poppler } from 'node-poppler';
import getArray from '../modules/getArray';
import upload from '../modules/multer';

const router = Router();

router.post('/upload', upload.any(), async (req, res) => {
  const { filename } = req.files[0];
  const poppler = new Poppler();
  const file = `./src/uploads/${filename}`;
  const options = {
    firstPageToConvert: 1,
    pngFile: true,
  };

  const outputFile = `${__dirname}/../uploads/test`;
  await poppler.pdfToCairo(options, file, outputFile)
    .then(async () => {
      fs.unlink(file, (err) => {
        if (err) throw err;
      });
    })
    .then(async () => {
      const result = await getArray('uploads');
      // 디렉터리 삭제
      rimraf(`${__dirname}/../uploads`, () => {
        console.log('done');
      });
      console.log(result);
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
