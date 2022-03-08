import HTTPTransport from "../core/HTTPTransport";
import { HOST } from "./const";

export type UpdateAvatarData = { avatar: File };

export type UpdateUserProfileData = {
  first_name: "string";
  second_name: "string";
  display_name: "string";
  login: "string";
  email: "string";
  phone: "string";
};

export type UpdateUserPasswordData = {
  oldPassword: "string";
  newPassword: "string";
};

const userAPIInstance = new HTTPTransport(`${HOST}/api/v2/user`);

class UserAPI {
  updateAvatar(data: UpdateAvatarData) {
    return userAPIInstance.put(`/profile/avatar`, { data, formData: true });
  }

  updateUserProfile(data: UpdateUserProfileData) {
    return userAPIInstance.put(`/profile`, { data });
  }

  updateUserPassword(data: UpdateUserPasswordData) {
    return userAPIInstance.put("/password", { data });
  }
}

export default new UserAPI();
