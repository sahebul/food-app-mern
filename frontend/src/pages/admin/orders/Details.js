import { useState } from "react";
import Header from "../../../components/admin/Header";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import {
    
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableContainer,
  Button,
  Box,
  Link,
  Flex,
  Heading ,
  Text,
  HStack, Menu, MenuList, MenuItem,MenuButton,useToast
} from "@chakra-ui/react";
import {ChevronDownIcon} from '@chakra-ui/icons';
import { CartState } from "../../../context/Context";
function Orders() {
  
  const navigate = useNavigate();
  const {adminUser} = CartState()
  const toast=useToast()
const {state}=useLocation();
const [deliveryStatus,setStatus]=useState(state.status);
    const handleMenuCLick=async(status)=>{
        if(status){
            try{
                const config={
                    headers:{
                        Authorization:`Bearer ${adminUser.token}`
                    }
                }
                const input={
                    id:state._id,
                    status:status
                }
                const {data}= await axios.put('/api/admin/orders/updatestatus',input,config)
                setStatus(data.status);
                toast({
                    title: "Status updated successfully",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
            }catch(error){
                console.log(error.message)
            }
        }
        console.log(status);
    }
  return (
    <div>
      <Header title="Order Details" />
        <Flex
        justifyContent="space-between" 
        flexDirection="row"
        p="20px"
        >
            <Box>
                <Link onClick={()=>navigate('/admin')} m={2}>Dashboard</Link>
                /
                <Link onClick={()=>navigate('/admin/orders')} m={2}>Orders</Link> 
                /
                <Link m={2}>Details</Link> 
            </Box>

            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Status
                </MenuButton>
                <MenuList>
                    {
                        deliveryStatus === "Cancelled" || deliveryStatus === "Delivered" ? (
                            <>
                            <MenuItem >{deliveryStatus}</MenuItem>
                            
                            </>
                        ):(
                            <>
                            <MenuItem onClick={()=>handleMenuCLick("Shipped")}>Shipped</MenuItem>
                            <MenuItem onClick={()=>handleMenuCLick("Delivered")}>Delivered</MenuItem>
                            <MenuItem onClick={()=>handleMenuCLick("Cancelled")}>Cancelled</MenuItem>
                            </>
                        )
                    }
                    
                </MenuList>
        </Menu>
            
            
        </Flex>
      <Box p={10}>
         <Flex justifyContent="space-between">
            <HStack>
            <Text fontWeight="bold">Order ID : </Text>
            <span> {state.orderid} </span>
            </HStack>

            <HStack>
            <Text fontWeight="bold">Order Status : </Text>
            <span>{deliveryStatus} </span>
            </HStack>
          </Flex>
          <HStack>
            <Text fontWeight="bold">Total : </Text>
            <span>{state.total} </span>
          </HStack>
          <HStack>
            <Text fontWeight="bold">Order By : </Text>
            <span>{state.user && state.user.name} </span>
          </HStack>
          <Heading  as='h5' size='sm' display="flex" alignSelf="flex-start">
          Delivery Address 
            </Heading>
            <Box display="flex" alignItems="flex-start" flexDir="column">
                 {state.d_add && state.d_add.name}
                 <div >{state.d_add && state.d_add.phone}</div>
                 <div >{state.d_add && state.d_add.address1}</div>
                 <div >{state.d_add && state.d_add.address2}</div>
                <div >{state.d_add && state.d_add.city}-{state.d_add.pin}</div>
               
            </Box>
            
      </Box>
      <Heading  as='h5' size='sm' display="flex" alignSelf="flex-start" pl={10}>
      Product List
     </Heading>
     
      <TableContainer p="20px">
        <Table variant="striped" colorScheme="teal" size="sm">
          <TableCaption>Product List</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Qty</Th>
              <Th>Sold As</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {state &&
              state.products.map((item, index) => {
              
                return (
                  <Tr key={index}>
                    <Td>
                        {item.name && item.name}
                    </Td>
                    <Td>{item.qty && item.qty}</Td>
                    <Td>{item.soldas && item.soldas}</Td>
                    <Td>{item.price && item.price}</Td>
                   
                  </Tr>
                );
              })}
          </Tbody>
         
        </Table>
      </TableContainer>
    </div>
  );
}

export default Orders;
