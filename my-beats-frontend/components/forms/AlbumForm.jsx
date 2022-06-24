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
        name: "",
        albumPicture: "",
        artist: "",
        genre: [],
        originCountry: null,
        releaseDate: "",
        description: "",
        downloadLink: "",
    },
    errors: {},
};

export default function AlbumForm() {
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

    const handleAutoCompleteMultiple = (e, data) => {
        setFormState((value) => ({
            ...value,
            values: {
                ...formState.values,
                genre: data,
            },
        }));
    };

    const handleAutoCompleteSearch = (e, data, ...rest) => {
        console.log(JSON.stringify(data, null, " "));
        console.log(rest);
        setFormState((value) => ({
            ...value,
            values: {
                ...formState.values,
                // [name]: data,
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
    console.log(formState);
    return (
        <div>
            <AddButton heading="Add Artist" title="Create" />
            <Grid container spacing={1}>
                <Grid item xs={12} md={9}>
                    <Grid container spacing={3}>
                        <Inputfield
                            half
                            label="Album Name"
                            name="name"
                            formState={formState}
                            handleChange={handleChange}
                            hasErrors={(field) => hasErrors(field, formState)}
                        />

                        <CustomFilefield
                            half
                            label="Album Image"
                            name="albumPicture"
                            formState={formState}
                            handleFileChange={handleFileChange}
                            hasErrors={(field) => hasErrors(field, formState)}
                        />

                        <Inputfield
                            half
                            label="Album Artist"
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
                            handleChange={handleAutoCompleteMultiple}
                            hasErrors={(field) => hasErrors(field, formState)}
                        />
                        <AutoCompleteSearch
                            half
                            label="Origin Country"
                            name="originCountry"
                            value={formState.values.originCountry}
                            formState={formState}
                            handleChange={(e, data, selectedOption, options, name) =>
                                handleAutoCompleteSearch(e, data, selectedOption, options, (name = "originCountry"))
                            }
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
