import AuthPage, { AuthPageProps } from "../../views/pages/AuthPage";
import render from "../../utils/render";
import InputField from "../../ui/InputField";
import Button from "../../ui/Button";
import {
  loginValidators,
  nameValidators,
  passwordValidators,
  emailValidators,
  phoneValidators,
} from "../../utils/validators";

const inputSettings = {
  withInternalID: true,
};

const FIELDS_PROPS = {
  EMAIL: {
    type: "email",
    label: "Почта",
    name: "email",
    validators: emailValidators,
  },
  LOGIN: {
    type: "text",
    label: "Логин",
    name: "login",
    validators: loginValidators,
  },
  FIRST_NAME: {
    type: "text",
    label: "Имя",
    name: "first_name",
    validators: nameValidators,
  },
  SECOND_NAME: {
    type: "text",
    label: "Фамилия",
    name: "second_name",
    validators: nameValidators,
  },
  PHONE: {
    type: "text",
    label: "Телефон",
    name: "phone",
    validators: phoneValidators,
  },
  PASSWORD: {
    type: "password",
    label: "Пароль",
    name: "password",
    validators: passwordValidators,
  },
  PASSWORD_SECOND: {
    type: "password",
    label: "Пароль (ещё раз)",
    name: "password_second",
    validators: passwordValidators,
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

const fields = [
  emailField,
  loginField,
  firstNameField,
  secondNameField,
  phoneField,
  passwordField,
  passwordSecondField,
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

const action = new Button({ text: "Зарегистрироваться", type: "submit" });
const link = new Button(
  { text: "Войти", href: "/login" },
  { className: "auth__link" }
);

const props: AuthPageProps = {
  name: "Регистрация",
  fields,
  action,
  link,
  events: {
    submit: onSubmitHandler,
  },
};

const loginPage = new AuthPage(props);

render(".app", loginPage);
