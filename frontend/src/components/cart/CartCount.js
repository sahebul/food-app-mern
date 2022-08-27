import { CartState } from '../../context/Context';
import {MdShoppingCart} from 'react-icons/md'
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import { Menu,MenuButton,Icon } from '@chakra-ui/react';
import {useNavigate } from 'react-router-dom'
function CartCount({colorScheme}) {
    const navigate = useNavigate();
    const {state:{cart}} =CartState()
    return (
        <Menu>
        <MenuButton onClick={()=>navigate('/cart')}>
            
                <NotificationBadge count={cart.length} effect={Effect.SCALE} style={{backgroundColor:'green'}}/>
                <Icon  w={8} h={8} as={MdShoppingCart} color={colorScheme ==="dark" ? "white":"blackAlpha.800"} />
          
            
        </MenuButton>
        </Menu>
    )
}

export default CartCount
