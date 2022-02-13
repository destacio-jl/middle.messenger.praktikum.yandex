import { ProfilePageProps } from "./types";
import template from "./ProfilePage.hbs";
import Block from "../../../core/block";

class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super("div", props, { className: `profile` });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ProfilePage;
