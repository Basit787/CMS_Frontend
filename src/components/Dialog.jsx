import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";

export default function DialogBox(props) {
  const handleClose = (event, action) => {
    if (action === "backdropClick") {
      props.closeTrue(false);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
}
