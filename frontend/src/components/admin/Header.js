import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import { CartState } from "../../context/Context";
import ProfileMenu from "../admin/ProfileMenu";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo";

function Header({ title }) {
  const { adminUser } = CartState();
  const navigate = useNavigate();
  return (
    <Box p="20px" backgroundColor="#272f3d">
      <Flex justifyContent="space-between">
        <Box cursor="pointer" onClick={() => navigate("/admin")}>
          <Logo colorScheme={"dark"} />
        </Box>
        <Box>
          <Flex>{adminUser && <ProfileMenu colorScheme={"dark"} />}</Flex>
        </Box>
      </Flex>
      <Box>
        <Heading as="h5" size="sm" color="white">
          {title}
        </Heading>
      </Box>
    </Box>
  );
}

export default Header;
