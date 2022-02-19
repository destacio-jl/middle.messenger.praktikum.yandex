export interface BlockConstructor<T extends Block> {
  new (): T;
}

export type PopStateEventType = {
  currentTarget: {
    location: {
      pathname: string;
    };
  };
};

export type Callback = (...args: unknown[]) => void;
