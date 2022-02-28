import { ProfilePageProps } from "./types";
import template from "./ProfilePage.hbs";
import { ChangeAvatarModal } from "./components";
import Block from "../../../core/Block";
import Modal from "../../ui/Modal/Modal";
import Button from "../../ui/Button";

class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    const { backLinkRoute } = props;

    const avatarClickHandler = () => {
      Modal.open(ChangeAvatarModal);
    };

    const backLink = new Button(
      { text: "", href: backLinkRoute },
      { className: "profile__back", withInternalID: true }
    );

    const changeAvatarButton = new Button(
      {
        text: "",
        events: {
          click: avatarClickHandler,
        },
      },
      { className: "profile__avatar", withInternalID: true }
    );

    super(
      "div",
      { ...props, changeAvatarButton, backLink },
      { className: `profile` }
    );
  }

  componentDidMount() {
    const { didMountCb } = this.props;

    if (didMountCb && typeof didMountCb === "function") {
      didMountCb();
    }
  }

  render() {
    return this.compile(template as HandlebarsTemplateDelegate, this.props);
  }
}

export default ProfilePage;
