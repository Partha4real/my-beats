import express from "express";
import {
  getAllArtist,
  getArtistByGenre,
  addArtist,
  updateArtist,
  deleteArtist,
  deleteMultipleArtist,
} from "../../controller/Artist/artist.controller.js";
const router = express.Router();

router.get("/getArtist", getAllArtist);

router.get("/getArtistByGenre/:genreId", getArtistByGenre);

router.post("/addArtist", addArtist);

router.post("/updateArtist/:id", updateArtist);

router.delete("/deleteArtist/:id", deleteArtist);

router.delete("/deleteMultipleArtist", deleteMultipleArtist);

export default router;
