import { Menu, MenuButton,Avatar, MenuList, MenuItem ,Text, Flex} from "@chakra-ui/react";
import {  ChevronDownIcon } from "@chakra-ui/icons";
import {useNavigate} from 'react-router-dom';
const ProfileMenu = () => {

    const navigate=useNavigate();
    const logoutHandler=()=>{
        localStorage.removeItem('userdata');
        navigate('/login');
    }
    return (
        <div>
            <Menu>
                <MenuButton 
                as="button"
                righticon={<ChevronDownIcon/>}
                >
                    <Flex>
                        
                         <Avatar bg='teal.500' w={8} h={8}   cursor="pointer" mr={2} ml={2}/>
                         {/* <Text fontWeight="semibold" >{user.name}</Text> */}
                    </Flex>
                
                </MenuButton>
                <MenuList>
                    <MenuItem>My Profile</MenuItem>
                    <MenuItem>My Orders</MenuItem>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
            </Menu>
            
        </div>
    )
}

export default ProfileMenu
