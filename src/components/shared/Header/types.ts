import { RefObject } from "react";

export type MenuButtonProps = {
  isOpen: boolean;
  toggle: () => void;
  ref?: RefObject<HTMLButtonElement | null>;
};

export type MenuDropDownProps = {
  isOpen: boolean;
  toggle: () => void;
  ref?: RefObject<HTMLDivElement | null>;
};
