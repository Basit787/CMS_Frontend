import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useDialogBoxStore, { ActionType } from "../stores/DialogBoxStore";

export default function CMDialogBox() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { dialogData, closeDialog } = useDialogBoxStore((state) => state);

  const handlePositive = () => {
    if (dialogData.response) {
      dialogData.response(ActionType.positive);
    }
    closeDialog();
  };

  const handleNegative = () => {
    if (dialogData.response) {
      dialogData.response(ActionType.negative);
    }
    closeDialog();
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={dialogData?.open}
        onClose={handleNegative}
      >
        <DialogTitle className="bg-red-600 text-white">
          {dialogData?.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="mt-2">
            {dialogData?.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleNegative}
            variant="contained"
            color="error"
          >
            Disagree
          </Button>
          <Button
            autoFocus
            onClick={handlePositive}
            variant="contained"
            color="primary"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
