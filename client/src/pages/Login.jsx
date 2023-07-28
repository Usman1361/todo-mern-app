import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { url } from "../utils";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const Navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [successopen, setSuccessOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const [loginData, SetLoginData] = useState({
    email: "",
    password: "",
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      return alert("Please enter all fields");
    } else if (!validateEmail(loginData.email)) {
      setErrorMessage("Invalid Email");
      setOpen(true);
      return;
    } else {
      try {
        const { data } = await axios.post(`${url}/sign-in`, loginData);
        // console.log(data.data.userId);
        localStorage.setItem("user", data?.data?.token);
        localStorage.setItem("userId", data?.data?.userId);
        setSuccessOpen(true);
        setTimeout(() => {
          Navigate("/");
        }, 3000);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
          setOpen(true);
          console.log(error.response.data.message);
        } else {
          console.log("An error occurred while processing your request.");
        }
      }
    }
  };
  return (
    <Box pt={3} pb={3}>
      <Container maxWidth="xl">
        <Grid container>
          <Grid
            mt={4}
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box component="form" mt={3}>
              <Typography mb={3} component="h5">
                Login page
              </Typography>
              <Typography mt={1} variant="body2" mb={1}>
                Enter your Email
              </Typography>
              <TextField
                size="small"
                label="Email"
                variant="outlined"
                color="warning"
                value={loginData.email}
                onChange={(e) =>
                  SetLoginData({ ...loginData, email: e.target.value })
                }
                sx={{
                  display: "block",
                  marginTop: "5px",
                }}
              />
              <Typography mt={1} mb={1} variant="body2">
                Enter your Password
              </Typography>
              <TextField
                size="small"
                label="Password"
                variant="outlined"
                color="warning"
                value={loginData.password}
                onChange={(e) =>
                  SetLoginData({ ...loginData, password: e.target.value })
                }
                sx={{
                  display: "block",
                  marginTop: "5px",
                }}
              />
              <Button
                color="warning"
                type="submit"
                sx={{ marginTop: "20px" }}
                size="small"
                variant="contained"
                onClick={handleChange}
              >
                Login
              </Button>
              <Button
                color="success"
                sx={{ marginTop: "20px", marginLeft: "12px" }}
                size="small"
                variant="contained"
                onClick={() => Navigate("/signup")}
              >
                New User
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <Snackbar
        open={successopen}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
      >
        <Alert severity="success">Login Successful</Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
