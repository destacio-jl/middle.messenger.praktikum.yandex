import { passwordValidators } from "../../utils/validators";
import { ROUTES } from "../../const";
import InputField, { INPUT_FIELD_VARIANTS } from "../../views/ui/InputField";
import ProfilePage, { ProfilePageProps } from "../../views/pages/ProfilePage";

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
    validators: passwordValidators,
  },
  NEW_PASSWORD: {
    type: "password",
    label: "Новый пароль",
    name: "newPassword",
    variant,
    validators: passwordValidators,
  },
  NEW_PASSWORD_REPEAT: {
    type: "password",
    label: "Повторите новый пароль",
    name: "newPasswordRepeat",
    variant,
    validators: passwordValidators,
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

const fields: InputField[] = [
  oldPasswordField,
  newPasswordField,
  newPasswordRepeatField,
];

const onSubmitHandler = (e: SubmitEvent) => {
  e.preventDefault();

  const errors = [];

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

  console.log(formData);
};

const props: ProfilePageProps = {
  name: `Иван`,
  fields,
  backLinkRoute: ROUTES.PROFILE,
  editable: true,
  events: {
    submit: onSubmitHandler,
  },
};

const changePasswordPage = new ProfilePage(props);

export default changePasswordPage;
