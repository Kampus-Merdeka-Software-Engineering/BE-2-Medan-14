import express from "express";
import { getPhotos, getPhotoById, createPhoto, updatePhoto, deletePhoto } from "../controllers/PhotoController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/photos", verifyUser, getPhotos);
router.get("/photos/:id", verifyUser, getPhotoById);
router.post("/photos", verifyUser, adminOnly, createPhoto);
router.patch("/photos/:id", verifyUser, adminOnly, updatePhoto);
router.delete("/photos/:id", verifyUser, adminOnly, deletePhoto);

export default router;
