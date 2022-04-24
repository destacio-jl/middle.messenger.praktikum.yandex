import Block from "../../../core/Block";
import template from "./ErrorPage.hbs";
import { ErrorPageProps } from "./types";

class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super("div", props, { className: `error-page` });
  }

  render() {
    return this.compile(template as HandlebarsTemplateDelegate, this.props);
  }
}

export default ErrorPage;
