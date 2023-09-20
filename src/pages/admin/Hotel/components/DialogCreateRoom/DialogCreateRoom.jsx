/** @jsxImportSource @emotion/react */

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Switch,
  Textarea,
  VStack,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import theme from "../../../../../theme";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../../../../../components/Input/Input";
import * as styles from "./DialogCreateRoom.styled.js";
import axios from "axios";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const DialogCreateRoom = ({
  isOpen,
  cancelRef,
  onClose,
  setHotelSelected,
  roomInformation,
  handleUpdateRoom,
}) => {
  const [initialValues, setInitialValues] = useState({});
  const { colorMode } = useColorMode();
  const toast = useToast();
  const validationSchema = Yup.object({
    enable: Yup.boolean(),
    number_of_persons: Yup.number()
      .required("The number is mandatory")
      .integer("The number must be an integer"),
    description: Yup.string().required("The name is required"),
    check_in: Yup.string()
      .matches(
        /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
        "The time must be in the format HH:mm"
      )
      .required("The time is mandatory"),
    check_out: Yup.string()
      .matches(
        /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
        "The time must be in the format HH:mm"
      )
      .required("The time is mandatory"),
    based_price: Yup.number()
      .required("The number is mandatory")
      .integer("The number must be an integer"),
    tax: Yup.number()
      .required("The number is mandatory")
      .integer("The number must be an integer"),
    type_of_room: Yup.string(),
    location: Yup.string(),
  });

  const handleSubmit = async (value) => {
    try {
      const { data } = await axios.post(
        "https://hotelfinderserver.azurewebsites.net/hotel/room/createRoom",
        value
      );
      setHotelSelected((prev) => {
        // eslint-disable-next-line no-prototype-builtins
        if (prev.hasOwnProperty("rooms")) {
          return {
            ...prev,
            rooms: [...prev.rooms, data._id],
          };
        } else {
          return {
            rooms: [data._id],
          };
        }
      });
      toast({
        title: "Successful room created.",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error room created.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (roomInformation) {
      setInitialValues(roomInformation);
    } else {
      setInitialValues({
        enabled: true,
        number_of_persons: 4,
        description: "",
        check_in: "",
        check_out: "",
        based_price: 100,
        tax: 100,
        type_of_room: "Standart",
        location: "Front",
      });
    }
  }, [roomInformation]);

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
            {roomInformation ? "Update room" : "Create room"}
          </AlertDialogHeader>
          <AlertDialogBody>
            <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              validationSchema={validationSchema}
              onSubmit={roomInformation ? handleUpdateRoom : handleSubmit}
            >
              {({ isSubmitting, initialValues }) => (
                <Form>
                  <VStack spacing={3} align="stretch">
                    <Field name="enabled">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.enabled && form.touched.enabled
                          }
                        >
                          <FormLabel htmlFor="enabled">Enabled</FormLabel>
                          <Switch
                            {...field}
                            id="enabled"
                            w="500px"
                            size="lg"
                            isChecked={initialValues.enabled}
                          />
                          <FormErrorMessage>
                            {form.errors.enabled}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="number_of_persons">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.number_of_persons &&
                            form.touched.number_of_persons
                          }
                        >
                          <FormLabel htmlFor="number_of_persons">
                            Number of persons
                          </FormLabel>
                          <NumberInput
                            id="number_of_persons"
                            defaultValue={4}
                            min={1}
                            max={20}
                          >
                            <NumberInputField {...field} />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                          <FormErrorMessage>
                            {form.errors.number_of_persons}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="description">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.description && form.touched.description
                          }
                        >
                          <FormLabel htmlFor="description">
                            Description
                          </FormLabel>
                          <Textarea
                            {...field}
                            id="description"
                            placeholder="A hotel room is a private space designed to provide comfort and accommodation to guests. Typically, it includes a bed or beds, functional furniture such as a desk and chairs ...."
                            borderColor={theme.colors[colorMode].primaryColorBg}
                            size="sm"
                          />
                          <FormErrorMessage>
                            {form.errors.description}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="check_in">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.check_in && form.touched.check_in
                          }
                        >
                          <FormLabel htmlFor="check_in">Check in</FormLabel>
                          <Input
                            {...field}
                            type="time"
                            id="check_in"
                            borderColor={theme.colors[colorMode].primaryColorBg}
                          />
                          <FormErrorMessage>
                            {form.errors.check_in}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="check_out">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.check_out && form.touched.check_out
                          }
                        >
                          <FormLabel htmlFor="check_out">Check out</FormLabel>
                          <Input
                            {...field}
                            type="time"
                            id="check_out"
                            borderColor={theme.colors[colorMode].primaryColorBg}
                          />
                          <FormErrorMessage>
                            {form.errors.check_out}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="based_price">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.based_price && form.touched.based_price
                          }
                        >
                          <FormLabel htmlFor="based_price">
                            Based price
                          </FormLabel>
                          <NumberInput
                            id="based_price"
                            defaultValue={100}
                            min={1}
                          >
                            <NumberInputField {...field} />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                          <FormErrorMessage>
                            {form.errors.based_price}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="tax">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.tax && form.touched.tax}
                        >
                          <FormLabel htmlFor="tax">Tax</FormLabel>
                          <NumberInput id="tax" defaultValue={100} min={1}>
                            <NumberInputField {...field} />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                          <FormErrorMessage>{form.errors.tax}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="type_of_room">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.type_of_room &&
                            form.touched.type_of_room
                          }
                        >
                          <FormLabel htmlFor="type_of_room">
                            Type of room
                          </FormLabel>
                          <Select
                            {...field}
                            id="type_of_room"
                            borderColor={theme.colors[colorMode].primaryColorBg}
                          >
                            <option
                              value="Standart"
                              selected={
                                initialValues.type_of_room === "Standart"
                              }
                            >
                              Standart
                            </option>
                            <option
                              value="Suite"
                              selected={initialValues.type_of_room === "Suite"}
                            >
                              Suite
                            </option>
                            <option
                              value="Double Deluxe"
                              selected={
                                initialValues.type_of_room === "Double Deluxe"
                              }
                            >
                              Double Deluxe
                            </option>
                            <option
                              value="Familiar"
                              selected={
                                initialValues.type_of_room === "Familiar"
                              }
                            >
                              Familiar
                            </option>
                            <option
                              value="Individual"
                              selected={
                                initialValues.type_of_room === "Individual"
                              }
                            >
                              Individual
                            </option>
                            <option
                              value="Economic"
                              selected={
                                initialValues.type_of_room === "Economic"
                              }
                            >
                              Economic
                            </option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.type_of_room}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="location">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.location && form.touched.location
                          }
                        >
                          <FormLabel htmlFor="location">Location</FormLabel>
                          <Select
                            {...field}
                            id="location"
                            borderColor={theme.colors[colorMode].primaryColorBg}
                          >
                            <option
                              value="Front"
                              selected={initialValues.location === "Front"}
                            >
                              Front
                            </option>
                            <option
                              value="Back"
                              selected={initialValues.location === "Back"}
                            >
                              Back
                            </option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.location}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </VStack>
                  <Button
                    css={styles.buttonStyle({ colorMode })}
                    bg={theme.colors[colorMode].primary}
                    color={theme.colors[colorMode].primaryColorButton}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    {roomInformation ? "Update" : "Create"}
                  </Button>
                </Form>
              )}
            </Formik>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DialogCreateRoom;
