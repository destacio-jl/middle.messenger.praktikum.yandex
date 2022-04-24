import { SignupApiData, SIGNUP_API_FIELDS } from "../../api/AuthAPI";
import { ROOT_QUERY, ROUTES } from "../../const";
import Router from "../../core/Router";
import { FormError } from "../../core/types";
import isEmpty from "../../utils/isEmpty";
import signup from "../../controllers/auth/signup";
import {
  emailValidators,
  loginValidators,
  nameValidators,
  passwordValidators,
  phoneValidators,
} from "../../utils/validators";
import InputField from "../../views/ui/InputField";
import Button from "../../views/ui/Button";
import AuthPage, { AuthPageProps } from "../../views/pages/AuthPage";

const inputSettings = {
  withInternalID: true,
};

const FIELDS_PROPS = {
  EMAIL: {
    value: "te333s23414123412t@test.com",
    type: "email",
    label: "Почта",
    name: SIGNUP_API_FIELDS.EMAIL,
    validators: emailValidators,
  },
  LOGIN: {
    value: "te333s1234234134324t",
    type: "text",
    label: "Логин",
    name: SIGNUP_API_FIELDS.LOGIN,
    validators: loginValidators,
  },
  FIRST_NAME: {
    value: "Тест",
    type: "text",
    label: "Имя",
    name: SIGNUP_API_FIELDS.FIRST_NAME,
    validators: nameValidators,
  },
  SECOND_NAME: {
    value: "Тест",
    type: "text",
    label: "Фамилия",
    name: SIGNUP_API_FIELDS.SECOND_NAME,
    validators: nameValidators,
  },
  PHONE: {
    value: "999999898999",
    type: "text",
    label: "Телефон",
    name: SIGNUP_API_FIELDS.PHONE,
    validators: phoneValidators,
  },
  PASSWORD: {
    value: "Тестаааывавыа32423234",
    type: "password",
    label: "Пароль",
    name: SIGNUP_API_FIELDS.PASSWORD,
    validators: passwordValidators,
  },
  // TODO: validation depending on other form fields
  // PASSWORD_SECOND: {
  //   type: "password",
  //   label: "Пароль (ещё раз)",
  //   name: "password_second",
  //   validators: passwordValidators,
  // },
};

const router = new Router(ROOT_QUERY);

const emailField = new InputField(FIELDS_PROPS.EMAIL, inputSettings);
const loginField = new InputField(FIELDS_PROPS.LOGIN, inputSettings);
const firstNameField = new InputField(FIELDS_PROPS.FIRST_NAME, inputSettings);
const secondNameField = new InputField(FIELDS_PROPS.SECOND_NAME, inputSettings);
const phoneField = new InputField(FIELDS_PROPS.PHONE, inputSettings);
const passwordField = new InputField(FIELDS_PROPS.PASSWORD, inputSettings);
// TODO: validation depending on other form fields
// const passwordSecondField = new InputField(
//   FIELDS_PROPS.PASSWORD_SECOND,
//   inputSettings
// );

const fields = [
  emailField,
  loginField,
  firstNameField,
  secondNameField,
  phoneField,
  passwordField,
];

const onSignupHandler = () => {
  router.go(ROUTES.CHATS);
};

const onSubmitHandler = (e: SubmitEvent) => {
  e.preventDefault();

  const errors: FormError[] = [];

  const formData = fields.reduce(
    (data: Partial<SignupApiData>, field: InputField) => {
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
    },
    {}
  ) as SignupApiData;

  if (isEmpty(errors)) {
    signup(formData, onSignupHandler);
  }
};

const action = new Button({ text: "Зарегистрироваться", type: "submit" });
const link = new Button(
  { text: "Войти", href: ROUTES.LOGIN },
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

const signupPage = new AuthPage(props);

export default signupPage;
