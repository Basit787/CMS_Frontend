import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useSnackBarStore from "../stores/SnacbarStore";

export default function CMSnackBar() {
  const { snacbarData, closeSnackbar } = useSnackBarStore((state) => state);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeSnackbar();
  };

  return (
    <Snackbar
      open={snacbarData?.open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snacbarData?.type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snacbarData?.message}
      </Alert>
    </Snackbar>
  );
}
