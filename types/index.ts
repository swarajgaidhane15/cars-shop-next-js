import { MouseEventHandler } from "react";

export interface CustomButton {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
}

export interface SearchManufacturer {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
}