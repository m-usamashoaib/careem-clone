const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Rider = require("../models/Rider");

const { sendMail } = require("./mailController");
const jsonResponse = require("../utils/jsonResponse");

const riderRegister = async (req, res) => {
  try {
    //Check for the duplicate email
    let compareEmail = await Rider.find({ email: req.body.email });
    // console.log(req.body.email);
    // console.log(compareEmail);
    if (compareEmail.length === 0) {
      //checks for the duplicate contact
      let compareContact = await Rider.find({ contact: req.body.contact });
      if (compareContact.length === 0) {
        let rider = new Rider(req.body);
        let result = await rider.save();
        result = result.toObject();
        delete result.password;
        console.log(`${rider.name} registered as a Rider`);

        sendMail(rider, "verification");

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
    jsonResponse(res, 500, error.message);
  }
};

const riderLogin = async (req, res) => {
  try {
    // console.log(req.body);
    let rider = await Rider.findOne({ email: req.body.email });
    // console.log(rider);
    if (rider) {
      // console.log("rider found");
      if (rider.verified === true) {
        //comparing the user written and hashed password
        let compare = await bcrypt.compare(req.body.password, rider.password);
        if (compare) {
          // console.log("password found");
          jwt.sign(
            { rider },
            process.env.JWTKEY,
            { expiresIn: "2h" },
            (err, token) => {
              if (err) {
                jsonResponse(res, 400, err.message);
              }
              jsonResponse(res, 200, "Logged In successfully", {
                rider,
                role: "rider",
                auth: token,
              });
            }
          );
        } else {
          jsonResponse(res, 404, "Wrong Credentials");
        }
      } else {
        sendMail(rider, "verification");

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

const allRiders = async (req, res) => {
  try {
    const riders = await Rider.find().select("-password");
    if (riders.length > 0) {
      jsonResponse(res, 200, null, riders);
    } else {
      jsonResponse(res, 404, "No riders found");
    }
  } catch (error) {
    jsonResponse(res, 500, error.message);
  }
};

const changeDetails = async (req, res) => {
  try {
    let result = await Rider.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    jsonResponse(res, 200, "Details changed successfully", result);
  } catch (error) {
    jsonResponse(res, 500, error.message);
  }
};

const verifyRider = async (req, res) => {
  try {
    await Rider.updateOne({ _id: req.params.id }, { $set: { verified: true } });
    jsonResponse(res, 200, "Email verified successfully");
  } catch (error) {
    jsonResponse(res, 500, error.message);
  }
};

const updatePassword = async (req, res) => {
  try {
    let rider = await Rider.findOne({ _id: req.params.id });
    if (rider) {
      //comparing the current password
      let compare = await bcrypt.compare(req.body.curPassword, rider.password);
      if (compare) {
        let hashPassword = await bcrypt.hash(req.body.newPassword, 10);
        let data = await Rider.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: { password: hashPassword } }
        );
        jsonResponse(res, 200, "Password changed successfully", data);
      } else {
        jsonResponse(res, 404, "Incorrect Current Password");
      }
    } else {
      jsonResponse(res, 404, "No user found");
    }
  } catch (error) {
    jsonResponse(res, 500, error.message);
  }
};

module.exports = {
  riderRegister,
  riderLogin,
  allRiders,
  changeDetails,
  verifyRider,
  updatePassword,
};
