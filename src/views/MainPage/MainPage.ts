import { MainPageProps } from "./types";
import template from "./MainPage.hbs";
import Block from "../../core/Block";
import Button from "../../ui/Button";
import { ROUTES } from "../../const";

class MainPage extends Block {
  constructor(props: MainPageProps) {
    const profileLink = new Button(
      { text: "Профиль", href: ROUTES.PROFILE },
      { className: "chats__profile-link" }
    );

    super("div", { ...props, profileLink }, { className: `main` });
  }

  render() {
    return this.compile(template as HandlebarsTemplateDelegate, this.props);
  }
}

export default MainPage;
