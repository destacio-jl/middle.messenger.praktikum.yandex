import { User } from "../../../api/AuthAPI";
import { HOST } from "../../../api/const";
import getUserInfo from "../../../controllers/auth/getUserInfo";
import Store from "../../../core/Store";
import InputField from "../../ui/InputField";

export const updateFieldsValues = (
  fields: InputField[],
  dataFromStore: User
) => {
  fields.forEach((field) => {
    field.setProps({ ...field.props, value: dataFromStore[field.name] });
  });
};

export const updateFields = (fields: InputField[]) => {
  const userFromStore = Store.getState().user;

  if (userFromStore?.avatar) {
    const avatar = document.querySelector<HTMLElement>(".profile__avatar");

    if (avatar) {
      avatar.style.cssText = `background-image: url(${HOST}/api/v2/resources${userFromStore.avatar});`;
    }
  }

  if (fields && userFromStore) {
    updateFieldsValues(fields, userFromStore);
  } else {
    getUserInfo();
  }
};
