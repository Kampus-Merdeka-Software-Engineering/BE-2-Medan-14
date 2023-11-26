import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let db;

if (process.env.HOST === "localhost") {
    db = new Sequelize("bookid_db", "root", "", {
        host: "localhost",
        dialect: "mysql",
    });
} else {
    db = new Sequelize(process.env.DATABASE_URL, {
        dialect: "mysql",
    });
}

export default db;
