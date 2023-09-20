/** @jsxImportSource @emotion/react */
import { AddIcon } from "@chakra-ui/icons";
import { Box, HStack, Heading, IconButton, VStack } from "@chakra-ui/react";
import * as styles from "./Hotel.styled.js";
import ListHotels from "./components/ListHotel/ListHotels.jsx";
import { useState } from "react";
import CreateHotel from "./components/CreateHotel/CreateHotel.jsx";

const Hotel = () => {
  const [viewHotels, setViewHotels] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState({});

  const handleCreateHotel = () => {
    setViewHotels((prev) => !prev);
  };

  return (
    <Box w="100%" h="100%">
      {viewHotels ? (
        <>
          <Heading>Yours hotels</Heading>
          <HStack spacing={5} align="stretch" w="100%" h="100%" mt={5}>
            <ListHotels
              setViewHotels={setViewHotels}
              setSelectedHotel={setSelectedHotel}
            />
            <IconButton
              onClick={handleCreateHotel}
              css={styles.addButtonStyle}
              aria-label="add hotels"
              icon={<AddIcon />}
              size="lg"
            />
          </HStack>
        </>
      ) : (
        <VStack>
          <CreateHotel
            setViewHotels={setViewHotels}
            hotel={selectedHotel}
            setSelectedHotel={setSelectedHotel}
          />
        </VStack>
      )}
    </Box>
  );
};

export default Hotel;
