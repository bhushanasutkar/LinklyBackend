const Joi = require('joi');

const hello = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

module.exports = {
  hello,
};
