import { Box, Button, Container } from "@mui/material";
import React from "react";
import { logo } from "../SmallComponents/image";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const Navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    Navigate("/login");
  };
  return (
    <Box sx={{ backgroundColor: "#121212" }}>
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Box component="img" src={logo} height={40} width={60} alt="logo" />
          </Box>

          <Button variant="text" color="warning" onClick={handleLogOut}>
            Logout
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NavBar;
