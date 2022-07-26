import React,{useState,useEffect} from 'react'
import Item from './Item'
import axios from 'axios'
import { Box, SimpleGrid } from '@chakra-ui/react'
export default function Products() {

    const [productlist,setProducts]=useState([])
    useEffect(()=>{
            getProducts()
    },[])
    const getProducts=async()=>{
        try{
            const { data}= await axios.get('/api/admin/product')
                setProducts(data);
        }catch(error){
            console.log(error.message)
        }
        
    }
    
    return (
        <Box flexDirection='row'> 
          <SimpleGrid columns={[1, null, 3]} py={6} ml={10} spacing={10}>
            {
                productlist && productlist.map((item,key)=>{
                    return(
                        <Item key={key} product={item}/>
                    )
                })
            }
            </SimpleGrid>
        </Box> 

    )
}
