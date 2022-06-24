import React from "react";
import { useRouter } from "next/dist/client/router";
import AddButton from "../utils/AddButton/AddButton";
import GenreTable from "./tables/GenreTable";
// import GenreForm from "./forms/GenreForm";
import { Grid } from "@mui/material";
import GenreForm from "./forms/GenreForm";

export default function GenreComponent() {
    const router = useRouter();
    const submitRef = React.createRef();

    const handleAddClick = (e) => {
        router.push("/dashboard/genre/ADD-GENRE");
    };

    const handleClick = (e) => {
        submitRef.current.handleSubmit(e);
    };

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <AddButton heading="View Genre" handleAddClick={(e) => handleAddClick(e)} />
                    <GenreTable />
                </Grid>
                <Grid item xs={12} md={4}>
                    <AddButton
                        heading="Add Genre"
                        title={router.query.genreID ? "Save" : "Create"}
                        handleAddClick={(e) => handleClick(e)}
                    />

                    <GenreForm submitRef={submitRef} />
                </Grid>
            </Grid>
        </div>
    );
}
