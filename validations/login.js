const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';


  if(!Validator.isEmail(data.email)){
    errors.email = 'Invalid email address';
  }

  if(Validator.isEmpty(data.email)){
    errors.email = 'Email field must not be empty';
  }

  if(Validator.isEmpty(data.password)){
    errors.password = 'Password field must not be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
