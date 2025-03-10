const mongoose = require("../utils/mongoDB");

// Create schema for daily panchang details
const DailyPanchangSchema = new mongoose.Schema({
  date: {
    type: String, // date format - dd-mm-yyyy
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  sunrise: {
    type: String,
    required: true,
  },
  sunset: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: false,
  },
  tithi: {
    type: String,
    required: false,
  },
  nakshatra: {
    type: String,
    required: false,
  },
  yog: {
    type: String,
    required: false,
  },
  karan: {
    type: String,
    required: false,
  },
  vedic_sunrise: {
    type: String,
    required: false,
  },
  vedic_sunset: {
    type: String,
    required: false,
  },
  last_updated_timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("daily_panchang", DailyPanchangSchema);
