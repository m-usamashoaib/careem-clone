import React, { useEffect, useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import StarRating from "./StarRating";

const RideModal = ({
  rideStatus,
  setRideStatus,
  driverName,
  driverContact,
  driverVehicle,
  driverDistance,
  driverDuration,
  show,
  handleClose,
}) => {
  const [rating, setRating] = useState(null);
  const [driverReached, setDriverReached] = useState(false);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    // console.log(driverDuration.split("")[0]);
    // let time = Number(driverDuration.split(" ")[0] * 60);
    // console.log(time);
    setTimeout(() => {
      setDisabled(true);
    }, 30000);
  }, []);

  const finishRide = async () => {
    let { _id } = JSON.parse(localStorage.getItem("booking"));
    // console.log(_id);
    let finishResult = await fetch(`http://localhost:5000/booking/${_id}`, {
      method: "put",
      body: JSON.stringify({
        status: "completed",
        rating: rating,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    finishResult = await finishResult.json();
    console.warn(finishResult);

    // console.log(rating);
    setRideStatus("completed");
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
            {driverReached ? (
              <p>Ride Started!</p>
            ) : (
              <p>Your Driver is approaching, the details of the driver are:</p>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {driverReached ? (
            <div>
              <p>Please pay the fare to the Driver.</p>
              <p>Give Rating after your ride has finished.</p>
              <StarRating rating={rating} setRating={setRating} />
            </div>
          ) : (
            <div className="">
              <p>Name: {driverName}</p>
              <p>Contact: {driverContact}</p>
              <p>Vehicle No: {driverVehicle}</p>
              <p>Distance: {driverDistance}</p>
              <p>Duration: {driverDuration}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {driverReached ? (
            <div>
              <Button variant="success" onClick={finishRide}>
                Give Rating
              </Button>
            </div>
          ) : (
            <div>
              <Button
                className="mr-1"
                variant="danger"
                disabled={disabled}
                onClick={cancelRide}
              >
                Cancel Ride
              </Button>
              <Button variant="success" onClick={() => setDriverReached(true)}>
                Ready to go
              </Button>
            </div>
          )}
        </Modal.Footer>
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
