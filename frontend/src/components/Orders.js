
import { useState,useEffect} from "react"
import { Box,Text,Skeleton,SimpleGrid
 } from "@chakra-ui/react"
 import axios from "axios";
import { CartState } from "../context/Context"
import SingleOrderItem from "../components/SingleOrderItem";

function Orders() {
  
    const {user}= CartState();
    const [loading, setLoading] = useState(false)
    const [myorders, setMyorders] = useState([])
    console.log("usssss"+JSON.stringify(user))
    useEffect(()=>{
      
        getMyOrders();
       
          
    },[user.token])

    const getMyOrders=async()=>{
        console.log("api calling")
        setLoading(true)
        try{
            const config={
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }
            const {data} = await axios.get('/api/order/myorders',config)
            console.log(JSON.stringify(data))
            setMyorders(data);
            setLoading(false)
        }catch(error){
            setLoading(false)
            console.log(error)
        }
    }

    return (
      
             <Box flexDirection='row'> 
                    <Skeleton isLoaded={!loading} >
                        <SimpleGrid columns={[1, null, 1]} py={6} ml={10} spacing={10}>
                            {
                            ( myorders && myorders.length > 0 ) ? (myorders.map((item,key)=>{
                                    return(
                                        <SingleOrderItem key={key} item={item}/>
                                    )
                                }) ):(
                                    <Text>No Orders Found</Text>
                                )
                            }
                        </SimpleGrid>
                    </Skeleton>
                    </Box> 
    
    )
}

export default Orders
