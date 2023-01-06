import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form, Modal } from "react-bootstrap";
import {
  faEnvelope,
  faLock,
  faMobile,
  faPen,
  faPowerOff,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { BACKEND_URL } from "../env";
import swal from "sweetalert";

const Profile = () => {
  //States to manage the feilds
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [role, setRole] = useState("");
  const [avgRating, setAvgRating] = useState(0);

  //States to change the modal from edit password or edit other feilds
  const [edit, setEdit] = useState(null);

  //States to manage the modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //State to show the alert
  const [alert, setAlert] = useState(false);

  //States to store the status of the driver
  const [offline, setOffline] = useState(false);
  const [online, setOnline] = useState(true);

  const editProfile = () => {
    handleShow();
    setEdit("profile");
  };

  const editPassword = () => {
    handleShow();
    setEdit("password");
  };

  //Function which is calculating the average ratings of the driver from the rating array.
  const averageRatings = (ratings) => {
    let sum = 0;
    console.log(ratings);
    ratings?.map((rating) => (sum += rating));
    setAvgRating((sum / ratings?.length).toFixed(1));
    console.log(avgRating);
  };

  //Getting the details of the user and setting them into the states
  const getUserDetails = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    setName(user.name);
    setEmail(user.email);
    setContact(user.contact);
    setVehicleNo(user.vehicleNo);

    // console.log(user.rating);
    averageRatings(user.ratings);

    if (user.status === "offline") {
      setOffline(true);
      setOnline(false);
    } else {
      setOffline(false);
      setOnline(true);
    }
  };

  useEffect(() => {
    let r = JSON.parse(localStorage.getItem("role"));
    setRole(r);
    // console.log(role);
    getUserDetails();
  }, []);

  //Function to update the name email and contact of rider
  const updateRider = async () => {
    let id = JSON.parse(localStorage.getItem("user"))._id;
    console.warn(name, email, contact);
    let result = await fetch(`${BACKEND_URL}rider/${id}`, {
      method: "Put",
      body: JSON.stringify({ name, email, contact }),
      headers: {
        "Content-Type": "Application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    if (result.data) {
      swal("Success", result.message, "success");
      handleClose();
      // setAlert(true);
    } else {
      swal("Error", result.message, "error");
    }
  };

  //Function to update the details of driver.
  const updateDriver = async () => {
    let id = JSON.parse(localStorage.getItem("user"))._id;
    console.warn(name, email, contact);
    let result = await fetch(`${BACKEND_URL}driver/${id}`, {
      method: "Put",
      body: JSON.stringify({ name, email, contact, vehicleNo }),
      headers: {
        "Content-Type": "Application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    if (result.data) {
      swal("Success", result.message, "success");
      handleClose();
      // setAlert(true);
    } else {
      swal("Error", result.message, "error");
    }
  };

  //Function to change the password of rider
  const updateRiderPassword = async () => {
    let id = JSON.parse(localStorage.getItem("user"))._id;
    console.warn(name, email, contact);
    let result = await fetch(`${BACKEND_URL}rider/updatepassword/${id}`, {
      method: "Put",
      body: JSON.stringify({ curPassword, newPassword }),
      headers: {
        "Content-Type": "Application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    // console.log(result.message);
    if (result.data) {
      swal("Success", result.message, "success");
      handleClose();
      // setAlert(true);
    } else {
      swal("Error", result.message, "error");
    }
  };

  //Function to update the password of the driver
  const updateDriverPassword = async () => {
    let id = JSON.parse(localStorage.getItem("user"))._id;
    console.warn(name, email, contact);
    let result = await fetch(`${BACKEND_URL}driver/updatepassword/${id}`, {
      method: "Put",
      body: JSON.stringify({ curPassword, newPassword }),
      headers: {
        "Content-Type": "Application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    if (result.data) {
      swal("Success", result.message, "success");
      handleClose();
      // setAlert(true);
    } else {
      swal("Error", result.message, "error");
    }
  };

  //Function to set status of driver to offline
  const offlineStatus = async () => {
    let id = JSON.parse(localStorage.getItem("user"))._id;
    console.warn(name, email, contact);
    let result = await fetch(`${BACKEND_URL}driver/${id}`, {
      method: "Put",
      body: JSON.stringify({ status: "Offline" }),
      headers: {
        "Content-Type": "Application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    if (result.data) {
      setAlert(true);
      setTimeout(() => setAlert(false), 3000);
      setOffline(true);
      setOnline(false);
    }
  };

  //Function to set the statusof driver to online
  const onlineStatus = async () => {
    let id = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(`${BACKEND_URL}driver/${id}`, {
      method: "Put",
      body: JSON.stringify({ status: "free" }),
      headers: {
        "Content-Type": "Application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();

    if (result.data) {
      setAlert(true);
      setTimeout(() => setAlert(false), 3000);
      setOnline(true);
      setOffline(false);
    }
  };

  return (
    <>
      <>
        <Card className="text-center">
          <Card.Header as="h1">{name}</Card.Header>
          <Card.Body>
            <Card.Title>{String(role).toUpperCase()}</Card.Title>
            <Card.Text>
              <FontAwesomeIcon
                className="mr-2 text-blue-500"
                icon={faEnvelope}
              />{" "}
              {email}
            </Card.Text>
            <Card.Text>
              <FontAwesomeIcon className="mr-2 text-black" icon={faMobile} />{" "}
              {contact}
            </Card.Text>
            {role === "rider" && (
              <>
                <Button
                  className="mr-2"
                  variant="success"
                  onClick={editProfile}
                >
                  <FontAwesomeIcon className="mr-2" icon={faPen} />
                  Edit Profile
                </Button>
                <Button variant="success" onClick={editPassword}>
                  <FontAwesomeIcon className="mr-2" icon={faLock} />
                  Change Password
                </Button>
              </>
            )}
            {role === "driver" && (
              <>
                <Card.Text>
                  <FontAwesomeIcon
                    className="mr-2 text-yellow-400"
                    icon={faStar}
                  />
                  {avgRating}
                </Card.Text>
                <Button
                  className="mr-2"
                  variant="success"
                  onClick={editProfile}
                >
                  <FontAwesomeIcon className="mr-2" icon={faPen} />
                  Edit Profile
                </Button>
                {offline && (
                  <>
                    <Button
                      className="mr-2"
                      variant="success"
                      onClick={onlineStatus}
                    >
                      <FontAwesomeIcon className="mr-2" icon={faPowerOff} />
                      Go Online
                    </Button>
                  </>
                )}
                {online && (
                  <>
                    <Button
                      className="mr-2"
                      variant="danger"
                      onClick={offlineStatus}
                    >
                      <FontAwesomeIcon className="mr-2" icon={faPowerOff} />
                      Go Offline
                    </Button>
                  </>
                )}
                <Button variant="success" onClick={editPassword}>
                  <FontAwesomeIcon className="mr-2" icon={faLock} />
                  Change Password
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
        {alert && <Alert variant="success">Status Changed</Alert>}
      </>
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {edit === "profile" ? (
                <div>Update Profile Information</div>
              ) : (
                <div>Change Password</div>
              )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {edit === "profile" ? (
              <>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <b>Full Name</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <b>Contact</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </Form.Group>
                  {role === "driver" && (
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <b>Vehicle No</b>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={vehicleNo}
                        onChange={(e) => setVehicleNo(e.target.value)}
                      />
                    </Form.Group>
                  )}
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <b>Email</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </>
            ) : (
              <>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <b>Current</b>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={curPassword}
                      onChange={(e) => setCurPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      <b>New</b>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {edit === "profile" ? (
              <>
                <Button className="mr-1" variant="danger" onClick={handleClose}>
                  Cancel
                </Button>
                {role === "rider" ? (
                  <>
                    <Button variant="success" onClick={updateRider}>
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="success" onClick={updateDriver}>
                      Save
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Button className="mr-1" variant="danger" onClick={handleClose}>
                  Cancel
                </Button>
                {role === "rider" ? (
                  <>
                    <Button variant="success" onClick={updateRiderPassword}>
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="success" onClick={updateDriverPassword}>
                      Save
                    </Button>
                  </>
                )}
              </>
            )}
          </Modal.Footer>
          {alert && (
            <Alert key="success" variant="success">
              Changes will effect when you login next time.
            </Alert>
          )}
        </Modal>
      </>
    </>
  );
};

export default Profile;
