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
  let compareEmail = await Rider.find({ email: req.body.email });
  // console.log(req.body.email);
  // console.log(compareEmail);
  if (compareEmail.length === 0) {
    let compareContact = await Rider.find({ contact: req.body.contact });
    if (compareContact.length === 0) {
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
    } else {
      res.status(400).send({
        result:
          "This contact no is already associated with an account. Please try a different one.",
      });
    }
  } else {
    res.status(400).send({
      result:
        "This email is already associated with an account. Please try a different one.",
    });
  }
});

app.post("/driver/register", async (req, res) => {
  let compareEmail = await Driver.find({ email: req.body.email });
  console.log(req.body.email);
  console.log(compareEmail);
  if (compareEmail.length === 0) {
    let compareContact = await Driver.find({ contact: req.body.contact });
    if (compareContact.length === 0) {
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
    } else {
      res.status(400).send({
        result:
          "This contact no is already associated with an account. Please try a different one.",
      });
    }
  } else {
    res.status(400).send({
      result:
        "This email is already associated with an account. Please try a different one.",
    });
  }
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

app.post("/addbooking", verifyToken, async (req, res) => {
  let booking = new Booking(req.body);
  let result = await booking.save();
  result = result.toObject();
  console.log(`${booking.riderName} requested a ride`);
  res.status(200).send({ booking });
});

app.get("/bookings/:name", verifyToken, async (req, res) => {
  const bookings = await Booking.find({
    $or: [{ riderName: req.params.name }, { driverName: req.params.name }],
  });
  if (bookings.length > 0) {
    res.status(200).send(bookings);
  } else {
    res.status(400).send({ result: "No Bookings found" });
  }
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

app.put("/driver/rating/:contact", verifyToken, async (req, res) => {
  let result = await Driver.updateOne(
    { contact: req.params.contact },
    { $push: { ratings: req.body.rating } }
  );
  res.status(200).send({ result });
});

// app.get("/driver/rating/:contact", verifyToken, async (req, res) => {
//   let result = await Driver.aggregate([{ $addFields: {} }]);
//   res.status(200).send({ result });
// });

app.get("/booking/:id", verifyToken, async (req, res) => {
  let booking = await Booking.find({ _id: req.params.id });
  res.status(200).send({ booking });
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

app.put("/rider/updatepassword/:id", verifyToken, async (req, res) => {
  let rider = await Rider.findOne({ _id: req.params.id });
  if (rider) {
    let compare = await bcrypt.compare(req.body.curPassword, rider.password);
    if (compare) {
      let hashPassword = await bcrypt.hash(req.body.newPassword, 10);
      let data = await Rider.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { password: hashPassword } }
      );
      res.status(200).send({ result: data });
    } else {
      res.status(400).send({ result: "Incorrect Current Password" });
    }
  } else {
    res.status(400).send({ result: "No user found" });
  }
});

app.put("/driver/:id", verifyToken, async (req, res) => {
  let result = await Driver.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.status(200).send(result);
});

app.put("/driver/updatepassword/:id", verifyToken, async (req, res) => {
  let driver = await Driver.findOne({ _id: req.params.id });
  if (driver) {
    let compare = await bcrypt.compare(req.body.curPassword, driver.password);
    if (compare) {
      let hashPassword = await bcrypt.hash(req.body.newPassword, 10);
      let data = await Driver.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { password: hashPassword } }
      );
      res.status(200).send({ result: data });
    } else {
      res.status(400).send({ result: "Incorrect Current Password" });
    }
  } else {
    res.status(400).send({ result: "No user found" });
  }
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
