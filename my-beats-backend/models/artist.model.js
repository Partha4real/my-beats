import mongoose from "mongoose";
import base64Image from "../config/defaultImage.js";

const artistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    artistImage: {
      type: String,
      default: base64Image.noProfile,
    },
    bioData: {
      type: String,
    },
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
  },
  {
    timestamps: true,
  }
);

const Artist = mongoose.model("Artist", artistSchema);
export default Artist;
