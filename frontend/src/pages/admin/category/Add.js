import { FormControl, FormLabel, Input,Button, Box,useToast,Link,Flex } from '@chakra-ui/react';
import React from 'react'
import {useNavigate }from 'react-router-dom';
import Header from "../../../components/admin/Header";
import axios from 'axios';
import { CartState } from '../../../context/Context';
function Add() {
    
    const navigate=useNavigate();
    const {adminUser} =CartState();
    const toast=useToast();
    const [isLoading, setIsloading] = React.useState(false);
    const [data,setData]=React.useState({
        name:'',
        description:''
    });
    const handleSubmit=async()=>{
        const config={
            headers:{
                Authorization:`Bearer ${adminUser.token}`
            }
        }
        setIsloading(true);
        const response = await axios.post('/api/admin/category/add',data,config);
        setIsloading(false);
        toast({
            title: "Records added successfully",
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
                        <Link  m={2}>Add Category</Link> 
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

export default Add
