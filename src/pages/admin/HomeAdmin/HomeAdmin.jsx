/** @jsxImportSource @emotion/react */
import theme from "../../../theme";
import * as styles from "./HomeAdmin.styled";
import NavBar from "../../../components/NavBar/NavBar";
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
} from "@chakra-ui/react";
import Hotel from "../Hotel/Hotel";
import Reservation from "../Reservation/Reservation";

const HomeAdmin = () => {
  const { colorMode } = useColorMode();

  return (
    <Box bg={theme.colors[colorMode].background} w="100%" h="100vh">
      <Flex css={styles.flexStyle}>
        <NavBar />
        <Tabs
          isFitted
          variant="enclosed"
          css={styles.tabStyle({ colorMode })}
          mt={12}
        >
          <TabList mb="1em">
            <Tab>Hotels</Tab>
            <Tab>Reservations</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Hotel />
            </TabPanel>
            <TabPanel>
              <Reservation />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  );
};

export default HomeAdmin;
