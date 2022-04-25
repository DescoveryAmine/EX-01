const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.userId = !isEmpty(data.userid) ? data.userid : '';
  data.name = !isEmpty(data.name) ? data.name : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.userId, { min: 4, max: 8 })) {
    errors.userId = 'Login Id must be between 4 and 8 characters';
  }

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }
    if (!Validator.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.lastname = 'LastName must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.userId)) {
    errors.userId = 'Login ID field is required';
  }
  
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = 'LastName field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
