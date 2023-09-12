/* eslint-disable react/no-unknown-property */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Box,
  Flex,
  Heading,
  Highlight,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import theme from "../../../theme";
import SearchBar from "../../../components/SearchBar";
import NavBar from "../../../components/NavBar/NavBar";
import * as styles from "./Home.styled.js";
// import SkeletonHotels from "../../components/SkeletonHotels";

const Home = () => {
  const { colorMode } = useColorMode();

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
          <SearchBar />
        </Flex>
      </Box>
      {/* <Flex css={styles.flexStyle}>
        <SkeletonHotels />
      </Flex> */}
    </Box>
  );
};

export default Home;
