import Block from "../../../core/Block";
import render from "../../../utils/render";
import template from "./Modal.hbs";

const openModalClass = "modal-open";

class Modal extends Block {
  _outsideClickListener = (event: Event) => {
    if (!this.element.contains(event.target)) {
      this.close();
    }
  };

  constructor() {
    console.log("constructor");
    const settings = {
      className: "modal__content",
    };

    super("div", {}, settings);

    render(".modal", this);
  }

  render() {
    return this.compile(template as HandlebarsTemplateDelegate, this.props);
  }

  open(content: Block) {
    this.setProps({ content });
    document.querySelector("body").classList.add(openModalClass);
    document.addEventListener("mousedown", this._outsideClickListener);
  }

  close() {
    this.setProps({ content: null });
    document.querySelector("body").classList.remove(openModalClass);
    document.removeEventListener("mousedown", this._outsideClickListener);
    this.element.innerHTML = "";
  }
}

export default new Modal();
