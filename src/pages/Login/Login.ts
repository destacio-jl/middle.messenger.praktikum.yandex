import { LoginApiData } from "../../api/AuthAPI";
import AuthPage, { AuthPageProps } from "../../views/pages/AuthPage";
import InputField from "../../views/ui/InputField";
import Button from "../../views/ui/Button";
import { loginValidators, passwordValidators } from "../../utils/validators";
import isEmpty from "../../utils/isEmpty";
import Router from "../../core/Router";
import { ROOT_QUERY, ROUTES } from "../../const";
import login from "../../controllers/auth/login";

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

const router = new Router(ROOT_QUERY);

const loginField = new InputField(FIELDS_PROPS.LOGIN, inputSettings);
const passwordField = new InputField(FIELDS_PROPS.PASSWORD, inputSettings);

const fields = [loginField, passwordField];

const action = new Button({ text: "Авторизоваться", type: "submit" });

const link = new Button(
  { text: "Зарегистрироваться", href: ROUTES.SIGN_IN },
  { className: "auth__link" }
);

const onSuccessfulLoginHandler = () => {
  router.go(ROUTES.CHATS);
};

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
  }, {}) as LoginApiData;

  if (isEmpty(errors)) {
    login(formData, onSuccessfulLoginHandler);
  }
};

const props: AuthPageProps = {
  name: "Вход",
  fields,
  action,
  link,
  events: {
    submit: onSubmitHandler,
  },
};

const loginPage = new AuthPage(props);

export default loginPage;
