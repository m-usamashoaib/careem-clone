import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const Footer = () => {
  // return (
  //   <footer className="bg-green-600 h-80 top-0 flex">
  //     <section>
  //       <div>
  //         <div>
  //           <div>
  //
  //           </div>
  //           <div>
  //             <li>
  //
  //             </li>
  //             <div></div>
  //             <li>
  //
  //             </li>
  //           </div>
  //           <div>
  //
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //   </footer>
  // );
  // return (
  //   <MDBFooter className="text-center bg-green-600 text-lg-left">
  //     <MDBContainer className="p-4">
  //       <MDBRow>
  //         <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
  //           <ul className="list-unstyled mb-0">
  //             <li>
  //               <a href="https://www.careem.com/en-ae ">
  //                 <img
  //                   className=" w-32 m-5 "
  //                   src="https://www.careem.com/pubweb-v2/super-app-v2/img/logo.svg"
  //                 />
  //               </a>
  //             </li>
  //           </ul>
  //         </MDBCol>

  //         <MDBCol lg="3" md="6" className="mb-4 mb-md-0 list-none text-white">
  //           <ul className="list-unstyled text-white">
  //             <li className="">
  //               <a href="https://www.careem.com/en-ae/terms">
  //                 Terms of Service
  //               </a>
  //             </li>
  //           </ul>
  //         </MDBCol>

  //         <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
  //           <ul className="list-unstyled mb-0">
  //             <li>
  //               <a href="https://www.careem.com/en-ae/privacy">
  //                 Privacy Policy
  //               </a>
  //             </li>
  //           </ul>
  //         </MDBCol>

  //         <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
  //           <ul className="list-unstyled">
  //             <li>
  //               <a href="https://app.adjust.com/kg4lpur">
  //                 <img src="https://www.careem.com/pubweb-v2/images/google_play.png" />
  //               </a>
  //               <a href="https://app.adjust.com/g6wn33j">
  //                 <img src="https://www.careem.com/pubweb-v2/images/app_store.png" />
  //               </a>
  //             </li>
  //           </ul>
  //         </MDBCol>
  //       </MDBRow>
  //     </MDBContainer>
  //     <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
  //       <div className="me-5 d-none d-lg-block">
  //         <span>Get connected with us on social networks:</span>
  //       </div>

  //       <div>
  //         <a href="" className="me-4 text-reset">
  //           <MDBIcon fab icon="facebook-f" />
  //         </a>
  //         <a href="" className="me-4 text-reset">
  //           <MDBIcon fab icon="twitter" />
  //         </a>
  //         <a href="" className="me-4 text-reset">
  //           <MDBIcon fab icon="google" />
  //         </a>
  //         <a href="" className="me-4 text-reset">
  //           <MDBIcon fab icon="instagram" />
  //         </a>
  //         <a href="" className="me-4 text-reset">
  //           <MDBIcon fab icon="linkedin" />
  //         </a>
  //         <a href="" className="me-4 text-reset">
  //           <MDBIcon fab icon="github" />
  //         </a>
  //       </div>
  //     </section>

  //     {/* <div
  //       className="text-center p-3"
  //       style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
  //     >
  //       &copy; {new Date().getFullYear()} Copyright:{" "}
  //       <a className="text-dark" href="https://mdbootstrap.com/">
  //         Careem.com
  //       </a>
  //     </div> */}
  //   </MDBFooter>
  // );
  return (
    <MDBFooter
      style={{ backgroundColor: "#499d3a" }}
      className=" text-center text-lg-start text-white"
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a
            href="https://www.facebook.com/CareemJOR/?brand_redir=456801891004898"
            className="me-4 text-reset"
          >
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href="https://twitter.com/CareemUAE" className="me-4 text-reset">
            <MDBIcon fab icon="twitter" />
          </a>
          <a
            href="https://www.linkedin.com/company/careem"
            className="me-4 text-reset"
          >
            <MDBIcon fab icon="linkedin" />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className=" mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <Link to="/">
                <img
                  alt="logo"
                  src="https://www.careem.com/pubweb-v2/super-app-v2/img/logo.svg"
                />
              </Link>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Important Links</h6>
              <p>
                <a
                  href="https://www.careem.com/en-ae/terms/"
                  className="text-reset"
                >
                  Terms of Service
                </a>
              </p>
              <p>
                <a
                  href="https://www.careem.com/en-ae/privacy/"
                  className="text-reset"
                >
                  Privacy Ploicy
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <ul className="list-unstyled">
                <li>
                  <a href="https://app.adjust.com/kg4lpur">
                    <img
                      alt="Google Playstore"
                      className="m-1"
                      src="https://www.careem.com/pubweb-v2/images/google_play.png"
                    />
                  </a>
                  <a href="https://app.adjust.com/g6wn33j">
                    <img
                      alt="App Store"
                      className="m-1"
                      src="https://www.careem.com/pubweb-v2/images/app_store.png"
                    />
                  </a>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        All rights reserved. Careem, an Uber company © 2021
      </div>
    </MDBFooter>
  );
};

export default Footer;
