import React from "react";
import { Modal } from "react-bootstrap";

const PickModal = ({
  riderName,
  riderContact,
  riderDistance,
  riderDuration,
  fare,
  show,
  handleClose,
}) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{riderName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Fare: {fare}</p>
          <p>Contact: {riderContact}</p>
          <p>Distance: {riderDistance}</p>
          <p>Duration: {riderDuration}</p>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default PickModal;
