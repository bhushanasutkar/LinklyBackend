// /* eslint-disable prettier/prettier */
// const httpStatus = require('http-status');
// const fs = require('fs');
// const AWS = require('aws-sdk');
// const multer = require('multer');
// const catchAsync = require('../utils/catchAsync');
// const ApiError = require('../utils/ApiError');
// const { db } = require('../dbconfig');

// const upload = multer({ dest: 'uploads/' });
// const getImgBuffer = require('../models/plugins/getImgBuffer');

// const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

// AWS.config.update({
//   acceskeyId: AWS_ACCESS_KEY_ID,
//   secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   region: 'ap-south-1',
// });

// const s3Bucket = new AWS.S3({ params: { Bucket: 'linkly-bucket' } });
// const s3Url = 'https://linkly-bucket.ap-south-1.s3.amazonaws.com/';
// const imageUpload = async (path, buffer) => {
//   console.log('Indside imageupload');

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

// const icon = catchAsync(async (req, res) => {
//   const { name, email, password, Subscribtionstatus, currentlevel } = req.body;
//   try {
//     const query = `INSERT INTO users (Name,Email,Password,Subscribtionstatus,Currentlevel) VALUES (?,?,?,?,?)`;
//     const queryparams = [name, email, password, Subscribtionstatus, currentlevel];
//     db.query(query, queryparams, (err, result) => {
//       if (err) {
//         res.send({
//           Error: err,
//         });
//       }
//       res.status(httpStatus.OK);
//       res.send(result);
//     });
//   } catch (error) {
//     throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Unknown Error Occured.');
//   }
// });
// module.exports = {
//   icon,
// };
