import React from "react";
import AddButton from "../../utils/AddButton/AddButton";
import Validate from "validate.js";
import { Grid } from "@mui/material";
import { AutoCompleteMultiple } from "../../utils/CustomAutoComplete/CustomAutoComplete";
import CustomFilefield from "../../utils/CustomFilefield/CustomFilefield";
import Inputfield from "../../utils/CustomTextfield/CustomTextfield";
import PreviewImage from "../../utils/PreviewImage/PreviewImage";
import TextEditor from "../../utils/TextEditor/TextEditor";
import { requiredValidation, textValidation } from "../../hooks/formValidation";
import convertToBase64 from "../../hooks/convertToBase64";
import hasErrors from "../../hooks/hasErrors";
import { createArtist, updateArtist } from "../../data/artist/action";
import { connect } from "react-redux";
import { useRouter } from "next/dist/client/router";

const schema = {
    name: textValidation(250),
    artistImage: requiredValidation,
    genre: requiredValidation,
};

const initialState = {
    values: {
        name: "",
        artistImage: "",
        genre: [],
        bioData: "",
    },
    errors: {},
};

function ArtistForm({ artist, genre, createArtist, updateArtist }) {
    const router = useRouter();
    const [formState, setFormState] = React.useState(initialState);
    const ID = router.query.artistID;

    React.useEffect(() => {
        if (router.query.artistID) {
            const currentData = artist.find((item) => item._id === router.query.artistID);
            setFormState((value) => ({
                ...value,
                values: {
                    ...currentData,
                },
            }));
        }
    }, [router]);

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

    const handleAutoCompleteChange = (e, data) => {
        const idArray = [];
        for (let index = 0; index < data.length; index++) {
            idArray.push(data[index]._id);
        }
        setFormState((value) => ({
            ...value,
            values: {
                ...formState.values,
                genre: data,
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
            //update artist
            updateArtist(ID, formState.values);
            router.push("/dashboard/artist/VIEW-ARTIST");
        } else {
            // create artist
            createArtist(formState.values);
        }
        setFormState(initialState);
    };

    return (
        <React.Fragment>
            <AddButton
                heading={router.query.artistID ? "Update Artist" : "Add Artist"}
                title={router.query.artistID ? "Save" : "Create"}
                handleAddClick={(e) => handleSubmit(e)}
            />

            <Grid container spacing={3}>
                <Grid item xs={12} md={9}>
                    <Grid container spacing={3}>
                        <Inputfield
                            half
                            label="Artist Name"
                            name="name"
                            formState={formState}
                            handleChange={handleChange}
                            hasErrors={(field) => hasErrors(field, formState)}
                        />

                        <CustomFilefield
                            half
                            label="Artist Image"
                            name="artistImage"
                            formState={formState}
                            handleFileChange={handleFileChange}
                            hasErrors={(field) => hasErrors(field, formState)}
                        />

                        <AutoCompleteMultiple
                            half
                            label="Genre"
                            name="genre"
                            options={genre}
                            value={formState.values.genre}
                            formState={formState}
                            handleChange={handleAutoCompleteChange}
                            hasErrors={(field) => hasErrors(field, formState)}
                        />

                        <TextEditor
                            label="Artist Bio-Data"
                            value={formState.values.bioData}
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
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    loader: state.loader,
    artist: state.artist,
    genre: state.genre,
});

export default connect(mapStateToProps, { createArtist, updateArtist })(ArtistForm);
