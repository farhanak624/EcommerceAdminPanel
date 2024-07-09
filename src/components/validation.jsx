export const validateFirstName = (name) => {
  if (!name || name.trim().length === 0) {
    return 'First Name is required';
  }
  if (/\d/.test(name)) {
    return 'Name should not contain numbers';
  }
  return '';
};

export const validateLastName = (name) => {
  if (!name || name.trim().length === 0) {
    return 'Last Name is required';
  }
  if (/\d/.test(name)) {
    return 'Name should not contain numbers';
  }
  return '';
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Email is not valid';
  }
  return '';
};

export const validatePhoneNumber = (mobile) => {
  if (!mobile) {
    return 'Mobile number cannot be empty';
  }

  const mobileRegex = /^\d+$/;
  if (!mobileRegex.test(mobile)) {
    return 'Mobile number should contain only numbers';
  }

  return '';
};


export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return 'Password must be 8+ characters, with a number and a special character.';
  }
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        return 'Passwords do not match'
    }
    return '';
}

export const loginValidateEmail = (email) => {
  if (!email || email.trim().length === 0) {
    return 'Email is required';
  }
  return '';
};

export const loginValidatePassword = (password) => {
  if (!password || password.trim().length === 0) {
    return 'Password is required';
  }
  return '';
};