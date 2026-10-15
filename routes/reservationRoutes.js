
const express = require("express");
const router = express.Router();

const {
  getReservations,
  getReservationById
} = require("../controllers/reservationController");

// GET all reservations and search/filter
router.get("/", getReservations);

// GET one reservation by MongoDB ID
router.get("/:id", getReservationById);

module.exports = router;
