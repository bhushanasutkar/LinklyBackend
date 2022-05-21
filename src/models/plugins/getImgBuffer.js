// const { Buffer } = require('buffer');
// const request = require('request').defaults({ encoding: null });

// let a;
// const url = 'https://logo.clearbit.com/facebook.com';
// // getImgBuffer(url);
// function getImgBuffer(url) {
//   request.get(url, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//       console.log('Inside the func');
//       const data = Buffer.from(body).toString('base64');
//       // a = data;
//       console.log(data);
//       const a = Buffer.from(data, 'base64');
//       console.log(a);
//     }
//   });
// }
// module.exports = getImgBuffer;

// // stackoverflow
// input ->url
// url -> buffer
// buffer->base64

// // blog
// input->base64
// base64->buffer
