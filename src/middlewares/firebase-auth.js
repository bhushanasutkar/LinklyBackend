const admin = require('firebase-admin');
const httpStatus = require('http-status');

const firebaseConfig = {
  type: process.env.FIREBASE_ACC_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
};

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
