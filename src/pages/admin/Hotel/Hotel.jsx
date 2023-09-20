/** @jsxImportSource @emotion/react */

import { AddIcon } from "@chakra-ui/icons";
import { Box, Heading, IconButton, VStack } from "@chakra-ui/react";
import * as styles from "./Hotel.styled.js";

const Hotel = () => {
  return (
    <Box w="100%" h="100%">
      <VStack spacing={5} align="stretch" w="100%" h="100%">
        <Heading>Yours hotels</Heading>
        <IconButton
          css={styles.addButtonStyle}
          aria-label="add hotels"
          icon={<AddIcon />}
          size="lg"
        />
      </VStack>
    </Box>
  );
};

export default Hotel;
