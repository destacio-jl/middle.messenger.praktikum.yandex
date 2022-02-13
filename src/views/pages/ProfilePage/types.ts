import Button from "../../../ui/Button";
import InputField from "../../../ui/InputField/InputField";

export type ProfilePageProps = {
  name: string;
  fields: InputField[];
  actions?: Button[];
  editable?: boolean;
};
