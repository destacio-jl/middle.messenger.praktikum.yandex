import Block from "../../../../../core/Block";
import template from "./ChangeAvatarModal.hbs";

class ChangeAvatarModal extends Block {
  constructor() {
    const onSubmitHandler = (e: SubmitEvent) => {
      e.preventDefault();
      console.log(e);
      this.setProps({ ...this.props, title: "click" });
    };

    super(
      "form",
      { title: "Загрузите файл", events: { submit: onSubmitHandler } },
      { className: "change-avatar", withInternalID: true }
    );
  }

  render() {
    return this.compile(template as HandlebarsTemplateDelegate, this.props);
  }
}

export default new ChangeAvatarModal();
