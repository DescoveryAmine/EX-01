const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSubmitInscription(data) {
  let errors = {};

  data.userid = !isEmpty(data.userid) ? data.userid : '';

  if (Validator.isEmpty(data.userid)) {
    errors.userid = 'userId field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
