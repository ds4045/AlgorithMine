export const validatePhoneNumber = (value: string) => {
  const reg = /^((\+7|7|8)+([0-9]){10})$/;
  return reg.test(value);
};
export const validateName = (value: string) => value.trim().length !== 0;

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
