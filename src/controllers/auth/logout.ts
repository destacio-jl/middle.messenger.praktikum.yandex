import AuthAPI from "../../api/AuthAPI";
import { ROOT_QUERY, ROUTES } from "../../const";
import Router from "../../core/Router";

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
