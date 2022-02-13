import { Validator } from "../../utils/validators";

export enum INPUT_FIELD_VARIANTS {
  AUTH = `auth`,
  PROFILE = `profile`,
  ROUNDED = `rounded`,
}

export type InputFieldProps = {
  name: string;
  showErrors?: boolean;
  label?: string;
  type?: string;
  errorText?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  variant?: INPUT_FIELD_VARIANTS;
  validators?: Validator[];
};
