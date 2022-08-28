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
  Flex,
  SkeletonText
} from "@chakra-ui/react";
function Products() {
  const [productList, setProductList] = useState();
  const [isLoading, setIsloading] = useState(false);  
  const navigate = useNavigate();
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    setIsloading(true)
    const { data } = await axios.get("/api/admin/product");
    setIsloading(false)
    setProductList(data);
  };
  return (
    <div>
      <Header title="Products" />
        <Flex
        justifyContent="space-between" 
        flexDirection="row"
        p="20px"
        >
            <Box>
                <Link onClick={()=>navigate('/admin')} m={2}>Dashboard</Link>
                /
                <Link m={2}>Products</Link> 
            </Box>
            <Button onClick={()=>navigate('/admin/products/add')}> Add Product</Button>
            
        </Flex>
      <SkeletonText mt='4' noOfLines={10} spacing='4'  isLoaded={!isLoading} >
      <TableContainer p="20px">
        <Table variant="striped" colorScheme="teal" size="sm">
          <TableCaption>Product List</TableCaption>
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Unit</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {productList &&
              productList.map((item, index) => {
                const img =
                 item.image
                  ? "../images/" + item.image
                  : "../images/default_food.jpg";
                return (
                  <Tr key={index}>
                    <Td><Image
                        // boxSize='300px'
                        w="50px"
                        h="50px"
                        objectFit="cover"
                        src={img}
                        alt="Dan Abramov"
                        borderRadius="10px"
                        />
                    </Td>
                    <Td>{item.name}</Td>
                    <Td>{item.category && item.category.name}</Td>
                    <Td>{item.price}</Td>
                    <Td>{item.soldas}</Td>
                    <Td>
                      {" "}
                      <Button
                        colorScheme="blue"
                        onClick={() => navigate("/admin/products/edit",{state:item})}
                      >
                        Edit
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Unit</Th>
              <Th>Action</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      </SkeletonText>
    </div>
  );
}

export default Products;
