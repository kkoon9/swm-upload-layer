import AWS from 'aws-sdk';
import 'dotenv/config';
import { uuid } from 'uuidv4';

let undefinedValue : AWS.S3.ManagedUpload.ManagedUploadOptions;

AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey
});
const s3 = new AWS.S3();

const awsUpload = (file, base64data) => {
  return new Promise((resolve) => {
    const params = {
      Bucket: 'connect-class-test',
      Key: `${Date.now() + uuid()}.png`,
      Body: base64data,
      ACL: 'public-read'
    };
    s3.upload(params, undefinedValue, (err, res) => {
      if (!err) {
        resolve(res.Location);
      }
    });
  });
};

export default awsUpload;
