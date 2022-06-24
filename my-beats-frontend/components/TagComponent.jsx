import React from "react";
import { useRouter } from "next/dist/client/router";
import AddButton from "../utils/AddButton/AddButton";
import { Grid } from "@mui/material";
import TagTable from "./tables/TagTable";
import TagForm from "./forms/TagForm";

export default function TagComponent() {
    const router = useRouter();
    const submitRef = React.createRef();

    const handleAddClick = (e) => {
        router.push("/dashboard/tag/ADD-TAG");
    };

    const handleClick = (e) => {
        submitRef.current.handleSubmit(e);
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <AddButton heading="View Tags" handleAddClick={(e) => handleAddClick(e)} />
                    <TagTable />
                </Grid>
                <Grid item xs={12} md={4}>
                    <AddButton
                        heading="Add Tag"
                        title={router.query.tagID ? "Save" : "Create"}
                        handleAddClick={(e) => handleClick(e)}
                    />
                    <TagForm submitRef={submitRef} />
                </Grid>
            </Grid>
        </div>
    );
}
