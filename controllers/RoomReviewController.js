import Rooms from "../models/RoomModel.js";
import Bookings from "../models/BookingModel.js";
import Users from "../models/UserModel.js";

export const getRoomReviews = async (req, res) => {
    try {
        const response = await Rooms.findAll({
            attributes: ["id", "name", "avgRating", "totalBooking"],
            include: [
                {
                    model: Bookings,
                    required: true,
                    attributes: ["id", "rating", "review", "updatedAt"],
                    include: [
                        {
                            model: Users,
                            required: true,
                            attributes: ["id", "name", "photo"],
                        },
                    ],
                },
            ],
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getRoomReviewById = async (req, res) => {
    try {
        const response = await Rooms.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "name", "avgRating", "totalBooking"],
            include: [
                {
                    model: Bookings,
                    required: true,
                    attributes: ["id", "rating", "review", "updatedAt"],
                    include: [
                        {
                            model: Users,
                            required: true,
                            attributes: ["id", "name", "photo"],
                        },
                    ],
                },
            ],
        });

        if (!response) {
            return res.status(404).json({ msg: "Room not found" });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
