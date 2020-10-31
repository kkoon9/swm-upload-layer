import fs from 'fs';
import awsUpload from './awsUpload';

// reg ex to match
const re = /\.png$/;

const upload = async (name) => {
  const result : any = [];
  const test = fs.readdirSync(`${__dirname}/../${name}/`);
  const matches = test.filter((text) => {
    return re.test(text);
  });
  const numFiles = matches.length;
  if (numFiles) {
    for (let i = 0; i < numFiles; i += 1) {
      const file = matches[i];
      const filePath = `${__dirname}/../${name}/${file}`;
      // console.log(filePath);
      const str = fs.readFileSync(filePath);
      // Buffer Pattern; how to handle buffers; straw, intake/outtake analogy
      const base64data = Buffer.from(str);
      // eslint-disable-next-line no-await-in-loop
      const url = await awsUpload(file, base64data);
      result.push(url);
    }
  }
  return result;
};

export default upload;
