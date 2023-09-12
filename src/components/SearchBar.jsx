/* eslint-disable react/no-unknown-property */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Button,
  HStack,
  // Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useColorMode,
} from "@chakra-ui/react";
import theme from "../theme";
import Input from "./Input/Input";

export const inputClass = css`
  outline: none;
  ::-webkit-calendar-picker-indicator {
    filter: invert(1) !important;
  }
  ::placeholder {
    color: #ffffff99;
  }
`;

const SearchBar = () => {
  const { colorMode } = useColorMode();
  return (
    <HStack
      spacing={2}
      css={css`
        margin-bottom: 50px;
      `}
    >
      {/* <Input maxWidth="300px" placeholder="Basic usage" /> */}
      {/* <Input
        placeholder="Basic usage"
        color={theme.colors[colorMode].primaryColor}
      /> */}
      {/* <Input
        css={inputClass}
        borderColor="red"
        placeholder="Select Date and Time"
        size="md"
        type="date"
        color={theme.colors[colorMode].primaryColor}
      /> */}
      {/* <Input
        css={inputClass}
        placeholder="Select Date and Time"
        size="md"
        type="date"
        // color={theme.colors[colorMode].primaryColor}
      />
      <NumberInput color={theme.colors[colorMode].primaryColor}>
        <NumberInputField w="100px" />
        <NumberInputStepper>
          <NumberIncrementStepper
            color={theme.colors[colorMode].primaryColor}
          />
          <NumberDecrementStepper
            color={theme.colors[colorMode].primaryColor}
          />
        </NumberInputStepper>
      </NumberInput> */}
      <Button w="250px">Buscar</Button>
    </HStack>
  );
};

export default SearchBar;
