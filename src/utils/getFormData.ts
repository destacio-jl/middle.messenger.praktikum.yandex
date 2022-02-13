import { InputFieldProps } from "../ui/InputField";

const getFormData = (
  form: HTMLFormElement,
  fields: { [key: string]: InputFieldProps }
) => {
  return Object.values(fields).reduce((data, field) => {
    return {
      ...data,
      [field.name]: form.elements[field.name].value,
    };
  }, {});
};

export default getFormData;
