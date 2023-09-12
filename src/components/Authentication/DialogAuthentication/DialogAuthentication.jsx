/** @jsxImportSource @emotion/react */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import theme from "../../../theme";
import { useRef, useState } from "react";
import BodyAuthenticationLogin from "../BodyAuthenticationLogin/BodyAuthenticationLogin";
import BodyAuthenticationRegister from "../BodyAuthenticationRegister/BodyAuthenticationRegister";

// eslint-disable-next-line react/prop-types
const DialogAuthentication = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();
  const cancelRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const toast = useToast();

  const handleSubmitLogin = async (value) => {
    try {
      const { data } = await axios.get("http://localhost:3000/user/getUser", {
        params: value,
      });
      console.log(data);
      if (data.length) {
        toast({
          title: "Successful login.",
          description: `Welcome sr ${data[0].name}`,
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Incorrect username or password",
          description: "Double-check your credentials.",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitRegister = async (value) => {
    try {
      const { admin } = value;
      const url =
        admin === "admin"
          ? "http://localhost:3000/user/createUserAdmin"
          : "http://localhost:3000/user/createUser";
      const { data } = await axios.post(url, value);
      if (data) {
        toast({
          title: "Successful Register.",
          description: `Welcome sr ${data.name}`,
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: "Error creating user",
        description: "Double-check your credentials.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          bg={theme.colors[colorMode].background}
          color={theme.colors[colorMode].primaryColor}
        >
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {isLogin ? "Login" : "Register"}
          </AlertDialogHeader>

          <AlertDialogBody>
            {isLogin ? (
              <BodyAuthenticationLogin
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                handleSubmit={handleSubmitLogin}
              />
            ) : (
              <BodyAuthenticationRegister
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                handleSubmit={handleSubmitRegister}
              />
            )}
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DialogAuthentication;
