import { ProfilePageProps } from "./types";
import template from "./ProfilePage.hbs";
import Block from "../../core/Block";
import Button from "../../ui/Button";

class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    const { backLinkRoute } = props;

    const backLink = new Button(
      { text: "", href: backLinkRoute },
      { className: "profile__back", withInternalID: true }
    );

    super("div", { ...props, backLink }, { className: `profile` });
  }

  render() {
    return this.compile(template as HandlebarsTemplateDelegate, this.props);
  }
}

export default ProfilePage;
