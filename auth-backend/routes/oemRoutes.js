import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {uploadExcel, getOems} from "../controllers/oemController.js";
const router = express.Router();

router.post("/upload-oem", upload.single("file"), uploadExcel);
router.get("/oems",getOems);

export default router;