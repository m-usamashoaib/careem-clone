import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import logo from "../Assets/logo.svg";
import { Link } from "react-router-dom";

const REPO_URL = "https://github.com/m-usamashoaib/ride-hailing-app";

const Footer = () => {
  return (
    <MDBFooter
      style={{ backgroundColor: "#499d3a" }}
      className=" text-center text-lg-start text-white"
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>A portfolio project by Muhammad Usama Shoaib</span>
        </div>

        <div>
          <a href={REPO_URL} className="me-4 text-reset" aria-label="Source code on GitHub">
            <MDBIcon fab icon="github" />
          </a>
          <a
            href="https://www.linkedin.com/in/m-usamashoaib"
            className="me-4 text-reset"
            aria-label="LinkedIn"
          >
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href="https://m-usamashoaib.github.io" className="me-4 text-reset" aria-label="Portfolio">
            <MDBIcon fas icon="globe" />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className=" mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <Link to="/">
                <img alt="RideHail" src={logo} style={{ maxWidth: "200px" }} />
              </Link>
              <p className="mt-3">Book rides, see fares up front and follow your trip in real time.</p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Ride</h6>
              <p>
                <Link to="/signup" className="text-reset">
                  Create an account
                </Link>
              </p>
              <p>
                <Link to="/login" className="text-reset">
                  Log in
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Project</h6>
              <p>
                <a href={REPO_URL} className="text-reset">
                  Source code
                </a>
              </p>
              <p>
                <a href={`${REPO_URL}#readme`} className="text-reset">
                  How it works
                </a>
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023 RideHail · Educational project, not affiliated with any ride-hailing company.
      </div>
    </MDBFooter>
  );
};

export default Footer;
