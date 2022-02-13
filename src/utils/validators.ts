export type Validator = (value: string) => string | null;

export const validateRequired: Validator = (value) =>
  value ? null : "Поле обязательно для заполнения";

export const validateFirstLetterCapital: Validator = (value) => {
  const isValid = !value || /[А-ЯA-Z]/.test(value.charAt(0));

  return isValid ? null : "Первая буква должна быть заглавной";
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
  const isValid = !value || /(?!^\d+$)^[a-zA-Z\d\-_]+$/.test(value);

  return isValid
    ? null
    : "Поле может содержать буквы латинского алфавита, дефис и нижнее подчеркивание";
};

export const validatePasswordString: Validator = (value) => {
  const hasNumber = /.*[0-9].*/.test(value);
  const hasCapitalLetter = /.*[А-ЯA-Z].*/.test(value);

  if (value && !hasNumber) return "Поле должно содержать хотя бы одну цифру";
  if (value && !hasCapitalLetter)
    return "Поле должно содержать хотя бы одну заглавную букву";

  return null;
};
