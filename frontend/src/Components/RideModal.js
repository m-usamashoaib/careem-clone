import React, { useEffect, useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import StarRating from "./StarRating";
import ReactLoading from "react-loading";

const RideModal = ({
  rideStatus,
  setRideStatus,
  duration,
  driverName,
  driverContact,
  driverVehicle,
  driverDistance,
  driverDuration,
  driverRating,
  fare,
  show,
  handleClose,
}) => {
  const [rating, setRating] = useState(null);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    // console.log(driverDuration.split("")[0]);
    // let time = Number(driverDuration.split(" ")[0] * 60);
    // console.log(time);
    setInterval(() => {
      checkStatus();
    }, 1000);
    setTimeout(() => {
      setDisabled(true);
    }, 300000);
  }, []);

  const checkStatus = async () => {
    if (localStorage.getItem("booking")) {
      let { _id } = JSON.parse(localStorage.getItem("booking"));
      // console.log(_id);
      let result = await fetch(`http://localhost:5000/booking/${_id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      result = await result.json();
      // console.warn(result.booking[0].status);
      setRideStatus(result.booking[0].status);
      // localStorage.setItem("booking", JSON.stringify(result.booking));
      // localStorage.removeItem("booking");
      // localStorage.setItem("booking", JSON.stringify(result.booking));
    } else {
      return;
    }
  };

  const giveRating = async () => {
    let { driverContact } = JSON.parse(localStorage.getItem("booking"));
    // console.log(_id);
    let result = await fetch(
      `http://localhost:5000/driver/rating/${driverContact}`,
      {
        method: "put",
        body: JSON.stringify({
          rating: rating,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    result = await result.json();
    console.log(result);
    console.log(rating);

    localStorage.removeItem("booking");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  const cancelRide = async () => {
    let { _id } = JSON.parse(localStorage.getItem("booking"));
    console.log(_id);
    let result = await fetch(`http://localhost:5000/booking/${_id}`, {
      method: "put",
      body: JSON.stringify({
        status: "cancelled",
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    console.warn(result);
    setRideStatus("cancelled");
    localStorage.removeItem("booking");
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            {rideStatus === "request" && (
              <>Waiting for the Driver to accept the ride</>
            )}
            {rideStatus === "accepted" && (
              <>
                Your Driver is approaching, the details of the driver are
                following:
              </>
            )}
            {rideStatus === "started" && <>Ride Started! </>}
            {rideStatus === "completed" && <>Ride Completed!</>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {rideStatus === "request" && (
            <ReactLoading color={"Green"} height={"10%"} width={"100%"} />
          )}
          {rideStatus === "accepted" && (
            <>
              <p>
                <b>Name: </b>
                {driverName}
              </p>
              <p>
                <b>Contact: </b>
                {driverContact}
              </p>
              <p>
                <b>Vehicle No: </b>
                {driverVehicle}
              </p>
              <p>
                <b>Distance: </b>
                {driverDistance}
              </p>
              <p>
                <b>Duration: </b>
                {driverDuration}
              </p>
              <p>
                <b>Rating: </b>
                {driverRating}
              </p>
            </>
          )}
          {rideStatus === "started" && (
            <>
              <p>
                You will reach your destination in <b>{duration}</b>
              </p>
              <p>
                Your fare is <b>{fare} PKR.</b> Don't forget to pay the driver.
              </p>
            </>
          )}
          {rideStatus === "completed" && (
            <>
              <p>Please give rating to the driver based on your ride.</p>
              <StarRating rating={rating} setRating={setRating} />
            </>
          )}
        </Modal.Body>
        {rideStatus === "request" && (
          <Modal.Footer>
            <Button
              className="mr-1"
              variant="danger"
              disabled={disabled}
              onClick={cancelRide}
            >
              Cancel Ride
            </Button>
          </Modal.Footer>
        )}
        {rideStatus === "completed" && (
          <Modal.Footer>
            <Button variant="success" onClick={giveRating}>
              Give Rating
            </Button>
          </Modal.Footer>
        )}
        {rideStatus === "cancelled" && (
          <Alert key="danger" variant="danger">
            Oooops... Your Ride got cancelled.
          </Alert>
        )}
        {rideStatus === "completed" && (
          <Alert key="success" variant="success">
            Thanks for riding with us.
          </Alert>
        )}
      </Modal>
    </div>
  );
};

export default RideModal;
