import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSnackBarClose } from "../reducers/SnacbarSlice";

export default function CMSnackBar() {
  const snackbar = useSelector((state) => state.Snackbar);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSnackBarClose());
  };

  return (
    <Snackbar
      open={snackbar?.open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar?.type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbar?.message}
      </Alert>
    </Snackbar>
  );
}
