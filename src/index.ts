import { ROUTES } from "./const";
import Router from "./core/Router";
import page404 from "./pages/404/404";
import page500 from "./pages/500/500";
import changePasswordPage from "./pages/ChangePassword/ChangePassword";
import changeProfilePage from "./pages/ChangeProfile/ChangeProfile";
import loginPage from "./pages/Login/Login";
import mainPage from "./pages/main/Main";
import profilePage from "./pages/Profile/Profile";
import signInPage from "./pages/SignIn/SignIn";

const router = new Router(".app");

router
  .use(ROUTES.LOGIN, loginPage)
  .use(ROUTES.SIGN_IN, signInPage)
  .use(ROUTES.ERROR_404, page404)
  .use(ROUTES.ERROR_500, page500)
  .use(ROUTES.PROFILE, profilePage)
  .use(ROUTES.CHANGE_PASSWORD, changePasswordPage)
  .use(ROUTES.CHANGE_PROFILE, changeProfilePage)
  .use(ROUTES.CHATS, mainPage)
  .start();
