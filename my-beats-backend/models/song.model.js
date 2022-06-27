import mongoose from "mongoose";
import base64Image from "../config/defaultImage.js";

const songSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        musicPicture: {
            type: String,
            default: base64Image.noImage,
        },
        artist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Artist",
                required: true,
            },
        ],
        featuredArtist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Artist",
            },
        ],
        album: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Album",
            },
        ],
        genre: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Genre",
                required: true,
            },
        ],
        originCountry: {
            type: String,
        },
        tag: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag",
            },
        ],
        lyrics: {
            type: String,
        },
        releaseDate: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
        },
        downloadLink: {
            type: String,
        },
        totalDownload: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

const Song = mongoose.model("Song", songSchema);
export default Song;
