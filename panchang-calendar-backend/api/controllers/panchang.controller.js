const axios = require("axios");
const yup = require("yup");

const { schemaValidator } = require("../middlewares/yupSchemaValidator");

const { cache_daily_panchang_data } = require("../services/panchang.service");
const DailyPanchangModel = require("../models/DailyPanchang.model");

// Get daily basic panchang details
const get_basic_panchang_details = async (req, res) => {
  try {
    // create yup schema to validate request body
    const schema = yup.object().shape({
      day: yup.number().required("Day is required!"),
      month: yup.number().required("Month is required!"),
      year: yup.number().required("Year is required!"),
      hour: yup.number().required("Hour is required!"),
      min: yup.number().required("Minute is required!"),
      lat: yup.number().required("Latitude is required!"),
      lon: yup.number().required("Longitude is required!"),
      tzone: yup.number().required("Timezone is required!"),
      city: yup.string().required("City is required!"),
      region: yup.string().required("Region is required!"),
    });

    // validate request body
    const validationResult = await schemaValidator(req.body, schema);
    if (!validationResult.status) {
      return res.status(400).json({
        message: validationResult.message,
      });
    }

    // form date in dd-mm-yyyy format
    let day = req.body.day.toString().padStart(2, "0");
    let month = req.body.month.toString().padStart(2, "0");
    let year = req.body.year.toString();
    let panchang_d_m_y = `${day}-${month}-${year}`;

    let user_id = process.env.ASTRO_USER_ID;
    let api_key = process.env.ASTRO_API_KEY;

    // generate auth token
    let authToken =
      "Basic " + Buffer.from(user_id + ":" + api_key).toString("base64");

    // fetch basic panchang details from astrology API
    const response = await axios.post(
      "https://json.astrologyapi.com/v1/basic_panchang",
      req.body,
      {
        headers: {
          authorization: authToken,
          "Content-Type": "application/json",
        },
      }
    );

    let basicPanchangDetails = response.data;

    // cache daily panchang data

    // cache daily panchang data
    cache_daily_panchang_data(
      panchang_d_m_y,
      req.body.city,
      req.body.region,
      basicPanchangDetails
    ).then((cacheResponse) => {
      console.log(cacheResponse);
    });

    return res.status(200).json({
      message: "Basic panchang details fetched successfull",
      data: basicPanchangDetails,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get monthly dates and panchnag details
const get_monthly_panchang_details = async (req, res) => {
  try {
    // create yup schema to validate request body
    const schema = yup.object().shape({
      month: yup.number().required("Month is required!"),
      year: yup.number().required("Year is required!"),
      city: yup.string().required("City is required!"),
      region: yup.string().required("Region is required!"),
    });

    // validate request body
    const validationResult = await schemaValidator(req.body, schema);
    if (!validationResult.status) {
      return res.status(400).json({
        message: validationResult.message,
      });
    }

    // Generate array of all dates in the given month and year
    const daysInMonth = new Date(req.body.year, req.body.month, 0).getDate();
    const dateArray = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDay = day.toString().padStart(2, "0");
      const formattedMonth = req.body.month.toString().padStart(2, "0");
      const dateStr = `${formattedDay}-${formattedMonth}-${req.body.year}`;
      dateArray.push(dateStr);
    }

    // Fetch sunrise and sunset data for all dates from database
    const panchangDataFromDB = await Promise.all(
      dateArray.map(async (date) => {
        // Query the database for each date
        const dbData = await DailyPanchangModel.findOne({
          date: date,
          city: req.body.city,
          region: req.body.region,
        }).select("sunrise sunset tithi nakshatra");

        return {
          date: date,
          day: parseInt(date.split("-")[0]), // Extract day number for easier matching
          data: dbData || null,
        };
      })
    );

    // Create a lookup map for quicker access
    const dateDataMap = {};
    panchangDataFromDB.forEach((item) => {
      if (item.data) {
        dateDataMap[item.day] = item.data;
      }
    });

    return res.status(200).json({
      message: "Monthly panchang details fetched successfully",
      data: dateDataMap,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get pooja and vrat details for given date
const get_pooja_vrat_details = async (req, res) => {
  try {
    // create yup schema to validate request body
    const schema = yup.object().shape({
      day: yup.number().required("Day is required!"),
      month: yup.number().required("Month is required!"),
      year: yup.number().required("Year is required!"),
      city: yup.string().required("City is required!"),
      region: yup.string().required("Region is required!"),
    });

    // validate request body
    const validationResult = await schemaValidator(req.body, schema);
    if (!validationResult.status) {
      return res.status(400).json({
        message: validationResult.message,
      });
    }

    // form date in dd-mm-yyyy format
    let day = req.body.day.toString().padStart(2, "0");
    let month = req.body.month.toString().padStart(2, "0");
    let year = req.body.year.toString();
    let panchang_d_m_y = `${day}-${month}-${year}`;

    let sample_data = [
      {
        type: "POOJA",
        title: "Pooja 1",
        description: "Description 1",
        page_url: "/pooja-1",
      },
      {
        type: "POOJA",
        title: "Pooja 2",
        description: "Description 2",
        page_url: "/pooja-2",
      },
      {
        type: "VRAT",
        title: "Vrat 1",
        description: "Description 1",
        page_url: "/vrat-1",
      },
      {
        type: "VRAT",
        title: "Vrat 2",
        description: "Description 2",
        page_url: "/vrat-2",
      },
    ];

    return res.status(200).json({
      message: "Pooja and vrat details fetched successfully",
      data: sample_data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  get_basic_panchang_details,
  get_monthly_panchang_details,
  get_pooja_vrat_details
};
