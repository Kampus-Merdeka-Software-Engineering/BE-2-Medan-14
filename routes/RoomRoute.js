import express from "express";
import { getRooms, getRoomById, createRoom, updateRoom, deleteRoom } from "../controllers/RoomController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/rooms", verifyUser, getRooms);
router.get("/rooms/:id", verifyUser, getRoomById);
router.post("/rooms", verifyUser, adminOnly, createRoom);
router.patch("/rooms/:id", verifyUser, adminOnly, updateRoom);
router.delete("/rooms/:id", verifyUser, adminOnly, deleteRoom);

export default router;
