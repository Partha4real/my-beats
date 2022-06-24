import express from "express";
import {
  getAllAlbum,
  getAlbumByArtist,
  getAlbumByGenre,
  addAlbum,
  updateAlbum,
  deleteAlbum,
  deleteMultipleAlbum,
} from "../../controller/Album/album.controller.js";
const router = express.Router();

router.get("/getAlbum", getAllAlbum);

router.get("/getAlbumByArtist/:artistId", getAlbumByArtist);

router.get("/getAlbumByGenre/:genreId", getAlbumByGenre);

router.post("/addAlbum", addAlbum);

router.post("/updateAlbum/:id", updateAlbum);

router.delete("/deleteAlbum/:id", deleteAlbum);

router.delete("/deleteMultipleAlbum", deleteMultipleAlbum);

export default router;
