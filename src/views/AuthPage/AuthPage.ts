import { AuthPageProps } from "./types";
import template from "./AuthPage.hbs";
import Block from "../../core/Block";

class AuthPage extends Block {
  constructor(props: AuthPageProps) {
    super("div", props, { className: `auth` });
  }

  render() {
    return this.compile(template as HandlebarsTemplateDelegate, this.props);
  }
}

export default AuthPage;
