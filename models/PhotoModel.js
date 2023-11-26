import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Rooms from "./RoomModel.js";

const { DataTypes } = Sequelize;

const Photos = db.define(
    "photos",
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
                        }
                    });
                },
            },
        },
        photo: {
            type: DataTypes.TEXT("medium"),
            allowNull: false,
            validate: {
                sizeMustLessThan2MB(value) {
                    let byteSize = (value.length * 3) / 4;

                    if (byteSize > 2000000) {
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

Rooms.hasMany(Photos, {
    foreignKey: "roomId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Photos.belongsTo(Rooms, {
    foreignKey: "roomId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

export default Photos;
