import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { DeleteIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";
import { CartState } from "../../context/Context";
function Cartitem({ item }) {
  const { dispatch } = CartState();
  const img =
    item && item.image ? "images/" + item.image : "../images/default_food.jpg";
  return (
    <Box p="5px">
      <Flex justifyContent="space-between" p={5}>
        <Flex w={"60%"}>
          <Image boxSize="45" src={img} borderRadius="10px" />
          <Box pl="10px" justifyContent="center" alignSelf="center">
            <Text
              noOfLines={1}
              maxWidth="150px"
              align="left"
              fontSize="14px"
              fontWeight="semibold"
            >
              {item.name}
            </Text>
            <Text noOfLines={1} maxWidth="150px" align="left" fontSize="12px">
              {item.sdescription}
            </Text>
          </Box>
        </Flex>
        <Flex w={"30%"} justifyContent="center" alignItems="center">
          <MinusIcon
            w={2}
            h={2}
            cursor="pointer"
            onClick={() => {
              item.qty > 1 &&
                dispatch({
                  type: "UPDATE_QTY",
                  payload: { _id: item._id, qty: item.qty - 1 },
                });
            }}
          />
          <Box
            borderWidth="1px"
            borderColor="#ccc"
            borderRadius="2px"
            h={5}
            w={10}
            m={2}
          >
            <Text alignItems="center" fontSize={12}>
              {item.qty}
            </Text>
          </Box>
          <AddIcon
            w={2}
            h={2}
            cursor="pointer"
            onClick={() => {
              dispatch({
                type: "UPDATE_QTY",
                payload: { _id: item._id, qty: item.qty + 1 },
              });
            }}
          />
        </Flex>
        <Box
          w={"10%"}
          alignItems="center"
          pt={1}
          _hover={{ fontWeight: "semibold" }}
        >
          <DeleteIcon
            color="red.500"
            cursor="pointer"
            onClick={() => {
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: item,
              });
            }}
          />
        </Box>
      </Flex>
    </Box>
  );
}

export default Cartitem;
