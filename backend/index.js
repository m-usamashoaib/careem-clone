const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("./db/config");
const Rider = require("./models/Rider");
const Driver = require("./models/Driver");
const Booking = require("./models/Booking");

const jwtKey = "careem";
const app = express();

app.use(cors());
app.use(express.json());

app.post("/rider/register", async (req, res) => {
  let rider = new Rider(req.body);
  let result = await rider.save();
  result = result.toObject();
  delete result.password;
  console.log(`${rider.name} registered as a Rider`);
  jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.status(400).send("Something went wrong");
    }
    res.status(200).send({ role: "rider", result, auth: token });
  });
});

app.post("/driver/register", async (req, res) => {
  let driver = new Driver(req.body);
  let result = await driver.save();
  result = result.toObject();
  delete result.password;
  console.log(`${driver.name} registered as a Driver`);
  jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.status(400).send("Something went wrong");
    }
    res.status(200).send({ role: "driver", result, auth: token });
  });
});

app.post("/rider/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    // console.log(req.body);
    let rider = await Rider.findOne({ email: req.body.email });
    // console.log(rider);
    if (rider) {
      // console.log("rider found");
      let compare = await bcrypt.compare(req.body.password, rider.password);
      if (compare) {
        // console.log("password found");
        jwt.sign({ rider }, jwtKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            res.status(400).send("Something went wrong");
          }
          res.status(200).send({ role: "rider", rider, auth: token });
        });
      } else {
        res.status(400).send({ result: "Please enter correct password" });
      }
    } else {
      res.status(400).send({ result: "No user found" });
    }
  } else {
    res.status(400).send({ result: "Please enter email & password" });
  }
});

app.post("/driver/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    // console.log(req.body);
    let driver = await Driver.findOne({ email: req.body.email });
    // console.log(driver);
    if (driver) {
      // console.log("driver found");
      let compare = await bcrypt.compare(req.body.password, driver.password);
      if (compare) {
        // console.log("password found");
        jwt.sign({ driver }, jwtKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            res.status(400).send("Something went wrong");
          }
          res.status(200).send({ role: "driver", driver, auth: token });
        });
      } else {
        res.status(400).send({ result: "Please enter correct password" });
      }
    } else {
      res.status(400).send({ result: "No driver found with this email" });
    }
  } else {
    res.status(400).send({ result: "Please enter email & password" });
  }
});

app.get("/drivers", verifyToken, async (req, res) => {
  const drivers = await Driver.find().select("-password");
  if (drivers.length > 0) {
    res.status(200).send(drivers);
  } else {
    res.status(400).send({ result: "No drivers found" });
  }
});

app.get("/riders", verifyToken, async (req, res) => {
  const riders = await Rider.find().select("-password");
  if (riders.length > 0) {
    res.status(200).send(riders);
  } else {
    res.status(400).send({ result: "No Riders found" });
  }
});

app.post("/addbooking", async (req, res) => {
  let booking = new Booking(req.body);
  let result = await booking.save();
  result = result.toObject();
  console.log(`${booking.riderName} requested a ride`);
  res.status(200).send({ booking });
});

app.get("/bookings/request/:name", verifyToken, async (req, res) => {
  const bookings = await Booking.find({
    $and: [{ status: "request" }, { driverName: req.params.name }],
  });
  if (bookings.length > 0) {
    res.status(200).send(bookings);
  } else {
    res.status(400).send({ result: "No Bookings found" });
  }
});
app.put("/booking/:id", verifyToken, async (req, res) => {
  let result = await Booking.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.status(200).send({ result });
});

// app.put("/booking/rating/:id", verifyToken, async (req, res) => {
//   let result = await Booking.updateOne(
//     { _id: req.params.id },
//     { $addToSet: { rating: req.body.rating } }
//   );
//   res.status(200).send({ result });
// });

app.get("/drivers/free", verifyToken, async (req, res) => {
  const drivers = await Driver.find({ status: "free" });
  res.status(200).send(drivers);
});

app.put("/rider/:id", verifyToken, async (req, res) => {
  let result = await Rider.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.status(200).send(result);
});
app.put("/driver/:id", verifyToken, async (req, res) => {
  let result = await Driver.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.status(200).send(result);
});

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(400).send({ result: "Please provide valid Token" });
      } else {
        next();
      }
    });
  } else {
    res.status(400).send("Please add token");
  }
}

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
