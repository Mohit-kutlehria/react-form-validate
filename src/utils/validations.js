export const validateName = (name) => {
  if (!name) return 'Name is required.';
  if (name.length < 3) return 'Name must be at least 3 characters long.';
  return null;
};

export const validateEmail = (email) => {
  if (!email) return 'Email is required.';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Invalid email format.';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required.';
  if (password.length < 8)
    return 'Password must be at least 8 characters long.';
  if (!/[A-Z]/.test(password)) return 'Must include an uppercase letter.';
  if (!/[0-9]/.test(password)) return 'Must include a number.';
  return null;
};
