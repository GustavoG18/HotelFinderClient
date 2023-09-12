import { css } from "@emotion/react";
import theme from "../../../theme";

export const flexStyle = css`
  width: 70%;
  height: 100%;
  flex-direction: column;
  margin: 0px auto;
`;

export const tabStyle = (props) => css`
  .chakra-tabs__tablist {
    border-color: ${theme.colors[props.colorMode].secondary};
  }
`;
