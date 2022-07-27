import { Box, Button, Flex, Heading, Input,MenuButton,Menu ,Icon } from '@chakra-ui/react'
import React from 'react'
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import { CartState } from '../context/Context';
import {MdShoppingCart,MdFastfood} from 'react-icons/md'
import {useNavigate } from 'react-router-dom'
import ProfileMenu from './ProfileMenu';
import Logo from './Logo';
export default function Header() {
    const navigate = useNavigate();
    const {state:{cart},user} =CartState()
  
    return (
        <Box  p="20px"  >
            
            <Flex justifyContent="space-between">
                <Box cursor="pointer" onClick={()=>navigate('/')}>
                    <Logo/>
                   
                </Box>
                <Box display={{base:'none',md:'flex'}}>
                        <Input w="600px" placeholder="Type here.... "/>
                </Box>
              
                <Box>
                    <Flex>
                        <Menu>
                    <MenuButton onClick={()=>navigate('cart')}>
                        
                            <NotificationBadge count={cart.length} effect={Effect.SCALE} style={{backgroundColor:'green'}}/>
                            <Icon  w={8} h={8} as={MdShoppingCart} />
                      
                        
                    </MenuButton>
                    </Menu>
                    {
                        user ? (
                            <ProfileMenu/>
                        ):(<>
                            <Button backgroundColor="transparent" fontWeight="light" onClick={()=>navigate('/login')}>Log in</Button>
                            <Button backgroundColor="transparent" fontWeight="light" onClick={()=>navigate('/signup')}>Sign up</Button>
                            </>)
                    }
               
                    </Flex>
                    
                </Box>
            </Flex>
            <Box display={{base:'flex',md:'none'}}>
                        <Input w="100%" placeholder="Type here.... "/>
            </Box>
           
        </Box>
    )
}
