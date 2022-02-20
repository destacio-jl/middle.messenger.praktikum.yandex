import EventBus from "./EventBus";

interface IStore {
  test?: string;
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
    // TODO: set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
