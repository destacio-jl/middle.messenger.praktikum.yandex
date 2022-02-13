export type Validator = (value: string) => string | null;

const firstLetterCapitalReg = /[А-ЯA-Z]/;
const nameReg = /^[а-яА-Яa-zA-Z-]+$/;
const loginReg = /(?!^\d+$)^[a-zA-Z\d\-_]+$/;
const hasNumberReg = /.*[0-9].*/;
const hasCapitalLetterReg = /.*[А-ЯA-Z].*/;
const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phoneReg = /^[\d+][\d]+$/;

export const validateRequired: Validator = (value) =>
  value ? null : "Поле обязательно для заполнения";

export const validateFirstLetterCapital: Validator = (value) => {
  const isValid = !value || firstLetterCapitalReg.test(value.charAt(0));

  return isValid ? null : "Первая буква должна быть заглавной";
};

export const validateNameString: Validator = (value) => {
  const isValid = !value || nameReg.test(value);

  return isValid ? null : "Поле может содержать буквы и дефис";
};

export const validateMinLength =
  (length: number): Validator =>
  (value) => {
    const isValid = !value || value.length >= length;

    return isValid
      ? null
      : `Кол-во символов должно быть по меньшей мере ${length}`;
  };

export const validateMaxLength =
  (length: number): Validator =>
  (value) => {
    const isValid = !value || value.length <= length;

    return isValid
      ? null
      : `Кол-во символов должно быть меньше или равно ${length}`;
  };

export const validateLoginString: Validator = (value) => {
  const isValid = !value || loginReg.test(value);

  return isValid
    ? null
    : "Поле может содержать буквы латинского алфавита, дефис и нижнее подчеркивание";
};

export const validatePasswordString: Validator = (value) => {
  const hasNumber = hasNumberReg.test(value);
  const hasCapitalLetter = hasCapitalLetterReg.test(value);

  if (value && !hasNumber) return "Поле должно содержать хотя бы одну цифру";
  if (value && !hasCapitalLetter)
    return "Поле должно содержать хотя бы одну заглавную букву";

  return null;
};

export const validateEmail: Validator = (value) => {
  const isValid = !value || emailReg.test(value);

  return isValid ? null : "Введите имейл в формате common@mail.com";
};

export const validatePhoneString: Validator = (value) => {
  const isValid = !value || phoneReg.test(value);

  return isValid
    ? null
    : `Поле должно содержать только цифр, может начинаться со знака "+"`;
};

export const loginValidators = [
  validateRequired,
  validateMinLength(3),
  validateMaxLength(20),
  validateLoginString,
];

export const nameValidators = [
  validateRequired,
  validateFirstLetterCapital,
  validateNameString,
];

export const passwordValidators = [
  validateRequired,
  validateMinLength(8),
  validateMaxLength(40),
  validatePasswordString,
];
