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

export type Indexed<T = unknown> = {
  [key in string]: T;
};

export type FormError = {
  name: string;
  value: string;
  error: string;
};

export type Response = {
  responseText: string;
};
