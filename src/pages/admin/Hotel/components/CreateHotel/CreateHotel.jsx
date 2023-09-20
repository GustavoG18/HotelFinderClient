/** @jsxImportSource @emotion/react */
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Switch,
  Text,
  Textarea,
  VStack,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import * as styles from "./CreateHotel.styled.js";
import { AddIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import theme from "../../../../../theme.js";
import { css } from "@emotion/react";
import DialogCreateRoom from "../DialogCreateRoom/DialogCreateRoom.jsx";
import { useUserContext } from "../../../../../context/UserContext.jsx";
import RoomAccordion from "../RoomAccordion/RoomAccordion.jsx";
import SelectCountry from "../../../../../components/SelectCountry/SelectCountry.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const CreateHotel = ({ hotel = {}, setSelectedHotel, setViewHotels }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const toast = useToast();

  const { user } = useUserContext();
  const [hotelSelected, setHotelSelected] = useState(hotel);
  const [location, setLocation] = useState(hotel.location);
  const [initialValues, setInitialValues] = useState({});

  const validationSchema = Yup.object({
    name: Yup.string().required("The name is required"),
    description: Yup.string().required("The description is required"),
    enable: Yup.boolean(),
  });

  const handleSubmit = async (values) => {
    try {
      if (location !== "") {
        const dataToSend = {
          ...values,
          rooms: hotelSelected.rooms,
          location,
          id_user: user._id,
        };
        const { status } = await axios.post(
          "https://hotelfinderserver.azurewebsites.net/hotel/createHotel",
          dataToSend
        );
        if (status === 200) {
          setViewHotels((prev) => !prev);
          toast({
            title: "Successful hotel created",
            status: "success",
            position: "top-right",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "Please select location",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error creating hotel",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const handleEnabledHotel = async () => {
    try {
      const { _id, enabled } = hotel;
      const response = await axios.put(
        "https://hotelfinderserver.azurewebsites.net/hotel/enabledHotel",
        {
          _id,
          enabled: !enabled,
        }
      );
      console.log(response);
      setHotelSelected((prev) => {
        prev.enabled = !prev.enabled;
        debugger;
        return {
          ...prev,
        };
      });
      console.log(hotelSelected);
      toast({
        title: "Successful update hotel",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error update hotel",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const handleSubmitUpdate = async (values) => {
    try {
      if (location !== "") {
        const dataToSend = {
          ...values,
          rooms: hotelSelected.rooms,
          location,
          id_user: user._id,
        };
        const { status } = await axios.put(
          "https://hotelfinderserver.azurewebsites.net/hotel/updateHotel",
          dataToSend
        );
        if (status === 200) {
          setViewHotels((prev) => !prev);
          toast({
            title: "Successful hotel update",
            status: "success",
            position: "top-right",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "Please select location",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error updating hotel",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  useEffect(() => {
    if (Object.keys(hotel).length === 8) {
      setInitialValues(hotel);
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
    return () => setSelectedHotel({});
  }, []);
  return (
    <HStack spacing={5} align="stretch" w="100%" h="100%" mt={5}>
      <IconButton
        onClick={() => {
          setViewHotels((prev) => !prev);
        }}
        css={styles.backButtonStyle}
        aria-label="add hotels"
        icon={<ArrowLeftIcon />}
        size="md"
      />

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={
          Object.keys(hotelSelected).length !== 8
            ? handleSubmit
            : handleSubmitUpdate
        }
      >
        {({ isSubmitting, initialValues }) => (
          <Form
            css={css`
              width: 100%;
              display: flex;
              justify-content: center;
            `}
          >
            <VStack spacing={4} align="stretch">
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      {...field}
                      type="text"
                      id="name"
                      placeholder="Hotel del prado"
                      borderColor={theme.colors[colorMode].primaryColorBg}
                      w="500px"
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
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
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea
                      {...field}
                      id="description"
                      placeholder="Seaside Oasis: Tranquil beachfront retreat with luxury rooms, dining, spa, and stunning ocean views."
                      borderColor={theme.colors[colorMode].primaryColorBg}
                      size="sm"
                    />
                    <FormErrorMessage>
                      {form.errors.description}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Text>Location</Text>
              <SelectCountry location={location} setLocation={setLocation} />
              <VStack align="stretch">
                <Text>Add room</Text>
                <IconButton
                  onClick={onOpen}
                  css={styles.addButtonStyle}
                  aria-label="add rooms"
                  icon={<AddIcon />}
                  size="lg"
                />
                <DialogCreateRoom
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                  setHotelSelected={setHotelSelected}
                />
              </VStack>
              {hotelSelected?.rooms?.length && (
                <RoomAccordion hotel={hotelSelected} />
              )}
              <Field name="enabled">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.enabled && form.touched.enabled}
                  >
                    <FormLabel htmlFor="enabled">Enabled</FormLabel>
                    {Object.keys(hotelSelected).length !== 8 && (
                      <Switch
                        {...field}
                        id="enabled"
                        w="500px"
                        size="lg"
                        isChecked={initialValues.enabled}
                      />
                    )}
                    {Object.keys(hotelSelected).length === 8 && (
                      <Switch
                        id="enabled"
                        w="500px"
                        size="lg"
                        onChange={handleEnabledHotel}
                        isChecked={hotelSelected.enabled}
                      />
                    )}
                    <FormErrorMessage>{form.errors.enabled}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {Object.keys(hotelSelected).length !== 8 && (
                <Button
                  // css={styles.buttonStyle({ colorMode })}
                  bg={theme.colors[colorMode].primary}
                  color={theme.colors[colorMode].primaryColorButton}
                  type="submit"
                  isLoading={isSubmitting}
                  w="500px"
                >
                  Create hotel
                </Button>
              )}
              {Object.keys(hotelSelected).length === 8 && (
                <Button
                  // css={styles.buttonStyle({ colorMode })}
                  bg={theme.colors[colorMode].primary}
                  color={theme.colors[colorMode].primaryColorButton}
                  type="submit"
                  isLoading={isSubmitting}
                  w="500px"
                >
                  Update
                </Button>
              )}
            </VStack>
          </Form>
        )}
      </Formik>
    </HStack>
  );
};

export default CreateHotel;
