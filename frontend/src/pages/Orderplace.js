import {useNavigate,useLocation} from 'react-router-dom'
 import Subheader from "../components/Subheader"
 import Lottie from 'react-lottie';
import * as animationData from '../animation/success.json'
import { Box,Button,Heading ,Text} from '@chakra-ui/react';
function Orderplace() {
    const navigate=useNavigate();
    const location = useLocation();
    console.log(JSON.stringify(location.state.orderid));
    const defaultOptions = {
        loop: false,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    return (
        <div>
            <Subheader title={"Order Status"}/>
            <Box justifyContent="center" alignContent="center">
                            
            <Lottie options={defaultOptions}
                  style={{marginTop:10}}
              width={200}
              />
              <Text fontWeight="semibold">Order Placed Successfully</Text>
                 <Text fontWeight="bold">Order Number : {location.state.orderid }</Text>

                <Button onClick={()=>navigate('/')} size="sm" variant='link' colorScheme="blue" >Continue Shope</Button>
                 
            </Box>
        </div>
    )
}

export default Orderplace
