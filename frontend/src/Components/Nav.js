import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBNavbarNav,
  MDBIcon,
} from "mdb-react-ui-kit";
import logo from "../Assets/logo.svg";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faRightToBracket,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const navigate = useNavigate();

  const [showNavNoTogglerThird, setShowNavNoTogglerThird] = useState(false);
  const auth = JSON.parse(localStorage.getItem("user"));
  const role = JSON.parse(localStorage.getItem("role"));

  //Logout function which clears the local storage
  const logout = () => {
    localStorage.clear();
    navigate("/register");
  };
  return (
    <>
      <MDBNavbar expand="lg" light style={{ backgroundColor: "#499d3a" }}>
        <MDBContainer fluid>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavNoTogglerThird(!showNavNoTogglerThird)}
          >
            <MDBIcon color="white" icon="bars" fas />
          </MDBNavbarToggler>
          <MDBNavbarBrand>
            <Link to="/">
              <img
                className="m-2 w-24 ml-5 flex justify-center text-center"
                alt="logo"
                src={logo}
              />
            </Link>
          </MDBNavbarBrand>
          {auth ? (
            <MDBCollapse navbar show={showNavNoTogglerThird}>
              <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                <MDBNavbarItem>
                  {role === "rider" ? (
                    <MDBNavbarLink className="text-white">
                      <Link className="text-white" to="/bookride">
                        Book a Ride
                      </Link>
                    </MDBNavbarLink>
                  ) : (
                    <MDBNavbarLink className="text-white">
                      <Link className="text-white" to="/pickride">
                        Pick a Ride
                      </Link>
                    </MDBNavbarLink>
                  )}
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink className="text-white">
                    <Link className="text-white" to="/previousrides">
                      Previous Rides
                    </Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink className="text-white">
                    <Link className="text-white" to="/profile">
                      Profile
                    </Link>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>

              <Link to="/">
                <Button
                  style={{
                    width: "110px",
                    padding: "10px",
                    marginRight: "10px",
                  }}
                  variant="light"
                  onClick={logout}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <span className="ml-2">Log out</span>
                </Button>{" "}
              </Link>
            </MDBCollapse>
          ) : (
            <MDBCollapse navbar show={showNavNoTogglerThird}>
              <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
                <MDBNavbarItem>
                  <MDBNavbarLink
                    className="text-white"
                    href="https://www.careem.com/en-AE/about-us"
                  >
                    About Us
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    className="text-white"
                    href="https://www.careem.com/en-AE/ride"
                  >
                    Products
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    className="text-white"
                    href="https://www.careem.com/en-AE/cplus"
                  >
                    CPlus
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    className="text-white"
                    href="https://blog.careem.com/en/safety-measures-for-customers/"
                  >
                    Safety
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    className="text-white"
                    href="https://www.careem.com/en-AE/security"
                  >
                    Security
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    className="text-white"
                    href="https://jobs.careem.com/"
                  >
                    Join the team
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    className="text-white"
                    href="https://help.careem.com/"
                  >
                    Help
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
              <Link to="/signup">
                <Button
                  style={{
                    width: "110px",
                    padding: "10px",
                    marginRight: "10px",
                  }}
                  variant="light"
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span className="ml-2">Sign Up</span>
                </Button>{" "}
              </Link>
              <Link to="/login">
                <Button
                  style={{
                    color: "white",
                    borderColor: "white",
                    width: "110px",
                  }}
                  variant="outline-success"
                >
                  <FontAwesomeIcon icon={faRightToBracket} />
                  <span className="ml-2">Log In</span>
                </Button>{" "}
              </Link>
            </MDBCollapse>
          )}
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Nav;
