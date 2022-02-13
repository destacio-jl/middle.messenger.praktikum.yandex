import MainPage, { MainPageProps } from "../../views/pages/MainPage";
import render from "../../utils/render";

const chats = [
  {
    name: "Андрей",
    message: "Изображение",
    time: "10:49",
    unread: 2,
  },
  {
    name: "Киноклуб",
    message: "Стикер",
    time: "12:00",
    unread: 0,
    isAuthor: true,
  },
  {
    name: "Илья",
    message:
      "Друзья, у меня для вас особенный выпуск новостей! Бла бла бла бла бла бла",
    time: "10:49",
    unread: 4,
  },
  {
    name: "Андрей",
    message: "Круто",
    time: "Пт",
    unread: 0,
    isAuthor: true,
  },
];

const messages = [
  {
    date: `19 июня`,
    time: `11:56`,
    content: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.<br /><br />Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
  },
  {
    time: `11:56`,
    content: `Круто!`,
    isOwn: true,
  },
];

const props: MainPageProps = {
  chats,
  activeChat: {
    name: `Вадим`,
    messages,
  },
};

const loginPage = new MainPage(props);

render(".app", loginPage);
