import React from "react";
import App from "./App.jsx";
import theme from "./theme.js";
import ReactDOM from "react-dom/client";
import { CSSReset, ChakraProvider, ColorModeScript } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CSSReset />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
