import HTTPTransport from "../core/HTTPTransport";
import { HOST } from "./const";

export type ActiveChatMessage = {
  chat_id: number;
  content: string;
  file: null;
  id: number;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
};

type ChatMessage = {
  user: {
    first_name: string;
    second_name: string;
    avatar: string;
    email: string;
    login: string;
    phone: string;
  };
  time: string;
  content: string;
};

export type Chat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: ChatMessage;
};

const chatAPIInstance = new HTTPTransport(`${HOST}/api/v2/chats`);

class ChatAPI {
  create() {
    return chatAPIInstance.post("/", { title: "string" });
  }

  getChats(title? = "") {
    return chatAPIInstance.get("", { data: { offset: 0, limit: 10, title } });
  }

  getToken(chatId: number) {
    return chatAPIInstance.post(`/token/${chatId}`);
  }
}

export default new ChatAPI();
