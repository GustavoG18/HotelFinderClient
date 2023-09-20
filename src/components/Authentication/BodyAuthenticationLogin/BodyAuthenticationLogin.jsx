/** @jsxImportSource @emotion/react */
import {
  Avatar,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import theme from "../../../theme";
import * as styles from "./BodyAuthenticationLogin.styled.js";

// eslint-disable-next-line react/prop-types
const BodyAuthenticationLogin = ({ handleSubmit, isLogin, setIsLogin }) => {
  const { colorMode } = useColorMode();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("The email is required"),
    password: Yup.string().required("The password is required"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <VStack spacing={3} align="stretch">
            <Avatar
              src="https://bit.ly/broken-link"
              mr="auto"
              ml="auto"
              size="xl"
            />
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Name</FormLabel>
                  <Input
                    {...field}
                    type="text"
                    id="email"
                    placeholder="gustavo@example.com"
                    borderColor={theme.colors[colorMode].primaryColorBg}
                  />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    {...field}
                    type="password"
                    id="password"
                    placeholder="*******"
                    borderColor={theme.colors[colorMode].primaryColorBg}
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Text
              color={colorMode === "light" ? "#000080" : "#FFFFFF"}
              css={styles.linkStyle}
              onClick={() => {
                setIsLogin((prev) => !prev);
              }}
              mt={3}
            >
              {isLogin
                ? "Don't have an account? Register."
                : "Do you already have an account? Log in."}
            </Text>
          </VStack>
          <Button
            css={styles.buttonStyle({ colorMode })}
            bg={theme.colors[colorMode].primary}
            color={theme.colors[colorMode].primaryColorButton}
            type="submit"
            isLoading={isSubmitting}
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default BodyAuthenticationLogin;
