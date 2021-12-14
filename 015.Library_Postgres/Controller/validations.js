const Joi = require('joi');

module.exports.userValidate = (body) => {
  const scheme = Joi.object().keys({
    name: Joi.string().required().min(3).max(50),
    login: Joi.string().required().min(3).max(50),
    password: Joi.string().required().min(5).max(1024)
  })
  return scheme.validate(body);
}

module.exports.authorValidate = (body) => {
  const scheme = Joi.object().keys({
    name: Joi.string().required().min(3).max(50),
  })
  return scheme.validate(body);
}

module.exports.bookValidate = (body) => {
  const scheme = Joi.object().keys({
    title: Joi.string().required().min(1).max(100),
    author: Joi.any(),
    qty: Joi.number()
  })
  return scheme.validate(body);
}

module.exports.authValidate = (body) => {
  const scheme = Joi.object().keys({
    login: Joi.string().required().min(3).max(50),
    password: Joi.string().required().min(5).max(1024)
  })
  return scheme.validate(body);
}