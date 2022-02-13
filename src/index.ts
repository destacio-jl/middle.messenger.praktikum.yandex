import { compile } from "handlebars";
import template from "./index.hbs";
import renderString from "./utils/renderString";

const props = {
  links: [
    {
      href: "/pages/Login/Login.html",
      text: "Login",
    },
    {
      href: "/pages/SignIn/SignIn.html",
      text: "SignIn",
    },
    {
      href: "/pages/Profile/Profile.html",
      text: "Profile",
    },
    {
      href: "/pages/ChangeProfile/ChangeProfile.html",
      text: "ChangeProfile",
    },
    {
      href: "/pages/ChangePassword/ChangePassword.html",
      text: "ChangePassword",
    },
    {
      href: "/pages/Main/Main.html",
      text: "Main",
    },
    {
      href: "/pages/404/404.html",
      text: "404",
    },
    {
      href: "/pages/500/500.html",
      text: "500",
    },
  ],
};

const indexPageTemplate = compile(template);
const compiledTemplate = indexPageTemplate(props);

renderString(".app", compiledTemplate);
