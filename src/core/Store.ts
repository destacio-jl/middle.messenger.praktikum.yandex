import { User } from "../api/AuthAPI";
import { ActiveChatMessage, Chat } from "../api/ChatAPI";
import set from "../utils/set";
import EventBus from "./EventBus";

interface IStore {
  user?: User;
  chats?: Chat[];
  token?: string;
  socket?: WebSocket;
  messages?: ActiveChatMessage[];
}

export enum StoreEvents {
  Updated = "updated",
}

class Store extends EventBus {
  private state: IStore = {};

  public getState(): IStore {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
