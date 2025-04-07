const BookingModel = require("../../models/mentorship/bookingModel.js");
const ServiceModel = require("../../models/mentorship/serviceModel.js");
const StudentModel = require("../../models/studentModel.js");
const MentorModel = require("../../models/mentorModel.js");
const httpsStatusCode = require("../../constant/httpsStatusCode.js");

const  Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const generateZoomLink = () => {
  return `https://zoom.us/j/${Math.floor(1000000000 + Math.random() * 9000000000)}`;
};

const createBooking = async (req, res) => {
  try {
    const { serviceId } = req.body;
    const menteeId = req.user.user.userId;

    const service = await ServiceModel.findById(serviceId);
    if (!service) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        status: false,
        message: "Service not found",
      });
    }
    const mentorId = service.user;

    const existingBooking = await BookingModel.findOne({
      mentee: menteeId,
      service: serviceId,
      status: { $in: ["pending", "accepted"] },
    });

    if (existingBooking) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        status: false,
        message: "You already have a pending or accepted booking for this service",
      });
    }

    const booking = new BookingModel({
      mentor: mentorId,
      mentee: menteeId,
      service: serviceId,
      status: "pending",
    });

    await booking.save();

    // Booking push to mentee
    await StudentModel.findByIdAndUpdate(menteeId, {
      $push: { bookings: booking._id },
    });

    // booking add to service
    await ServiceModel.findByIdAndUpdate(serviceId, {
      $push: { bookings: booking._id },
    });

    // booking add to mentor
    await MentorModel.findByIdAndUpdate(mentorId, {
      $push: { bookings: booking._id },
    });

    return res.status(201).json({
      status: true,
      message: "Booking request sent to mentor",
      data: booking,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const respondToBooking = async (req, res) => {
  try {
    const { status } = req.body;
    const bookingId = req.params.id;
    const mentorId = req.user.user.userId;

    const booking = await BookingModel.findById(bookingId);
    if (!booking) {
      return res
        .status(400)
        .json({ status: false, message: "Booking not found" });
    }

    if (booking.mentor.toString() !== mentorId) {
      return res
        .status(403)
        .json({ status: false, message: "Unauthorized action" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        status: false,
        message: "Booking already responded to",
      });
    }

    if (status === "accepted") {
      booking.status = "accepted";
      booking.bookingDate = req.body.bookingDate;
      await booking.save();
      return res.json({
        status: true,
        message: "Booking accepted. Awaiting payment.",
        data: booking,
      });
    } else if (status === "declined") {
      booking.status = "declined";
      await booking.save();
      return res.json({
        status: true,
        message: "Booking declined.",
        data: booking,
      });
    } else {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        status: false,
        message: "Invalid status",
      });
    }
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: error.message,
    });
  }
};


const initiatePayment = async (req, res) => {
  try {
    const  bookingId  = req.params.id;
    const booking = await BookingModel.findById(bookingId).populate("service");

    if (!booking || booking.status !== "accepted") {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        status: false,
        message: "Invalid booking or payment not allowed",
      });
    }

    const order = await razorpay.orders.create({
      amount: booking.service.price * 100, // Convert to paise
      currency: "INR",
      receipt: bookingId,
    });

    booking.razorpayOrderId = order.id;
    await booking.save();

    return res.json({
      status: true,
      message: "Payment initiated",
      order,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: error.message,
    });
  }
};


// Verify payment
const verifyPayment = async (req, res) => {
  try {
    const {
      bookingId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    const booking = await BookingModel.findById(bookingId);
    if (!booking) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        status: false,
        message: "Booking not found",
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(httpsStatusCode.BAD_REQUEST).json({
        status: false,
        message: "Payment verification failed",
      });
    }

    // Mark payment as completed
    booking.paymentStatus = "completed";
    booking.status = "paid";

    booking.zoomLink = generateZoomLink();
    booking.razorpayPaymentId = razorpay_payment_id;
booking.razorpaySignature = razorpay_signature;

    await booking.save();

    return res.json({
      status: true,
      message: "Payment verified, booking confirmed",
      data: booking,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: error.message,
    });
  }
};



// Get all bookings for mentor
const getMentorBookings = async (req, res) => {
  try {
    const mentorId = req.user.user.userId;
    const bookings = await BookingModel.find({ mentor: mentorId }).populate('service').populate('mentee');

    if (!bookings) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        status: false,
        message: "Bookings not found",
      });
    }

    return res.json({
      status: true,
      data: bookings,
    });
  } catch (error) {
    return res.status(httpsStatusCode.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: error.message,
    });
  }
};



// Get all bookings for mentee
const getStudentBookings = async (req, res) => {
  try {
    const StudentId = req.user.user.userId;
    const bookings = await BookingModel.find({ mentee: StudentId }).populate('service').populate('mentor');

    if (!bookings) {
      return res.status(httpsStatusCode.NOT_FOUND).json({
        status: false,
        message: "Bookings not found",
      });
    }
    return res.json({
      status: true,
      data: bookings,
    });
  } catch (error) {
    return res
      .status(httpsStatusCode.INTERNAL_SERVER_ERROR)
      .json({ 
        status: false, 
        message: error.message 
    });
  }
};

const getStudentBookingById = async (req, res) => {
  const { id } = req.params;
  const studentId = req.user.user.userId;

  const booking = await BookingModel.findOne({ _id: id, mentee: studentId }).populate("service").populate("mentor");

  if (!booking) {
    return res.status(404).json({ status: false, message: "Booking not found" });
  }

  res.json({ status: true, data: booking });
};

module.exports = {
  createBooking,
  respondToBooking,
  initiatePayment,
  verifyPayment,
  getMentorBookings,
  getStudentBookings,
  getStudentBookingById,
};
