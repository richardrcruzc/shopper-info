const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateSmsInput(data) {
  let errors = {};
  if (isEmpty(data.phone)) {
    return {
      errors: "empty phone !",
      isValid: false,
    };
  }

  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.fName = !isEmpty(data.fName) ? data.fName : "";
  data.lName = !isEmpty(data.lName) ? data.lName : "";
  data.ZipCode = !isEmpty(data.ZipCode) ? data.ZipCode : "";

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "phone field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "email field is required";
  }
  if (Validator.isEmpty(data.fName)) {
    errors.fName = "fName field is required";
  }
  if (Validator.isEmpty(data.lName)) {
    errors.lName = "lName field is required";
  }
  if (Validator.isEmpty(data.ZipCode)) {
    errors.ZipCode = "ZipCode field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
