import express from "express";
import albumRoutes from "../routes/albumRoutes/album.routes.js";
import artistRoutes from "../routes/artistRoutes/artist.routes.js";
import genreRoutes from "../routes/genreRoutes/genre.routes.js";
import tagRoutes from "../routes/tagRoutes/tag.routes.js";
import songRoutes from "../routes/songRoutes/song.routes.js";

const router = express.Router();

router.use("/album", albumRoutes);
router.use("/artist", artistRoutes);
router.use("/genre", genreRoutes);
router.use("/tag", tagRoutes);
router.use("/song", songRoutes);

export default router;
