import ProfilePage, { ProfilePageProps } from "../../views/pages/ProfilePage";
import render from "../../utils/render";
import InputField from "../../ui/InputField";
import { INPUT_FIELD_VARIANTS } from "../../ui/InputField/InputField";
import Button from "../../ui/Button";

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
  },
  LOGIN: {
    type: "text",
    label: "Логин",
    name: "login",
    value: "ivanivanov",
    variant,
  },
  FIRST_NAME: {
    type: "text",
    label: "Имя",
    name: "first_name",
    value: "Иван",
    variant,
  },
  SECOND_NAME: {
    type: "text",
    label: "Фамилия",
    name: "second_name",
    value: "Иванов",
    variant,
  },
  DISPLAY_NAME: {
    type: "text",
    label: "Имя в чате",
    name: "display_name",
    value: "Иван",
    variant,
  },
  PHONE: {
    type: "text",
    label: "Телефон",
    name: "phone",
    value: "+7 (909) 967 30 30",
    variant,
  },
};

const emailField = new InputField(FIELDS_PROPS.EMAIL, inputSettings);
const loginField = new InputField(FIELDS_PROPS.LOGIN, inputSettings);
const firstNameField = new InputField(FIELDS_PROPS.FIRST_NAME, inputSettings);
const secondName = new InputField(FIELDS_PROPS.SECOND_NAME, inputSettings);
const displayName = new InputField(FIELDS_PROPS.DISPLAY_NAME, inputSettings);
const phoneName = new InputField(FIELDS_PROPS.PHONE, inputSettings);

const props: ProfilePageProps = {
  name: `Иван`,
  fields: [
    emailField,
    loginField,
    firstNameField,
    secondName,
    displayName,
    phoneName,
  ],
  editable: true,
};

const loginPage = new ProfilePage(props);

render(".app", loginPage);
