import { AuthPageProps } from "./types";
import template from "./AuthPage.hbs";
import Block from "../../core/block";

class LoginPage extends Block {
  constructor(props: AuthPageProps) {
    super("div", props, { className: `auth` });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default LoginPage;
