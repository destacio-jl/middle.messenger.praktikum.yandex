import updateAvatar from "../../../../../controllers/user/updateAvatar";
import Block from "../../../../../core/Block";
import InputFile from "../../../../ui/InputFile";
import Modal from "../../../../ui/Modal/Modal";
import template from "./ChangeAvatarModal.hbs";

class ChangeAvatarModal extends Block {
  constructor() {
    const changeModalInputField = new InputFile({ name: "avatar" });

    const onSuccessUpdateCallback = () => {
      Modal.close();
    };

    const onSubmitHandler = (e: SubmitEvent) => {
      e.preventDefault();

      const { file } = changeModalInputField;
      const formData = new FormData(this.element);
      formData.append("avatar", file);

      this.setProps({
        ...this.props,
        error: file ? null : "Нужно выбрать файл",
      });

      if (file) {
        updateAvatar(formData, onSuccessUpdateCallback);
      }
    };

    super(
      "form",
      {
        title: "Загрузите файл",
        events: { submit: onSubmitHandler },
        changeModalInputField,
      },
      { className: "change-avatar", withInternalID: true }
    );
  }

  render() {
    return this.compile(template as HandlebarsTemplateDelegate, this.props);
  }
}

export default new ChangeAvatarModal();
