import Store from "../../core/Store";
import { Callback, Response } from "../../core/types";
import UserAPI, { UpdateAvatarData } from "../../api/UserApi";
import { User } from "../../api/AuthAPI";

const updateAvatar = (
  formData: UpdateAvatarData,
  callback: Callback = null
) => {
  UserAPI.updateAvatar(formData)
    .then((response: Response) => JSON.parse(response.responseText) as User)
    .then((responseData) => {
      Store.set("user", responseData);
      if (callback && typeof callback === "function") {
        callback();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export default updateAvatar;
