/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useDisclosure,
} from "@chakra-ui/react";
import Input from "./Input/Input";
import SelectCountry from "./SelectCountry/SelectCountry";
import { useState } from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import DialogAuthentication from "./authentication/DialogAuthentication/DialogAuthentication";

export const inputClass = css`
  outline: none;
  ::-webkit-calendar-picker-indicator {
    filter: invert(1) !important;
  }
  ::placeholder {
    color: #ffffff99;
  }
`;

const SearchBar = ({ location, setLocation, handleSubmit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { colorMode } = useColorMode();
  // const [location, setLocation] = useState("");
  const [initialValues, setInitialValues] = useState({
    number_of_persons: 1,
    start_date: "",
    end_date: "",
    location: "",
  });

  const validationSchema = Yup.object({
    number_of_persons: Yup.number()
      .required("The number is mandatory")
      .integer("The number must be an integer"),
    start_date: Yup.string().required("The start date is mandatory"),
    end_date: Yup.string().required("The end date is mandatory"),
    location: Yup.string(),
  });

  return (
    <>
      <DialogAuthentication isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values, onOpen)}
      >
        {() => (
          <Form>
            <HStack
              spacing={2}
              css={css`
                margin-bottom: 50px;
              `}
            >
              <SelectCountry
                location={location}
                setLocation={setLocation}
                position="horizontal"
              />
              <Field name="start_date">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.start_date && form.touched.start_date
                    }
                    w="200px"
                  >
                    <FormLabel htmlFor="start_date" color="white">
                      Start date
                    </FormLabel>
                    <Input
                      {...field}
                      w="200px"
                      color="white"
                      type="date"
                      id="start_date"
                      borderColor="white"
                    />
                    {/* <FormErrorMessage>{form.errors.start_date}</FormErrorMessage> */}
                  </FormControl>
                )}
              </Field>
              <Field name="end_date">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.end_date && form.touched.end_date}
                    w="200px"
                  >
                    <FormLabel htmlFor="end_date" color="white">
                      End date
                    </FormLabel>
                    <Input
                      {...field}
                      w="200px"
                      type="date"
                      id="end_date"
                      color="white"
                      borderColor="white"
                    />
                    {/* <FormErrorMessage>{form.errors.end_date}</FormErrorMessage> */}
                  </FormControl>
                )}
              </Field>
              <Field name="number_of_persons" w="100px">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.number_of_persons &&
                      form.touched.number_of_persons
                    }
                    w="200px"
                  >
                    <FormLabel htmlFor="number_of_persons" color="white">
                      Number of persons
                    </FormLabel>
                    <NumberInput
                      color="white"
                      id="number_of_persons"
                      defaultValue={1}
                      min={1}
                      max={20}
                    >
                      <NumberInputField w="200px" {...field} />
                      <NumberInputStepper>
                        <NumberIncrementStepper color="white" />
                        <NumberDecrementStepper color="white" />
                      </NumberInputStepper>
                    </NumberInput>
                    {/* <FormErrorMessage>
                    {form.errors.number_of_persons}
                  </FormErrorMessage> */}
                  </FormControl>
                )}
              </Field>
              <Button
                w="200px"
                css={css`
                  margin-top: 30px !important;
                `}
                // isLoading={isSubmitting}
                type="submit"
              >
                Search
              </Button>
            </HStack>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SearchBar;
