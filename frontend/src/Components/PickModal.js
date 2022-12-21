import React from "react";
import { Alert, Button, Modal } from "react-bootstrap";

const PickModal = ({
  riderName,
  riderContact,
  distance,
  duration,
  rideStatus,
  setRideStatus,
  fare,
  show,
  handleClose,
}) => {
  const finishRide = async () => {
    let { _id } = JSON.parse(localStorage.getItem("booking"));
    // console.log(_id);
    let result = await fetch(`http://localhost:5000/booking/${_id}`, {
      method: "put",
      body: JSON.stringify({
        status: "completed",
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    console.warn(result);

    _id = JSON.parse(localStorage.getItem("user"))._id;
    // console.log(_id);
    result = await fetch(`http://localhost:5000/driver/${_id}`, {
      method: "put",
      body: JSON.stringify({
        status: "free",
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    console.warn(result);

    setRideStatus("completed");
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
          <Modal.Title>Ride Started!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>
            <b>Rider Name: </b>
            {riderName}
          </p>
          <p>
            <b>Contact: </b>
            {riderContact}
          </p>
          <p>
            <b>Distance: </b>
            {distance}
          </p>
          <p>
            <b>Duration: </b>
            {duration}
          </p>
          <p>
            <b>Fare: </b>
            {fare} PKR
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={finishRide}>
            End Ride
          </Button>
        </Modal.Footer>
        {rideStatus === "completed" && (
          <Alert variant="success">Ride Completed Successfully</Alert>
        )}
      </Modal>
    </div>
  );
};

export default PickModal;
