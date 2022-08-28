import { useState, useEffect } from "react";
import Header from "../../../components/admin/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Image,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableContainer,
  Tfoot,
  Button,
  Box,
  Link,
  Flex
} from "@chakra-ui/react";
import { CartState } from "../../../context/Context";
function Orders() {
  const [orderList, setOrderList] = useState();
  const navigate = useNavigate();

  const {adminUser}=CartState()
  useEffect(() => {
    getOrders();
  }, []);
  const getOrders = async () => {
      const config={
          headers:{
              Authorization: `Bearer ${adminUser.token}`
          }
      }
    const { data } = await axios.get("/api/admin/orders",config);

    setOrderList(data);
  };
  return (
    <div>
      <Header title="Orders" />
        <Flex
        justifyContent="space-between" 
        flexDirection="row"
        p="20px"
        >
            <Box>
                <Link onClick={()=>navigate('/admin')} m={2}>Dashboard</Link>
                /
                <Link m={2}>Orders</Link> 
            </Box>
            
            
        </Flex>
      <TableContainer p="20px">
        <Table variant="striped" colorScheme="teal" size="sm">
          <TableCaption>Order List</TableCaption>
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>User</Th>
              <Th>Items</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orderList &&
              orderList.map((item, index) => {
              
                return (
                  <Tr key={index}>
                    <Td>
                        {item.orderid && item.orderid}
                    </Td>
                    <Td>{item.user && item.user.name}</Td>
                    <Td>{item.products && item.products.length}</Td>
                    <Td>{item.total && item.total}</Td>
                    <Td>{item.status}</Td>
                   
                    <Td>
                      {" "}
                      <Button
                        colorScheme="blue"
                        onClick={() => navigate("/admin/orders/details",{state:item})}
                      >
                        View 
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Order ID</Th>
              <Th>User</Th>
              <Th>Items</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Orders;
