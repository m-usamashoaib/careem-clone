const router = require("express").Router();

const jwt = require("jsonwebtoken");

const {
  addBooking,
  previousBooking,
  requestedBooking,
  changeDetails,
  checkBooking,
} = require("../controller/bookingController.js");

router.post("/addbooking", verifyToken, addBooking);
router.get("/previous/:name", verifyToken, previousBooking);
router.get("/request/:name", verifyToken, requestedBooking);
router.put("/:id", verifyToken, changeDetails);
router.get("/:id", verifyToken, checkBooking);

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, process.env.JWTKEY, (err, valid) => {
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

module.exports = router;
