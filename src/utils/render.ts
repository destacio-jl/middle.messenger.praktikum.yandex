import { IBlock } from "../core/block";

const render = (query: string, block: IBlock) => {
  const root = document.querySelector(query);
  root.appendChild(block.getContent());
  return root;
};

export default render;
