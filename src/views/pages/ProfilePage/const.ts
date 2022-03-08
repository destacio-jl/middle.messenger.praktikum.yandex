import { loginValidators } from "./../../../utils/validators";
import { userModel } from "../../../api/AuthAPI";
import {
  emailValidators,
  passwordValidators,
  nameValidators,
  phoneValidators,
} from "../../../utils/validators";
import InputField, { INPUT_FIELD_VARIANTS } from "../../ui/InputField";

const inputSettings = {
  withInternalID: true,
};

const variant = INPUT_FIELD_VARIANTS.PROFILE;

const FIELDS_PROPS = {
  EMAIL: {
    type: "email",
    label: "Почта",
    name: userModel.email,
    disabled: true,
    variant,
    validators: emailValidators,
  },
  LOGIN: {
    type: "text",
    label: "Логин",
    name: userModel.login,
    disabled: true,
    variant,
    validators: loginValidators,
  },
  FIRST_NAME: {
    type: "text",
    label: "Имя",
    name: userModel.firstName,
    disabled: true,
    variant,
    validators: nameValidators,
  },
  SECOND_NAME: {
    type: "text",
    label: "Фамилия",
    name: userModel.secondName,
    disabled: true,
    variant,
    validators: nameValidators,
  },
  DISPLAY_NAME: {
    type: "text",
    label: "Имя в чате",
    name: userModel.displayName,
    disabled: true,
    variant,
    validators: nameValidators,
  },
  PHONE: {
    type: "text",
    label: "Телефон",
    name: userModel.phone,
    disabled: true,
    variant,
    validators: phoneValidators,
  },
};

const PASSWORD_FIELDS_PROPS = {
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

const emailField = new InputField(FIELDS_PROPS.EMAIL, inputSettings);
const loginField = new InputField(FIELDS_PROPS.LOGIN, inputSettings);
const firstNameField = new InputField(FIELDS_PROPS.FIRST_NAME, inputSettings);
const secondName = new InputField(FIELDS_PROPS.SECOND_NAME, inputSettings);
const displayName = new InputField(FIELDS_PROPS.DISPLAY_NAME, inputSettings);
const phoneName = new InputField(FIELDS_PROPS.PHONE, inputSettings);

const oldPasswordField = new InputField(
  PASSWORD_FIELDS_PROPS.OLD_PASSWORD,
  inputSettings
);
const newPasswordField = new InputField(
  PASSWORD_FIELDS_PROPS.NEW_PASSWORD,
  inputSettings
);
const newPasswordRepeatField = new InputField(
  PASSWORD_FIELDS_PROPS.NEW_PASSWORD_REPEAT,
  inputSettings
);

export const dataFields = [
  emailField,
  loginField,
  firstNameField,
  secondName,
  displayName,
  phoneName,
];

export const passwordFields = [
  oldPasswordField,
  newPasswordField,
  newPasswordRepeatField,
];
