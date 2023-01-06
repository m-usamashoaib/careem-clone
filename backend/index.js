require("dotenv").config();

//Required Modules
const express = require("express");
const cors = require("cors");

const connection = require("./db/config.js");
connection();

const Port = process.env.PORT || 5000;

//Routes
const riderRoutes = require("./routes/riderRoutes");
const driverRoutes = require("./routes/driverRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

//Middlewares
app.use(cors());

app.use(express.json());

//Rider Routes
app.use("/rider", riderRoutes);

//Driver Routes
app.use("/driver", driverRoutes);

//Booking Routes
app.use("/bookings", bookingRoutes);

app.listen(Port, () => {
  console.log(`Listening on http://localhost:${Port}`);
});
