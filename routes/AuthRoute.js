import express from "express";
import { Login, Me, Register, UpdateProfile, Logout } from "../controllers/Auth.js";

const router = express.Router();

router.get("/me", Me);
router.post("/login", Login);
router.post("/register", Register);
router.patch("/update-profile", UpdateProfile);
router.delete("/logout", Logout);

export default router;
