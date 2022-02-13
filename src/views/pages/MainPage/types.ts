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
  activeChat?: {
    name: string;
    messages: Message[];
  };
};
