import render from "../utils/render";
import Block from "./Block";
import { BlockConstructor } from "./types";

export default class Route {
  _pathname: string = null;

  _blockClass: BlockConstructor<Block> = null;

  _block: Block = null;

  _props = {};

  constructor(
    pathname: string,
    view: BlockConstructor<Block>,
    props: {
      [key: string]: unknown;
    }
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
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
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(".app", this._block);
      return;
    }

    this._block.show();
  }
}
