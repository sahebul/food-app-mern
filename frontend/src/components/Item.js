import { Box, Flex, Image, Text, Badge, Button } from "@chakra-ui/react";
import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { CartState } from "../context/Context";
export default function Item(props) {

 const { state:{cart},dispatch } =CartState();

  const img =
    props.product && props.product.image
      ? "images/" + props.product.image
      : "images/default_food.jpg";
  return (
    <Box>
      <Box
        boxShadow="lg"
        rounded="md"
        bg="white"
        borderRadius="10px"
        w={[250, 350, 350]}
        p="10px"
      >
        <Image
          // boxSize='300px'
          w="350px"
          h="300px"
          objectFit="cover"
          src={img}
          alt="Dan Abramov"
          borderRadius="10px"
        />
        <Flex justifyContent="space-between" pt="5px">
          <Text align="left" maxWidth="250px" fontWeight="bold">
            {props.product && props.product.name}
          </Text>

          <Box>
            <Badge variant="solid" colorScheme="green">
              3.5 *
            </Badge>
          </Box>
        </Flex>

        <Flex justifyContent="space-between">
          <Text noOfLines={1} maxWidth="150px" align="left" fontSize="12px">
            {props.product && props.product.sdescription}
          </Text>
          <Text fontSize="12px">
            ₹ {props.product && props.product.price} for one
          </Text>
        </Flex>
      </Box>
        {
            cart.some(p=>p._id === props.product._id ) ? (
        <Button leftIcon={<AddIcon w={2} h={2} />} size="sm" mt="-25px" colorScheme="red"
        
        onClick={()=>{
            dispatch({type:'REMOVE_FROM_CART',payload:props.product})
        }}
        >
        Remove
       </Button>
            ):(
                <Button leftIcon={<AddIcon w={2} h={2} />} size="sm" mt="-25px"
                onClick={()=>{
                    dispatch({type:'ADD_TO_CART',payload:props.product})
                }}
                >
                Add
               </Button>
            )
        }
      
    </Box>
  );
}
