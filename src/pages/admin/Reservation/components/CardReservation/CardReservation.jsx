/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/** @jsxImportSource @emotion/react */
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import DialogViewReservation from "../DialogViewReservation/DialogViewReservation";

const CardReservation = ({ reservation }) => {
  const [hotel, setHotel] = useState({});
  const [room, setRoom] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const { id_hotel, id_room } = reservation;
    const getData = async () => {
      try {
        const { data: hotel } = await axios.get(
          "http://localhost:3000/hotel/getHotel",
          {
            params: { hotelId: id_hotel },
          }
        );
        const { data: room } = await axios.get(
          "http://localhost:3000/hotel/room/getRoom",
          {
            params: { idRoom: id_room },
          }
        );
        setRoom(room);
        setHotel(hotel[0]);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <DialogViewReservation
        onClose={onClose}
        isOpen={isOpen}
        reservation={reservation}
        hotel={hotel}
        room={room}
      />
      <Card maxW="sm">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="md">{hotel.name}</Heading>
            <Text>{hotel.description}</Text>
            <Text fontSize="md">Location: {hotel.location}</Text>
            <Text fontSize="md">Start date: {reservation.start_date}</Text>
            <Text fontSize="md">End date: {reservation.end_date}</Text>
            <Text fontSize="md">
              Number of person: {reservation.guests.length}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button variant="solid" colorScheme="blue" onClick={() => onOpen()}>
            See more
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default CardReservation;
