/** @jsxImportSource @emotion/react */
import {
  Avatar,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import * as Yup from "yup";
import theme from "../../../theme";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as styles from "./BodyAuthenticationRegister.styled.js";

// eslint-disable-next-line react/prop-types
const BodyAuthenticationRegister = ({ handleSubmit, isLogin, setIsLogin }) => {
  const { colorMode } = useColorMode();

  const validationSchema = Yup.object({
    name: Yup.string().required("The name is required"),
    lastname: Yup.string().required("The last name is required"),
    birthday: Yup.date()
      .required("Date of birth is required")
      .test("is-adult", "You must be older than 18 years", (value) => {
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        if (
          today <
          new Date(
            today.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
          )
        ) {
          return age - 1 >= 18;
        } else {
          return age >= 18;
        }
      }),
    gender: Yup.string()
      .oneOf(["male", "female"], "You must select a valid option")
      .required("You must select an option"),
    document_type: Yup.string()
      .oneOf(["id", "passport", "visa"], "You must select a valid option")
      .required("You must select an option"),
    document_number: Yup.string().required("The document number is required"),
    phone_number: Yup.string().required("The phone number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("The email is required"),
    password: Yup.string().required("The password is required"),
    admin: Yup.string()
      .oneOf(["admin", "user"], "You must select a valid option")
      .required("You must select an option"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        lastname: "",
        birthday: new Date(),
        gender: "male",
        document_type: "id",
        document_number: "",
        phone_number: "",
        email: "",
        password: "",
        admin: "user",
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
            <Field name="name">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    {...field}
                    type="text"
                    id="name"
                    placeholder="Gustavo"
                    borderColor={theme.colors[colorMode].primaryColorBg}
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="lastname">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.lastname && form.touched.lastname}
                >
                  <FormLabel htmlFor="lastname">Last name</FormLabel>
                  <Input
                    {...field}
                    type="text"
                    id="lastname"
                    placeholder="Guerrero Fandiño"
                    borderColor={theme.colors[colorMode].primaryColorBg}
                  />
                  <FormErrorMessage>{form.errors.lastname}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="birthday">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.birthday && form.touched.birthday}
                >
                  <FormLabel htmlFor="birthday">Birthday</FormLabel>
                  <Input
                    {...field}
                    type="date"
                    id="birthday"
                    borderColor={theme.colors[colorMode].primaryColorBg}
                  />
                  <FormErrorMessage>{form.errors.birthday}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Text>Gender</Text>
            <RadioGroup name="gender">
              <Stack direction="row">
                <Field name="gender">
                  {({ field }) => (
                    <>
                      <Radio {...field} value="male">
                        Male
                      </Radio>
                      <Radio {...field} value="female">
                        Female
                      </Radio>
                    </>
                  )}
                </Field>
              </Stack>
            </RadioGroup>
            <ErrorMessage name="gender" component="div" className="error" />
            <Text>Document type</Text>
            <RadioGroup name="document_type">
              <Stack direction="row">
                <Field name="document_type">
                  {({ field }) => (
                    <>
                      <Radio {...field} value="id">
                        Id
                      </Radio>
                      <Radio {...field} value="passport">
                        Passport
                      </Radio>
                      <Radio {...field} value="visa">
                        Number of visa
                      </Radio>
                    </>
                  )}
                </Field>
              </Stack>
            </RadioGroup>
            <ErrorMessage
              name="document_type"
              component="div"
              className="error"
            />
            <Field name="document_number">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.document_number && form.touched.document_number
                  }
                >
                  <FormLabel htmlFor="document_number">
                    Document number
                  </FormLabel>
                  <Input
                    {...field}
                    type="text"
                    id="document_number"
                    placeholder="123456789"
                    borderColor={theme.colors[colorMode].primaryColorBg}
                  />
                  <FormErrorMessage>
                    {form.errors.document_number}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="phone_number">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.phone_number && form.touched.phone_number
                  }
                >
                  <FormLabel htmlFor="phone_number">Phone number</FormLabel>
                  <Input
                    {...field}
                    type="text"
                    id="phone_number"
                    placeholder="123456789"
                    borderColor={theme.colors[colorMode].primaryColorBg}
                  />
                  <FormErrorMessage>
                    {form.errors.phone_number}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
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
            <Text>Are you an administrator ?</Text>
            <RadioGroup name="admin">
              <Stack direction="row">
                <Field name="admin">
                  {({ field }) => (
                    <>
                      <Radio {...field} value="admin">
                        Yes
                      </Radio>
                      <Radio {...field} value="user">
                        No
                      </Radio>
                    </>
                  )}
                </Field>
              </Stack>
            </RadioGroup>
            <ErrorMessage name="admin" component="div" className="error" />
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
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default BodyAuthenticationRegister;
