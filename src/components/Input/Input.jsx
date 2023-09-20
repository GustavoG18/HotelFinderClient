/** @jsxImportSource @emotion/react */
import { Input as InputChakra, useColorMode } from "@chakra-ui/react";
import * as styles from "./Input.styled.js";
import theme from "../../theme";

// eslint-disable-next-line react/prop-types
const Input = (props) => {
  const { colorMode } = useColorMode();

  return (
    <InputChakra
      css={styles.inputClass({ colorMode })}
      color={theme.colors[colorMode].primaryColorBg}
      borderColor={theme.colors.white}
      {...props}
    />
  );
};

export default Input;
