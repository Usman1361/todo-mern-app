import React from "react";
import { Backdrop } from "@mui/material";
import { SyncLoader } from "react-spinners";
function Loading({ loading }) {
  return (
    <>
      <Backdrop
        sx={{ backgroundColor: "black", zIndex: 220000000 }}
        open={loading}
      >
        <SyncLoader color="#36d7b7" />
      </Backdrop>
    </>
  );
}

export default Loading;
