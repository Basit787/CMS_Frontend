import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import * as React from "react";

export default function DialogBox(props) {
  const handleClose = (event, action) => {
    if (action === "backdropClick") {
      props.close(false);
    }
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogContent {...props}>{props.children}</DialogContent>
    </Dialog>
  );
}
