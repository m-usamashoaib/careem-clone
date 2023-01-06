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
  MDBCheckbox,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import swal from "sweetalert";
import { BACKEND_URL } from "../env";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    emailError: null,
    passwordError: null,
  });

  const [fillActive, setFillActive] = useState("ridertab");

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };

  const validate = (email, password) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email) {
      setErrors({ emailError: "*Email feild is required" });
      return false;
    } else if (!regex.test(email)) {
      setErrors({ emailError: "*Invalid Email." });
      return false;
    }
    if (!password) {
      setErrors({ passwordError: "*Password feild is required" });
      return false;
    }

    setErrors({ emailError: null, passwordError: null });
    return true;
  };

  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("role"));
    // console.log(role);
    if (role) {
      if (role === "rider") {
        navigate("/bookride");
      } else if (role === "driver") {
        navigate("/pickride");
      }
    }
  });

  const riderLogin = async () => {
    if (validate(email, password)) {
      let result = await fetch(`${BACKEND_URL}rider/login`, {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      console.log(result);
      if (result.data) {
        swal("Success!", result.message, "success");
        localStorage.setItem("user", JSON.stringify(result.data.rider));
        localStorage.setItem("token", JSON.stringify(result.data.auth));
        localStorage.setItem("role", JSON.stringify(result.data.role));
        if (result.data.role === "rider") {
          navigate("/bookride");
        } else if (result.data.role === "driver") {
          navigate("/pickride");
        }
      } else {
        swal("Error!", result.message, "error");
      }
    }
    return;
  };
  const driverLogin = async () => {
    let result = await fetch(`${BACKEND_URL}driver/login`, {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.data) {
      swal("Success!", result.message, "success");
      localStorage.setItem("user", JSON.stringify(result.data.driver));
      localStorage.setItem("token", JSON.stringify(result.data.auth));
      localStorage.setItem("role", JSON.stringify(result.data.role));
      if (result.data.role === "rider") {
        navigate("/bookride");
      } else if (result.data.role === "driver") {
        navigate("/pickride");
      }
    } else {
      swal("Error!", result.message, "error");
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
            <h2 className="fw-bold m-2 text-center">LOGIN</h2>
            <MDBTabs fill className=" mb-3">
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
                    label="Email address"
                    placeholder="email@address.com"
                    autoComplete="off"
                    type="email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.emailError ? (
                    <p className="text-red-500 -mt-6 ml-1 text-xs">
                      {errors.emailError}
                    </p>
                  ) : null}
                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    label="Password"
                    type="password"
                    autoComplete="off"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.passwordError ? (
                    <p className="text-red-500 -mt-6 ml-1 text-xs">
                      {errors.passwordError}
                    </p>
                  ) : null}

                  <MDBCheckbox
                    name="flexCheck"
                    id="flexCheckDefault"
                    className="mb-4"
                    label="Remember password"
                  />

                  <MDBBtn color="success" size="lg" onClick={riderLogin}>
                    Login
                  </MDBBtn>
                </MDBCardBody>
              </MDBTabsPane>
              <MDBTabsPane show={fillActive === "drivertab"}>
                <MDBCardBody className="p-5 w-100 d-flex flex-column">
                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    label="Email address"
                    placeholder="email@address.com"
                    autoComplete="off"
                    type="email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    label="Password"
                    type="password"
                    autoComplete="off"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <MDBCheckbox
                    name="flexCheck"
                    id="flexCheckDefault"
                    className="mb-4"
                    label="Remember password"
                  />

                  <MDBBtn color="success" size="lg" onClick={driverLogin}>
                    Login
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

export default Login;
