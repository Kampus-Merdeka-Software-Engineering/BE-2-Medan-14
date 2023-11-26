import express from "express";
import { getBookings, getBookingById, createBooking, updateBooking, deleteBooking } from "../controllers/BookingController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/bookings", verifyUser, getBookings);
router.get("/bookings/:id", verifyUser, getBookingById);
router.post("/bookings", verifyUser, createBooking);
router.patch("/bookings/:id", verifyUser, updateBooking);
router.delete("/bookings/:id", verifyUser, deleteBooking);

export default router;
