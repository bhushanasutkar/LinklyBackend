const S3 = require('aws-sdk/clients/s3');
require('dotenv').config();
const fs = require('fs');

const bucketname = process.env.BUCKET_NAME;
const { region } = process.env;
const accesskeyId = process.env.AWS_ACCESS_KEY_ID;
const secretkeyAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new S3({
  region,
  accesskeyId,
  secretkeyAccessKey,
});

function uploadFile(file) {
  const fileStream = fs.createReadStream(file);

  const uploadParams = {
    Bucket: bucketname,
    Body: fileStream,
    Key: `${file}2`,
    // ACL: 'public-read',
  };
  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

function downloadFile(filekey) {
  const downloadParams = {
    Key: filekey,
    Bucket: bucketname,
  };
  return s3.getObject(downloadParams).createReadStream();
}
exports.downloadFile = downloadFile;
