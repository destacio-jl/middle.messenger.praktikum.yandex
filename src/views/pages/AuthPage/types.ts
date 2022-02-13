import Button from "../../../ui/Button";
import InputField from "../../../ui/InputField/InputField";

export type AuthPageProps = {
  name: string;
  fields: InputField[];
  action: Button;
  link?: Button;
  events?: {
    submit?: (e: SubmitEvent) => void;
  };
};
