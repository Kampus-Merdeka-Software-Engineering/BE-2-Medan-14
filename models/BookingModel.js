import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Rooms from "./RoomModel.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Bookings = db.define(
    "bookings",
    {
        roomId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Room id must be filled",
                },
                isNumeric: {
                    args: true,
                    msg: "Room id must be a number",
                },
                mustExist(value) {
                    return Rooms.findOne({
                        where: {
                            id: value,
                        },
                    }).then((room) => {
                        if (!room) {
                            throw new Error("Room id must be exist");
                        } else if (room.roomQty <= 0) {
                            throw new Error("Room quantity must be available");
                        }
                    });
                },
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "User id must be filled",
                },
                isNumeric: {
                    args: true,
                    msg: "User id must be a number",
                },
                mustExist(value) {
                    return Users.findOne({
                        where: {
                            id: value,
                        },
                    }).then((user) => {
                        if (!user) {
                            throw new Error("User id must be exist");
                        }
                    });
                },
            },
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Start date must be filled",
                },
                isDate: {
                    args: true,
                    msg: "Start date must be a date",
                },
                mustBeEqualOrGreaterThanToday(value) {
                    if (value < new Date().toISOString().slice(0, 10)) {
                        throw new Error("Start date must be today or after today");
                    }
                },
                mustBeBeforeEndDate(value) {
                    if (value >= this.endDate) {
                        throw new Error("Start date must be before end date");
                    }
                },
            },
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "End date must be filled",
                },
                isDate: {
                    args: true,
                    msg: "End date must be a date",
                },
                mustBeAfterStartDate(value) {
                    if (value <= this.startDate) {
                        throw new Error("End date must be after start date");
                    }
                },
            },
        },
        totalRoom: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Reserved room must be filled",
                },
                isNumeric: {
                    args: true,
                    msg: "Reserved room must be a number",
                },
                mustBeGreaterThanOne(value) {
                    if (value < 1) {
                        throw new Error("Reserved room must be at least 1");
                    }
                },
            },
            defaultValue: 1,
        },
        totalPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Total price must be filled",
                },
                isNumeric: {
                    args: true,
                    msg: "Total price must be a number",
                },
                mustBeGreaterThanOne(value) {
                    if (value < 1) {
                        throw new Error("Total price must be at least 1");
                    }
                },
            },
            defaultValue: 1,
        },
        status: {
            type: DataTypes.ENUM("Pending", "Processed", "Checkout", "Done"),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Status must be filled",
                },
                isIn: {
                    args: [["Pending", "Processed", "Checkout", "Done"]],
                    msg: "Status must be either Pending, Processed, or Done",
                },
            },
            defaultValue: "Pending",
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Rating must be filled",
                },
                isInt: {
                    args: true,
                    msg: "Rating must be an integer",
                },
                mustBeBetweenOneAndFive(value) {
                    if (value < 1 || value > 5) {
                        throw new Error("Rating must be between 1 and 5");
                    }
                },
            },
            defaultValue: 5,
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Review must be filled",
                },
                notEmpty: {
                    args: true,
                    msg: "Review must not be empty",
                },
            },
        },
    },
    {
        freezeTableName: true,
    }
);

Rooms.hasMany(Bookings, {
    foreignKey: "roomId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Bookings.belongsTo(Rooms, {
    foreignKey: "roomId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Users.hasMany(Bookings, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Bookings.belongsTo(Users, {
    foreignKey: "userId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

export default Bookings;
