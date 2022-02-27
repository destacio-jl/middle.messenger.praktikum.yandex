import Store from "../../Store";
import { Callback, Response } from "../../types";
import AuthAPI, { User } from "../../../api/AuthAPI";

const getUserInfo = (callback: Callback = null) => {
  AuthAPI.user()
    .then((response: Response) => JSON.parse(response.responseText) as User)
    .then((data) => {
      Store.set("user", data);
      if (callback && typeof callback === "function") {
        callback();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getUserInfo;
