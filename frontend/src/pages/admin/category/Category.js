import { useState, useEffect } from "react";
import Header from "../../../components/admin/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
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
  Flex,
  Link,
  Box,
  Skeleton ,SkeletonText
} from "@chakra-ui/react";
function Category() {
  const [categoryList, setCategoryList] = useState();
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    setIsloading(true)
    const { data } = await axios.get("/api/admin/category");
    setIsloading(false);
    setCategoryList(data);
  };
  return (
    <div>
      <Header title="Category" />
      <Flex
                justifyContent="space-between" 
                flexDirection="row"
                p="20px"
                >
                    <Box>
                        <Link onClick={()=>navigate('/admin')} m={2}>Dashboard</Link>
                        /
                        <Link  m={2}>Category</Link> 
                    </Box>
                    <Button onClick={()=>navigate('/admin/category/add')}> Add Category</Button>
                   
                    
       </Flex>
       <SkeletonText mt='4' noOfLines={10} spacing='4'  isLoaded={!isLoading} >
   
      
      <TableContainer p="20px"> 
        <Table variant="striped" colorScheme="teal" size="sm">
          <TableCaption>Category List</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Info</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categoryList &&
              categoryList.map((item, index) => {
                return (
                  <Tr key={index}>
                    <Td>{item.name}</Td>
                    <Td>{item.description}</Td>
                    <Td>
                      {" "}
                      <Button
                        colorScheme="blue"
                        onClick={() => navigate("/admin/category/edit",{state:item})}
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
              <Th>Name</Th>
              <Th>Info</Th>
              <Th>Action</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      </SkeletonText>
    </div>
  );
}

export default Category;
