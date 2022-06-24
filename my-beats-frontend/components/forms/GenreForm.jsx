import React from "react";
import Validate from "validate.js";
import { Grid } from "@mui/material";
import Inputfield from "../../utils/CustomTextfield/CustomTextfield";
import { textValidation } from "../../hooks/formValidation";
import hasErrors from "../../hooks/hasErrors";
import { createGenre, updateGenre } from "../../data/genre/action";
import { connect } from "react-redux";
import { useRouter } from "next/dist/client/router";

const schema = {
    title: textValidation(250),
    // subtitle: textValidation(250),
};

const initialState = {
    values: {
        title: "",
    },
    errors: {},
};

function GenreForm({ genre, createGenre, updateGenre, submitRef }) {
    const router = useRouter();
    const [formState, setFormState] = React.useState(initialState);
    const ID = router.query.genreID;

    React.useEffect(() => {
        if (router.query.genreID) {
            const currentData = genre.find((item) => item._id === router.query.genreID);
            setFormState((value) => ({
                ...value,
                values: {
                    ...currentData,
                },
            }));
        }
    }, [router]);

    const handleChange = (e) => {
        setFormState((value) => ({
            ...value,
            values: {
                ...formState.values,
                [e.target.name]: e.target.value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = await Validate(formState.values, schema);
        await setFormState((fomState) => ({
            ...fomState,
            isValid: !errors,
            errors: errors || {},
        }));
        if (errors) return;

        if (ID) {
            //update lab type
            updateGenre(ID, formState.values);
            router.replace("/dashboard/genre/VIEW-GENRE", undefined, { shallow: true });
        } else {
            // create nurse
            createGenre(formState.values);
        }
        setFormState(initialState);
    };

    React.useEffect(() => {
        submitRef.current = {
            handleSubmit: handleSubmit,
        };
    }, [submitRef, formState.values]);

    return (
        <div>
            <Grid container spacing={1}>
                <Inputfield
                    label="Genre Title"
                    name="title"
                    formState={formState}
                    handleChange={handleChange}
                    hasErrors={(field) => hasErrors(field, formState)}
                />
            </Grid>
        </div>
    );
}

const mapStateToProps = (state) => ({
    loader: state.loader,
    genre: state.genre,
});

export default connect(mapStateToProps, { createGenre, updateGenre })(GenreForm);
