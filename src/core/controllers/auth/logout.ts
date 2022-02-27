import { ROOT_QUERY, ROUTES } from "../../../const";
import Router from "../../Router";
import AuthAPI from "../../../api/AuthAPI";

const router = new Router(ROOT_QUERY);

const logout = () => {
  AuthAPI.logout()
    .then(() => {
      router.go(ROUTES.LOGIN);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default logout;
