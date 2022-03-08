import { FormError, Indexed } from "../core/types";
import InputField from "../views/ui/InputField";

export const getFormData = (fields: InputField[]): [Indexed, FormError[]] => {
  const errors: FormError[] = [];

  const formData = fields.reduce((data, field) => {
    field.validate();

    if (field.props.errorText) {
      errors.push({
        name: field.props.name,
        value: field.value,
        error: field.props.errorText,
      });
    }

    return {
      ...data,
      [`${field.props.name}`]: field.value,
    };
  }, {});

  return [formData, errors];
};
