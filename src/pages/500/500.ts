import ErrorPage from "../../views/ErrorPage";
import render from "../../utils/render";

const props = {
  code: 500,
  text: "Мы уже фиксим",
  link: "Назад к чатам",
  href: "#",
};

const page404 = new ErrorPage(props);

render(".app", page404);
