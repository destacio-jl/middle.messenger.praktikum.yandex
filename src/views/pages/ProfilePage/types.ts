import { StoreEvents } from "../../../core/Store";
import Button from "../../ui/Button";
import InputField from "../../ui/InputField";

export enum EDITABLE_FIELDS {
  DATA = "data",
  PASSWORD = "password",
  NONE = "",
}

export type ProfilePageProps = {
  name: string;
  fields: InputField[];
  backLinkRoute: string;
  editableFields: EDITABLE_FIELDS;
  actions?: Button[];
  avatar?: string;
  events?: {
    submit?: (e: SubmitEvent) => void;
    [StoreEvents.Updated]?: () => void;
  };
};

export type ChangeAvatarProps = {
  title: string;
  fileName?: string;
  error?: string;
};
