import { Button, FormHelperText, Grid, InputLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
    textfieldContainer: {
        position: "relative",
        borderRadius: "16px",
        minHeight: "auto",
        fontFamily: "'Lato', sans-serif",
        padding: "6px 13px",
        display: "flex",
        flexDirection: "column",
        // placeItems: "center",
        borderRadius: 10,
        border: ".5px solid #ff80b3",
        boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
        "&:hover": {
            border: "1px solid #ff0066",
            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        },
        "&.Mui-focused": {
            border: "1px solid #ff0066",
            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        },
    },
    textfield: {
        display: "flex",
        placeItems: "center",
    },
    fileText: {
        fontFamily: "'Lato', sans-serif",
        fontWeight: "normal",
        fontSize: 15,
        lineHeight: "28px",
        color: "#999594",
        marginLeft: 10,
    },
}));

export default function CustomFilefield({ half, label, required, name, handleFileChange, hasErrors, formState }) {
    const classes = useStyles();
    const uploadInputRef = React.useRef(null);

    return (
        <Grid item xs={12} md={half ? 6 : 12}>
            <InputLabel required={required} className="label">
                {label}
            </InputLabel>
            <div className={classes.textfieldContainer}>
                <div className={classes.textfield}>
                    <input
                        name={name}
                        ref={uploadInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        multiple={false}
                    />

                    <Button
                        size="small"
                        onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                        variant="contained"
                        style={{ background: "#fe7778", padding: "2px 10px" }}
                    >
                        Upload
                    </Button>

                    <span className={classes.fileText}>
                        {formState?.values[name] !== "" ? "1 Image Selected" : "No Image Selected"}
                    </span>
                </div>
                {hasErrors && hasErrors(name) ? (
                    <FormHelperText style={{ color: "red" }}>
                        {hasErrors && (hasErrors(name) ? formState?.errors[name][0] : null)}
                    </FormHelperText>
                ) : null}
            </div>
        </Grid>
    );
}
