const express = require("express");
const fs = require('fs');
const rimraf = require('rimraf');
const { Poppler } = require('node-poppler');
const getArray = require('../modules/getArray');
const upload = require('../modules/multer');
const makeDir = require('../modules/directoryMake');

const router = express.Router();

router.post('/upload',makeDir,upload.any(),async (req,res) => {
  const { filename } = req.files[0];
  const poppler = new Poppler();
  const file = `./src/uploads/${filename}`;
  const options = {
    firstPageToConvert: 1,
    pngFile: true,
  };

  const outputFile = `${__dirname}/../uploads/test`;
  await poppler.pdfToCairo(options,file,outputFile)
    .then(async () => {
      fs.unlink(file,(err) => {
        if (err) throw err;
      });
    })
    .then(async () => {
      const result = await getArray('uploads');
      // 디렉터리 삭제
      rimraf(`${__dirname}/../uploads`,() => {
        console.log('done');
      });
      res.json({
        success: true,
        data: result
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;