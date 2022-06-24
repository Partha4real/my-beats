import express from "express";
import {
  getAllGenre,
  addGenre,
  updateGenre,
  deleteGenre,
  deleteMultipleGenre,
} from "../../controller/Genre/genre.controller.js";
const router = express.Router();

router.get("/getGenre", getAllGenre);

router.post("/addGenre", addGenre);

router.post("/updateGenre/:id", updateGenre);

router.delete("/deleteGenre/:id", deleteGenre);

router.delete("/deleteMultipleGenre", deleteMultipleGenre);

export default router;
