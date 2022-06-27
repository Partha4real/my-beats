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
import { createSong, updateSong } from "../../data/song/action";
import { connect } from "react-redux";
import { useRouter } from "next/dist/client/router";

const schema = {
    title: textValidation(200),
    musicPicture: requiredValidation,
    artist: requiredValidation,
    genre: requiredValidation,
    originCountry: requiredValidation,
    releaseDate: requiredValidation,
};

const initialState = {
    values: {
        title: "",
        musicPicture: "",
        artist: [],
        featuredArtist: [],
        album: [],
        genre: [],
        tag: [],
        originCountry: null,
        lyrics: "",
        releaseDate: "",
        description: "",
        downloadLink: "",
    },
    errors: {},
};

function SongForm({ song, artist, genre, album, tag, createSong, updateSong }) {
    const router = useRouter();
    const [formState, setFormState] = React.useState(initialState);
    const ID = router.query.songID;

    React.useEffect(() => {
        if (router.query.songID) {
            const currentData = song.find((item) => item._id === router.query.songID);
            setFormState((value) => ({
                ...value,
                values: {
                    ...currentData,
                },
            }));
        }
    }, [router]);
    console.log({ formState });
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
            //update song
            updateSong(ID, formState.values);
            router.push("/dashboard/song/VIEW-SONG");
        } else {
            // create song
            createSong(formState.values);
        }
        setFormState(initialState);
    };

    return (
        <React.Fragment>
            <AddButton
                heading={router.query.songID ? "Update Song" : "Add S0ng"}
                title={router.query.songID ? "Save" : "Create"}
                handleAddClick={(e) => handleSubmit(e)}
            />

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

                        {/* <AutoCompleteSearch
                            half
                            label="Song Album"
                            name="album"
                            options={album}
                            value={formState.values.album}
                            formState={formState}
                            handleChange={(e, data, selectedOption, options) =>
                                handleAutoCompleteSearch(e, data, selectedOption, options, "album")
                            }
                            hasErrors={(field) => hasErrors(field, formState)}
                        /> */}

                        <AutoCompleteMultiple
                            half
                            label="Song Album"
                            name="album"
                            options={album}
                            multiple={false}
                            value={formState.values.album}
                            formState={formState}
                            handleChange={(e, data) => handleAutoCompleteMultiple(e, data, "album")}
                            hasErrors={(field) => hasErrors(field, formState)}
                        />

                        <AutoCompleteMultiple
                            half
                            label="Song Artist"
                            name="artist"
                            options={artist}
                            value={formState.values.artist}
                            formState={formState}
                            handleChange={(e, data) => handleAutoCompleteMultiple(e, data, "artist")}
                            hasErrors={(field) => hasErrors(field, formState)}
                        />

                        <AutoCompleteMultiple
                            half
                            label="Song Featured Artist"
                            name="featuredArtist"
                            options={artist}
                            value={formState.values.featuredArtist}
                            formState={formState}
                            handleChange={(e, data) => handleAutoCompleteMultiple(e, data, "featuredArtist")}
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

                        <AutoCompleteMultiple
                            half
                            label="Song Tag"
                            name="tag"
                            options={tag}
                            value={formState.values.tag}
                            formState={formState}
                            handleChange={(e, data) => handleAutoCompleteMultiple(e, data, "tag")}
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
                            <PreviewImage src={formState.values.musicPicture} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    loader: state.loader,
    song: state.song,
    artist: state.artist,
    album: state.album,
    tag: state.tag,
    genre: state.genre,
});

export default connect(mapStateToProps, { createSong, updateSong })(SongForm);
