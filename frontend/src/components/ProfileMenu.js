import { Menu, MenuButton,Avatar, MenuList, MenuItem ,Text, Flex,Button}  from '@chakra-ui/react';
import {  ChevronDownIcon } from "@chakra-ui/icons";
import {useNavigate} from 'react-router-dom';
const ProfileMenu = ({colorScheme}) => {

    const navigate=useNavigate();
    const logoutHandler=()=>{
        localStorage.removeItem('userdata');
        navigate('/login');
    }
    return (
        <div>
            <Menu>
                <MenuButton as={Button}   variant="none" rightIcon={<ChevronDownIcon color={colorScheme ==="dark" ? "white":"blackAlpha.800"}  />}>
                <Avatar bg={colorScheme ==="dark" ? "whiteAlpha.300":"blackAlpha.800"}  w={8} h={8}   cursor="pointer"/>
                
                </MenuButton>
                <MenuList>
                    <MenuItem>My Profile</MenuItem>
                    <MenuItem onClick={()=>navigate('/my-orders')}>My Orders</MenuItem>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
            </Menu>
            
        </div>
    )
}

export default ProfileMenu
