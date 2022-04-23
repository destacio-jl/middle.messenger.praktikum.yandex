import ChatAPI from "../../api/ChatAPI";
import Store from "../../core/Store";
import { Response } from "../../core/types";

const getToken = (chatId: number) => {
  ChatAPI.getToken(chatId)
    .then((response: Response) => {
      return JSON.parse(response.responseText) as string;
    })
    .then((data) => {
      Store.set("token", data.token);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getToken;
