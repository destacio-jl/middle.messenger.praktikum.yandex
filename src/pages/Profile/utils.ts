import { User } from "../../api/AuthAPI";
import InputField from "../../views/ui/InputField";

export const updateFieldsValues = (
  fields: InputField[],
  dataFromStore: User
) => {
  fields.forEach((field) => {
    field.setProps({ ...field.props, value: dataFromStore[field.name] });
  });
};
