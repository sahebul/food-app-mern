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
import SingleAddress from "../components/SingleAddress";
function Address() {

    const navigate=useNavigate();
    const {state:{cart},user,dispatch}= CartState();
    const [delAddress, setDelAddress] = useState(null)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast=useToast();
    const [total, setTotal] = useState(0)
    //for address 
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [pin, setPin] = useState('');
    const [city, setCity] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    useEffect(()=>{
        setTotal(cart.reduce((acc,current)=>acc+Number(current.price)*current.qty,0))
                
        },[cart])
    useEffect(()=>{
        if(user)
        getDeliveryAddress();
    },[user.token])

    const clearForm=()=>{
        setName('')
        setPhone('')
        setPin('')
        setCity('')
        setAddress1('')
        setAddress2('')
    }
    const getDeliveryAddress=async()=>{
        setLoading(true)
        try{
            const config={
                    headers:{
                        Authorization:`Bearer ${user.token}` 
                    }
            }
            // console.log(config);
            const {data} = await axios.get('/api/user/address',config);
           if(data){
            setSelectedAddress(data[0])
           }
            setDelAddress(data);
            setLoading(false)
        }catch(error){
            setLoading(false)
            console.log(error)
        }
    }

    const addAddress=async()=>{
        if(!name || !phone || !address1 || !pin || !city){
            toast({
                title:"Error",
                variant:'top-accent',
                position: 'top',
                description:"All fields are required",
                status:'error',
                duration:9000,
                isClosable:true
            })
            return;
        }
        setLoading(true)
        try{
            const config={
                headers:{
                    Authorization : `Bearer ${user.token}`
                }
            }
            const {data} = await axios.post('/api/user/add-address',{name,phone,address1,address2,pin,city},config)
           
            setLoading(false)
            clearForm();
            getDeliveryAddress()
            onClose()
            toast({
                title: "Address added successfully",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })

              
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

    return (
        <div>
            <Subheader title={"Delivery Address"}/>
           
            <Box  p={5} m={3} >
                                <Button   size="xs"
                                        leftIcon={<AddIcon/>}
                                        onClick={()=> onOpen()}>Add New</Button>
                        
            </Box>
            <Flex flexDirection={{base:"column",md:'row'}}>
                <Box w={{base:"100%",md:"70%"}}  >
                    {/* for address ad */}
                    <Box flexDirection='row'> 
                    <Skeleton isLoaded={!loading} >
                        <SimpleGrid columns={[1, null, 2]} py={6} ml={10} spacing={10}>
                            {
                            ( delAddress && delAddress.length ) ? (delAddress.map((item,key)=>{
                                    return(
                                        <SingleAddress key={key} item={item} clickHandler={clickHandler} selectedItem={selectedAddress}/>
                                    )
                                }) ):(
                                    <Text>No Address Found</Text>
                                )
                            }
                        </SimpleGrid>
                    </Skeleton>
                    </Box> 
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



           
           
            

             {/* modal */}

             <Modal
               
               isOpen={isOpen}
               onClose={onClose}
           >
               <ModalOverlay />
               <ModalContent>
               <ModalHeader>Add Address</ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={6}>
                   <FormControl>
                   <Input  placeholder='Full Name' onChange={(e)=>setName(e.target.value)} />
                   </FormControl>

                   <FormControl mt={4}>
                   <Input placeholder='Mobile Number'  onChange={(e)=>setPhone(e.target.value)}  />
                   </FormControl>
                   <Flex>
                       <FormControl mt={4} mr={2}>
                       <Input placeholder='Pincode'  onChange={(e)=>setPin(e.target.value)}  />
                       </FormControl>
                       <FormControl mt={4}>
                       <Input placeholder='City'   onChange={(e)=>setCity(e.target.value)} />
                       </FormControl>
                   </Flex>
                   <FormControl mt={4}>
                   <Input placeholder='Address 1'  onChange={(e)=>setAddress1(e.target.value)} />
                   </FormControl>
                   <FormControl mt={4}>
                   <Input placeholder='Address 2'  onChange={(e)=>setAddress2(e.target.value)}  />
                   </FormControl>
                  
               </ModalBody>

               <ModalFooter>
                   <Button isLoading={loading} colorScheme='blue' mr={3} onClick={()=>addAddress()}>
                   Save
                   </Button>
                   <Button onClick={onClose}>Cancel</Button>
               </ModalFooter>
               </ModalContent>
           </Modal>
        </div>
    )
}

export default Address
