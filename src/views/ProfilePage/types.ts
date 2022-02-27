import { StoreEvents } from "../../core/Store";
import Button from "../../ui/Button";
import InputField from "../../ui/InputField/InputField";

export type ProfilePageProps = {
  name: string;
  fields: InputField[];
  backLinkRoute: string;
  actions?: Button[];
  editable?: boolean;
  events?: {
    submit?: (e: SubmitEvent) => void;
    [StoreEvents.Updated]?: () => void;
  };
};
