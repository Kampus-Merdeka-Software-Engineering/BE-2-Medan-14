import Rooms from "../models/RoomModel.js";
import Photos from "../models/PhotoModel.js";

export const getRooms = async (req, res) => {
    try {
        const response = await Rooms.findAll({
            include: {
                model: Photos,
                attributes: ["photo"],
                limit: 1,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getRoomById = async (req, res) => {
    try {
        const response = await Rooms.findOne({
            where: {
                id: req.params.id,
            },
            include: {
                model: Photos,
                attributes: ["photo"],
            },
        });

        if (!response) {
            return res.status(404).json({ msg: "Room not found" });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createRoom = async (req, res) => {
    const { name, category, bedroom, bathroom, roomSize, mediaTech, kitchen, service, description, roomQty, discount, normalPrice } = req.body;
    let curDiscount, curNormalPrice;

    if (discount === undefined) {
        curDiscount = 0;
    } else {
        curDiscount = discount;
    }

    if (normalPrice === undefined) {
        curNormalPrice = 0;
    } else {
        curNormalPrice = normalPrice;
    }

    try {
        await Rooms.create({
            name: name,
            category: category,
            bedroom: bedroom,
            bathroom: bathroom,
            roomSize: roomSize,
            mediaTech: mediaTech,
            kitchen: kitchen,
            service: service,
            description: description,
            roomQty: roomQty,
            discount: curDiscount,
            normalPrice: curNormalPrice,
            currentPrice: curNormalPrice - curNormalPrice * curDiscount,
        });

        res.status(201).json({ msg: "Room created successfully" });
    } catch (error) {
        const messages = error.message.split("\n").map((msg) => msg.replace("Validation error: ", ""));
        const singleMessage = messages.join(" ");
        res.status(400).json({ msg: singleMessage });
    }
};

export const updateRoom = async (req, res) => {
    const room = await Rooms.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!room) {
        return res.status(404).json({ msg: "Room not found" });
    }

    const { name, category, bedroom, bathroom, roomSize, mediaTech, kitchen, service, description, roomQty, discount, normalPrice } = req.body;
    let curDiscount, curNormalPrice;

    if (discount === undefined) {
        curDiscount = room.discount;
    } else {
        curDiscount = discount;
    }

    if (normalPrice === undefined) {
        curNormalPrice = room.normalPrice;
    } else {
        curNormalPrice = normalPrice;
    }

    try {
        await Rooms.update(
            {
                name: name,
                category: category,
                bedroom: bedroom,
                bathroom: bathroom,
                roomSize: roomSize,
                mediaTech: mediaTech,
                kitchen: kitchen,
                service: service,
                description: description,
                roomQty: roomQty,
                discount: curDiscount,
                normalPrice: curNormalPrice,
                currentPrice: curNormalPrice - curNormalPrice * curDiscount,
            },
            {
                where: {
                    id: room.id,
                },
            }
        );

        res.status(200).json({ msg: "Room updated successfully" });
    } catch (error) {
        const messages = error.message.split("\n").map((msg) => msg.replace("Validation error: ", ""));
        const singleMessage = messages.join(" ");
        res.status(400).json({ msg: singleMessage });
    }
};

export const deleteRoom = async (req, res) => {
    const room = await Rooms.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!room) {
        return res.status(404).json({ msg: "Room not found" });
    }

    try {
        await Rooms.destroy({
            where: {
                id: room.id,
            },
        });

        res.status(200).json({ msg: "Room deleted successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
