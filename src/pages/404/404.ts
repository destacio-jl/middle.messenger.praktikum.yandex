import ErrorPage from "../../views/pages/ErrorPage/ErrorPage";

const props = {
  code: 404,
  text: "Не туда попали",
  link: "Назад к чатам",
  href: "#",
};

const page404 = new ErrorPage(props);

export default page404;
