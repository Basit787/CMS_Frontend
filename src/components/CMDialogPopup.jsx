import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionType, setDialogClose } from "../reducers/DialogBoxSlice";

export default function CMDialogBox() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const dialog = useSelector((state) => state.DialogBox);
  const dispatch = useDispatch();

  const handleNegative = () => {
    if (dialog.response) {
      dialog.response(ActionType.negative);
    }
    dispatch(setDialogClose());
  };

  const handlePositive = () => {
    if (dialog.response) {
      dialog.response(ActionType.positive);
    }
    dispatch(setDialogClose());
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={dialog?.open}
        onClose={handleNegative}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{dialog?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialog?.message}</DialogContentText>
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
          <Button onClick={handlePositive} autoFocus variant="contained">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
