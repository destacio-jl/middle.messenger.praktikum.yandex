import MainPage, { MainPageProps } from "../../views/MainPage";
import render from "../../utils/render";
import InputField, { INPUT_FIELD_VARIANTS } from "../../ui/InputField";
import { validateRequired } from "../../utils/validators";

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

const inputProps = {
  name: "message",
  placeholder: "Сообщение",
  variant: INPUT_FIELD_VARIANTS.ROUNDED,
  showErrors: false,
  validators: [validateRequired],
};

const inputSettings = {
  withInternalID: true,
};

const messageInputField = new InputField(inputProps, inputSettings);

const onSubmitHandler = (e: SubmitEvent) => {
  e.preventDefault();

  const errors = [];

  const formData = {
    [`${messageInputField.props.name}`]: messageInputField.value,
  };

  messageInputField.validate();

  if (messageInputField.props.errorText) {
    errors.push({
      name: messageInputField.props.name,
      value: messageInputField.value,
      error: messageInputField.props.errorText,
    });
  }

  console.log(formData);
  console.log({ errors });
};

const props: MainPageProps = {
  chats,
  messageInputField,
  activeChat: {
    name: `Вадим`,
    messages,
  },
  events: {
    submit: onSubmitHandler,
  },
};

const loginPage = new MainPage(props);

render(".app", loginPage);
