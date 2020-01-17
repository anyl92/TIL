const validator = require("validator");


const validateOnChangeForm = payload => {
  if (
    typeof payload.email === "string" &&
    validator.isEmail(payload.email) &&
    // typeof payload.password === "string" &&
    payload.password.trim().length >= 8 &&
    payload.email && payload.password
  ) {
    return {
      btnState: true,
    };
  } else {
    return {
      btnState: false,
    };
  }
}


const validateLoginForm = payload => {
  const errors = {};
  let message = "";
  let isFormValid = true;

  if (
    !payload ||
    typeof payload.email !== "string" ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    errors.email = "Please provide a correct email address.";
  }

  if (
    !payload ||
    typeof payload.password !== "string" ||
    payload.password.trim().length === 0
  ) {
    isFormValid = false;
    errors.password = "Please provide your password.";
  }

  if (
    !payload ||
    typeof payload.password !== "string" ||
    payload.password.trim().length < 8
  ) {
    isFormValid = false;
    errors.password = "Password must have at least 8 characters.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};

module.exports = {
  validateLoginForm: validateLoginForm,
  validateOnChangeForm: validateOnChangeForm,
};
