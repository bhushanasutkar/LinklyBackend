const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');

const config = require('./config/config');
const morgan = require('./config/morgan');
const obj = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const firebaseAuth = require('./middlewares/firebase-auth');

const routes = obj.router;
const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// authentication
app.use(firebaseAuth);

// v1 api routes
app.use('/v1', routes);

// test route
app.get('/', (req, res) => {
  res.json('Server Running.');
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
// FIREBASE_ACC_TYPE=service_account
// FIREBASE_PROJECT_ID=backlink-marketplace
// FIREBASE_PRIVATE_KEY_ID=a56623844291700eefc509d15489d8d08aa3e6a8
// FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCikl/+pQ2YxFQM\nziGYfSEobHYvSP3Bn5eF4tIQ/IXup/iJ7eqXCYjo1cHns5iiEZoTjolBRi40sxpz\nUGbDhxiFo8r4prfgX1STBBVuT9F7PUctt20wisfpOwS14sD6lKYEySUA/xwwHjDs\nqKnZzUPpxzFwV7hUQt3XlTgLirIcikhLyg6k1aMn10FaVNY03qvO3r1MvnVcYfV8\nXQdt90G3QS7VGiW16hQq3Vsn+a28RJt5yrzUWazqITDxdUALpZC87laQIIpjecpM\n3rii24OXHOZtMU7/zZ/QOcPjjlOKiWY2TvLGy3KJeZKfFcFD8uBI9otXGKcoxJ9S\n8Fr1j2LrAgMBAAECggEAS6Hwkf4ExNk1xx1RCOnR9sX698Wr9JwEONAM7cUlpCG2\nIakzld/kN3pW8y4dKO0qcsXBukHltjPK7vHtVTLxKB9LCwI5EmQXaywfsknlCcI4\n7p5i6I3wMmP4LYxYPlvQnvJbSkrlOMea+EcBeigiW80FhZ/xzBWtsqGjyM7WTSsU\nPzCOUjq/M7SIWT6x5zlTApW8PnV1708dTqQW6NC/8bHlD8UBnQU40RFSp12C1A2W\nc39gYI+zSzbkDu6O3HBgtiuZh271VCAsoIhOBxDxuWW1XG4t6l2PuMLRrYsanU6O\nY+hjfvuYNoxDV0i6ScGd4EvsA2ELR4o+BdXNabzPLQKBgQDUI4kJ+uYbVQ2n4Yx0\nSWVHLo5ZkDxHrG+SQg9d6KQL5PMdKfbu3GkL8yU7htG/jbMPM9xRaqhHfZ0GGcIE\n9i29EjCNNY8/1sFXiysqfLozziLMGkdDojUBhIn2xBr8DK+h3uknwkx0e55CNR0t\nbs6a7EiDoHeGsmtUv31BJ4pQdwKBgQDEL0Q+CJdWB4KjLxzqYLGIfwIGG3LFp4qr\nweApNoll4wPX4R30drsfnaU1ffLii0cBWML0/uY7OG6pfGfjVod9KdAjpc2Q+BJh\nF915NJOFNUPZj9ImVH6m5jEGicM2+kDkrQzsQFcVPlzNpRW2Tt03QtiSXi+nOhi1\n3AZYX7gyLQKBgAlFREfbXxLytJYRlUG/s11Y+3+OfhPjxTxvBpzj/cdHShiMLO5j\nU3PiPE5NpfzpBFo1ufsU3iXBp4sMtR3iZD1O/jAtlwUDLY/V1R0WNkztRTgGLfcW\nr5pRYHYYO9Wn+ETqqOXD5/NvM4tRJuVFYmIC0WhvKsoIIgiiFaczQyghAoGAAs+W\nj7j5yh7DbWkgZe9Ku+Tt935vL4vN/dYCSzTf1RjiljZAgp8s4TAWDOUoFLzgIJHQ\nAUihrdmKJF2G84fq2w09UTVv85LKWJ/J6ZGqR29S8IwR+8CcK/ICY9CXfnMpeN1N\n4Riu5rwFAmFKJVmN69vGVJqK3j+D2R807BE7B2UCgYAJvWs3AYwmH+7lNp/wdM1b\nl8eVYVXJsv0xAEK5BlTLMjQMSGBJk0KfO97IE9f20YKHA4V1oyagVy0JIXtC8g7r\nEcx1Gh/m7yvTiiRgqrIcb15cmOif/Jf4ZjZ+5jXWMyMXO7s/Zt1k8hLDt3Fa7LHK\nKzIO/vAj8BrYDP0kJvrB9A==\n-----END PRIVATE KEY-----\n
// FIREBASE_CLIENT_EMAIL=firebase-adminsdk-sd1y8@backlink-marketplace.iam.gserviceaccount.com
// FIREBASE_CLIENT_ID=104622581243579916312
// FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
// FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
// FIREBASE_AUTH_CERT=https://www.googleapis.com/oauth2/v1/certs
// FIREBASE_CLIENT_CERT=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sd1y8%40backlink-marketplace.iam.gserviceaccount.com
