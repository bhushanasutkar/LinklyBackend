const admin = require('./firebase-config');

const decodeToken = async (req, res, next) => {
  const {
    headers: { authorization },
  } = req;
  const token = authorization && authorization.startsWith('Bearer') && authorization.split(' ')[1];
  try {
    if (token) {
      const decodedToken = await admin.auth().verifyIdToken(token);
      if (decodedToken) {
        next();
      } else {
        res.json({ message: 'Unauthorized!' }).status(401);
      }
    } else {
      res.json({ message: 'Unauthorized!' }).status(401);
    }
  } catch (err) {
    res.json({ message: 'Unauthorized' }).status(401);
  }
};

module.exports = decodeToken;