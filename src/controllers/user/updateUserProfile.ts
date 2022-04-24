import Store from "../../core/Store";
import { Callback, Response } from "../../core/types";
import UserAPI, { UpdateUserProfileData } from "../../api/UserAPI";
import { User } from "../../api/AuthAPI";

const updateUserProfile = (
  formData: UpdateUserProfileData,
  callback: Callback = null
) => {
  UserAPI.updateUserProfile(formData)
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

export default updateUserProfile;
