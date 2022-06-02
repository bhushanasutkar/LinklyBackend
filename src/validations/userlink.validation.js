/* eslint-disable prettier/prettier */
const Joi = require('joi');

const userlink = {
  body: Joi.object().keys({
    userid: Joi.string().required(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required()
  }),
};
const accepted = {
  body: Joi.object().keys({
    userid: Joi.string().required(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required()
  }),
};
const insertonclick = {
  body: Joi.object().keys({
    linkid: Joi.number().required(),
    UserId: Joi.string().required(),
    Archive: Joi.number().required(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required()
  }),
};

module.exports = {
    userlink,
    accepted,
    insertonclick,
};
