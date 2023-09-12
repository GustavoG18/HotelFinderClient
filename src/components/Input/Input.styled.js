import { css } from "@emotion/react";
import theme from "../../theme";

export const inputClass = (props) => css`
  outline: none;
  & ::-webkit-calendar-picker-indicator {
    filter: invert(1) !important;
  }
  ::placeholder {
    color: ${theme.colors[props.colorMode].primaryColorBg};
    opacity: 0.7;
  }
`;
