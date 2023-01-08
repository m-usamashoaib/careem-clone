import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import BookRide from "./Pages/BookRide";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import PreviousRides from "./Pages/PreviousRides";
import Profile from "./Pages/Profile";
import PickRide from "./Pages/PickRide";

import io from "socket.io-client";
import { PORT } from "./env";
import { useEffect } from "react";
// import { useEffect } from "react";

const socket = io.connect(`http://localhost:${PORT}`);

function App() {
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));

    console.log(user);
    // console.log(user.email);
    if (user) {
      socket.emit("join", user.email);
    }
  }, []);

  return (
    <>
      {/* Making routes in the app */}
      <BrowserRouter>
        {/* Navbar component */}
        <Nav />

        <Routes>
          {/* Routes that are only accessible to the logged in user */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/bookride" element={<BookRide socket={socket} />} />
            <Route path="/pickride" element={<PickRide socket={socket} />} />
            <Route path="/previousrides" element={<PreviousRides />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Routes that are acessible to the guest */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login socket={socket} />} />
        </Routes>

        {/* Footer Component */}
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
