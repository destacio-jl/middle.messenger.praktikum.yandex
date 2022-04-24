import ErrorPage from "../../views/pages/ErrorPage/ErrorPage";

const props = {
  code: 500,
  text: "Мы уже фиксим",
  link: "Назад к чатам",
  href: "#",
};

const page500 = new ErrorPage(props);

export default page500;
