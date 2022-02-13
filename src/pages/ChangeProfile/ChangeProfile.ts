import ProfilePage, { ProfilePageProps } from "../../views/pages/ProfilePage";
import render from "../../utils/render";
import InputField, { INPUT_FIELD_VARIANTS } from "../../ui/InputField";
import {
  emailValidators,
  loginValidators,
  nameValidators,
  phoneValidators,
} from "../../utils/validators";

const inputSettings = {
  withInternalID: true,
};

const variant = INPUT_FIELD_VARIANTS.PROFILE;

const FIELDS_PROPS = {
  EMAIL: {
    type: "email",
    label: "Почта",
    name: "email",
    value: "pochta@yandex.ru",
    variant,
    validators: emailValidators,
  },
  LOGIN: {
    type: "text",
    label: "Логин",
    name: "login",
    value: "ivanivanov",
    variant,
    validators: loginValidators,
  },
  FIRST_NAME: {
    type: "text",
    label: "Имя",
    name: "first_name",
    value: "Иван",
    variant,
    validators: nameValidators,
  },
  SECOND_NAME: {
    type: "text",
    label: "Фамилия",
    name: "second_name",
    value: "Иванов",
    variant,
    validators: nameValidators,
  },
  DISPLAY_NAME: {
    type: "text",
    label: "Имя в чате",
    name: "display_name",
    value: "Иван",
    variant,
    validators: nameValidators,
  },
  PHONE: {
    type: "text",
    label: "Телефон",
    name: "phone",
    value: "+79099673030",
    variant,
    validators: phoneValidators,
  },
};

const emailField = new InputField(FIELDS_PROPS.EMAIL, inputSettings);
const loginField = new InputField(FIELDS_PROPS.LOGIN, inputSettings);
const firstNameField = new InputField(FIELDS_PROPS.FIRST_NAME, inputSettings);
const secondName = new InputField(FIELDS_PROPS.SECOND_NAME, inputSettings);
const displayName = new InputField(FIELDS_PROPS.DISPLAY_NAME, inputSettings);
const phoneName = new InputField(FIELDS_PROPS.PHONE, inputSettings);

const fields = [
  emailField,
  loginField,
  firstNameField,
  secondName,
  displayName,
  phoneName,
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
  editable: true,
  events: {
    submit: onSubmitHandler,
  },
};

const loginPage = new ProfilePage(props);

render(".app", loginPage);
