import fs from 'fs';

const makeDir = (req,res, next) => {
  if (!fs.existsSync(`${__dirname}/../uploads`)) {
    fs.mkdirSync(`${__dirname}/../uploads`);
  }
  next();
};

export default makeDir;
