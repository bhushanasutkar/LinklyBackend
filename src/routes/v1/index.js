const express = require('express');
const sampleRoute = require('./sample.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/sample',
    route: sampleRoute,
  }
];

const devRoutes = [
  // routes available only in development mode

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
