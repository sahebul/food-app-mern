import { FormControl, FormLabel, Input,Button, Box,useToast,Link,Flex } from '@chakra-ui/react';
import React from 'react'
import {useNavigate,useLocation }from 'react-router-dom';
import Header from "../../../components/admin/Header";
import axios from 'axios';
import { CartState } from '../../../context/Context';
function EditCategory() {
    
    const navigate=useNavigate();
    const {state}= useLocation();
    const {adminUser} =CartState();
    const toast=useToast();
    const [isLoading, setIsloading] = React.useState(false);
    const [data,setData]=React.useState({
        id:state._id,
        name:state.name,
        description:state.description
    });
    const handleSubmit=async()=>{
        setIsloading(true);
        const config={
            headers:{
                Authorization:`Bearer ${adminUser.token}`
            }
        }
      
        const response = await axios.put('/api/admin/category/edit',data,config);
        setIsloading(false);
        toast({
            title: "Records updated successfully",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          navigate('/admin/category')
        
    }
    return (
        <div>
             <Header title="Edit category" />
             <Flex
                justifyContent="space-between" 
                flexDirection="row"
                p="20px"
                >
                    <Box>
                        <Link onClick={()=>navigate('/admin')} m={2}>Dashboard</Link>
                        /
                        <Link  onClick={()=>navigate('/admin/category')} m={2}>Category</Link> 
                        /
                        <Link   m={2}>Edit Category</Link> 
                    </Box>
                   
                    
       </Flex>
             <Box w={'35%'} m="auto"  border='1px' borderColor='gray.300' borderRadius="10" padding={10} mt={10}>
                    <FormControl >
                            <FormLabel>Name</FormLabel>
                            <Input
                                type='text'
                                value={data.name}
                                onChange={(e)=>setData({...data,name:e.target.value})}
                            />
                            <FormLabel>Description</FormLabel>
                            <Input
                                type='text'
                                value={data.description}
                                onChange={(e)=>setData({...data,description:e.target.value})}
                            />
                        </FormControl>
                        <Button
                        isLoading={isLoading}
                            onClick={()=>handleSubmit()}
                                mt={4}
                                colorScheme='teal'
                                // isLoading={props.isSubmitting}
                                type='submit'
                            >Save</Button>
             </Box>
               
        </div>
    )
}

export default EditCategory
