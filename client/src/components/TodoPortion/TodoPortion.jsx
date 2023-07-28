import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Container,
  TextField,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { url } from "../../utils";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

const TodoPortion = () => {
  const [todoDataCheck, setTodoDataCheck] = useState([]);
  const [reload, setReload] = useState(false);
  const [updateopt, setUpdateOpt] = useState(false);
  const [idupdate, setIdUpdate] = useState("");
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [todo, setToDo] = useState({
    title: "",
    description: "",
    time: "",
  });
  useEffect(() => {
    setReload(false);
    fetchData();
  }, [reload]);
  const updateData = async (_id, _title, _description, _time) => {
    console.log("Update item of id: ", _id);

    setUpdateOpt(true);
    setToDo({ title: _title, description: _description, time: _time });
    setIdUpdate(_id);
  };
  const updateDataDb = async () => {
    let user = localStorage.getItem("user");
    try {
      let response = await axios.put(`${url}/todo/${idupdate}`, todo, {
        headers: {
          Authorization: `${user}`,
        },
      });
      console.log(response);
      setReload(true);
      setSuccess(true);
    } catch (err) {
      console.log("error", err);
      setFail(true);
    }
  };
  const deleteData = async (id) => {
    // console.log("Delete item of id: ", id);
    try {
      const user = localStorage.getItem("user");
      let todoData = await axios.delete(`${url}/todo/${id}`, {
        headers: {
          Authorization: `${user}`,
        },
      });
      setTodoDataCheck(todoData.data.data);
      setReload(true);
      setSuccess(true);
    } catch (err) {
      console.warn("Failed to get user", err);
      setFail(true);
    }
  };
  const fetchData = async () => {
    try {
      const user = localStorage.getItem("user");
      const userId = localStorage.getItem("userId");
      let todoData = await axios.get(`${url}/todo/${userId}`, {
        headers: {
          Authorization: `${user}`,
        },
      });
      setTodoDataCheck(todoData.data.data);
    } catch (err) {
      //   setFail(true);
      console.warn("Failed to get user", err);
    }
  };
  const handleTodo = async () => {
    if (!todo.title || !todo.description) {
      alert("Please fill all fields");
    } else {
      try {
        const response = await axios.post(`${url}/todo`, todo, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("user")}`,
          },
        });
        setReload(true);
        console.log(response);
        setSuccess(true);
      } catch (err) {
        setFail(true);
        console.error("Error:", err);
      }
    }
  };
  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setFail(false);
  };
  return (
    <Box>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} mt={10}>
            <Typography
              component="h4"
              variant="h4"
              sx={{ textAlign: "center" }}
            >
              Add Todo
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} mt={5}>
            <Typography>Enter your Todo Title</Typography>
            <TextField
              sx={{ marginTop: "14px" }}
              color="warning"
              fullWidth
              label="Todo Title"
              value={todo.title}
              onChange={(e) => setToDo({ ...todo, title: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} md={6} mt={5}>
            <Box ml={{ xs: 0, md: 2 }}>
              <Typography>Enter your Todo Description</Typography>
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                color="warning"
                multiline
                sx={{ marginTop: "14px", width: "100%" }}
                maxRows={4}
                value={todo.description}
                onChange={(e) =>
                  setToDo({ ...todo, description: e.target.value })
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} mt={5}>
            <Box>
              <Typography>Enter Time</Typography>
              <TextField
                color="warning"
                sx={{ marginTop: "14px" }}
                fullWidth
                type="time"
                value={todo.time}
                onChange={(e) => setToDo({ ...todo, time: e.target.value })}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={12} mt={5}>
            <Box>
              <Button
                variant="contained"
                color="warning"
                onClick={updateopt ? updateDataDb : handleTodo}
              >
                {updateopt ? "Update Todo" : "Add Todo"}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} mt={12}>
            <Typography
              component="h4"
              variant="h4"
              sx={{ textAlign: "center" }}
            >
              Display Todo
            </Typography>
          </Grid>
          <Grid
            item
            container
            mt={5}
            sx={{
              display: "flex",

              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Time</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todoDataCheck?.map(({ title, description, time, _id }) => (
                    <TableRow
                      key={_id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {title}
                      </TableCell>
                      <TableCell align="right">{description}</TableCell>
                      <TableCell align="right">{time}</TableCell>
                      <TableCell align="right">
                        {" "}
                        <Button
                          size="small"
                          variant="contained"
                          sx={{
                            margin: "12px",
                            backgroundColor: "green",
                            "&:hover": {
                              backgroundColor: "green",
                              boxShadow: "none",
                            },
                          }}
                          onClick={(e) =>
                            updateData(_id, title, description, time)
                          }
                        >
                          Update
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            margin: "12px",
                            backgroundColor: "red",
                            "&:hover": {
                              backgroundColor: "red",
                              boxShadow: "none",
                            },
                          }}
                          onClick={(e) => deleteData(_id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      {/* <TableCell align="right"> </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Snackbar
          open={success}
          autoHideDuration={4000}
          onClose={handleCloseSuccess}
        >
          <Alert severity="success">Operation Successful</Alert>
        </Snackbar>
        <Snackbar open={fail} autoHideDuration={4000} onClose={handleClose}>
          <Alert severity="error">Operation Failed</Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default TodoPortion;
