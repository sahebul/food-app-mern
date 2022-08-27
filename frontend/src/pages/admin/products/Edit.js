import { FormControl, FormLabel, Input,Button, Box,useToast, Flex ,Select,Link } from '@chakra-ui/react';
import React,{useEffect} from 'react'
import {useNavigate,useLocation }from 'react-router-dom';
import Header from "../../../components/admin/Header";
import axios from 'axios';
import { CartState } from '../../../context/Context';
function Edit() {
    
    const navigate=useNavigate();
    const {adminUser} =CartState();
    const toast=useToast();
    const {state}= useLocation();
    const [data,setData]=React.useState({
        id:state._id,
        name:state.name,
        sdescription:state.sdescription,
        description:state.description??'',
        soldas:state.soldas,
        price:state.price,
        prod_image:'',
        category:state.category._id
    });
    console.log("my data",data)
    const[categoryList,setCategoryList]=React.useState();
    useEffect(()=>{
        getCategories();
    },[])
    const getCategories=async()=>{
        const { data } = await axios.get("/api/admin/category");
        setCategoryList(data)
    }
    const onImageChange=(event)=>{
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setData({...data,prod_image:img})
          } 
    }
    const handleSubmit=async()=>{
        const config={
            headers:{
                Authorization:`Bearer ${adminUser.token}`
            }
        }
       
        const formData = new FormData();
       
        formData.append("id", data.id);
        formData.append("name", data.name);
        formData.append("sdescription", data.sdescription);
        formData.append("description", data.description);
        formData.append("soldas", data.soldas);
        formData.append("price", data.price);
        if(data.prod_image){
            formData.append("prod_image", data.prod_image);
        }
       
        formData.append("category", data.category);
      
        const response = await axios.put('/api/admin/product/edit',formData,config);
        // console.log(response.data);
        toast({
            title: "Product updated successfully",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
         navigate('/admin/products')
        
    }
    return (
        <div>
             <Header title="Add Product" />
             <Flex
                justifyContent="space-between" 
                flexDirection="row"
                p="20px"
                >
                    <Box>
                        <Link onClick={()=>navigate('/admin')} m={2}>Dashboard</Link>
                        /
                        <Link  onClick={()=>navigate('/admin/products')} m={2}>Products</Link> 
                    </Box>
                   
                    
                </Flex>
             <Box w={'85%'} m="auto"  border='1px' borderColor='gray.300' borderRadius="10" padding={10} mt={10}>
                    <Flex >
                        <FormControl m={2}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                type='text'
                                value={data.name}
                                onChange={(e)=>setData({...data,name:e.target.value})}
                            />
                           
                        </FormControl>
                        <FormControl m={2} >
                            <FormLabel>Price</FormLabel>
                            <Input
                                type='text'
                                value={data.price}
                                onChange={(e)=>setData({...data,price:e.target.value})}
                            />
                           
                        </FormControl>
                    </Flex>
                    <Flex >
                        <FormControl m={2}>
                            <FormLabel>Sold As</FormLabel>
                            <Select placeholder='Select option' onChange={(e)=>setData({...data,soldas:e.target.value})}>
                            <option selected={data.soldas == "Unit"} value='Unit'>Unit</option>
                            <option selected={data.soldas == "Pices"} value='Pices'>Pices</option>
                            <option selected={data.soldas == "Kg"} value='Kg'>Kg</option>
                            </Select>
                           
                        </FormControl>
                        <FormControl m={2} >
                            <FormLabel>Category</FormLabel>
                                <Select placeholder='Select option' onChange={(e)=>setData({...data,category:e.target.value})}>
                                    {categoryList && categoryList.map((item,index)=>{
                                        return(
                                            <option selected={data.category === item._id}  key ={index} value={item._id}>{item.name}</option>
                                        )
                                    })}
                                </Select>
                           
                        </FormControl>
                    </Flex>
                    <Flex >
                        <FormControl m={2}>
                            <FormLabel>Short Description</FormLabel>
                            <Input
                                type='text'
                                value={data.sdescription}
                                onChange={(e)=>setData({...data,sdescription:e.target.value})}
                            />
                           
                        </FormControl>
                        <FormControl m={2} >
                            <FormLabel>Image</FormLabel>
                            <Input
                                type='file'
                                // value={data.name}
                                onChange={onImageChange}
                            />
                           
                        </FormControl>
                    </Flex>
                    <Flex >
                        <FormControl m={2}>
                            <FormLabel>Description</FormLabel>
                            <Input
                                type='text'
                                value={data.description}
                                onChange={(e)=>setData({...data,description:e.target.value})}
                            />
                           
                        </FormControl>
                    </Flex>
                    
                        <Button
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

export default Edit
