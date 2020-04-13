const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateMealInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.calorie = !isEmpty(data.calorie) ? data.calorie.toString() : '';


  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.calorie)) {
    errors.calorie = 'Calorie field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
