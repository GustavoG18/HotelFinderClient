/** @jsxImportSource @emotion/react */
import {
  Button,
  Flex,
  HStack,
  Highlight,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import ToggleColorMode from "./ToggleColorMode";
import theme from "../theme";
import DialogAuthentication from "./authentication/DialogAuthentication/DialogAuthentication";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      mt={2}
    >
      <Text color={theme.colors[colorMode].primaryColor} fontSize="2xl" as="b">
        <Highlight
          query={["HotelsFinder"]}
          styles={{
            px: "2",
            py: "1",
            rounded: "full",
            bg: `${theme.colors[colorMode].secondary}`,
          }}
        >
          HotelsFinder
        </Highlight>
      </Text>
      <HStack>
        <ToggleColorMode />
        <Button onClick={onOpen}>Login</Button>
        <DialogAuthentication
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />
      </HStack>
    </Flex>
  );
};

export default NavBar;
