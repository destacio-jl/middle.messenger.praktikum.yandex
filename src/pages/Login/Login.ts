import AuthPage, { AuthPageProps } from "../../views/pages/AuthPage";
import render from "../../utils/render";
import InputField from "../../ui/InputField";
import Button from "../../ui/Button";
import { loginValidators, passwordValidators } from "../../utils/validators";

const inputSettings = {
  withInternalID: true,
};

const FIELDS_PROPS = {
  LOGIN: {
    type: "text",
    label: "Логин",
    name: "login",
    validators: loginValidators,
  },
  PASSWORD: {
    type: "password",
    label: "Пароль",
    name: "password",
    validators: passwordValidators,
  },
};

const loginField = new InputField(FIELDS_PROPS.LOGIN, inputSettings);
const passwordField = new InputField(FIELDS_PROPS.PASSWORD, inputSettings);

const fields = [loginField, passwordField];

const action = new Button({ text: "Авторизоваться", type: "submit" });

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

const props: AuthPageProps = {
  name: "Вход",
  fields,
  action,
  events: {
    submit: onSubmitHandler,
  },
};

const loginPage = new AuthPage(props);

render(".app", loginPage);
