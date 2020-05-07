const Validator = require("validator");
const isEmpty = require("is-empty");
const moment = require("moment");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to empty string to use Validator
  data.name = !isEmpty(data.name) ? Validate.escape(data.name) : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = (!isEmpty(data.password2)) ? data.password2 : "";
  data.dob = (data.dob != "--") ? data.dob : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";

  // Name check
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Email check
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Please confirm your password";
  }

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be at least 8 characters";
  }

  if (Validator.isAlpha(data.password, "en-US") || Validator.isNumeric(data.password, {no_symbols: true})) {
    errors.password = "Password must include a number and a letter";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Your password does not match. Please try again";
  }

  // Check dob
  if (Validator.isEmpty(data.dob)) {
    errors.dob = "Date of birth field is required";
  }

  if (!moment(data.dob, "YYYY-MM-DD").isValid) {
    errors.dob = "Invalid date";
  }

  // Check gender
  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
