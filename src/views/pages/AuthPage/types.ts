import Button from "../../views/uiButton";
import InputField from "../../views/uiInputField/InputField";

export type AuthPageProps = {
  name: string;
  fields: InputField[];
  action: Button;
  link?: Button;
  events?: {
    submit?: (e: SubmitEvent) => void;
  };
};
