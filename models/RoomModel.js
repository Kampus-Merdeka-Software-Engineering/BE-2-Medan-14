import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Rooms = db.define(
    "rooms",
    {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Name must be filled",
                },
                notEmpty: {
                    args: true,
                    msg: "Name must not be empty",
                },
                mustUnique(value) {
                    return Rooms.findOne({
                        where: {
                            name: value,
                        },
                    }).then((response) => {
                        if (response) {
                            throw new Error("Name already exists");
                        }
                    });
                },
            },
        },
        category: {
            type: DataTypes.ENUM("Standard Room", "Superior Room", "Deluxe Room", "Twin Room", "Single Room", "Double Room", "Family Room", "Junior Suite Room", "Suite Room", "Presidential Room", "Connecting Room", "Accessible Room"),
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Category must be filled",
                },
                isIn: {
                    args: [["Standard Room", "Superior Room", "Deluxe Room", "Twin Room", "Single Room", "Double Room", "Family Room", "Junior Suite Room", "Suite Room", "Presidential Room", "Connecting Room", "Accessible Room"]],
                    msg: "Category must be one of the following: Standard Room, Superior Room, Deluxe Room, Twin Room, Single Room, Double Room, Family Room, Junior Suite Room, Suite Room, Presidential Room, Connecting Room, Accessible Room",
                },
            },
            defaultValue: "Standard Room",
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Description must be filled",
                },
                notEmpty: {
                    args: true,
                    msg: "Description must not be empty",
                },
            },
        },
        regency: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Regency must be filled",
                },
                notEmpty: {
                    args: true,
                    msg: "Regency must not be empty",
                },
            },
            defaultValue: "Jakarta Pusat",
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Province must be filled",
                },
                notEmpty: {
                    args: true,
                    msg: "Province must not be empty",
                },
            },
            defaultValue: "DKI Jakarta",
        },
        roomQty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Room quantity must be filled",
                },
                isInt: {
                    args: true,
                    msg: "Room quantity must be a number",
                },
                mustBePositive(value) {
                    if (value < 0) {
                        throw new Error("Room quantity must be at least 0");
                    }
                },
            },
            defaultValue: 1,
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Discount must be filled",
                },
                isNumeric: {
                    args: true,
                    msg: "Discount must be a number",
                },
                mustBeBetweenZeroAndOne(value) {
                    if (value < 0 || value > 1) {
                        throw new Error("Discount must be between 0 and 1");
                    }
                },
            },
            defaultValue: 0,
        },
        normalPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Normal price must be filled",
                },
                isNumeric: {
                    args: true,
                    msg: "Normal price must be a number",
                },
                mustBePositive(value) {
                    if (value < 0) {
                        throw new Error("Normal price must be at least 0");
                    }
                },
            },
            defaultValue: 0,
        },
        currentPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Current price must be filled",
                },
                isNumeric: {
                    args: true,
                    msg: "Current price must be a number",
                },
                mustBePositive(value) {
                    if (value < 0) {
                        throw new Error("Current price must be at least 0");
                    }
                },
            },
            defaultValue: 0,
        },
        avgRating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Average rating must be filled",
                },
                isNumeric: {
                    args: true,
                    msg: "Average rating must be a number",
                },
                mustBeBetweenZeroAndFive(value) {
                    if (value < 0 || value > 5) {
                        throw new Error("Average rating must be between 0 and 5");
                    }
                },
            },
            defaultValue: 0,
        },
        totalBooking: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Total booking must be filled",
                },
                isNumeric: {
                    args: true,
                    msg: "Total booking must be a number",
                },
                mustBePositive(value) {
                    if (value < 0) {
                        throw new Error("Total booking must be at least 0");
                    }
                },
            },
            defaultValue: 0,
        },
    },
    {
        freezeTableName: true,
    }
);

export default Rooms;
