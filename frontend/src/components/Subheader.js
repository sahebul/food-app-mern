import { Box, Flex, Heading,Button } from "@chakra-ui/react"
import { CartState } from '../context/Context';
import ProfileMenu from "./ProfileMenu";
import {useNavigate} from 'react-router-dom';
function Subheader() {
    const {user} =CartState()
    const navigate=useNavigate();
    return (
        <Box p='20px' backgroundColor="blackAlpha.100">
            <Flex justifyContent='space-between'>
                <Box cursor="pointer" onClick={()=>navigate('/')}>
                    <Heading>Foodie</Heading>
                </Box>
                {
                     user ? (
                        <ProfileMenu/>
                    ):(
                        <Flex>
                            <Button backgroundColor="transparent" fontWeight="light" onClick={()=>navigate('/login')}>Log in</Button>
                            <Button backgroundColor="transparent" fontWeight="light" onClick={()=>navigate('/signup')}>Sign up</Button>
                        </Flex>
                    )
                }
                

            </Flex>
        </Box>
    )
}

export default Subheader
