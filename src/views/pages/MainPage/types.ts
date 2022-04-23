import { ChatListItem } from "./components";

export type MainPageChat = {
  id: number;
  name: string;
  message: string;
  time: string;
  unread: number;
  isAuthor?: boolean;
  onClick: (id: number) => void;
};

export type MappedMessage = {
  time: string;
  content: string;
  date?: string;
  isOwn?: boolean;
};

export type MainPageProps = {
  chats: ChatListItem[];
  messageInputField: InputField;
  messages: MappedMessage[];
  chatId?: number;
  activeChat?: {
    name: string;
  };
  events?: {
    submit?: (e: SubmitEvent) => void;
  };
};
