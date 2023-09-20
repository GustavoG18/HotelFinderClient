/** @jsxImportSource @emotion/react */

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  IconButton,
  Switch,
  Text,
  VStack,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import theme from "../../../../../theme";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import DialogCreateRoom from "../DialogCreateRoom/DialogCreateRoom";

const RoomAccordionItem = ({ roomId, roomCreated }) => {
  const { colorMode } = useColorMode();
  const [room, setRoom] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const getRoom = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/hotel/room/getRoom",
          {
            params: {
              idRoom: roomId,
            },
          }
        );
        console.log(data);
        setRoom(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (typeof roomCreated === "object") {
      setRoom(roomCreated);
    } else {
      getRoom();
    }
  }, []);

  const handleEnabledRoom = async (e) => {
    try {
      const { _id, enabled } = room;
      console.log("Look", _id, room);
      const { data } = await axios.put(
        "http://localhost:3000/hotel/room/enabledRoom",
        { idRoom: _id, enabled: !enabled }
      );
      setRoom(data);
      toast({
        title: "Successfull enabled room",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error enabled room",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpdateRoom = async (values) => {
    try {
      const { data } = await axios.put(
        "http://localhost:3000/hotel/room/updateRoom",
        values
      );
      setRoom(data);
      toast({
        title: "Successfull update room",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error update room",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <AccordionItem key={room}>
      <DialogCreateRoom
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        roomInformation={room}
        handleUpdateRoom={handleUpdateRoom}
      />
      <h2>
        <AccordionButton
          _expanded={{
            bg: theme.colors[colorMode].primary,
            color: theme.colors[colorMode].primaryColorButton,
          }}
        >
          <Box as="span" flex="1" textAlign="left">
            Room {room.type_of_room}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {
          <VStack spacing={4} align="stretch">
            <Text>{room.description}</Text>
            <Text>Number of persons: {room.number_of_persons}</Text>
            <Text>Based price: {room.based_price}</Text>
            <Text>Tax: {room.tax}</Text>
            <Text>Total price: {room.based_price + room.tax}</Text>
            <HStack>
              <HStack>
                <Text>Enable:</Text>
                <Switch
                  size="md"
                  isChecked={room.enabled}
                  onChange={handleEnabledRoom}
                />
              </HStack>
              <IconButton
                onClick={onOpen}
                aria-label="Edit room"
                ml="auto"
                icon={<EditIcon />}
                size="md"
              />
            </HStack>
          </VStack>
        }
      </AccordionPanel>
    </AccordionItem>
  );
};

export default RoomAccordionItem;
