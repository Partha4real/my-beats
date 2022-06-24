import React from "react";
import AddButton from "../../utils/AddButton/AddButton";
import Validate from "validate.js";
import { Grid } from "@mui/material";
import { AutoCompleteMultiple, AutoCompleteSearch } from "../../utils/CustomAutoComplete/CustomAutoComplete";
import CustomFilefield from "../../utils/CustomFilefield/CustomFilefield";
import Inputfield from "../../utils/CustomTextfield/CustomTextfield";
import PreviewImage from "../../utils/PreviewImage/PreviewImage";
import TextEditor from "../../utils/TextEditor/TextEditor";
import { requiredValidation, textValidation } from "../../hooks/formValidation";
import convertToBase64 from "../../hooks/convertToBase64";
import hasErrors from "../../hooks/hasErrors";

const schema = {
    title: textValidation(250),
    // subtitle: textValidation(250),
    image: requiredValidation,
};

const initialState = {
    values: {
        title: "",
        musicPicture: "",
        artist: "",
        album: "",
        genre: [],
        originCountry: "",
        lyrics: "",
        releaseDate: "",
        description: "",
        downloadLink: "",
    },
    errors: {},
};

export default function SongForm() {
    const [formState, setFormState] = React.useState(initialState);

    const handleEditorChange = (data) => {
        setFormState((value) => ({
            ...value,
            values: {
                ...formState.values,
                bioData: data,
            },
        }));
    };

    const handleChange = (e) => {
        setFormState((value) => ({
            ...value,
            values: {
                ...formState.values,
                [e.target.name]: e.target.value,
            },
        }));
    };

    const handleFileChange = async (e) => {
        const img = await convertToBase64(e.target.files[0]);
        if (img) {
            setFormState((value) => ({
                ...value,
                values: {
                    ...formState.values,
                    [e.target.name]: img,
                },
            }));
        }
    };

    const handleGenreAutoCompleteChange = (e, data, dd, ff, der = "parth") => {
        console.log(dd, ff, der);
        setFormState((value) => ({
            ...value,
            values: {
                ...formState.values,
                genre: data,
            },
        }));
    };
    const handleCountryAutoCompleteChange = (e, data) => {
        setFormState((value) => ({
            ...value,
            values: {
                ...formState.values,
                originCountry: data,
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

        // if (id !== undefined) {
        //   //update lab type
        //   dispatch(updateBanner(id, formState.values));
        //   setOpen(false);
        // } else {
        //   // create nurse
        //   dispatch(createBanner(formState.values));
        //   setValue(0);
    };
    const option = [
        {
            id: "1",
            title: "dssd",
        },
        {
            id: "2",
            title: "ghhh",
        },
    ];
    return (
        <div>
            <AddButton heading="Add Artist" title="Create" />
            <Grid container spacing={1}>
                <Grid item xs={12} md={9}>
                    <Grid container spacing={3}>
                        <Inputfield
                            half
                            label="Song Title"
                            name="title"
                            formState={formState}
                            handleChange={handleChange}
                            hasErrors={(field) => hasErrors(field, formState)}
                        />

                        <CustomFilefield
                            half
                            label="Song Image"
                            name="musicPicture"
                            formState={formState}
                            handleFileChange={handleFileChange}
                            hasErrors={(field) => hasErrors(field, formState)}
                        />

                        <Inputfield
                            half
                            label="Song Artist"
                            name="artist"
                            formState={formState}
                            handleChange={handleChange}
                            hasErrors={(field) => hasErrors(field, formState)}
                        />

                        <Inputfield
                            half
                            label="Download Link"
                            name="downloadLink"
                            formState={formState}
                            handleChange={handleChange}
                            hasErrors={(field) => hasErrors(field, formState)}
                        />

                        <AutoCompleteMultiple
                            half
                            label="Genre"
                            name="genre"
                            value={formState.values.genre}
                            formState={formState}
                            handleChange={handleGenreAutoCompleteChange}
                            hasErrors={(field) => hasErrors(field, formState)}
                        />
                        <AutoCompleteSearch
                            half
                            label="Origin Country"
                            name="originCountry"
                            value={formState.values.originCountry}
                            formState={formState}
                            handleChange={handleCountryAutoCompleteChange}
                            hasErrors={(field) => hasErrors(field, formState)}
                        />

                        <TextEditor
                            label="Abbum Description"
                            value={formState.values.description}
                            handleEditorChange={handleEditorChange}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12}>
                            <PreviewImage src={formState.values.artistImage} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
