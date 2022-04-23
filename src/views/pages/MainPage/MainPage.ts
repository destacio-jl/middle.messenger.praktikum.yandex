import { StoreEvents } from "./../../../core/Store";
import { MainPageProps } from "./types";
import template from "./MainPage.hbs";
import Button from "../../ui/Button";
import { ROUTES } from "../../../const";
import Block from "../../../core/Block";
import getChats from "../../../controllers/chats/getChats";
import Store from "../../../core/Store";
import { createSocket, mapChatsFromApi, mapMessagesFromApi } from "./utils";
import getToken from "../../../controllers/chats/getToken";
import getUserInfo from "../../../controllers/auth/getUserInfo";

class MainPage extends Block {
  constructor(props: MainPageProps) {
    const profileLink = new Button(
      { text: "Профиль", href: ROUTES.PROFILE },
      { className: "chats__profile-link" }
    );

    super("div", { ...props, profileLink }, { className: `main` });
  }

  onChatClickHandler = (id: number) => {
    const { token } = Store.getState();
    const { chatId } = this.props;

    if (chatId === id) {
      return;
    }

    if (!token) {
      getToken(id);
    }

    this.setProps({ ...this.props, chatId: id });
  };

  updateChats() {
    const userFromStore = Store.getState().user;
    const chatsFromStore = Store.getState().chats;
    const mappedChats = mapChatsFromApi(
      chatsFromStore,
      userFromStore?.email,
      this.onChatClickHandler
    );
    this.setProps({ ...this.props, chats: mappedChats });
  }

  updateMessages() {
    const { messages, user } = Store.getState();
    const mappedMessages = mapMessagesFromApi(messages, user.id);
    this.setProps({ ...this.props, messages: mappedMessages });
  }

  componentDidMount() {
    const userFromStore = Store.getState().user;

    if (!userFromStore) {
      getUserInfo();
    }

    Store.on(StoreEvents.Updated, () => {
      this.updateChats();
      this.updateMessages();
    });

    getChats();
  }

  componentDidUpdate(oldProps: MainPageProps, newProps: MainPageProps) {
    const { chatId } = newProps;
    const { user, token, socket, messages } = Store.getState();

    if (chatId && user && token && !socket) {
      const chatSocket = createSocket(user.id, chatId, token);
      Store.set("socket", chatSocket);
    }

    return true;
  }

  render() {
    return this.compile(template as HandlebarsTemplateDelegate, this.props);
  }
}

export default MainPage;
