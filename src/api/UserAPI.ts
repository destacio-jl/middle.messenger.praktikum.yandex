import HTTPTransport from "../core/HTTPTransport";
import { HOST } from "./const";

export type UpdateAvatarData = { avatar: File };

const userAPIInstance = new HTTPTransport(`${HOST}/api/v2/user`);

class UserAPI {
  updateAvatar(data: UpdateAvatarData) {
    return userAPIInstance.put(`/profile/avatar`, { data, formData: true });
  }
}

export default new UserAPI();
