import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

const SignUp = () => {
  // State that is used to store errors
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    contact: null,
    password: null,
  });

  // For navigating somewhere
  const navigate = useNavigate();

  // State that is storing the values user is entering
  const [user, setUser] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    vehicleNo: "",
  });

  useEffect(() => {
    // Getting role of the user from the local storage and then redirecting the user to the specifeid page
    const role = JSON.parse(localStorage.getItem("role"));
    // console.log(auth);
    if (role) {
      if (role === "rider") {
        navigate("/bookride");
      } else if (role === "driver") {
        navigate("/pickride");
      }
    }
  });

  // Function that is changing the values of the user
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  //Function that validates the values that user have enntered
  const validate = (user) => {
    const { name, contact, email, password } = user;
    if (!name || !contact | !email | !password) {
      setErrors({
        name: "Please enter your name",
        contact: "Please enter your contact",
        email: "Please enter your email",
        password: "Please enter your password",
      });
      return false;
    }
    return true;
  };

  //When a rider signs up this function is called and it sends the data of user to the backend.
  const riderSignUp = async () => {
    const { name, contact, email, password } = user;
    if (validate(user)) {
      let result = await fetch("http://localhost:5000/rider/register", {
        method: "post",
        body: JSON.stringify({
          name,
          contact,
          email,
          password,
          status: "free",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result);
      if (result.auth) {
        //Setting the values in local storage for future use.
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        localStorage.setItem("role", JSON.stringify(result.role));

        navigate("/bookride");
      } else {
        alert(result.result);
      }
    } else {
      return;
    }
  };

  //When a driver signs up this function is called.
  const driverSignup = async () => {
    let { name, contact, vehicleNo, email, password } = user;
    vehicleNo = vehicleNo.toUpperCase();
    if (validate(user)) {
      if (!vehicleNo) {
        alert("Please enter Vehicle No.");
        return;
      }
      let result = await fetch("http://localhost:5000/driver/register", {
        method: "post",
        body: JSON.stringify({
          name,
          contact,
          vehicleNo,
          email,
          password,
          status: "free",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result);

      if (result.auth) {
        //Setting the values in local storage for future use.
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        localStorage.setItem("role", JSON.stringify(result.role));

        navigate("/pickride");
      } else {
        alert(result.result);
      }
    } else {
      return;
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Register</h2>
              <p className=" mb-3">Please enter your details!</p>

              <MDBInput
                wrapperClass="mb-4 w-100"
                label="Full Name"
                id="formControlLg"
                type="text"
                size="lg"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
                autoComplete="off"
              />

              {/* When name feild is empty the error is shown */}
              {errors.name && !user.name ? (
                <p className="text-red-500">{errors.name}</p>
              ) : null}

              <MDBInput
                wrapperClass="mb-4 w-100"
                label="Contact"
                placeholder="03xxxxxxxxx"
                type="number"
                size="lg"
                name="contact"
                value={user.contact}
                onChange={handleChange}
                required
                autoComplete="off"
              />

              {/* When contact feild is empty the error is shown */}
              {errors.contact && !user.contact ? (
                <p className="text-red-500">{errors.contact}</p>
              ) : null}

              <MDBInput
                wrapperClass="mb-4 w-100"
                label="Vehicle No. (for Drivers)"
                placeholder="XXX-XXXX"
                type="text"
                size="lg"
                name="vehicleNo"
                value={user.vehicleNo}
                onChange={handleChange}
                autoComplete="off"
              />

              <MDBInput
                wrapperClass="mb-4 w-100"
                label="Email address"
                placeholder="email@address.com"
                type="email"
                size="lg"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                autoComplete="off"
              />

              {/* When email feild is empty the error is shown */}
              {errors.email && !user.email ? (
                <p className="text-red-500">{errors.email}</p>
              ) : null}

              <MDBInput
                wrapperClass="mb-4 w-100"
                label="Password"
                type="password"
                size="lg"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
                autoComplete="off"
              />

              {/* When password feild is empty the error is shown */}
              {errors.password && !user.password ? (
                <p className="text-red-500">{errors.password}</p>
              ) : null}

              <MDBBtn color="success" size="lg" onClick={riderSignUp}>
                Sign Up as a Rider
              </MDBBtn>

              <hr className="my-1" />

              <MDBBtn color="success" size="lg" onClick={driverSignup}>
                Sign Up as a Driver
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default SignUp;
