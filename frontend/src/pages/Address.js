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
import { CartState } from "../context/Context"
import SingleAddress from "../components/SingleAddress";
function Address({clickHandler,item_count=2,setInitial}) {

    const {user}= CartState();
    const [delAddress, setDelAddress] = useState(null)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast=useToast();
    //for address 
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [pin, setPin] = useState('');
    const [city, setCity] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
   
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
            setInitial(data[0])
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
    
    const MyclickHandler=(item)=>{
        setSelectedAddress(item)
        clickHandler(item)
       
    }

    return (
        <div>
            <Box  p={5} m={3} >
                                <Button   size="xs"
                                        leftIcon={<AddIcon/>}
                                        onClick={()=> onOpen()}>Add New Address</Button>
                        
            </Box>
            <Flex flexDirection={{base:"column",md:'row'}}>
                <Box  >
                    {/* for address ad */}
                    <Box flexDirection='row'> 
                    <Skeleton isLoaded={!loading} >
                        <SimpleGrid columns={[1, null, item_count]} py={6} ml={10} spacing={10}>
                            {
                            ( delAddress && delAddress.length ) ? (delAddress.map((item,key)=>{
                                    return(
                                        <SingleAddress key={key} item={item} clickHandler={MyclickHandler} selectedItem={selectedAddress}/>
                                    )
                                }) ):(
                                    <Text>No Address Found</Text>
                                )
                            }
                        </SimpleGrid>
                    </Skeleton>
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
