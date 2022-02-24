const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'stage').required(),
    PORT: Joi.number().default(5000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    FIREBASE_ACC_TYPE: Joi.string().default('service_account'),
    FIREBASE_PROJECT_ID: Joi.string().required().description('Firebase Project Id'),
    FIREBASE_PRIVATE_KEY_ID: Joi.string().alphanum().required().description('Firebase Private Key Id'),
    FIREBASE_PRIVATE_KEY: Joi.string().required().description('Firebase Private Key'),
    FIREBASE_CLIENT_EMAIL: Joi.string().email().required().description('Firebase Client Email'),
    FIREBASE_CLIENT_ID: Joi.string().required().description('Firebase Client Id'),
    FIREBASE_AUTH_URI: Joi.string().uri().required().description('Firebase Auth URI'),
    FIREBASE_TOKEN_URI: Joi.string().uri().required().description('Firebase token URI'),
    FIREBASE_AUTH_CERT: Joi.string().uri().required().description('Firebase Auth Certificate'),
    FIREBASE_CLIENT_CERT: Joi.string().uri().required().description('Firebase Client Certificate'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  firebaseConfig: {
    type: envVars.FIREBASE_ACC_TYPE,
    project_id: envVars.FIREBASE_PROJECT_ID,
    private_key_id: envVars.FIREBASE_PRIVATE_KEY_ID,
    private_key: envVars.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: envVars.FIREBASE_CLIENT_EMAIL,
    client_id: envVars.FIREBASE_CLIENT_ID,
    auth_uri: envVars.FIREBASE_AUTH_URI,
    token_uri: envVars.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: envVars.FIREBASE_AUTH_CERT,
    client_x509_cert_url: envVars.FIREBASE_CLIENT_CERT,
  },
};
