import React,{useState,useEffect} from 'react'
import Item from '../components/Item'
import axios from 'axios'
import { Box, Button, Flex, SimpleGrid,Skeleton,Text } from '@chakra-ui/react'

import Header from '../components/Header'
export default function Home() {
    const [productlist,setProducts]=useState([])
    const [loading,setLoading]=useState([])
    const [serachTerm,setSerachTerm]=useState('')
    useEffect(()=>{
            getProducts()
    },[])
    const getProducts=async()=>{
        setLoading(true)
        try{
            const { data}= await axios.get('/api/admin/product')
                setProducts(data);
                setLoading(false)
        }catch(error){
            setLoading(false)
            console.log(error.message)
        }
        
    }
    const searchHandler=async(term)=>{
        
        if(!term){
            return false;
        }
        setSerachTerm(term)
        setLoading(true)
        try{
            const { data}= await axios.get('/api/admin/product?search='+term)
                setProducts(data);
                setLoading(false)
        }catch(error){
            console.log(error.message)
            setLoading(false)
        }
    }
    return (
        <div>
                <Header searchHandler={searchHandler}/>
                {
                    serachTerm && (<Flex pl={10}>
                        <Text pr={2} fontSize={12}>Result for</Text>
                        <Text fontSize={12} fontWeight="semibold">"{serachTerm}"</Text>
                        <Button size="xs" ml={5} onClick={()=>{
                            setSerachTerm('')
                            getProducts()
                            }}>Clear</Button>
                    </Flex>)
                }
                <Skeleton isLoaded={!loading}>

              
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
                </Skeleton>
        </div>
    )
}
