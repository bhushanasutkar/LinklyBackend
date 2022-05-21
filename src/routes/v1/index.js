const express = require('express');
const sampleRoute = require('./sample.route');
const userlinkroute = require('./userlink.route');
const userroute = require('./user.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [];

const devOrStageRoutes = [
  // routes available only in development/stage mode
  {
    path: '/sample',
    route: sampleRoute,
  },
  {
    path: '/userlink',
    route: userlinkroute,
  },
  {
    path: '/user',
    route: userroute,
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

module.exports.router = router;
