import ProfilePage, { ProfilePageProps } from "../../views/pages/ProfilePage";
import render from "../../utils/render";
import InputField from "../../ui/InputField";
import { INPUT_FIELD_VARIANTS } from "../../ui/InputField/InputField";

const inputSettings = {
  withInternalID: true,
};

const variant = INPUT_FIELD_VARIANTS.PROFILE;

const FIELDS_PROPS = {
  OLD_PASSWORD: {
    type: "password",
    label: "Старый пароль",
    name: "oldPassword",
    variant,
  },
  NEW_PASSWORD: {
    type: "password",
    label: "Новый пароль",
    name: "newPassword",
    variant,
  },
  NEW_PASSWORD_REPEAT: {
    type: "password",
    label: "Повторите новый пароль",
    name: "newPasswordRepeat",
    variant,
  },
};

const oldPasswordField = new InputField(
  FIELDS_PROPS.OLD_PASSWORD,
  inputSettings
);
const newPasswordField = new InputField(
  FIELDS_PROPS.NEW_PASSWORD,
  inputSettings
);
const newPasswordRepeatField = new InputField(
  FIELDS_PROPS.NEW_PASSWORD_REPEAT,
  inputSettings
);

const props: ProfilePageProps = {
  name: `Иван`,
  fields: [oldPasswordField, newPasswordField, newPasswordRepeatField],
  editable: true,
};

const changePasswordPage = new ProfilePage(props);

render(".app", changePasswordPage);
