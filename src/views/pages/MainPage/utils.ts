import { ActiveChatMessage, Chat } from "../../../api/ChatAPI";
import { WSS_HOST } from "../../../api/const";
import Store from "../../../core/Store";
import { ChatListItem } from "./components";
import { MappedMessage } from "./types";

type WebSocketEvent = {
  data: string;
};

export const mapChatsFromApi = (
  chats: Chat[],
  userEmail,
  onClick: (id: number) => void
): ChatListItem[] => {
  return (chats || []).map((chat) => {
    const props = {
      id: chat.id,
      name: chat.title,
      message: chat.last_message?.content,
      time: chat.last_message
        ? new Date(chat.last_message.time).toLocaleTimeString()
        : "",
      unread: chat.unread_count,
      isAuthor: userEmail === chat.last_message?.user.email,
      onClick,
    };

    return new ChatListItem(props);
  });
};

export const mapMessagesFromApi = (
  messages: ActiveChatMessage[],
  userId: string
): MappedMessage[] => {
  return (messages || []).map((message) => ({
    time: new Date(message.time).toLocaleTimeString(),
    content: message.content,
    isOwn: userId === message.user_id,
  }));
};

export const createSocket = (
  userId: number,
  chatId: number,
  token: string
): WebSocket => {
  const socket = new WebSocket(
    `${WSS_HOST}/ws/chats/${userId}/${chatId}/${token}`
  );

  socket.addEventListener("open", () => {
    console.log("Соединение установлено");

    socket.send(
      JSON.stringify({
        content: "0",
        type: "get old",
      })
    );
  });

  socket.addEventListener("close", (event) => {
    if (event.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения");
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  socket.addEventListener("message", (event: WebSocketEvent) => {
    const { messages } = Store.getState();
    const messagesFromApi = JSON.parse(event.data) as ActiveChatMessage[];

    const newMessages = Array.isArray(messagesFromApi)
      ? messagesFromApi.reverse()
      : [messagesFromApi];

    const mergedMessages = [...(messages || []), ...newMessages];
    Store.set("messages", mergedMessages);
  });

  socket.addEventListener("error", (event) => {
    console.log("Ошибка", event.message);
  });

  return socket;
};
