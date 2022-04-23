import Store from "../../core/Store";
import { validateRequired } from "../../utils/validators";
import MainPage from "../../views/pages/MainPage/MainPage";
import { MainPageProps } from "../../views/pages/MainPage/types";
import InputField, { INPUT_FIELD_VARIANTS } from "../../views/ui/InputField";

const chats = [];

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

  const { socket } = Store.getState();

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

  if (!errors.length) {
    socket.send(
      JSON.stringify({
        content: formData[`${messageInputField.props.name}`],
        type: "message",
      })
    );
  }
};

const props: MainPageProps = {
  chats,
  messageInputField,
  events: {
    submit: onSubmitHandler,
  },
};

const mainPage = new MainPage(props);

export default mainPage;
