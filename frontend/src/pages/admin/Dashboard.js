import { SimpleGrid,Box,Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/admin/Header';
function Dashboard() {
    const navigate= useNavigate();
    return (
        <div>
            <Header title="Dashboard"/>
            <Box color={"white"}  p={10}>
                    <SimpleGrid columns={2} spacing={5} >
                    <Box onClick={()=>navigate('/admin/category')} cursor="pointer" bg='#03fc7f' height='80px' display="flex" justifyContent="center" alignItems="center" borderRadius={5}>
                        <Text>Category</Text>
                    </Box>
                    <Box onClick={()=>navigate('/admin/products')}  cursor="pointer" bg='#18c2d9' height='80px' display="flex" justifyContent="center" alignItems="center" borderRadius={5} >
                        <Text >Products</Text>
                    </Box>
                    <Box onClick={()=>navigate('/admin/orders')}  cursor="pointer" bg='#335e63' height='80px' display="flex" justifyContent="center" alignItems="center" borderRadius={5}>
                        <Text>Orders</Text>
                    </Box>

                    
                    </SimpleGrid>
            </Box>
           
        </div>
    )
}

export default Dashboard
