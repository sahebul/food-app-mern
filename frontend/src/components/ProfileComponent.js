import { Box,Text } from "@chakra-ui/react"
import { CartState } from "../context/Context"

function ProfileComponent() {
    const {user} =CartState();
    return (
        <Box align="left" padding={10}>
            <Text>Name : {user.name}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Phone: {user.phone}</Text>
        </Box>
    )
}

export default ProfileComponent
