const Validator = require("validator");
const isEmpty = require("is-empty");
const moment = require("moment");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to empty string to use Validator
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.dob = !isEmpty(data.dob) ? data.dob : "";
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

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.isAlphanumeric(data.password, "en-US")) {
    errors.password = "Password must include a number and a letter";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Your password does not match. Please try again";
  }

  // Check dob
  if (Validator.isEmpty(data.dob)) {
    errors.name = "Date of birth field is required";
  }

  if (!moment(data.dob, "YYYY-MM-DD").isValid) {
    errors.name = "Invalid date";
  }

  // Check gender
  if (Validator.isEmpty(data.gender)) {
    errors.name = "Gender field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
