/** @jsxImportSource @emotion/react */
import {
  Avatar,
  Button,
  Flex,
  HStack,
  Highlight,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import theme from "../../theme";
import * as styles from "./NavBar.styled.js";
import { useNavigate } from "react-router-dom";
import ToggleColorMode from "../ToggleColorMode";
import { useUserContext } from "../../context/UserContext";
import DialogAuthentication from "../Authentication/DialogAuthentication/DialogAuthentication";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogOut = () => {
    try {
      localStorage.setItem("userData", JSON.stringify({}));
      setUser({
        rol: "Usuario",
      });
      toast({
        title: "Successful log out.",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error log out",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
        {user._id ? (
          <Menu>
            <MenuButton
              css={styles.navBarStyle}
              as={IconButton}
              aria-label="Options"
              icon={
                <Avatar
                  src="https://bit.ly/broken-link"
                  mr="auto"
                  ml="auto"
                  size="md"
                />
              }
              borderWidth="0px"
              variant="outline"
            />
            <MenuList>
              <MenuItem onClick={handleLogOut}>Log out</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button onClick={onOpen}>Login</Button>
        )}
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
