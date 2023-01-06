const router = require("express").Router();

const jwt = require("jsonwebtoken");

const {
  driverRegister,
  driverLogin,
  allDrivers,
  freeDrivers,
  addRating,
  changeDetails,
  verifyDriver,
  updatePassword,
} = require("../controller/driverController");

router.post("/register", driverRegister);
router.post("/login", driverLogin);
router.get("/alldrivers", verifyToken, allDrivers);
router.get("/free", verifyToken, freeDrivers);
router.put("/rating/:contact", verifyToken, addRating);
router.put("/:id", verifyToken, changeDetails);
router.get("/verify/:id", verifyDriver);
router.put("/updatepassword/:id", verifyToken, updatePassword);

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
