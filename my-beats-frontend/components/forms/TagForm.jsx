import React from "react";
import Validate from "validate.js";
import { Grid } from "@mui/material";
import Inputfield from "../../utils/CustomTextfield/CustomTextfield";
import { textValidation } from "../../hooks/formValidation";
import hasErrors from "../../hooks/hasErrors";
import { createTag, updateTag } from "../../data/tag/action";
import { connect } from "react-redux";
import { useRouter } from "next/dist/client/router";

const schema = {
    title: textValidation(250),
};

const initialState = {
    values: {
        title: "",
    },
    errors: {},
};

function TagForm({ tag, createTag, updateTag, submitRef }) {
    const router = useRouter();
    const [formState, setFormState] = React.useState(initialState);
    const ID = router.query.tagID;

    React.useEffect(() => {
        if (router.query.tagID) {
            const currentData = tag.find((item) => item._id === router.query.tagID);
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
                [e.target.name]: e.target.value.toUpperCase(),
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
            //update tag
            updateTag(ID, formState.values);
            router.replace("/dashboard/tag/VIEW-TAG", undefined, { shallow: true });
        } else {
            // create tag
            createTag(formState.values);
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
                    label="Tag Title"
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
    tag: state.tag,
});

export default connect(mapStateToProps, { createTag, updateTag })(TagForm);
