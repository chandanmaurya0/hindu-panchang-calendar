const express = require("express");

const router = express.Router();


const {get_basic_panchang_details, get_monthly_panchang_details, get_pooja_vrat_details} = require("../controllers/panchang.controller");

// endpoint to get panchnag details
router.post('/basic-panchang-details', get_basic_panchang_details);

// endpoint to get monthly panchnag details
router.post('/monthly-panchang-details', get_monthly_panchang_details);


// endpoint to get pooja and vrat details
router.post('/pooja-vrat-details', get_pooja_vrat_details);


module.exports = router;