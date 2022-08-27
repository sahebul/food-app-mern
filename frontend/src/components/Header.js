import { Box, Button, Flex, Heading, Input,MenuButton,Menu ,Icon } from '@chakra-ui/react'
import React,{useState} from 'react'
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import { CartState } from '../context/Context';
import {MdShoppingCart} from 'react-icons/md'
import {useNavigate } from 'react-router-dom'
import ProfileMenu from './ProfileMenu';
import Logo from './Logo';
import CartCount from './cart/CartCount';
export default function Header({searchHandler}) {
    const navigate = useNavigate();
    const {state:{cart},user} =CartState()
  const [searh,setSearch]=useState('');
  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      if(searh){
        searchHandler(searh)
        setSearch('')
      }
    }
  };
    return (
        <Box  p="20px"  >
            
            <Flex justifyContent="space-between">
                <Box cursor="pointer" onClick={()=>navigate('/')}>
                    <Logo/>
                   
                </Box>
                <Box display={{base:'none',md:'flex'}}>
                        <Input w="600px" placeholder="Type here.... "
                        value={searh}
                        onChange={(e)=>setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        />
                </Box>
              
                <Box>
                    <Flex>
                    <CartCount/>
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
                        <Input w="100%" placeholder="Type here.... "
                         value={searh}
                         onChange={(e)=>setSearch(e.target.value)}
                         onKeyDown={handleKeyDown}/>
            </Box>
           
        </Box>
    )
}
