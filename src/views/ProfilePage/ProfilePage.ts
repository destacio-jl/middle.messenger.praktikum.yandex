import { ProfilePageProps } from "./types";
import template from "./ProfilePage.hbs";
import Block from "../../core/Block";

class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super("div", props, { className: `profile` });
  }

  render() {
    return this.compile(template as HandlebarsTemplateDelegate, this.props);
  }
}

export default ProfilePage;
