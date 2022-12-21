import React from "react";
import { Badge, Button, Modal } from "react-bootstrap";

const DetailsModal = ({ show, handleClose, selectedBooking }) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>Details of the ride</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <p>
              <b> Booked By:</b> {selectedBooking.riderName}
            </p>
            <p>
              <b>Date:</b> {selectedBooking.date}
            </p>
            <p>
              <b>Origin:</b> {selectedBooking.riderOrigin}
            </p>
            <p>
              <b>Destination:</b> {selectedBooking.riderDestination}
            </p>
            <p>
              <b>Distance:</b> {selectedBooking.distance} km
            </p>
            <p>
              <b>Duration:</b> {selectedBooking.duration} minutes
            </p>
            <p>
              <b>Fare:</b> {selectedBooking.fare} PKR
            </p>
            <>
              {selectedBooking.status === "cancelled" && (
                <Badge bg="danger">Cancelled</Badge>
              )}
              {selectedBooking.status === "completed" && (
                <Badge bg="success">completed</Badge>
              )}
            </>
            <hr />
            <p>
              <b>Driver Name:</b> {selectedBooking.driverName}
            </p>
            <p>
              <b>Driver Vehicle No:</b> {selectedBooking.driverVehicle}
            </p>
            <p>
              <b>Contact No:</b> {selectedBooking.driverContact}
            </p>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetailsModal;
