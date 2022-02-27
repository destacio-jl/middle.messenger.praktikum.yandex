import { Indexed } from "../../core/types";

export type ButtonProps = {
  href?: string;
  text: string;
  type?: string;
  events?: Indexed;
};
