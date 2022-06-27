import React from "react";
import AddButton from "../../utils/AddButton/AddButton";
import Validate from "validate.js";
import { Grid } from "@mui/material";
import { AutoCompleteMultiple, AutoCompleteSearch } from "../../utils/CustomAutoComplete/CustomAutoComplete";
import CustomFilefield from "../../utils/CustomFilefield/CustomFilefield";
import Inputfield, { TimeField } from "../../utils/CustomTextfield/CustomTextfield";
import PreviewImage from "../../utils/PreviewImage/PreviewImage";
import TextEditor from "../../utils/TextEditor/TextEditor";
import { requiredValidation, textValidation } from "../../hooks/formValidation";
import convertToBase64 from "../../hooks/convertToBase64";
import hasErrors from "../../hooks/hasErrors";
import { useRouter } from "next/dist/client/router";
import { createAlbum, updateAlbum } from "../../data/album/action";
import { connect } from "react-redux";

const schema = {
    name: textValidation(150),
    albumPicture: requiredValidation,
    artist: requiredValidation,
    genre: requiredValidation,
    originCountry: requiredValidation,
    releaseDate: requiredValidation,
};

const initialState = {
    values: {
        name: "",
        albumPicture: "",
        artist: [],
        genre: [],
        originCountry: null,
        releaseDate: "",
        description: "",
        downloadLink: "",
    },
    errors: {},
};

function AlbumForm({ album, artist, genre, createAlbum, updateAlbum }) {
    const router = useRouter();
    const [formState, setFormState] = React.useState(initialState);
    const ID = router.query.albumID;

    React.useEffect(() => {
        if (router.query.albumID) {
            const currentData = album.find((item) => item._id === router.query.albumID);
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

    const handleAutoCompleteMultiple = (e, data, field) => {
        setFormState((value) => ({
            ...value,
            values: {
                ...formState.values,
                [field]: data,
            },
        }));
    };

    const handleAutoCompleteSearch = (e, data, ...rest) => {
        setFormState((value) => ({
            ...value,
            values: {
                ...formState.values,
                [rest[2]]: data,
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
            //update album
            updateAlbum(ID, formState.values);
            router.push("/dashboard/album/VIEW-ALBUM");
        } else {
            // create album
            createAlbum(formState.values);
        }
        setFormState(initialState);
    };

    return (
        <React.Fragment>
            <AddButton
                heading={router.query.artistID ? "Update Album" : "Add Album"}
                title={router.query.albumID ? "Save" : "Create"}
                handleAddClick={(e) => handleSubmit(e)}
            />
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

                        <AutoCompleteMultiple
                            label="Album Artist"
                            name="artist"
                            options={artist}
                            value={formState.values.artist}
                            formState={formState}
                            handleChange={(e, data) => handleAutoCompleteMultiple(e, data, "artist")}
                            hasErrors={(field) => hasErrors(field, formState)}
                        />
                        <TimeField
                            half
                            label="Release Date"
                            name="releaseDate"
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
                            options={genre}
                            value={formState.values.genre}
                            formState={formState}
                            handleChange={(e, data) => handleAutoCompleteMultiple(e, data, "genre")}
                            hasErrors={(field) => hasErrors(field, formState)}
                        />
                        <AutoCompleteSearch
                            half
                            label="Origin Country"
                            name="originCountry"
                            value={formState.values.originCountry}
                            formState={formState}
                            handleChange={(e, data, selectedOption, options) =>
                                handleAutoCompleteSearch(e, data, selectedOption, options, "originCountry")
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
                            <PreviewImage src={formState.values.albumPicture} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    loader: state.loader,
    album: state.album,
    artist: state.artist,
    genre: state.genre,
});

export default connect(mapStateToProps, { createAlbum, updateAlbum })(AlbumForm);
