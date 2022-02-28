import { userModel } from "../../api/AuthAPI";
import { ROUTES } from "../../const";
import getUserInfo from "../../controllers/auth/getUserInfo";
import logout from "../../controllers/auth/logout";
import Store, { StoreEvents } from "../../core/Store";
import ProfilePage, { ProfilePageProps } from "../../views/pages/ProfilePage";
import Button from "../../views/ui/Button";
import InputField, { INPUT_FIELD_VARIANTS } from "../../views/ui/InputField";
import { updateFieldsValues } from "./utils";

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
  },
  LOGIN: {
    type: "text",
    label: "Логин",
    name: userModel.login,
    disabled: true,
    variant,
  },
  FIRST_NAME: {
    type: "text",
    label: "Имя",
    name: userModel.firstName,
    disabled: true,
    variant,
  },
  SECOND_NAME: {
    type: "text",
    label: "Фамилия",
    name: userModel.secondName,
    disabled: true,
    variant,
  },
  DISPLAY_NAME: {
    type: "text",
    label: "Имя в чате",
    name: userModel.displayName,
    disabled: true,
    variant,
  },
  PHONE: {
    type: "text",
    label: "Телефон",
    name: userModel.phone,
    disabled: true,
    variant,
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

const updateFields = () => {
  const userFromStore = Store.getState().user;

  if (userFromStore) {
    updateFieldsValues(fields, userFromStore);
  } else {
    getUserInfo();
  }
};

const logoutClickHandler = () => {
  logout();
};

const componentDidMount = () => {
  Store.on(StoreEvents.Updated, updateFields);
  updateFields();
};

const editProfileAction = new Button(
  { text: "Изменить данные", href: ROUTES.CHANGE_PROFILE },
  { className: "profile__action" }
);
const editPasswordAction = new Button(
  { text: "Изменить пароль", href: ROUTES.CHANGE_PASSWORD },
  { className: "profile__action" }
);
const logoutAction = new Button(
  {
    text: "Выйти",
    events: {
      click: logoutClickHandler,
    },
  },
  { className: ["profile__action", "profile__action_danger"] }
);

const props: ProfilePageProps = {
  name: `Иван`,
  backLinkRoute: ROUTES.CHATS,
  fields,
  actions: [editProfileAction, editPasswordAction, logoutAction],
  didMountCb: componentDidMount,
};

const profilePage = new ProfilePage(props);

export default profilePage;
