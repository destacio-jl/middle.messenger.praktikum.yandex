import { Callback } from "../../types";
import AuthAPI, { LoginApiData } from "../../api/AuthAPI";
import getUserInfo from "./getUserInfo";

const login = (formData: LoginApiData, callback: Callback = null) => {
  AuthAPI.login(formData)
    .then(() => {
      getUserInfo(callback);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default login;
