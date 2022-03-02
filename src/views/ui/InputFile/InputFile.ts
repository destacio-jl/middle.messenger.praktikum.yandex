import { InputFileProps } from "./types";
import Block from "../../../core/Block";
import template from "./InputFile.hbs";

class InputFile extends Block {
  file: File = null;

  constructor(props: InputFileProps) {
    const onChangeHandler = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target?.files;
      const fileName = files?.[0]?.name;

      this.file = files?.[0];
      this.setProps({ ...this.props, fileName: fileName || `` });
    };

    super(
      "label",
      { ...props, events: { change: onChangeHandler } },
      { className: "input-file" },
      { withInternalID: true }
    );
  }

  render() {
    return this.compile(template as HandlebarsTemplateDelegate, this.props);
  }
}

export default InputFile;
