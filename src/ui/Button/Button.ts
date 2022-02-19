import { ROOT_QUERY } from "../../const";
import Block, { BlockSettings } from "../../core/Block";
import Router from "../../core/Router";
import template from "./Button.hbs";
import { ButtonProps } from "./types";

class Button extends Block {
  constructor(props: ButtonProps, settings: BlockSettings = {}) {
    const { href, events = {}, type = "button" } = props;
    const { className } = settings;

    const settingsWithAttributes = { ...settings, attributes: { type } };
    const updatedEvents = events as { [key: string]: () => void };

    if (href) {
      const onClickHandler = (e: Event) => {
        e.preventDefault();
        const router = new Router(ROOT_QUERY);
        router.go(href);
      };

      updatedEvents.click = onClickHandler;
    }

    super(
      "button",
      { ...props, events: updatedEvents },
      {
        ...settingsWithAttributes,
        className: className || `auth__action`,
      }
    );
  }

  render() {
    return this.compile(template as HandlebarsTemplateDelegate, this.props);
  }
}

export default Button;
