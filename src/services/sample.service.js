const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const hello = async (name) => {
  try {
    return name.toUpperCase();
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Unknown Error Occured.');
  }
};

module.exports = {
  hello
};
