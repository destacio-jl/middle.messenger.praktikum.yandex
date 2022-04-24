import { MainPageChat } from "./../../types";
import Block from "../../../../../core/Block";
import template from "./ChatListItem.hbs";

class ChatListItem extends Block {
  constructor(props: MainPageChat) {
    const { id, onClick } = props;

    const onClickHandler = () => {
      onClick(id);
    };

    super(
      "div",
      {
        ...props,
        events: {
          click: onClickHandler,
        },
      },
      { withInternalID: true, className: "chat-list__item" }
    );
  }

  render() {
    return this.compile(template as HandlebarsTemplateDelegate, this.props);
  }
}

export default ChatListItem;
