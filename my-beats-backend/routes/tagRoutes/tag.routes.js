import express from "express";
import { getAllTag, addTag, updateTag, deleteTag, deleteMultipleTag } from "../../controller/Tag/tag.controller.js";
const router = express.Router();

router.get("/getTag", getAllTag);

router.post("/addTag", addTag);

router.post("/updateTag/:id", updateTag);

router.delete("/deleteTag/:id", deleteTag);

router.delete("/deleteMultipleTag", deleteMultipleTag);

export default router;
