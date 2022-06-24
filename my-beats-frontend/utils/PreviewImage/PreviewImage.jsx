import { InputLabel, Typography } from "@mui/material";
import React from "react";

export default function PreviewImage({ src }) {
  return (
    <React.Fragment>
      <InputLabel className="label">Preview Image</InputLabel>
      <div
        style={{
          width: "100%",
          height: 300,
          display: "flex",
          justifyContent: "center",
          placeItems: "center",
          background:
            "linear-gradient(45deg, rgb(254,119,120, 0.3) 30%, rgb(255,142,82, 0.3) 90% )",
          border: "1px solid black",
          borderRadius: 7,
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {src ? (
          <img
            src={src}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Typography variant="button" fontSize="20px" fontWeight="bold">
            No Image Selected
          </Typography>
        )}
      </div>
    </React.Fragment>
  );
}
