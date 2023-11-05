import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();

  let userData = JSON.parse(localStorage.getItem("userInfo"));
  let Role = userData.user.role;
  let authToken = userData.token;

  const fetchUsers = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };

    let usersData = axios
      .get("http://localhost:8080/admin/users", { headers })
      .then((response) => {
        let res = response.data;
        setUsers(res);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleUpdate = (item) => {
    navigate(`/home/${item._id}`);
  };

  const handleDelete = (item) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };

    let usersData = axios
      .delete(`http://localhost:8080/admin/users/${item._id}`, { headers })
      .then((response) => {
        let res = response.data;
        onClose();
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setDeleteUserId(null);
  };

  const handleDeleteUser = (userdata) => {
    setDeleteUserId(userdata);
    onOpen();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>DOB</Th>
              <Th>Role</Th>
              <Th>Update</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((item, idx) => {
              return (
                <>
                  {item.role != "admin" && (
                    <Tr>
                      <Td>{idx + 1}</Td>
                      <Td>{item.username}</Td>
                      <Td>{item.email}</Td>
                      <Td>{item.dob ? item.dob : "-"}</Td>
                      <Td>{item.role}</Td>
                      <Td>
                        <Button
                          onClick={() => handleUpdate(item)}
                          colorScheme="blue"
                        >
                          Update
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          colorScheme="red"
                          onClick={() => handleDeleteUser(item)}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  )}
                </>
              );
            })}
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    {`Delete ${deleteUserId?.username}`}
                  </AlertDialogHeader>
                  <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(deleteUserId)}
                    >
                      OK
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserTable;
