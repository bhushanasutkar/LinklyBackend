const admin = require('firebase-admin');
const httpStatus = require('http-status');
const { firebaseConfig } = require('../config/config');

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

const getEmail = async (email) => {
  const userData = await admin.auth().getUserByEmail(email);
  return {
    uid: userData.uid,
    displayName: userData.displayName,
    email: userData.email,
    emailVerified: userData.emailVerified,
    photoUrl: userData.photoURL,
  };
};

const decodeToken = async (req, res, next) => {
  const {
    headers: { authorization },
  } = req;
  const token = authorization && authorization.startsWith('Bearer') && authorization.split(' ')[1];
  try {
    await admin.auth().verifyIdToken(token);
    return next();
  } catch (err) {
    res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }
};

// Test Code
// getEmail('divyanshu@flickzee.com')
//   .then((d) => {
//     console.log(d);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

module.exports = { decodeToken, getEmail };
