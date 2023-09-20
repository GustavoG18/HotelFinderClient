/** @jsxImportSource @emotion/react */

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import axios from "axios";
import { useRef } from "react";
import { useUserContext } from "../../../../context/UserContext";

const ListRooms = ({ room, number_of_persons, startDate, endDate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const inputRefsName = Array.from({ length: number_of_persons }, () =>
    useRef(null)
  );
  const inputRefsLastname = Array.from({ length: number_of_persons }, () =>
    useRef(null)
  );
  const inputRefsBirthday = Array.from({ length: number_of_persons }, () =>
    useRef(null)
  );
  const inputRefsGender = Array.from({ length: number_of_persons }, () =>
    useRef(null)
  );
  const inputRefsNumberOfDocument = Array.from(
    { length: number_of_persons },
    () => useRef(null)
  );
  const inputRefsEmail = Array.from({ length: number_of_persons }, () =>
    useRef(null)
  );
  const inputRefsPhoneNumber = Array.from({ length: number_of_persons }, () =>
    useRef(null)
  );
  const hrefRefFullName = useRef(null);
  const hrefRefPhoneNumber = useRef(null);
  const { user } = useUserContext();

  const getFormOfNumerOfPersons = () => {
    const items = [];
    const lastElement = (
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Contact emergency
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <VStack spacing={2} align="stretch">
            <Input type="text" placeholder="Full name" ref={hrefRefFullName} />
            <Input
              type="text"
              placeholder="Phone number"
              ref={hrefRefPhoneNumber}
            />
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    );
    for (let index = 0; index < number_of_persons; index++) {
      const element = (
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Person # {index + 1}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <VStack spacing={2} align="stretch">
              <Input
                type="text"
                placeholder="Name"
                ref={inputRefsName[index]}
              />
              <Input
                type="text"
                placeholder="Last name"
                ref={inputRefsLastname[index]}
              />
              <Input type="date" ref={inputRefsBirthday[index]} />
              <Input
                type="text"
                placeholder="Gender"
                ref={inputRefsGender[index]}
              />
              <Input
                type="text"
                placeholder="Number of document"
                ref={inputRefsNumberOfDocument[index]}
              />
              <Input
                type="text"
                placeholder="Email"
                ref={inputRefsEmail[index]}
              />
              <Input
                type="text"
                placeholder="Phone number"
                ref={inputRefsPhoneNumber[index]}
              />
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      );
      items.push(element);
    }
    items.push(lastElement);
    return <Accordion allowMultiple>{items.map((item) => item)}</Accordion>;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reservation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{getFormOfNumerOfPersons()}</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={1}
              onClick={async () => {
                const guests = [];
                const contact_emergency = {
                  fullname: hrefRefFullName.current.value,
                  phone_number: hrefRefPhoneNumber.current.value,
                };
                for (let index = 0; index < number_of_persons; index++) {
                  const element = {
                    name: inputRefsName[index].current.value,
                    lastname: inputRefsLastname[index].current.value,
                    birthday: inputRefsBirthday[index].current.value,
                    gender: inputRefsGender[index].current.value,
                    type_of_document: "Cedula",
                    number_of_document:
                      inputRefsNumberOfDocument[index].current.value,
                    email: inputRefsEmail[index].current.value,
                    phone_number: inputRefsPhoneNumber[index].current.value,
                  };
                  guests.push(element);
                }
                console.log(guests, contact_emergency);
                try {
                  const { data } = await axios.post(
                    "http://localhost:3000/reservation/createReservation",
                    {
                      start_date: startDate,
                      end_date: endDate,
                      contact_emergency,
                      guests,
                      id_room: room._id,
                      id_hotel: room.id_hotel,
                      id_user: user._id,
                    }
                  );
                  toast({
                    title: "Successful reservation created",
                    status: "success",
                    position: "top-right",
                    duration: 5000,
                    isClosable: true,
                  });
                } catch (error) {
                  toast({
                    title: "Error reservation created",
                    status: "error",
                    position: "top-right",
                    duration: 5000,
                    isClosable: true,
                  });
                  console.error(error);
                }
                onClose();
              }}
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Card maxW="sm">
        <CardBody>
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{room.hotel_name}</Heading>
            <Text>{room.description}</Text>
            <Text fontSize="md">Type: {room.type_of_room}</Text>
            <Text color="blue.600" fontSize="md">
              Location: {room.hotel_location}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup
            css={css`
              display: flex;
              width: 100%;
              justify-content: space-between;
            `}
          >
            <Button variant="solid" colorScheme="blue" onClick={onOpen}>
              Next
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};

export default ListRooms;
