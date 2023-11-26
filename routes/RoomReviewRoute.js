import express from "express";
import { getRoomReviews, getRoomReviewById } from "../controllers/RoomReviewController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/room-reviews", verifyUser, getRoomReviews);
router.get("/room-reviews/:id", verifyUser, getRoomReviewById);

export default router;
