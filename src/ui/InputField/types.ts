import { Validator } from "../../utils/validators";

export enum INPUT_FIELD_VARIANTS {
  AUTH = `auth`,
  PROFILE = `profile`,
}

export type InputFieldProps = {
  name: string;
  type: string;
  label: string;
  errorText?: string;
  value?: string;
  disabled?: boolean;
  variant?: INPUT_FIELD_VARIANTS;
  validators?: Validator[];
};
