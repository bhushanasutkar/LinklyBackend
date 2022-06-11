const S3 = require('aws-sdk/clients/s3');
const { getImgBuffer } = require('./getImgBuffer');
const config = require('../../config/config');

const s3 = new S3({
  region: config.s3Config.region,
  accessKeyId: config.s3Config.accessKeyId,
  secretAccessKey: config.s3Config.accesskey,
});

const uploadFile = async (filename, url) => {
  const image = await getImgBuffer(url);
  const fullFileName = `${filename}.${image.contentType.split('/').at(-1)}`;
  const uploadParams = {
    Bucket: config.s3Config.bucketName,
    Body: image.buffer,
    Key: fullFileName,
    ContentEncoding: 'base64',
    ContentType: image.contentType,
  };

  const objectUploaded = await s3.upload(uploadParams).promise();

  return objectUploaded.Location;
};

// Testing Code
// uploadFile('google', 'https://logo.clearbit.com/google.com').then((res) => {
//   console.log(res);
// });

module.exports = {
  uploadFile,
};
