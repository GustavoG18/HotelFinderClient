/* eslint-disable react/no-unknown-property */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Box,
  Flex,
  HStack,
  Heading,
  Highlight,
  Skeleton,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import theme from "../../../theme";
// import SearchBar from "../../../components/SearchBar";
import NavBar from "../../../components/NavBar/NavBar";
import * as styles from "./Home.styled.js";
import { useEffect, useState } from "react";
import axios from "axios";
import ListRooms from "../components/ListRooms/ListRooms";
// import SkeletonHotels from "../../components/SkeletonHotels";

const Home = () => {
  const { colorMode } = useColorMode();
  const [isLoaded, setIsLoaded] = useState(false);
  const [location, setLocation] = useState("");
  const [values, setValues] = useState({});
  const [rooms, setRooms] = useState([]);

  const handleSubmit = (values, onOpen) => {
    console.log("loo", values);
    if (values) {
      if (!JSON.parse(localStorage.getItem("userData"))) {
        onOpen();
      } else {
        setValues({
          ...values,
          location,
        });
      }
    }
  };

  useEffect(() => {
    const getRooms = async () => {
      try {
        const { data } = await axios.get(
          "https://hotelfinderserver.azurewebsites.net/hotel/room/getAllRooms",
          {
            params: {
              location,
              number_of_persons: values.number_of_persons,
            },
          }
        );
        setRooms(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (values) {
      console.log(values);
      getRooms();
    }
  }, [values]);

  return (
    <Box bg={theme.colors[colorMode].background} w="100%" h="100vh">
      <Box bg={theme.colors[colorMode].primary} w="100%" h="400px">
        <Flex css={styles.flexStyle}>
          <NavBar />
          <Heading
            color={theme.colors.white}
            mb={4}
            css={css`
              margin-top: auto;
            `}
          >
            <Highlight
              query={["hotel"]}
              styles={{
                px: "2",
                py: "1",
                rounded: "full",
                bg: `${theme.colors[colorMode].secondary}`,
              }}
            >
              Find your next hotel
            </Highlight>
          </Heading>
          <Text color={theme.colors.white} fontSize="xl" mb={2}>
            Search low prices on hotels, homes and much more...
          </Text>
          {/* <SearchBar
            location={location}
            setLocation={setLocation}
            handleSubmit={handleSubmit}
          /> */}
        </Flex>
      </Box>
      {rooms.length ? (
        <HStack
          spacing={4}
          w="70%"
          css={css`
            margin-left: auto;
            margin-right: auto;
            margin-top: 20px;
          `}
        >
          {rooms.map((room) => {
            return (
              <ListRooms
                key={room._id}
                room={room}
                number_of_persons={values.number_of_persons}
                startDate={values.start_date}
                endDate={values.end_date}
              />
            );
          })}
        </HStack>
      ) : (
        <Stack css={styles.stackStyle} spacing={4}>
          <Skeleton height="40px" isLoaded={isLoaded}></Skeleton>
          <Skeleton
            height="40px"
            isLoaded={isLoaded}
            bg="green.500"
            color="white"
            fadeDuration={1}
          ></Skeleton>
          <Skeleton
            height="40px"
            isLoaded={isLoaded}
            fadeDuration={4}
            bg="blue.500"
            color="white"
          ></Skeleton>
          <Skeleton
            height="40px"
            isLoaded={isLoaded}
            fadeDuration={4}
            bg="blue.500"
            color="white"
          ></Skeleton>
          <Skeleton
            height="40px"
            isLoaded={isLoaded}
            fadeDuration={4}
            bg="blue.500"
            color="white"
          ></Skeleton>
        </Stack>
      )}
    </Box>
  );
};

export default Home;
