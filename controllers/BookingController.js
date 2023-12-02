import Bookings from "../models/BookingModel.js";
import Rooms from "../models/RoomModel.js";
import Users from "../models/UserModel.js";
import sequelize from "sequelize";

export const getBookings = async (req, res) => {
    try {
        let response;

        if (req.role === "Admin") {
            response = await Bookings.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                include: [
                    {
                        model: Rooms,
                        required: true,
                        attributes: ["id", "name", "category", "description", "regency", "currentPrice", "avgRating"],
                    },
                    {
                        model: Users,
                        required: true,
                        attributes: {
                            exclude: ["password", "createdAt", "updatedAt"],
                        },
                    },
                ],
            });
        } else {
            response = await Bookings.findAll({
                where: {
                    userId: req.userId,
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                include: {
                    model: Rooms,
                    required: true,
                    attributes: ["id", "name", "category", "description", "regency", "currentPrice", "avgRating"],
                },
            });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getBookingById = async (req, res) => {
    try {
        let response;

        if (req.role === "Admin") {
            response = await Bookings.findOne({
                where: {
                    id: req.params.id,
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                include: [
                    {
                        model: Rooms,
                        required: true,
                        attributes: ["id", "name", "category", "description", "regency", "currentPrice", "avgRating"],
                    },
                    {
                        model: Users,
                        required: true,
                        attributes: {
                            exclude: ["password", "createdAt", "updatedAt"],
                        },
                    },
                ],
            });
        } else {
            response = await Bookings.findOne({
                where: {
                    id: req.params.id,
                    userId: req.userId,
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                include: {
                    model: Rooms,
                    required: true,
                    attributes: ["id", "name", "category", "description", "regency", "currentPrice", "avgRating"],
                },
            });
        }

        if (!response) {
            return res.status(404).json({ msg: "Booking not found" });
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createBooking = async (req, res) => {
    const { roomId, startDate, endDate, totalRoom } = req.body;

    const startDateDate = new Date(startDate);
    const endDateDate = new Date(endDate);

    const diffTime = Math.abs(endDateDate - startDateDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    try {
        const room = await Rooms.findOne({
            where: {
                id: roomId,
            },
        });

        if (!room) {
            return res.status(404).json({ msg: "Room not found" });
        }

        await Bookings.create({
            roomId: room.id,
            userId: req.userId,
            startDate: startDate,
            endDate: endDate,
            totalRoom: totalRoom,
            totalPrice: totalRoom * room.currentPrice * diffDays,
            status: "Pending",
            review: "null",
        });

        await Rooms.update(
            {
                roomQty: room.roomQty - totalRoom,
            },
            {
                where: {
                    id: room.id,
                },
            }
        );

        res.status(201).json({ msg: "Booking created successfully" });
    } catch (error) {
        const messages = error.message.split("\n").map((msg) => msg.replace("Validation error: ", ""));
        const singleMessage = messages.join(" ");
        res.status(400).json({ msg: singleMessage });
    }
};

export const updateBooking = async (req, res) => {
    const booking = await Bookings.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!booking) {
        return res.status(404).json({ msg: "Booking not found" });
    }

    if (booking.status === "Done") {
        return res.status(400).json({ msg: "Completed bookings cannot be edited" });
    }

    const { startDate, endDate, totalRoom, rating, review } = req.body;

    try {
        if (booking.status === "Checkout") {
            if (!rating) {
                return res.status(400).json({ msg: "Rating must be filled" });
            }

            if (!review) {
                return res.status(400).json({ msg: "Review must be filled" });
            }

            await Bookings.update(
                {
                    status: "Done",
                    rating: rating,
                    review: review,
                },
                {
                    where: {
                        id: booking.id,
                    },
                }
            );

            // Update room rating
            const avgRating = await Bookings.findAll({
                attributes: [[sequelize.fn("avg", sequelize.col("rating")), "avgRating"]],
                where: {
                    roomId: booking.roomId,
                    status: "Done",
                    rating: { [sequelize.Op.ne]: null },
                },
                raw: true,
            });

            // Update total booking
            const totalBooking = await Bookings.count({
                where: {
                    roomId: booking.roomId,
                    status: "Done",
                },
            });

            // Update room qty
            const room = await Rooms.findOne({
                where: {
                    id: booking.roomId,
                },
            });

            const roomQty = room.roomQty + booking.totalRoom;

            // Update room
            await Rooms.update(
                {
                    avgRating: avgRating[0].avgRating,
                    totalBooking: totalBooking,
                    roomQty: roomQty,
                },
                {
                    where: {
                        id: room.id,
                    },
                }
            );

            res.status(200).json({ msg: "Room reviewed successfully" });
        } else if (booking.status === "Processed") {
            await Bookings.update(
                {
                    status: "Checkout",
                },
                {
                    where: {
                        id: booking.id,
                    },
                }
            );

            res.status(200).json({ msg: "Room checkout was successful" });
        } else {
            let curStartDate, curEndDate;

            if (startDate) {
                curStartDate = startDate;
            } else {
                curStartDate = booking.startDate;
            }

            if (endDate) {
                curEndDate = endDate;
            } else {
                curEndDate = booking.endDate;
            }

            const startDateDate = new Date(curStartDate);
            const endDateDate = new Date(curEndDate);

            const diffTime = Math.abs(endDateDate - startDateDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const room = await Rooms.findOne({
                where: {
                    id: booking.roomId,
                },
            });

            if (!room) {
                return res.status(404).json({ msg: "Room not found" });
            }

            await Bookings.update(
                {
                    roomId: room.id,
                    userId: req.userId,
                    startDate: curStartDate,
                    endDate: curEndDate,
                    totalRoom: totalRoom,
                    totalPrice: totalRoom * room.currentPrice * diffDays,
                },
                {
                    where: {
                        id: booking.id,
                    },
                }
            );

            await Rooms.update(
                {
                    roomQty: room.roomQty + (booking.totalRoom - totalRoom),
                },
                {
                    where: {
                        id: room.id,
                    },
                }
            );

            res.status(200).json({ msg: "Booking updated successfully" });
        }
    } catch (error) {
        const messages = error.message.split("\n").map((msg) => msg.replace("Validation error: ", ""));
        const singleMessage = messages.join(" ");
        res.status(400).json({ msg: singleMessage });
    }
};

export const deleteBooking = async (req, res) => {
    const booking = await Bookings.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!booking) {
        return res.status(404).json({ msg: "Booking not found" });
    }

    if (req.role !== "Admin" && booking.userId !== req.userId) {
        return res.status(401).json({ msg: "You are not authorized to delete this booking" });
    }

    if (!booking) {
        return res.status(404).json({ msg: "Booking not found" });
    }

    if (booking.status === "Done") {
        return res.status(400).json({ msg: "Completed bookings cannot be deleted" });
    }

    if (booking.status === "Checkout") {
        return res.status(400).json({ msg: "Checked out bookings cannot be deleted" });
    }

    if (booking.status === "Processed") {
        return res.status(400).json({ msg: "Processed bookings cannot be deleted" });
    }

    try {
        await Bookings.destroy({
            where: {
                id: booking.id,
            },
        });

        const room = await Rooms.findOne({
            where: {
                id: booking.roomId,
            },
        });

        await Rooms.update(
            {
                roomQty: room.roomQty + booking.totalRoom,
            },
            { where: { id: room.id } }
        );

        res.status(200).json({ msg: "Booking deleted successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
