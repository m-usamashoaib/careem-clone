import React, { useEffect } from "react";
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
} from "mdb-react-ui-kit";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("role"));
    console.log(role);
    if (role) {
      if (role === "rider") {
        navigate("/bookride");
      } else if (role === "driver") {
        navigate("/pickride");
      }
    }
  });

  const riderLogin = async () => {
    let result = await fetch("http://localhost:5000/rider/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.rider));
      localStorage.setItem("token", JSON.stringify(result.auth));
      localStorage.setItem("role", JSON.stringify(result.role));
      if (result.role === "rider") {
        navigate("/bookride");
      } else if (result.role === "driver") {
        navigate("/pickride");
      }
    } else {
      alert(result.result);
    }
  };
  const driverLogin = async () => {
    let result = await fetch("http://localhost:5000/driver/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.driver));
      localStorage.setItem("token", JSON.stringify(result.auth));
      localStorage.setItem("role", JSON.stringify(result.role));
      if (result.role === "rider") {
        navigate("/bookride");
      } else if (result.role === "driver") {
        navigate("/pickride");
      }
    } else {
      alert(result.result);
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
              <h2 className="fw-bold mb-2 text-center">Login</h2>
              <p className=" mb-3">Please enter your login and password!</p>

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

              <MDBBtn color="success" size="lg" onClick={riderLogin}>
                Rider Login
              </MDBBtn>
              <hr className="my-1" />
              <MDBBtn color="success" size="lg" onClick={driverLogin}>
                Driver Login
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
