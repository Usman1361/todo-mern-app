import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import TodoPortion from "../components/TodoPortion/TodoPortion";
import { Box } from "@mui/material";
import Loading from "../components/SmallComponents/Loading";

const Todo = () => {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);
  return (
    <>
      <Loading loading={loader} />
      <Box>
        <NavBar />
        <TodoPortion />
      </Box>
    </>
  );
};

export default Todo;
