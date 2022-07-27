import { Box,Flex,Heading,Text,Image ,Icon,Button} from "@chakra-ui/react"
import SingleAddress from "./SingleAddress"
import {FaRupeeSign} from 'react-icons/fa'  
function Product({prod}){
    const img =
    prod.image
      ? "images/" + prod.image
      : "images/default_food.jpg";
    return(
        <Flex justifyContent='space-between' fontSize={12} pl={5} pr={10}>
            <Flex pb="2">
                <Image
                 w="30px"
                 h="30px"
                 objectFit="cover"
                 src={img}
                 alt="product"
                 borderRadius="3px"
                 />
                 <Box pl={2}>
                    <Text align="left">{prod.name}</Text>
                    <Text align="left" fontSize={10}>Qty: {prod.qty}</Text>
                 </Box>
                  
            </Flex>
           
            <Flex> 
                <Icon  w={4} h={4} pt={1} as={FaRupeeSign} />
            <Text fontWeight="bold">{prod.price}</Text>
            </Flex>
            
        </Flex>
    )
}
function SingleOrderItem({item}) {
    
    const clickHandler=()=>{

    }
    
    return (
        <div>
            <Box>
                <Box
                    boxShadow="lg"
                    rounded="md"
                    bg={"white"}
                    borderRadius="10px"
                    w={["90%", "95%", '95%']}
                    p="10px"
                    cursor="pointer"
                    
                >
                    <Flex justifyContent="space-between">
                            <Text align="left" maxWidth="250px" fontWeight="semibold">
                                Order # {item.orderid}
                            </Text>
                                <Button variant="solid" colorScheme={ item.status === "delivered" ? "green":'yellow'}>{item.status}</Button>
                    </Flex>
                    <Text align="left" maxWidth="250px" fontWeight="semibold">
                                Total : {item.total}
                            </Text>
                    <Flex flexDirection={{base:"column",md:'row'}} >
                        <Box w={{base:"100%",md:"70%"}} >
                             <Heading as="h5" align="left"  size="sm" pb={5}>Items</Heading>
                             {
                                 (item.products && item.products.length > 0 ) && item.products.map((prod,index)=>{
                                     return(
                                        <Product key={index} prod={prod}/>
                                     )
                                 })
                             }
                        </Box>
                        <Box w={{base:"100%",md:"30%"}}>
                            <Heading as="h5" align="left"  size="xs">Delivery Address</Heading>
                            <Box>
                                <Text align="left" maxWidth="250px" fontWeight="semibold">
                                    {item.d_add.name}
                                </Text>
                                <Text align="left" fontSize={12} maxWidth="250px" >
                                    {item.d_add.phone}
                                </Text>
                                <Text align="left" fontSize={12} maxWidth="250px" >
                                    {item.d_add.address1}
                                </Text>
                                <Text align="left" fontSize={12} maxWidth="250px" >
                                    {item.d_add.city} - {item.d_add.pin}
                                </Text>
                            </Box>
                        </Box>
                    </Flex>
                  
                   
                </Box>
                
                
                </Box>
        </div>
    )
}

export default SingleOrderItem
