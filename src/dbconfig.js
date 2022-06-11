/* eslint-disable prettier/prettier */
require('dotenv').config();
const mysql = require('mysql');

// const pool = mysql.createPool({
//   connectionLimit: 100,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
// });

// module.export = {
//   getConnection: (callback) => {
//     return pool.getConnection(callback);
//   },
// };

const db = mysql.createConnection({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  multipleStatements: true,
});

// db.connect(function (err) {
//   if (err) throw err;
//   //   console.log(db);
//   console.log('Connected!');
// });
exports.db = db;
