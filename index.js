import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import cron from "node-cron";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";

import { updateBookingStatus } from "./utils/updateBookingStatus.js";

import BookingRoute from "./routes/BookingRoute.js";
import PhotoRoute from "./routes/PhotoRoute.js";
import RoomRoute from "./routes/RoomRoute.js";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import RoomReviewRoute from "./routes/RoomReviewRoute.js";

cron.schedule("* * * * *", updateBookingStatus);

const app = express();
const port = process.env.PORT || 5000;
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db,
});

dotenv.config();

(async () => {
    await db.sync();
})();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: store,
        cookie: { secure: "auto" },
    })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use(
    cors({
        credentials: true,
        origin: "*",
    })
);

app.use(BookingRoute);
app.use(PhotoRoute);
app.use(RoomRoute);
app.use(UserRoute);
app.use(AuthRoute);
app.use(RoomReviewRoute);

store.sync();

app.listen(port, "0.0.0.0", () => {
    console.log(`Server up and running on port: ${port}`);
});