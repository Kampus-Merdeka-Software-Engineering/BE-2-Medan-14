import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
    "users",
    {
        name: {
            type: DataTypes.STRING,
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
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    args: true,
                    msg: "Phone must be filled",
                },
                isNumeric: {
                    args: true,
                    msg: "Phone must be a number",
                },
                mustUnique(value) {
                    return Users.findOne({
                        where: {
                            phone: value,
                        },
                    }).then((response) => {
                        if (response) {
                            throw new Error("Phone already exists");
                        }
                    });
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    args: true,
                    msg: "Email must be filled",
                },
                isEmail: {
                    args: true,
                    msg: "Email must be a valid email",
                },
                mustUnique(value) {
                    return Users.findOne({
                        where: {
                            email: value,
                        },
                    }).then((response) => {
                        if (response) {
                            throw new Error("Email already exists");
                        }
                    });
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: true,
                    msg: "Password must be filled",
                },
                notEmpty: {
                    args: true,
                    msg: "Password must not be empty",
                },
            },
        },
        role: {
            type: DataTypes.ENUM("Admin", "User"),
            allowNull: false,
            validate: {
                isIn: {
                    args: [["Admin", "User"]],
                    msg: "Role must be either Admin or User",
                },
            },
            defaultValue: "User",
        },
        photo: {
            type: DataTypes.TEXT("medium"),
            allowNull: false,
            validate: {
                sizeMustLessThan2MB(value) {
                    let byteSize = (value.length * 3) / 4;

                    if (byteSize > 2500000) {
                        throw new Error("Photo must be less than 2MB");
                    }
                },
            },
        },
    },
    {
        freezeTableName: true,
    }
);

export default Users;
