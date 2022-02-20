import HTTPTransport from "../core/HTTPTransport";
import { BaseAPI } from "./base-api";

const chatMessagesAPIInstance = new HTTPTransport("api/v1/messages");

class ChatMessagesAPI extends BaseAPI {
  request({ id }: { id: string }) {
    return chatMessagesAPIInstance.get(`/${id}`);
  }
}

export default ChatMessagesAPI;
