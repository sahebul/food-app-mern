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
} from "@chakra-ui/react";
function Category() {
  const [categoryList, setCategoryList] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    const { data } = await axios.get("/api/admin/category");

    setCategoryList(data);
  };
  return (
    <div>
      <Header title="Category" />

      <TableContainer>
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
    </div>
  );
}

export default Category;
