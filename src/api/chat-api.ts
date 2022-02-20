import HTTPTransport from "../core/HTTPTransport";
import { BaseAPI } from "./base-api";

const chatAPIInstance = new HTTPTransport("api/v1/chats");

class ChatAPI extends BaseAPI {
  create() {
    return chatAPIInstance.post("/", { title: "string" });
  }

  request() {
    return chatAPIInstance.get("/full");
  }
}

export default ChatAPI;
