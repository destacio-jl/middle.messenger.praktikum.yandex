import InputField from "../../../ui/InputField";

type Chat = {
  name: string;
  message: string;
  time: string;
  unread: number;
  isAuthor?: boolean;
};

type Message = {
  time: string;
  content: string;
  date?: string;
  isOwn?: boolean;
};

export type MainPageProps = {
  chats: Chat[];
  messageInputField: InputField;
  activeChat?: {
    name: string;
    messages: Message[];
  };
  events?: {
    submit?: (e: SubmitEvent) => void;
  };
};
