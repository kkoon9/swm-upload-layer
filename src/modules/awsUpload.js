const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey
});
const s3 = new AWS.S3();

const awsUpload = (file,base64data) => {
  return new Promise((resolve) => {
    const params = {
      Bucket: 'connect-class-test',
      Key: `${Date.now() + uuidv4()}.png`,
      Body: base64data,
      ACL: 'public-read'
    };
    s3.upload(params,'',(err,res) => {
      if (!err) {
        resolve(res.Location);
      }
    });
  });
};

module.exports = awsUpload;

