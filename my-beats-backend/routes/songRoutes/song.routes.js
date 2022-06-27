import express from "express";
import {
    getAllSong,
    getSongByArtist,
    getSongByAlbum,
    getSongByGenre,
    addSong,
    updateSong,
    deleteSong,
    deleteMultipleSong,
} from "../../controller/Song/song.controller.js";
const router = express.Router();

router.get("/getSong", getAllSong);

router.get("/getSongByArtist/:artistId", getSongByArtist);

router.get("/getSongByAlbum/:albumID", getSongByAlbum);

router.get("/getSongByGenre/:genreId", getSongByGenre);

router.post("/addSong", addSong);

router.post("/updateSong/:id", updateSong);

router.delete("/deleteSong/:id", deleteSong);

router.delete("/deleteMultipleSong", deleteMultipleSong);

export default router;
