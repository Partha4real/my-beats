import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({});

export default function CustomDialog({ open, setOpen, maxWidth = "sm", deleteFunction }) {
    const classes = useStyles();
    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        deleteFunction();
        setOpen(false);
    };

    return (
        <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={handleClose}>
            <DialogTitle>DELETE ITEM</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to delete?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="text" size="small" color="warning" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="outlined" size="small" color="warning" onClick={handleConfirm}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
