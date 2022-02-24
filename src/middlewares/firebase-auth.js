const admin = require('firebase-admin');
const httpStatus = require('http-status');
const { firebaseConfig } = require('../config/config');

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

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

module.exports = decodeToken;
