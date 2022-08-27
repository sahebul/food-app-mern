import { Box, Flex, Heading,Button } from "@chakra-ui/react"
import { CartState } from '../context/Context';
import ProfileMenu from "./ProfileMenu";
import {useNavigate} from 'react-router-dom';
import Logo from "./Logo";
import CartCount from "./cart/CartCount";
function Subheader({title}) {
    const {user} =CartState()
    const navigate=useNavigate();
    return (
        <Box p='20px' backgroundColor="#272f3d">
            <Flex justifyContent='space-between'>
                <Box cursor="pointer" onClick={()=>navigate('/')}>
                   <Logo colorScheme={"dark"}/>
                </Box>
                <Box>
                    <Flex>
                    <CartCount colorScheme={"dark"}/>
                    {
                        user ? (
                            <ProfileMenu colorScheme={"dark"}/>
                        ):(<>
                            <Button backgroundColor="transparent" fontWeight="light" onClick={()=>navigate('/login')}>Log in</Button>
                            <Button backgroundColor="transparent" fontWeight="light" onClick={()=>navigate('/signup')}>Sign up</Button>
                            </>)
                    }
               
                    </Flex>
                    
                </Box>

                {/* {
                     user ? (
                        <ProfileMenu colorScheme={"dark"}/>
                    ):(
                        <Flex>
                            <Button backgroundColor="transparent" colorScheme="whiteAlpha" fontWeight="light" onClick={()=>navigate('/login')}>Log in</Button>
                            <Button backgroundColor="transparent" colorScheme="whiteAlpha" fontWeight="light" onClick={()=>navigate('/signup')}>Sign up</Button>
                        </Flex>
                    )
                } */}
                

            </Flex>
            <Box  h="100px">   
                <Heading as='h5' size='sm' color="white" >{title}</Heading>
            </Box>
        </Box>
    )
}

export default Subheader
