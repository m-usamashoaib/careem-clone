import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import swal from "sweetalert";
import { BACKEND_URL } from "../env";

const SignUp = () => {
  // State that is storing the values user is entering
  const [user, setUser] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    vehicleNo: "",
  });

  // State that is used to store errors
  const [errors, setErrors] = useState({
    nameError: null,
    emailError: null,
    contactError: null,
    passwordError: null,
    vehicleNoError: null,
  });

  // For navigating somewhere
  const navigate = useNavigate();

  const [fillActive, setFillActive] = useState("ridertab");

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };

  // Function that is changing the values of the user
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  //Function that validates the values that user have enntered
  const validate = (user) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const { name, contact, email, password } = user;
    if (!name) {
      setErrors({ nameError: "*Name feild is required" });
      return false;
    } else if (name.trim().length === 0) {
      setErrors({ nameError: "*Name must not contain only white spaces" });
      return false;
    }
    if (!contact) {
      setErrors({ contactError: "*Contact feild is required." });
      return false;
    } else if (contact.length !== 12) {
      setErrors({
        contactError: "*Contact must be 12 digits.",
      });
      return false;
    } else if (!contact.startsWith("92")) {
      setErrors({
        contactError: "*Contact must start wit 92.",
      });
      return false;
    }
    if (!email) {
      setErrors({ emailError: "*Email feild is required" });
      return false;
    } else if (!emailRegex.test(email)) {
      setErrors({ emailError: "*Invalid Email." });
      return false;
    }
    if (!password) {
      setErrors({ passwordError: "*Password feild is required" });
      return false;
    } else if (password.trim().length === 0) {
      setErrors({
        passwordError: "*Password must not contain only white spaces",
      });
      return false;
    } else if (password.length < 4) {
      setErrors({
        passwordError: "*Password must be more than 4 characters",
      });
      return false;
    } else if (password.length > 10) {
      setErrors({
        passwordError: "*Password must not exceed 10 characters",
      });
      return false;
    }
    setErrors({
      nameError: null,
      emailError: null,
      contactError: null,
      passwordError: null,
    });
    return true;
  };

  //When a rider signs up this function is called and it sends the data of user to the backend.
  const riderSignUp = async () => {
    const { name, contact, email, password } = user;
    if (validate(user)) {
      let result = await fetch(`${BACKEND_URL}rider/register`, {
        method: "post",
        body: JSON.stringify({
          name: name.trim(),
          contact,
          email: email.trim(),
          password,
          verified: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result);

      if (result.data) {
        swal("Success", result.message, "success");
        navigate("/login");
      } else {
        swal("Error", result.message, "error");
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
      let vehicleNoRegex = /^[A-Z]{3}[-][0-9]{4}$/i;
      if (!vehicleNo) {
        setErrors({ vehicleNoError: "*Vehicle No feild is required." });
        return;
      }
      if (!vehicleNoRegex.test(vehicleNo)) {
        setErrors({ vehicleNoError: "*Invalid Vehicle No." });
        return;
      }
      let result = await fetch(`${BACKEND_URL}driver/register`, {
        method: "post",
        body: JSON.stringify({
          name: name.trim(),
          contact,
          vehicleNo,
          email: email.trim(),
          password,
          location: {
            lat: 0,
            lng: 0,
          },
          verified: false,
          status: "free",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.warn(result);

      if (result.data) {
        swal("Success", result.message, "success");
        navigate("/login");
      } else {
        swal("Error", result.message, "error");
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
            <h2 className="fw-bold m-2 text-center">REGISTER</h2>
            <MDBTabs fill className="mb-3">
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleFillClick("ridertab")}
                  active={fillActive === "ridertab"}
                >
                  As a Rider
                </MDBTabsLink>
              </MDBTabsItem>
              <MDBTabsItem>
                <MDBTabsLink
                  onClick={() => handleFillClick("drivertab")}
                  active={fillActive === "drivertab"}
                >
                  As a Driver
                </MDBTabsLink>
              </MDBTabsItem>
            </MDBTabs>
            <MDBTabsContent>
              <MDBTabsPane show={fillActive === "ridertab"}>
                <MDBCardBody className="p-5 w-100 d-flex flex-column">
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
                  {errors.nameError ? (
                    <p className="text-red-500 -mt-6 ml-1 text-xs">
                      {errors.nameError}
                    </p>
                  ) : null}

                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    label="Contact No."
                    placeholder="923xxxxxxxxx"
                    type="number"
                    size="lg"
                    name="contact"
                    value={user.contact}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                  />

                  {/* When contact feild is empty the error is shown */}
                  {errors.contactError ? (
                    <p className="text-red-500 -mt-6 ml-1 text-xs">
                      {errors.contactError}
                    </p>
                  ) : null}

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
                  {errors.emailError ? (
                    <p className="text-red-500 -mt-6 ml-1 text-xs">
                      {errors.emailError}
                    </p>
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
                  {errors.passwordError ? (
                    <p className="text-red-500 -mt-6 ml-1 text-xs">
                      {errors.passwordError}
                    </p>
                  ) : null}

                  <MDBBtn color="success" size="lg" onClick={riderSignUp}>
                    Sign Up
                  </MDBBtn>
                </MDBCardBody>
              </MDBTabsPane>
              <MDBTabsPane show={fillActive === "drivertab"}>
                <MDBCardBody className="p-5 w-100 d-flex flex-column">
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
                  {errors.nameError ? (
                    <p className="text-red-500 -mt-6 ml-1 text-xs">
                      {errors.nameError}
                    </p>
                  ) : null}

                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    label="Contact No."
                    placeholder="923xxxxxxxxx"
                    type="number"
                    size="lg"
                    name="contact"
                    value={user.contact}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                  />

                  {/* When contact feild is empty the error is shown */}
                  {errors.contactError ? (
                    <p className="text-red-500 -mt-6 ml-1 text-xs">
                      {errors.contactError}
                    </p>
                  ) : null}

                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    label="Vehicle No."
                    placeholder="XXX-XXXX"
                    type="text"
                    size="lg"
                    name="vehicleNo"
                    value={user.vehicleNo}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {/* When contact feild is empty the error is shown */}
                  {errors.vehicleNoError ? (
                    <p className="text-red-500 -mt-6 ml-1 text-xs">
                      {errors.vehicleNoError}
                    </p>
                  ) : null}

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
                  {errors.emailError ? (
                    <p className="text-red-500 -mt-6 ml-1 text-xs">
                      {errors.emailError}
                    </p>
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
                  {errors.passwordError ? (
                    <p className="text-red-500 -mt-6 ml-1 text-xs">
                      {errors.passwordError}
                    </p>
                  ) : null}

                  <MDBBtn color="success" size="lg" onClick={driverSignup}>
                    Sign Up
                  </MDBBtn>
                </MDBCardBody>
              </MDBTabsPane>
            </MDBTabsContent>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
export default SignUp;
