import Block, { BlockSettings } from "../../core/block";
import { compile } from "handlebars";
import inputFieldTemplate from "./InputField.hbs";
import profileFieldTemplate from "./ProfileField.hbs";
import roundedFieldTemplate from "./RoundedInput.hbs";
import { InputFieldProps, INPUT_FIELD_VARIANTS } from "./types";

const TEMPLATES = {
  [INPUT_FIELD_VARIANTS.AUTH]: inputFieldTemplate,
  [INPUT_FIELD_VARIANTS.PROFILE]: profileFieldTemplate,
  [INPUT_FIELD_VARIANTS.ROUNDED]: roundedFieldTemplate,
};

const CLASSES = {
  [INPUT_FIELD_VARIANTS.AUTH]: ``,
  [INPUT_FIELD_VARIANTS.PROFILE]: `profile__field`,
  [INPUT_FIELD_VARIANTS.ROUNDED]: `chat__input`,
};

class InputField extends Block {
  props: InputFieldProps;

  validate() {
    return null;
  }

  constructor(props: InputFieldProps, settings?: BlockSettings) {
    const {
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

    this.validate = validateAndShowError;
  }

  get value() {
    return this.element.querySelector(`[name=${this.props.name}]`).value;
  }

  render() {
    const { variant } = this.props;
    const compiledTemplate = compile(
      TEMPLATES[variant as INPUT_FIELD_VARIANTS]
    );
    return compiledTemplate(this.props);
  }
}

export default InputField;
