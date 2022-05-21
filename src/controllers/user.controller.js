const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');

const { userservices } = require('../services');

const usersignup = catchAsync(async (req, res) => {
  const { name, email, password, Subscribtionstatus, currentlevel } = req.body;
  const response = await userservices.usersignups(name, email, password, Subscribtionstatus, currentlevel);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

const userlogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const response = await userservices.userlogins(email, password);
  res.status(httpStatus.OK);
  return res.send({
    response,
  });
});

module.exports = {
  usersignup,
  userlogin,
};
