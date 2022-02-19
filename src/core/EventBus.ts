import { Callback } from "./types";

export interface IEventBus {
  listeners: {
    [key: string]: Callback[];
  };
  on: (event: string, callback: Callback) => void;
  off: (event: string, callback: Callback) => void;
  emit: (event: string, ...args: unknown[]) => void;
}

class EventBus implements IEventBus {
  listeners: {
    [key: string]: Callback[];
  };

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}

export default EventBus;
