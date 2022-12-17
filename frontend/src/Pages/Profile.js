import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form, Modal } from "react-bootstrap";
import {
  faEnvelope,
  faLock,
  faMobile,
  faPen,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [role, setRole] = useState("");

  const [edit, setEdit] = useState(null);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const [offline, setOffline] = useState(false);
  const [online, setOnline] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const editProfile = () => {
    handleShow();
    setEdit("profile");
  };
  const editPassword = () => {
    handleShow();
    setEdit("password");
  };

  const getUserDetails = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    setName(user.name);
    setEmail(user.email);
    setContact(user.contact);
    setVehicleNo(user.vehicleNo);
  };

  useEffect(() => {
    let r = JSON.parse(localStorage.getItem("role"));
    setRole(r);
    // console.log(role);
    getUserDetails();
  }, []);

  const updateRider = async () => {
    let id = JSON.parse(localStorage.getItem("user"))._id;
    console.warn(name, email, contact);
    let result = await fetch(`http://localhost:5000/rider/${id}`, {
      method: "Put",
      body: JSON.stringify({ name, email, contact }),
      headers: {
        "Content-Type": "Application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    if (result) {
      setAlert(true);
    }
  };

  const updateDriver = async () => {
    let id = JSON.parse(localStorage.getItem("user"))._id;
    console.warn(name, email, contact);
    let result = await fetch(`http://localhost:5000/driver/${id}`, {
      method: "Put",
      body: JSON.stringify({ name, email, contact, vehicleNo }),
      headers: {
        "Content-Type": "Application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    if (result) {
      setAlert(true);
    }
  };

  const updateRiderPassword = async () => {
    let id = JSON.parse(localStorage.getItem("user"))._id;
    console.warn(name, email, contact);
    let result = await fetch(`http://localhost:5000/rider/password/${id}`, {
      method: "Put",
      body: JSON.stringify({ newPassword }),
      headers: {
        "Content-Type": "Application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    if (result) {
      setAlert(true);
    }
  };
  const updateDriverPassword = async () => {
    let id = JSON.parse(localStorage.getItem("user"))._id;
    console.warn(name, email, contact);
    let result = await fetch(`http://localhost:5000/driver/password/${id}`, {
      method: "Put",
      body: JSON.stringify({ newPassword }),
      headers: {
        "Content-Type": "Application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    if (result) {
      setAlert(true);
    }
  };

  const offlineStatus = async () => {
    let id = JSON.parse(localStorage.getItem("user"))._id;
    console.warn(name, email, contact);
    let result = await fetch(`http://localhost:5000/driver/${id}`, {
      method: "Put",
      body: JSON.stringify({ status: "Offline" }),
      headers: {
        "Content-Type": "Application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    if (result) {
      setAlert(true);
      setTimeout(() => setAlert(false), 3000);
      setOffline(true);
      setOnline(false);
    }
  };

  const onlineStatus = async () => {
    let id = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(`http://localhost:5000/driver/${id}`, {
      method: "Put",
      body: JSON.stringify({ status: "free" }),
      headers: {
        "Content-Type": "Application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();

    if (result) {
      setAlert(true);
      setTimeout(() => setAlert(false), 3000);
      setOnline(true);
      setOffline(false);
    }
  };

  return (
    <div>
      <div>
        <Card className="text-center">
          <Card.Header as="h1">{name}</Card.Header>
          <Card.Body>
            <Card.Title>{String(role).toUpperCase()}</Card.Title>
            <Card.Text>
              <p>
                <FontAwesomeIcon className="mr-2" icon={faEnvelope} /> {email}
              </p>
              <p>
                <FontAwesomeIcon className="mr-2" icon={faMobile} /> {contact}
              </p>
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
      </div>
      <div>
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
              <div>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Vehicle No</Form.Label>
                    <Form.Control
                      type="text"
                      value={vehicleNo}
                      onChange={(e) => setVehicleNo(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </div>
            ) : (
              <div>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Current</Form.Label>
                    <Form.Control
                      type="password"
                      value={curPassword}
                      onChange={(e) => setCurPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>New</Form.Label>
                    <Form.Control
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            {edit === "profile" ? (
              <div>
                <Button className="mr-1" variant="danger" onClick={handleClose}>
                  Cancel
                </Button>
                {role === "rider" ? (
                  <div>
                    <Button variant="success" onClick={updateRider}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button variant="success" onClick={updateDriver}>
                      Save
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Button className="mr-1" variant="danger" onClick={handleClose}>
                  Cancel
                </Button>
                {role === "rider" ? (
                  <div>
                    <Button variant="success" onClick={updateRiderPassword}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button variant="success" onClick={updateDriverPassword}>
                      Save
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Modal.Footer>
          {alert && (
            <Alert key="success" variant="success">
              Changes will effect when you login next time.
            </Alert>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
