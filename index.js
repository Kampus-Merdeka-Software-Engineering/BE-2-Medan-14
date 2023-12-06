import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import cron from "node-cron";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import argon2 from "argon2";

import { updateBookingStatus } from "./utils/updateBookingStatus.js";
import Users from "./models/UserModel.js";

import BookingRoute from "./routes/BookingRoute.js";
import PhotoRoute from "./routes/PhotoRoute.js";
import RoomRoute from "./routes/RoomRoute.js";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import RoomReviewRoute from "./routes/RoomReviewRoute.js";

cron.schedule("* * * * *", updateBookingStatus);

const app = express();
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db,
});

dotenv.config();

// // Sync database, disable force true to prevent table drop
// // comment after first run
// (async () => {
//     await db.sync();

//     // Check if admin exists
//     const admin = await Users.findOne({ where: { email: process.env.ADMIN_EMAIL } });

//     // If admin does not exist, create it
//     if (!admin) {
//         const hashedPassword = await argon2.hash(process.env.ADMIN_PASSWORD);
//         await Users.create({
//             name: process.env.ADMIN_NAME,
//             phone: process.env.ADMIN_PHONE,
//             email: process.env.ADMIN_EMAIL,
//             password: hashedPassword,
//             role: "Admin",
//             photo: process.env.ADMIN_PHOTO,
//         });
//     }
// })();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        proxy: true, // add this when behind a reverse proxy, if you need secure cookies
        store: store,
        cookie: {
            sameSite: "none", // must be 'none' to enable cross-site delivery
            secure: true, // must be true if sameSite='none' and your app is also served over HTTPS
            httpOnly: true,
        },
    })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
);

app.use(BookingRoute);
app.use(PhotoRoute);
app.use(RoomRoute);
app.use(UserRoute);
app.use(AuthRoute);
app.use(RoomReviewRoute);

store.sync();

app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Server up and running on port: ${process.env.PORT}`);
});
