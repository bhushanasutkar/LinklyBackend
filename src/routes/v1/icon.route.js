// const express = require('express');

// const router = express.Router();
// const uploadFile = require('../../models/plugins/s3');
// router.post('/iconurl', function (req, res) {
//   const { url, filename } = req.body;
//   const geturl = uploadFile(url, filename);
//   res.send(geturl);
// });
// /* eslint-disable prettier/prettier */
// // const fs = require('fs');
// const AWS = require('aws-sdk');
// // const multer = require('multer');
// const express = require('express');
// const { db } = require('../../dbconfig');

// const router = express.Router();
// // const upload = multer({ dest: 'uploads/' });
// // const getImgBuffer = require('../../models/plugins/getImgBuffer');

// const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

// AWS.config.update({
//   acceskeyId: AWS_ACCESS_KEY_ID,
//   secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   region: 'ap-south-1',
// });

// const s3Bucket = new AWS.S3({ params: { Bucket: 'linkly-bucket' } });
// const s3Url = 'https://linkly-bucket.ap-south-1.s3.amazonaws.com/';
// const imageUpload = async (path, buffer) => {
//   console.log('Inside imageupload');

//   const data = {
//     Key: path,
//     Body: buffer,
//     ContentEncoding: 'base64',
//     ContentType: 'image/jpeg',
//     // ACL: 'public-read',
//   };
//   return new Promise((resolve, reject) => {
//     s3Bucket.putObject(data, (err) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(s3Url + path);
//       }
//     });
//   });
// };

// router.get('/linkly/icon', function (req, res) {
//   const { imageurl, imagename } = req.body;
//   const buffer =
//     '<Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 00 80 00 00 00 60 08 06 00 00 00 d5 7a 7a 49 00 00 0b dc 49 44 41 54 78 9c ec 9d 79 70 14 55 1e ... 3043 more bytes>';
//   const path = imagename;

//   const res =  imageUpload(path, buffer);
//   console.log(res)
//   const url = s3Url + path;
//   console.log(url);
//   const query = `Update website_data set Icon=?  WHERE  website_data.Name=?`;
//   const queryparams = [url, imagename];
//   db.query(query, queryparams, (err, results) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(s3Url + path);
//     }
//   });
// });

// module.exports = router;
