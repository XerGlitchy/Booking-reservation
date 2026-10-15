
const mongoose = require("mongoose");
const Reservation = require("../models/Reservation");

// GET: Retrieve all reservations
const getReservations = async (req, res) => {
  try {
    const { search, status } = req.query;

    const filter = {};

    if (search && search.trim()) {
      const keyword = search.trim();

      filter.$or = [
        { guestName: { $regex: keyword, $options: "i" } },
        {
          bookingReference: {
            $regex: keyword,
            $options: "i"
          }
        }
      ];
    }

    if (status) {
      filter.status = status;
    }

    const reservations = await Reservation.find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve reservations"
    });
  }
};

// GET: Retrieve one reservation by ID
const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid reservation ID"
      });
    }

    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found"
      });
    }

    res.status(200).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve reservation"
    });
  }
};

module.exports = {
  getReservations,
  getReservationById
};
