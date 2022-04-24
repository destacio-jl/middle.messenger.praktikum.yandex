import { Callback } from "../../core/types";
import UserAPI, { UpdateUserProfileData } from "../../api/UserApi";

const updateUserPassword = (
  formData: UpdateUserProfileData,
  callback: Callback = null
) => {
  UserAPI.updateUserPassword(formData)
    .then(() => {
      if (callback && typeof callback === "function") {
        callback();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export default updateUserPassword;
