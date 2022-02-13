import Block, { BlockSettings } from "../../core/block";
import template from "./Button.hbs";
import { ButtonProps } from "./types";

class Button extends Block {
  constructor(props: ButtonProps, settings: BlockSettings = {}) {
    const { href, type = "button" } = props;
    const { className } = settings;

    const node = href ? "a" : "button";
    const settingsWithAttributes = href
      ? { ...settings, attributes: { href } }
      : { ...settings, attributes: { type } };

    super(node, props, {
      ...settingsWithAttributes,
      className: className || `auth__action`,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Button;
