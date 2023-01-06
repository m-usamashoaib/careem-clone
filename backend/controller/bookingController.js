const Booking = require("../models/Booking");
const jsonResponse = require("../utils/jsonResponse");
const { sendMail } = require("./mailController.js");

const addBooking = async (req, res) => {
  try {
    let booking = new Booking(req.body);
    let result = await booking.save();
    result = result.toObject();
    console.log(`${booking.riderName} requested a ride`);

    sendMail(booking, "request");

    jsonResponse(res, 200, null, booking);
  } catch (error) {
    jsonResponse(res, 500, error.message);
  }
};

const previousBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({
      $or: [{ riderName: req.params.name }, { driverName: req.params.name }],
    });
    if (bookings.length > 0) {
      jsonResponse(res, 200, null, bookings);
    } else {
      jsonResponse(res, 400, "No Bookings found");
    }
  } catch (error) {
    jsonResponse(res, 500, error.message);
  }
};
const requestedBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({
      $and: [{ status: "request" }, { driverName: req.params.name }],
    });
    if (bookings.length > 0) {
      jsonResponse(res, 200, null, bookings);
    } else {
      jsonResponse(res, 400, "No Bookings found");
    }
  } catch (error) {
    jsonResponse(res, 500, error.message);
  }
};

const changeDetails = async (req, res) => {
  try {
    let result = await Booking.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    console.log(req.body.status);
    if (req.body.status == "accepted") {
      // console.log(req.body);
      sendMail(req.body.booking, "accept");
    }
    if (req.body.status == "completed") {
      // console.log(req.body);
      sendMail(req.body.booking, "completed");
    }
    jsonResponse(res, 200, null, result);
  } catch (error) {
    jsonResponse(res, 500, error.message);
  }
};

const checkBooking = async (req, res) => {
  try {
    let booking = await Booking.find({ _id: req.params.id });
    jsonResponse(res, 200, null, booking);
  } catch (error) {
    jsonResponse(res, 500, error.message);
  }
};
module.exports = {
  addBooking,
  previousBooking,
  requestedBooking,
  changeDetails,
  checkBooking,
};
