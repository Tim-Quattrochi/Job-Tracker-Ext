const validateForm = (formData, formType) => {
  let errors = {};

  if (formType === "register") {
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword.length < 6) {
      errors.confirmPassword =
        "Password must be at least 6 characters";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    } else if (!formData.name) {
      errors.name = "Name is required";
    }
  } else if (formType === "login") {
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
  }

  return errors;
};

export default validateForm;
