import { MainPageProps } from "./types";
import template from "./MainPage.hbs";
import Block from "../../../core/block";

class MainPage extends Block {
  constructor(props: MainPageProps) {
    super("div", props, { className: `main` });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default MainPage;
