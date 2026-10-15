
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    guestName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    accommodationType: {
      type: String,
      required: true
    },
    checkIn: {
      type: Date,
      required: true
    },
    checkOut: {
      type: Date,
      required: true
    },
    guestCount: {
      type: Number,
      required: true,
      min: 1
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Checked In",
        "Checked Out",
        "Cancelled"
      ],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Reservation",
  reservationSchema
);
