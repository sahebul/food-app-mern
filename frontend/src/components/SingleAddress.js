import { Box, Text,} from "@chakra-ui/react";
import React from "react";
export default function SingleAddress({item,clickHandler,selectedItem}) {

  return (
    <Box>
      <Box
        boxShadow="lg"
        rounded="md"
        bg={selectedItem === item ? "blackAlpha.300":"white"}
        borderRadius="10px"
        w={[250, 350, 350]}
        p="10px"
        cursor="pointer"
        onClick={()=>clickHandler(item)}
      >
        <Text align="left" maxWidth="250px" fontWeight="semibold">
            {item.name}
        </Text>
        <Text align="left" fontSize={12} maxWidth="250px" >
            {item.phone}
        </Text>
        <Text align="left" fontSize={12} maxWidth="250px" >
            {item.address1}
        </Text>
        <Text align="left" fontSize={12} maxWidth="250px" >
            {item.city} - {item.pin}
          </Text>
      </Box>
      
      
    </Box>
  );
}
