import AuthAPI, { SignupApiData, SignupResponse } from "../../api/AuthAPI";
import { Callback, Response } from "../../core/types";
import getUserInfo from "./getUserInfo";

const signup = (formData: SignupApiData, callback: Callback = null) => {
  AuthAPI.signup(formData)
    .then(
      (response: Response) =>
        JSON.parse(response.responseText) as SignupResponse
    )
    .then((data) => {
      console.log(data);
    })
    .then(() => {
      console.log("signup callback", { callback });
      getUserInfo(callback);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default signup;
