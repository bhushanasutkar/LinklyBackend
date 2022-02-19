const express = require('express');
const sampleRoute = require('./sample.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [];

const devOrStageRoutes = [
  // routes available only in development/stage mode
  {
    path: '/sample',
    route: sampleRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development' || config.env === 'stage') {
  devOrStageRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
