import { Op } from "sequelize";
import Bookings from "../models/BookingModel.js";

export const updateBookingStatus = async () => {
    const currentDate = new Date().toISOString().slice(0, 10);

    // Update status to "Checkout" when current date is greater than or equal to end date
    await Bookings.update(
        { status: "Checkout" },
        {
            where: {
                endDate: { [Op.lte]: currentDate },
                status: { [Op.notIn]: ["Done", "Checkout"] },
            },
        }
    );

    // Update status to "Processed" when current date is greater than or equal to start date
    await Bookings.update(
        { status: "Processed" },
        {
            where: {
                startDate: { [Op.lte]: currentDate },
                status: { [Op.notIn]: ["Done", "Checkout", "Processed"] },
            },
        }
    );
};
