import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";

interface Props {
  dialogOpen: boolean;
  handleCloseDialog: any;
  handleConfirm: any;
}

function GoBackWarning(props: Props) {
  return (
    <Dialog open={props.dialogOpen} onClose={props.handleCloseDialog}>
      <DialogTitle>Your data is not saved</DialogTitle>
      <DialogContent>Are you sure you want to go back?</DialogContent>
      <DialogActions>
        <Button onClick={props.handleCloseDialog} color="primary">
          Yes
        </Button>
        <Button onClick={props.handleConfirm} color="secondary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GoBackWarning;
