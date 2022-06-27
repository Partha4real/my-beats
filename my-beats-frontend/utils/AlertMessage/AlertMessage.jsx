import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDispatch } from "react-redux";

let ALERT_DURATION = 3000;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertMessage({ isOpen = false, alertType = "success", message = "" }) {
    const [open, setOpen] = React.useState(isOpen);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isOpen) {
            setOpen(true);
            let unsetAlert = setTimeout(() => {
                dispatch({
                    type: "UNSET_ALERT",
                });
            }, ALERT_DURATION);
        }
        () => {
            return () => {
                clearTimeout(unsetAlert);
            };
        };
    }, [isOpen]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <React.Fragment>
            {open && message ? (
                <Snackbar
                    open={open}
                    autoHideDuration={ALERT_DURATION}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={alertType} sx={{ width: "100%" }}>
                        {message}
                    </Alert>
                </Snackbar>
            ) : null}
        </React.Fragment>
    );
}
