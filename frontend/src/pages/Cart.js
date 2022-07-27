import { useState,useEffect} from "react"
import { Box, Button, Flex, Heading ,Text
 } from "@chakra-ui/react"
import Cartitem from "../components/cart/Cartitem";
import Subheader from "../components/Subheader"
import { CartState } from "../context/Context"
import {useNavigate} from 'react-router-dom'

function Cart() {
    const navigate=useNavigate();
    const {state:{cart},user}= CartState();
    const [total, setTotal] = useState(0)

    useEffect(()=>{
            setTotal(cart.reduce((acc,current)=>acc+Number(current.price)*current.qty,0))
            
    },[cart])
   
    const placeOrder=()=>{
        //console.log("place the order"+JSON.stringify(user))
        navigate('/delivery-address')
    }
    return (
        <div>
            <Subheader title={"My Cart"}/>
           
            <Flex flexDirection={{base:"column",md:'row'}}>
                <Box w={{base:"100%",md:"70%"}}  >
                    {/* for cart items */}
                    {
                        cart && cart.map((item,index)=>{
                            return(
                                <Cartitem item={item} key={index}/>
                            )
                        })
                    }
                </Box>
                <Box w={{base:"100%",md:"30%"}}  >
                    {/* for cart summary */}
                
                    <Box borderRadius={5} borderColor="cyan.300" borderWidth={1} p={5} m={3} >
                         <Heading as="h5" size="sm" mb={10}>Cart Summary</Heading>
                         <Text fontSize={14} align="left" fontWeight="semibold">Total ({ cart.length}) items</Text>
                         <Flex>
                                <Text fontSize={14} fontWeight="bold">Total :</Text>
                                <Text fontSize={14} pl={5} fontWeight="bold">₹{total}</Text>
                         </Flex>
                         <Button  colorScheme="blue" w="100%" mt={10} onClick={()=> user ?   placeOrder() : navigate('/login')}>Continue</Button>
                       
                    </Box>
                    
                </Box>
            </Flex>
        </div>
    )
}

export default Cart
