import React from "react";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

export default function TableAction({ handleEdit, handleDelete }) {
    return (
        <div style={{ display: "flex" }}>
            <Tooltip title="Update">
                <IconButton size="small" onClick={handleEdit}>
                    <Edit fontSize="small" color="primary" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton size="small" onClick={handleDelete}>
                    <Delete fontSize="small" color="error" />
                </IconButton>
            </Tooltip>
        </div>
    );
}
