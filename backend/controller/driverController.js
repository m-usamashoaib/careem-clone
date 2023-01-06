const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Driver = require("../models/Driver");
const jsonResponse = require("../utils/jsonResponse");
const { sendMail } = require("./mailController.js");

const driverRegister = async (req, res) => {
  try {
    let compareEmail = await Driver.find({ email: req.body.email });
    // console.log(req.body.email);
    // console.log(compareEmail);
    if (compareEmail.length === 0) {
      let compareContact = await Driver.find({ contact: req.body.contact });
      if (compareContact.length === 0) {
        let driver = new Driver(req.body);
        let result = await driver.save();
        result = result.toObject();
        delete result.password;
        console.log(`${driver.name} registered as a Driver`);

        sendMail(driver, "verification");

        jsonResponse(
          res,
          201,
          "An verification link has been sent to your email please verify your account.",
          result
        );
      } else {
        jsonResponse(
          res,
          409,
          "This contact number is already associated with an account. Please try a different one."
        );
      }
    } else {
      jsonResponse(
        res,
        409,
        "This email is already associated with an account. Please try a different one."
      );
    }
  } catch (error) {
    json(res, 500, error.message);
  }
};

const driverLogin = async (req, res) => {
  try {
    let driver = await Driver.findOne({ email: req.body.email });
    // console.log(driver);
    if (driver) {
      if (driver.verified === true) {
        // console.log("driver found");
        let compare = await bcrypt.compare(req.body.password, driver.password);
        if (compare) {
          // console.log("password found");
          jwt.sign(
            { driver },
            process.env.JWTKEY,
            { expiresIn: "2h" },
            (err, token) => {
              if (err) {
                jsonResponse(res, 400, err.message);
              }
              jsonResponse(res, 200, "Logged In successfully", {
                driver,
                role: "driver",
                auth: token,
              });
            }
          );
        } else {
          jsonResponse(res, 404, "Wrong Credentials");
        }
      } else {
        sendMail(driver, "verification");

        jsonResponse(
          res,
          401,
          "Unverified! An email has been sent to your account please verify you account."
        );
      }
    } else {
      jsonResponse(res, 404, "Wrong Credentials");
    }
  } catch (error) {
    jsonResponse(res, 500, error.message);
  }
};

const allDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().select("-password");
    if (drivers.length > 0) {
      jsonResponse(res, 200, null, drivers);
    } else {
      jsonResponse(res, 400, "No drivers found");
    }
  } catch (error) {
    jsonResponse(res, 500, error.message);
  }
};

const freeDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({ status: "free" });
    jsonResponse(res, 200, null, drivers);
  } catch (error) {
    jsonResponse(res, 500, error.message);
  }
};

const addRating = async (req, res) => {
  try {
    let result = await Driver.updateOne(
      { contact: req.params.contact },
      { $push: { ratings: req.body.rating } }
    );
    jsonResponse(res, 200, null, result);
  } catch (error) {
    jsonResponse(res, 500, error.message);
  }
};

const changeDetails = async (req, res) => {
  try {
    let result = await Driver.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    jsonResponse(res, 200, "Details changed successfully", result);
  } catch (error) {
    jsonResponse(res, 500, error.message);
  }
};

const verifyDriver = async (req, res) => {
  try {
    await Driver.updateOne(
      { _id: req.params.id },
      { $set: { verified: true } }
    );
    jsonResponse(res, 200, "Email verified successfully");
  } catch (error) {
    jsonResponse(res, 500, error.message);
  }
};

const updatePassword = async (req, res) => {
  try {
    let driver = await Driver.findOne({ _id: req.params.id });
    if (driver) {
      let compare = await bcrypt.compare(req.body.curPassword, driver.password);
      if (compare) {
        let hashPassword = await bcrypt.hash(req.body.newPassword, 10);
        let data = await Driver.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: { password: hashPassword } }
        );
        jsonResponse(res, 200, "Password changed successfully", data);
      } else {
        jsonResponse(res, 404, "Incorrect Current Password");
      }
    } else {
      jsonResponse(res, 400, "No user found");
    }
  } catch (error) {
    jsonResponse(res, 500, error.message);
  }
};

module.exports = {
  driverRegister,
  driverLogin,
  allDrivers,
  freeDrivers,
  addRating,
  changeDetails,
  verifyDriver,
  updatePassword,
};
