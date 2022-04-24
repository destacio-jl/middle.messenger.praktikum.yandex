import { EDITABLE_FIELDS, ProfilePageProps } from "./types";
import template from "./ProfilePage.hbs";
import { ChangeAvatarModal } from "./components";
import Block from "../../../core/Block";
import Modal from "../../ui/Modal/Modal";
import Button from "../../ui/Button";
import { HOST } from "../../../api/const";
import Store, { StoreEvents } from "../../../core/Store";
import { ROUTES } from "../../../const";
import logout from "../../../controllers/auth/logout";
import Router from "../../../core/Router";
import { updateFields } from "./utils";
import { dataFields, passwordFields } from "./const";
import { getFormData } from "../../../utils/getFormData";
import isEmpty from "../../../utils/isEmpty";
import updateUserProfile from "../../../controllers/user/updateUserProfile";
import updateUserPassword from "../../../controllers/user/updateUserPassword";

class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    const router = new Router(".app");

    const avatar = Store.getState().user?.avatar;

    const avatarClickHandler = () => {
      Modal.open(ChangeAvatarModal);
    };

    const logoutClickHandler = () => {
      logout();
    };

    const editDataClickHandler = () => {
      this.setProps({
        ...this.props,
        editableFields: EDITABLE_FIELDS.DATA,
        fields: dataFields,
      });
    };

    const editPasswordClickHandler = () => {
      this.setProps({
        ...this.props,
        editableFields: EDITABLE_FIELDS.PASSWORD,
        fields: passwordFields,
      });
    };

    const backLinkClickHandler = () => {
      const { editableFields } = this.props;
      if (editableFields !== EDITABLE_FIELDS.NONE) {
        this.setProps({
          ...this.props,
          editableFields: EDITABLE_FIELDS.NONE,
          fields: dataFields,
        });
      } else {
        router.go(ROUTES.CHATS);
      }
    };

    const editProfileAction = new Button(
      {
        text: "Изменить данные",
        events: {
          click: editDataClickHandler,
        },
      },
      { className: "profile__action" }
    );

    const editPasswordAction = new Button(
      {
        text: "Изменить пароль",
        events: {
          click: editPasswordClickHandler,
        },
      },
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

    const actions = [editProfileAction, editPasswordAction, logoutAction];

    const backLink = new Button(
      { text: "", events: { click: backLinkClickHandler } },
      { className: "profile__back", withInternalID: true }
    );

    const changeAvatarButton = new Button(
      {
        text: "",
        events: {
          click: avatarClickHandler,
        },
      },
      {
        className: "profile__avatar",
        withInternalID: true,
        style: avatar
          ? `background-image: url(${HOST}/api/v2/resources/${avatar});`
          : "",
      }
    );

    const onSuccessUpdateCb = () => {
      this.setProps({
        ...this.props,
        editableFields: EDITABLE_FIELDS.NONE,
        fields: dataFields,
      });
    };

    const onSubmitHandler = (e: SubmitEvent) => {
      e.preventDefault();

      const { fields } = this.children;
      const { editableFields } = this.props;

      const [formData, errors] = getFormData(fields);

      if (!isEmpty(errors)) {
        console.error(errors);
      }

      if (editableFields === EDITABLE_FIELDS.DATA) {
        updateUserProfile(formData, onSuccessUpdateCb);
      }

      if (editableFields === EDITABLE_FIELDS.PASSWORD) {
        delete formData.newPasswordRepeat;
        updateUserPassword(formData, onSuccessUpdateCb);
      }
    };

    super(
      "div",
      {
        ...props,
        changeAvatarButton,
        backLink,
        actions: actions,
        events: {
          submit: onSubmitHandler,
        },
      },
      { className: `profile` }
    );
  }

  componentDidMount() {
    const { fields } = this.children;

    Store.on(StoreEvents.Updated, () => {
      updateFields(fields);
    });

    updateFields(fields);
  }

  componentDidUpdate(oldProps: ProfilePageProps, newProps: ProfilePageProps) {
    const { editableFields, fields } = newProps;

    const editableChanged = editableFields !== oldProps.editableFields;
    const fieldsChanged = fields !== oldProps.fields;

    const editable = editableFields !== EDITABLE_FIELDS.NONE;

    if (!(editableChanged || fieldsChanged)) {
      return false;
    }

    if ((editableChanged || fieldsChanged) && fields) {
      fields.forEach((field) => {
        field.setProps({
          ...field.props,
          disabled: editable ? "" : "disabled",
        });
      });
    }

    return true;
  }

  render() {
    return this.compile(template as HandlebarsTemplateDelegate, this.props);
  }
}

export default new ProfilePage({
  fields: dataFields,
  editableFields: EDITABLE_FIELDS.NONE,
});
