import ErrorPage from "../../views/ErrorPage";
import render from "../../utils/render";

const props = {
  code: 404,
  text: "Не туда попали",
  link: "Назад к чатам",
  href: "#",
};

const page404 = new ErrorPage(props);

render(".app", page404);
