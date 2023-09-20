/** @jsxImportSource @emotion/react */
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  HStack,
  Heading,
  Image,
  Stack,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import * as styles from "./CardHotel.styled.js";
import { css } from "@emotion/react";
import axios from "axios";

const CardHotel = ({ hotel, setHotels, setViewHotels, setSelectedHotel }) => {
  const toast = useToast();
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
      setHotels((prev) => {
        const updateHotels = prev.map(({ _id: idHotel, enabled, ...rest }) => {
          if (_id === idHotel) {
            enabled = !enabled;
          }
          debugger;
          return {
            ...rest,
            enabled,
            _id: idHotel,
          };
        });
        return updateHotels;
      });
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

  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{hotel.name}</Heading>
          <Text>{hotel.description}</Text>
          <Text color="blue.600" fontSize="md">
            Location: {hotel.location}
          </Text>
          <Text color="blue.600" fontSize="md">
            Rooms: {hotel.rooms.length}
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
          <HStack>
            <Text>Enabled:</Text>
            <Switch
              size="lg"
              isChecked={hotel.enabled}
              onChange={handleEnabledHotel}
            />
          </HStack>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              setSelectedHotel(hotel);
              setViewHotels((prev) => !prev);
            }}
          >
            Set information
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default CardHotel;
