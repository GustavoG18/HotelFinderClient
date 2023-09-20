/** @jsxImportSource @emotion/react */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Divider,
  Heading,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import theme from "../../../../../theme";

const DialogViewReservation = ({
  isOpen,
  onClose,
  hotel,
  room,
  reservation,
}) => {
  const { colorMode } = useColorMode();
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent
          bg={theme.colors[colorMode].background}
          color={theme.colors[colorMode].primaryColor}
        >
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            <Heading as="h1" size="lg">
              Your reservation
            </Heading>
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <VStack spacing={4} align="stretch">
              <Heading as="h2" size="md">
                Hotel information
              </Heading>
              <Text>Hotel Name: {hotel.name}</Text>
              <Text>Description: {hotel.description}</Text>
              <Text>Hotel Location: {hotel.location}</Text>
              <Divider />
              <Heading as="h2" size="md">
                Room information
              </Heading>
              <Text>Room Description: {room.description}</Text>
              <Text>Number Of Persons: {room.number_of_persons}</Text>
              <Text>Check In: {room.check_in}</Text>
              <Text>Check Out: {room.check_out}</Text>
              <Text>Type Of Room: {room.type_of_room}</Text>
              <Text>
                Total Room: {room.based_price} + {room.tax} ={" "}
                {room.based_price + room.tax}
              </Text>
              <Text>Location: {room.location}</Text>
              <Divider />
              <Heading as="h2" size="md">
                Reservation information
              </Heading>
              <Text>Start Date: {reservation.start_date}</Text>
              <Text>End Date: {reservation.end_date}</Text>
              <Divider />
              <Heading as="h2" size="md">
                Guest
              </Heading>
              <Accordion allowMultiple>
                {reservation.guests.map(
                  (
                    {
                      name,
                      lastname,
                      birthday,
                      gender,
                      type_of_document,
                      number_of_document,
                      email,
                      phone_number,
                    },
                    index
                  ) => {
                    return (
                      <AccordionItem
                        key={`${number_of_document}-${phone_number}-${index}`}
                      >
                        <h2>
                          <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                              {`${name} ${lastname}`}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <Text>Birthday: {birthday}</Text>
                          <Text>Gender: {gender}</Text>
                          <Text>
                            {type_of_document}: {number_of_document}
                          </Text>
                          <Text>Email : {email}</Text>
                          <Text>Phone number : {phone_number}</Text>
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  }
                )}
              </Accordion>
              <Divider />
              <Heading as="h2" size="md">
                Contact emergency
              </Heading>
              <Text>Full name: {reservation.contact_emergency.fullname}</Text>
              <Text>
                Phone number: {reservation.contact_emergency.phone_number}
              </Text>
            </VStack>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DialogViewReservation;
