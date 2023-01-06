const router = require("express").Router();

const jwt = require("jsonwebtoken");

const {
  riderRegister,
  riderLogin,
  allRiders,
  changeDetails,
  verifyRider,
  updatePassword,
} = require("../controller/riderController.js");

router.post("/register", riderRegister);
router.post("/login", riderLogin);
router.get("/allriders", verifyToken, allRiders);
router.put("/:id", verifyToken, changeDetails);
router.get("/verify/:id", verifyRider);
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
