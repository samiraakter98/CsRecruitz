import React from "react";
import { ButtonStyled } from "./Button.styled";
function Button({ children }) {
  return <ButtonStyled>{children}</ButtonStyled>;
}

export default Button;
