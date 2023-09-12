import { css } from "@emotion/react";
import theme from "../../../theme";

export const linkStyle = css`
  text-decoration: underline;
  cursor: pointer;
`;

export const buttonStyle = (props) => css`
  &:hover {
    background: ${theme.colors[props.colorMode].primary} !important;
    opacity: 0.8;
  }
`;
