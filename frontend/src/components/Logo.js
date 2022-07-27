import { Heading,Icon,Flex } from '@chakra-ui/react'
import {MdFastfood} from 'react-icons/md'
function Logo({colorScheme}) {
    return (
        
            <Flex>
                       <Icon as={MdFastfood} boxSize={9} color={colorScheme =="dark" ? 'white':'black'}/>
                       <Heading color={colorScheme =="dark" ? 'white':'black'}>Foodie</Heading>
                    </Flex>
        
    )
}

export default Logo
