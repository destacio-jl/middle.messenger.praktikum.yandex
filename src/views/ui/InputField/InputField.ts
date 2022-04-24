import { compile } from "handlebars";
import Block, { BlockSettings } from "../../../core/Block";
import inputFieldTemplate from "./InputField.hbs";
import profileFieldTemplate from "./ProfileField.hbs";
import roundedFieldTemplate from "./RoundedInput.hbs";
import { InputFieldProps, INPUT_FIELD_VARIANTS } from "./types";

const TEMPLATES = {
  [INPUT_FIELD_VARIANTS.AUTH]: inputFieldTemplate as HandlebarsTemplateDelegate,
  [INPUT_FIELD_VARIANTS.PROFILE]:
    profileFieldTemplate as HandlebarsTemplateDelegate,
  [INPUT_FIELD_VARIANTS.ROUNDED]:
    roundedFieldTemplate as HandlebarsTemplateDelegate,
};

const CLASSES = {
  [INPUT_FIELD_VARIANTS.AUTH]: ``,
  [INPUT_FIELD_VARIANTS.PROFILE]: `profile__field`,
  [INPUT_FIELD_VARIANTS.ROUNDED]: `rounded-input`,
};

class InputField extends Block {
  props: InputFieldProps;

  name: ``;

  validate() {
    return null;
  }

  constructor(props: InputFieldProps, settings?: BlockSettings) {
    const {
      name,
      value,
      disabled,
      variant,
      validators,
      type,
      showErrors = true,
    } = props;

    const validateAndShowError = () => {
      if (!validators) return;

      const currentValue = this.value;

      const errorText = validators.reduce((error, validator) => {
        const currentError = validator(currentValue);
        return error || currentError;
      }, ``);

      const newProps = {
        ...this.props,
        value: currentValue,
        errorText,
      };

      this.setProps(newProps);
    };

    super(
      "div",
      {
        ...props,
        value: value || ``,
        disabled: disabled ? `disabled` : ``,
        variant: variant || INPUT_FIELD_VARIANTS.AUTH,
        type: type || "text",
        events: {
          blur: validateAndShowError,
        },
        showErrors,
      },
      {
        ...settings,
        className: CLASSES[variant],
      }
    );

    this.name = name;
    this.validate = validateAndShowError;
  }

  get value(): string {
    return String(
      this.element.querySelector(`[name=${this.props.name}]`).value
    );
  }

  render() {
    const { variant } = this.props;
    const compiledTemplate = compile(TEMPLATES[variant]);
    return compiledTemplate(this.props);
  }
}

export default InputField;
