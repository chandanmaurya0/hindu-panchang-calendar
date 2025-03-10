// import models
const DailyPanchangModel = require("../models/DailyPanchang.model");

// Method to cache daily panchang data based on date, city and region
const cache_daily_panchang_data = async (date, city, region, data) => {
  try {
    // check if data already exists in cache
    let dailyPanchangData = await DailyPanchangModel.findOne({
      date: date,
      city: city,
      region: region,
    });

    // if data does not exist, create new data
    if (!dailyPanchangData) {
      let newDailyPanchangData = new DailyPanchangModel({
        date: date,
        city: city,
        region: region,
        sunrise: data.sunrise,
        sunset: data.sunset,
        day: data.day,
        tithi: data.tithi,
        nakshatra: data.nakshatra,
        yog: data.yog,
        karan: data.karan,
        vedic_sunrise: data.vedic_sunrise,
        vedic_sunset: data.vedic_sunset,
        last_updated_timestamp: new Date().toUTCString(),
      });

      await newDailyPanchangData.save();
    }

    return {
      status: true,
      message: "Daily panchang data cached successfully!",
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      message: "Failed to cache daily panchang",
    };
  }
};

module.exports = {
  cache_daily_panchang_data,
};
