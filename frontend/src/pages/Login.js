import {useState} from 'react'
import { Box, Button, Heading, Input,useToast  } from "@chakra-ui/react"
import axios from 'axios'
import { CartState } from '../context/Context'
import {useNavigate} from 'react-router-dom'
function Login() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const toast= useToast();
    const {setUser} = CartState();
    const navigate=useNavigate()
    const attemptLogin=async()=>{
        if(!email || !password){
            toast({
                title:"Error",
                variant:'top-accent',
                position: 'top',
                description:"All fields are required",
                status:'error',
                duration:9000,
                isClosable:true
            })
            return;
        }
        setLoading(true)
        try{
            const {data} = await axios.post('/api/user/login',{email,password})
            setUser(data)
            localStorage.setItem('userdata',JSON.stringify(data))
           
            setLoading(false)
            toast({
                title: data ? "Welcome back "+data.name : 'Login Successfull',
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
              navigate('/')
        }catch(error){
            setLoading(false)
            toast({
                title:"Error",
                variant:'top-accent',
                position: 'top',
                description:error.response.data.message ? error.response.data.message : error.message,
                status:'error',
                duration:9000,
                isClosable:true
            })  
        }
        console.log("login")
    }
    return (
        <Box w={'35%'} m="auto"  border='1px' borderColor='gray.300' borderRadius="10" padding={10} mt={20} >
            <Heading as="h5" size="sm" pb={50}>Login</Heading>
                <Input placeholder="Email" mb={5}  onChange={(e)=>setEmail(e.target.value)} />
                <Input placeholder="Password" mb={10}  type="password" onChange={(e)=>setPassword(e.target.value)}/>
                <Button w={'100%'} colorScheme="linkedin" 
                onClick={attemptLogin}
                isLoading={loading}
                >Login</Button>
        </Box>
    )
}

export default Login
