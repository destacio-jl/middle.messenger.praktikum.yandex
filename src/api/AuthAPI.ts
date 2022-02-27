import HTTPTransport from "../core/HTTPTransport";
import { HOST } from "./const";

export type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export const userModel = {
  id: `id`,
  firstName: "first_name",
  secondName: "second_name",
  displayName: "display_name",
  login: "login",
  email: "email",
  phone: "phone",
  avatar: "avatar",
  password: "password",
};

export const SIGNUP_API_FIELDS = {
  FIRST_NAME: userModel.firstName,
  SECOND_NAME: userModel.secondName,
  LOGIN: userModel.login,
  EMAIL: userModel.email,
  PHONE: userModel.phone,
  PASSWORD: userModel.password,
};

export type SignupApiData = {
  [SIGNUP_API_FIELDS.FIRST_NAME]: string;
  [SIGNUP_API_FIELDS.SECOND_NAME]: string;
  [SIGNUP_API_FIELDS.LOGIN]: string;
  [SIGNUP_API_FIELDS.EMAIL]: string;
  [SIGNUP_API_FIELDS.PHONE]: string;
  [SIGNUP_API_FIELDS.PASSWORD]: string;
};

export const LOGIN_API_FIELDS = {
  LOGIN: userModel.login,
  PASSWORD: userModel.password,
};

export type LoginApiData = {
  [LOGIN_API_FIELDS.LOGIN]: string;
  [LOGIN_API_FIELDS.PASSWORD]: string;
};

export type SignupResponse = {
  id: number;
};

const signupAPIInstance = new HTTPTransport(`${HOST}/api/v2/auth`);

class SignupAPI {
  signup(data: SignupApiData) {
    return signupAPIInstance.post(`/signup`, { data });
  }

  login(data: LoginApiData) {
    return signupAPIInstance.post(`/signin`, { data });
  }

  logout() {
    return signupAPIInstance.post(`/logout`);
  }

  user() {
    return signupAPIInstance.get(`/user`);
  }
}

export default new SignupAPI();
