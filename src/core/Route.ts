import render from "../utils/render";
import Block from "./Block";
import { BlockConstructor } from "./types";

type Props = {
  rootQuery?: string;
  [key: string]: unknown;
};

export default class Route {
  _pathname: string = null;

  _blockClass: BlockConstructor<Block> = null;

  _block: Block = null;

  _props: Props = {};

  _initialized = false;

  constructor(
    pathname: string,
    view: Block,
    props: {
      [key: string]: unknown;
    }
  ) {
    this._pathname = pathname;
    this._block = view;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.unmount();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    const { rootQuery } = this._props;

    render(rootQuery, this._block);
    this._initialized = true;
  }
}
