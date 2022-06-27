import mongoose from "mongoose";
import base64Image from "../config/defaultImage.js";

const albumSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        albumPicture: {
            type: String,
            default: base64Image.noImage,
        },
        artist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Artist",
                // required: true,
            },
        ],
        genre: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Genre",
                // required: true,
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
        releaseDate: {
            type: Date,
            // required: true,
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

const Album = mongoose.model("Album", albumSchema);
export default Album;
