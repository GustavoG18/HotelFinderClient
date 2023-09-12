import { Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode} m="1rem">
      {colorMode === "light" ? (
        <MoonIcon color="blue.700" />
      ) : (
        <SunIcon color="white.400" />
      )}
    </Button>
  );
};

export default ToggleColorMode;
