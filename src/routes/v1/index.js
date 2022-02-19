const express = require('express');
const sampleRoute = require('./sample.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/sample',
    route: sampleRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
