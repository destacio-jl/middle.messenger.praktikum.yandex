import Button from "../src/components/Button";
import IBlock from "../src/core/block";
import InputField from "./components/InputField/InputField";

function render(query: string, block: IBlock) {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  return root;
}

const props = {
  text: "Click me",
  events: {
    click: (event: Event) => {
      console.log(event);
    },
  },
};

const settings = { withInternalID: true };

const button = new Button(props, settings);

render(".app", button);

setTimeout(() => {
  button.setProps({
    text: "Click me, please",
  });
}, 1000);
