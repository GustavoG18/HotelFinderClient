import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "ligth",
    useSystemColorMode: true,
  },
  colors: {
    white: "#FFFFFF",
    light: {
      primary: "#000080",
      secondary: "#FFA500",
      background: "#FFFFFF",
      primaryColorBg: "#000000",
      primaryColorButton: "#FFFFFF",
    },
    dark: {
      primary: "#006666",
      secondary: "#00CED1",
      background: "#1B202C",
      primaryColorBg: "#FFFFFF",
      primaryColorButton: "#FFFFFF",
    },
  },
});

export default theme;
