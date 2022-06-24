import { Search } from "@mui/icons-material";
import React from "react";
import { InputAdornment, TextField } from "@mui/material";
// import { withStyles } from "@mui/styles";

// const useStyles = withStyles(() => ({
//   inputField: {
//     "& .MuiOutlinedInput-adornedEnd": {
//       borderRadius: "16px",
//       height: "44px",
//       // width: "565px",
//     },
//     "& .MuiOutlinedInput-input": {
//       padding: "13.5px 27px",
//     },
//   },
// }));

function GlobalFilter({ filter, setFilter }) {
  // const classes = useStyles();

  return (
    <div style={{ width: "100%" }}>
      <TextField
        fullWidth
        type="text"
        placeholder="Search"
        variant="outlined"
        // className={classes.inputField}
        value={filter || ""}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" fontSize="small" />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}

export default GlobalFilter;
