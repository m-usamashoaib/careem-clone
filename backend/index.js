require("dotenv").config();

//Required Modules
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const connection = require("./db/config.js");
connection();
const server = http.createServer(app);

const Port = process.env.PORT || 5000;

//Routes
const riderRoutes = require("./routes/riderRoutes");
const driverRoutes = require("./routes/driverRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

//Middlewares
app.use(cors());

app.use(express.json());

//Rider Routes
app.use("/rider", riderRoutes);

//Driver Routes
app.use("/driver", driverRoutes);

//Booking Routes
app.use("/bookings", bookingRoutes);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let users = [];

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join", (data) => {
    users = users.filter((item) => item.email !== data && item.id !== socket);
    users.push({ id: socket.id, email: data });
  });

  socket.on("d_status", (data) => {
    const email = data.booking.riderEmail;
    // console.log(email);
    const isFound = users.filter((item) => item.email === email);
    if (isFound.length === 1) {
      // console.log(data);
      socket.to(isFound[0].id).emit("r_status", data);
    }
  });
  socket.on("r_request", (data) => {
    const email = data.booking.driverEmail;
    // console.log(email);
    const isFound = users.filter((item) => item.email === email);
    if (isFound.length === 1) {
      // console.log(isFound);
      // console.log(data);
      socket.to(isFound[0].id).emit("d_request", data.booking);
    }
  });
});

server.listen(Port, () => {
  console.log(`Listening on http://localhost:${Port}`);
});
