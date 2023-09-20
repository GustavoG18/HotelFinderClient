/** @jsxImportSource @emotion/react */

import { SimpleGrid, Skeleton } from "@chakra-ui/react";

const SkeletonHotels = () => {
  return (
    <SimpleGrid columns={3} spacingX="40px" spacingY="20px" mt={12}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => {
        return <Skeleton key={`index-${number}`} w="320px" h="120px" />;
      })}
    </SimpleGrid>
  );
};

export default SkeletonHotels;
