import { ProfilePageProps } from "./types";
import template from "./ProfilePage.hbs";
import { ChangeAvatarModal } from "./components";
import Block from "../../../core/Block";
import Modal from "../../ui/Modal/Modal";
import Button from "../../ui/Button";
import { HOST } from "../../../api/const";
import Store, { StoreEvents } from "../../../core/Store";

class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    const { backLinkRoute } = props;

    const avatar = Store.getState().user?.avatar;

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
      {
        className: "profile__avatar",
        withInternalID: true,
        style: avatar
          ? `background-image: url(${HOST}/api/v2/resources/${avatar});`
          : "",
      }
    );

    super(
      "div",
      {
        ...props,
        changeAvatarButton,
        backLink,
      },
      { className: `profile` }
    );
  }

  componentDidMount() {
    const { didMountCb } = this.props;

    Store.on(StoreEvents.Updated, () => {
      const userFromStore = Store.getState().user;
      if (userFromStore?.avatar) {
        const avatar = document.querySelector<HTMLElement>(".profile__avatar");
        avatar.style.cssText = `background-image: url(${HOST}/api/v2/resources${userFromStore.avatar});`;
      }
    });

    if (didMountCb && typeof didMountCb === "function") {
      didMountCb();
    }
  }

  render() {
    return this.compile(template as HandlebarsTemplateDelegate, this.props);
  }
}

export default ProfilePage;
