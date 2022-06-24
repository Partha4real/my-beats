import React from "react";
import { FormLabel, Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  label: {
    fontFamily: "'Lato', sans-serif",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: "28px",
    textTransform: "capitalize",
    marginBottom: 7,
    color: "rgba(49, 49, 49, 1)",
  },
  textField: {
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
    "& fieldset": {
      border: "none",
    },
  },
}));

export default function Inputfield({
  type = "text",
  label,
  name,
  placeholder,
  variant = "outlined",
  required,
  half,
  hasErrors,
  formState,
  handleChange,
  multiLine,
  rows,
  disabled,
}) {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={half ? 6 : 12}>
      {label && (
        <FormLabel required={required} className="label">
          {label}
        </FormLabel>
      )}
      <TextField
        type={type}
        name={name}
        size="small"
        // label={label}
        disabled={disabled}
        placeholder={placeholder}
        variant={variant}
        required={required}
        onChange={handleChange}
        fullWidth
        error={hasErrors && hasErrors(name)}
        helperText={
          hasErrors && (hasErrors(name) ? formState?.errors[name][0] : null)
        }
        value={formState?.values[name]}
        multiline={multiLine}
        rows={rows}
        className={classes.textField}
      />
    </Grid>
  );
}

export function TimeField({
  name,
  label,
  variant = "outlined",
  required,
  inputProps,
  half,
  hasErrors,
  formState,
  handleChange,
  shrinkLabel,
  disabled,
}) {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={half ? 6 : 12}>
      {label && (
        <FormLabel required={required} className="label">
          {label}
        </FormLabel>
      )}
      <TextField
        type="date"
        name={name}
        size="small"
        // label={label}
        disabled={disabled}
        variant={variant}
        required={required}
        onChange={handleChange}
        fullWidth
        error={hasErrors && hasErrors(name)}
        helperText={
          hasErrors && (hasErrors(name) ? formState?.errors[name][0] : null)
        }
        inputProps={inputProps}
        InputLabelProps={{
          shrink: shrinkLabel,
        }}
        value={formState?.values[name]}
        className={classes.textField}
      />
    </Grid>
  );
}

export function PasswordField({
  name,
  label,
  variant = "outlined",
  required,
  half,
  hasErrors,
  formState,
  handleChange,
  disabled,
}) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  return (
    <Grid item xs={12} md={half ? 6 : 12}>
      {label && (
        <FormLabel required={required} className="label">
          {label}
        </FormLabel>
      )}
      <TextField
        type={showPassword ? "text" : "password"}
        name={name}
        size="small"
        // label={label}
        disabled={disabled}
        variant={variant}
        required={required}
        onChange={handleChange}
        fullWidth
        error={hasErrors && hasErrors(name)}
        helperText={
          hasErrors && (hasErrors(name) ? formState?.errors[name][0] : null)
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleShowPassword}>
                {showPassword ? (
                  <Visibility fontSize="small" style={{ color: "black" }} />
                ) : (
                  <VisibilityOff fontSize="small" style={{ color: "black" }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        value={formState?.values[name]}
        className={classes.textField}
      />
    </Grid>
  );
}
