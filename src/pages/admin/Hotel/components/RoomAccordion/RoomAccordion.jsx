/** @jsxImportSource @emotion/react */

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import RoomAccordionItem from "../RoomAccordionItem/RoomAccordionItem";

const RoomAccordion = ({ hotel }) => {
  return (
    <Accordion allowToggle w="500px">
      {hotel?.rooms?.map((room) => {
        return (
          <RoomAccordionItem key={room} roomId={room} roomCreated={room} />
        );
      })}
    </Accordion>
  );
};

export default RoomAccordion;
