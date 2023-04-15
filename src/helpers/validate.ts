export const validatePhoneNumber = (value: string) => {
  const re = /^((\+7|7|8)+([0-9]){10})$/;
  if (value && !re.test(value)) {
    return false;
  } else {
    return true;
  }
};
export const validateName = (value: string) => {
  if (value.trim().length === 0) {
    return false;
  } else {
    return true;
  }
};
