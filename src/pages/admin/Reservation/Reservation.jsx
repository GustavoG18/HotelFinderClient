/** @jsxImportSource @emotion/react */
import { Box, HStack, Heading } from "@chakra-ui/react";
import ListReservations from "./components/ListReservations/ListReservations";
// import { css } from "@emotion/react";

const Reservation = () => {
  return (
    <Box w="100%" h="100%">
      <>
        <Heading>Yours reservations</Heading>
        <HStack spacing={5} align="stretch" w="100%" h="100%" mt={5}>
          <ListReservations />
        </HStack>
      </>
    </Box>
  );
};

export default Reservation;
