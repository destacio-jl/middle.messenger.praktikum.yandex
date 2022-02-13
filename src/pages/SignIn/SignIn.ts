import AuthPage, { AuthPageProps } from "../../views/pages/AuthPage";
import render from "../../utils/render";
import InputField from "../../ui/InputField";
import Button from "../../ui/Button";

const inputSettings = {
  withInternalID: true,
};

const FIELDS_PROPS = {
  EMAIL: {
    type: "email",
    label: "Почта",
    name: "email",
  },
  LOGIN: {
    type: "text",
    label: "Логин",
    name: "login",
  },
  FIRST_NAME: {
    type: "text",
    label: "Имя",
    name: "first_name",
  },
  SECOND_NAME: {
    type: "text",
    label: "Фамилия",
    name: "second_name",
  },
  PHONE: {
    type: "text",
    label: "Телефон",
    name: "phone",
  },
  PASSWORD: {
    type: "password",
    label: "Пароль",
    name: "password",
  },
  PASSWORD_SECOND: {
    type: "password",
    label: "Пароль (ещё раз)",
    name: "password_second",
  },
};

const emailField = new InputField(FIELDS_PROPS.EMAIL, inputSettings);
const loginField = new InputField(FIELDS_PROPS.LOGIN, inputSettings);
const firstNameField = new InputField(FIELDS_PROPS.FIRST_NAME, inputSettings);
const secondNameField = new InputField(FIELDS_PROPS.SECOND_NAME, inputSettings);
const phoneField = new InputField(FIELDS_PROPS.PHONE, inputSettings);
const passwordField = new InputField(FIELDS_PROPS.PASSWORD, inputSettings);
const passwordSecondField = new InputField(
  FIELDS_PROPS.PASSWORD_SECOND,
  inputSettings
);

const action = new Button({ text: "Зарегистрироваться", href: "/signin" });
const link = new Button(
  { text: "Войти", href: "/login" },
  { className: "auth__link" }
);

const props: AuthPageProps = {
  name: "Регистрация",
  fields: [
    emailField,
    loginField,
    firstNameField,
    secondNameField,
    phoneField,
    passwordField,
    passwordSecondField,
  ],
  action,
  link,
};

const loginPage = new AuthPage(props);

render(".app", loginPage);
