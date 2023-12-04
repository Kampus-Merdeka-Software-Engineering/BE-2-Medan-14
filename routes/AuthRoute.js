import express from "express";
import { Login, Me, Register, UpdateProfile, Logout, UniqueEmail, UniquePhone } from "../controllers/Auth.js";

const router = express.Router();

router.get("/me", Me);
router.post("/login", Login);
router.post("/register", Register);
router.patch("/update-profile", UpdateProfile);
router.delete("/logout", Logout);
router.post("/check-email", UniqueEmail);
router.post("/check-phone", UniquePhone);

export default router;
