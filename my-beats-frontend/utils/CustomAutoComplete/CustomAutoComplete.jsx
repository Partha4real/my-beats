import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Grid, InputLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import countries from "../../config/countries.json";

const useStyles = makeStyles({
    root: {
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
        "& svg": {
            color: "black",
        },
        "& fieldset": {
            border: "none",
        },
    },
});

export function AutoCompleteMultiple({
    half,
    name,
    label,
    required,
    value,
    handleChange,
    placeholder,
    options = top100Films,
    hasErrors,
    formState,
}) {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={half ? 6 : 12}>
            <InputLabel required={required} className="label">
                {label}
            </InputLabel>
            <Autocomplete
                multiple={true}
                size="small"
                id="tags-outlined"
                options={options}
                getOptionLabel={(option) => option.title}
                value={value}
                onChange={handleChange}
                filterSelectedOptions={true}
                className={classes.root}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        name={name}
                        required={required}
                        placeholder={placeholder}
                        error={hasErrors && hasErrors(name)}
                        helperText={hasErrors && (hasErrors(name) ? formState?.errors[name][0] : null)}
                    />
                )}
            />
        </Grid>
    );
}

export function AutoCompleteSearch({
    half,
    name,
    label,
    required,
    value,
    handleChange,
    placeholder,
    options = countries,
    hasErrors,
    formState,
}) {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={half ? 6 : 12}>
            <InputLabel required={required} className="label">
                {label}
            </InputLabel>
            <Autocomplete
                // freeSolo
                size="small"
                id="free-solo-2-demo"
                value={value}
                options={options.map((option) => (option.title ? option.title : option.name))}
                onChange={handleChange}
                className={classes.root}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        name={name}
                        required={required}
                        placeholder={placeholder}
                        InputProps={{
                            ...params.InputProps,
                        }}
                        error={hasErrors && hasErrors(name)}
                        helperText={hasErrors && (hasErrors(name) ? formState?.errors[name][0] : null)}
                    />
                )}
            />
        </Grid>
    );
}

const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
];
