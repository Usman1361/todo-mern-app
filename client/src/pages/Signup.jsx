import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { url } from "../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const Navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [successopen, setSuccessOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const [signupData, SetSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleChange = async (e) => {
    e.preventDefault();
    if (!signupData.name || !signupData.email || !signupData.password) {
      return console.log("please fill form");
    } else if (!validateEmail(signupData.email)) {
      setErrorMessage("Invalid Email");
      setOpen(true);
      return;
    }
    try {
      const { data } = await axios.post(`${url}/sign-up`, signupData);
      console.log(data);
      setSuccessOpen(true);
      setTimeout(() => {
        Navigate("/login");
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
            <Paper
              elevation={4}
              sx={{
                width: "370px",
                height: "500px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box component="form" mt={3}>
                <Typography mb={3} component="h5">
                  Signup page
                </Typography>
                <Typography mt={1} variant="body2" mb={1}>
                  Enter User Name
                </Typography>
                <TextField
                  size="small"
                  label="User Name"
                  variant="outlined"
                  color="warning"
                  value={signupData?.name}
                  onChange={(e) =>
                    SetSignupData({
                      ...signupData,
                      name: e.target.value,
                    })
                  }
                  sx={{ display: "block" }}
                />
                <Typography mt={1} variant="body2" mb={1}>
                  Enter your Email
                </Typography>
                <TextField
                  size="small"
                  label="Email"
                  variant="outlined"
                  color="warning"
                  value={signupData.email}
                  onChange={(e) =>
                    SetSignupData({
                      ...signupData,
                      email: e.target.value,
                    })
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
                  value={signupData?.password}
                  onChange={(e) =>
                    SetSignupData({
                      ...signupData,
                      password: e.target.value,
                    })
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
                  SignUp
                </Button>
                <Button
                  color="success"
                  sx={{ marginTop: "20px", marginLeft: "12px" }}
                  size="small"
                  variant="contained"
                  onClick={() => Navigate("/login")}
                >
                  Login
                </Button>
              </Box>
            </Paper>
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
        <Alert severity="success">Signup Successful</Alert>
      </Snackbar>
    </Box>
  );
};

export default Signup;
