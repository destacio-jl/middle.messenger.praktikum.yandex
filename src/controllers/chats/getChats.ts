import ChatAPI, { Chat } from "../../api/ChatAPI";
import Store from "../../core/Store";
import { Response } from "../../core/types";

const getChats = (title? = "") => {
  ChatAPI.getChats(title)
    .then((response: Response) => {
      console.log({ response });
      return JSON.parse(response.responseText) as Chat[];
    })
    .then((data) => {
      Store.set("chats", data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getChats;
