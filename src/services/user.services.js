/* eslint-disable prettier/prettier */
const { db } = require('../dbconfig');

const usersignups = async (name, email, password, Subscribtionstatus, currentlevel) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `INSERT INTO users (Name,Email,Password,Subscribtionstatus,Currentlevel) VALUES (?,?,?,?,?)`;
        const queryparams = [name, email, password, Subscribtionstatus, currentlevel];
        db.query(query, queryparams, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

const userlogins = async (email, password) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const query = `SELECT UserId, Name, Email FROM users WHERE Email='${email}' and Password='${password}' `;
        let success = false;
        db.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.length === 0) {
            success = false;
            resolve(res, success);
          } else {
            success = true;
            resolve(res, success);
          }
        });
      } catch (err) {
        reject(err);
      }
    })();
  });
};

module.exports = {
  usersignups,
  userlogins,
};
