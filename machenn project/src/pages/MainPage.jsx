import React from "react";
import {
  Box,
  Text,
  Button,
  Center,
} from "@chakra-ui/react";
import UserTable from "../components/UserTable";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  let userData = JSON.parse(localStorage.getItem("userInfo"));
  let Role = userData.user.role;
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "right", margin: "30px" }}>
        <Button onClick={logOut} colorScheme="yellow">
          LogOut
        </Button>
      </Box>
      <Box>
        <Center>
          {Role === "user" ? (
            <Text>You are not an admin. Only admin can manage user data</Text>
          ) : (
            <Box w="80%">
              <UserTable />
            </Box>
          )}
        </Center>
      </Box>
    </>
  );
};

export default MainPage;
