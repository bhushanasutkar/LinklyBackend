const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { sampleService } = require('../services');

const hello = catchAsync(async (req, res) => {
  const upperCasename = await sampleService.hello(req.body.name);
  res.status(httpStatus.OK);
  return res.send({
    name: upperCasename,
  });
});

const helloGet = catchAsync(async (req, res) => {
  return res.send({
    message: 'API working',
  });
});

module.exports = {
  hello,
  helloGet,
};
