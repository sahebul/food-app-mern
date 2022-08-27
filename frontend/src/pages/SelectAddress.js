import { useState,useEffect} from "react"
import { Box, Button, Flex, Heading ,Text,Skeleton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    Input,
    useToast,
    SimpleGrid
 } from "@chakra-ui/react"
 import {AddIcon} from '@chakra-ui/icons'
 import axios from "axios";
 import {useNavigate} from 'react-router-dom'
 import Subheader from "../components/Subheader"
import { CartState } from "../context/Context"
import Address from "../pages/Address";
function SelectAddress() {

    const navigate=useNavigate();
    const {state:{cart},user,dispatch}= CartState();
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [loading, setLoading] = useState(false)
    const toast=useToast();
    const [total, setTotal] = useState(0)
    
    useEffect(()=>{
        setTotal(cart.reduce((acc,current)=>acc+Number(current.price)*current.qty,0))
                
        },[cart])


    const placeOrder=async()=>{

        if(cart.length < 1){
            toast({
                title:"Error",
                variant:'top-accent',
                position: 'top',
                description:"There is no items on your cart",
                status:'error',
                duration:9000,
                isClosable:true
            })
            return false
        }
        if(!selectedAddress){
            toast({
                title:"Error",
                variant:'top-accent',
                position: 'top',
                description:"Please select a delivery address",
                status:'error',
                duration:9000,
                isClosable:true
            })
            return false
        }
        const param={
            user:user._id,
            products:JSON.stringify(cart),
            d_add:selectedAddress._id,
            total:total
        }
       // console.log(JSON.stringify(param));
        // return;
        setLoading(true)
        try{
            const config={
                headers:{
                    Authorization : `Bearer ${user.token}`
                }
            }
            const {data} = await axios.post('/api/order/placeorder',param,config)
           
            setLoading(false)
          
            toast({
                title: "Order placed successfully",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })

              dispatch({
                  type:'EMPTY_CART',
                  payload:[]
              })

              if(data)
              navigate('/order-placed',{state:{orderid:data.orderid}})
              
        }catch(error){
            setLoading(false)
            toast({
                title:"Error",
                variant:'top-accent',
                position: 'top',
                description:error.response.data.message ? error.response.data.message : error.message,
                status:'error',
                duration:9000,
                isClosable:true
            })  
        }
    }
    const clickHandler=(item)=>{
        setSelectedAddress(item)
       
    }
    const setInitial=(item)=>{
        setSelectedAddress(item)
    }

    return (
        <div>
            <Subheader title={"Delivery Address"}/>
           
           
            <Flex flexDirection={{base:"column",md:'row'}}>
                <Box w={{base:"100%",md:"70%"}}  >
                    {/* for address ad */}
                    <Address clickHandler={clickHandler} setInitial={setInitial}/>
                </Box>
                <Box w={{base:"100%",md:"30%"}}  >
                    {/* for summary */}
                
                    <Box borderRadius={5} borderColor="cyan.300" borderWidth={1} p={5} m={3} >
                         <Heading as="h5" size="sm" mb={10}>Order Summary</Heading>
                         <Text fontSize={14} align="left" fontWeight="semibold">Total ({ cart.length}) items</Text>
                         <Flex>
                                <Text fontSize={14} fontWeight="bold">Total :</Text>
                                <Text fontSize={14} pl={5} fontWeight="bold">₹{total}</Text>
                         </Flex>
                         <Text fontSize={14} align="left" fontWeight="semibold">Cash on delivery</Text>
                         {
                             selectedAddress ? (
                                <Box> 
                                    <Text fontSize={14} align="left" colorScheme="red">Delivery Address</Text>
                                     <Text fontSize={12} align="left">{selectedAddress.name}</Text>
                                     <Text fontSize={12} align="left">{selectedAddress.phone}</Text>
                                     <Text fontSize={12} align="left">{selectedAddress.address1}</Text>
                             <Text fontSize={12} align="left">{selectedAddress.city}-{selectedAddress.pin}</Text>
                                </Box>
                             ):(
                                <Text fontSize={14} align="left" colorScheme="red">Please a Delivery Address</Text>
                             )
                         }
                       
                         <Button isLoading={loading}  colorScheme="blue" w="100%" mt={10} onClick={()=> user ?   placeOrder() : navigate('/login')}>Place Order</Button>
                       
                    </Box>
                    
                </Box>
            </Flex>



           
           
            

            
        </div>
    )
}

export default SelectAddress
