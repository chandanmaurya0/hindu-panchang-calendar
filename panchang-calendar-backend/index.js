const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


const port = 8080;

// import dotenv
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// import routers
const panchangRouter = require("./api/routes/panchang.route");


// use routers
app.use("/v1/panchang", panchangRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
