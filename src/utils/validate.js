const validateEmail = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

export const validateField = (value, field) => {
  if (field.inputType === "email" && !validateEmail(value)) {
    return "Please enter a valid email address.";
  } else if (field.inputType === "number" && (isNaN(value) || value === "")) {
    return "Please enter a valid number.";
  } else if (field.inputType === "text" && value.trim() === "") {
    return "This field is required.";
  } else if (field.inputType === "password" && value.length < 6) {
    return "Password must be at least 6 characters long.";
  } else if (field.inputType === "date" && !value) {
    return "Please select a date.";
  }
  return null;
};
