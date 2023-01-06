import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, ListGroup } from "react-bootstrap";
import Loading from "react-loading";
import DetailsModal from "../Components/DetailsModal";
import { BACKEND_URL } from "../env";

//Store the bookings in the array
let bookings = [];

const PreviousRides = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  //State to manage the Bookings
  const [selectedBooking, setSelectedBooking] = useState({
    riderName: "",
    riderOrigin: "",
    riderDestination: "",
    date: null,
    driverName: "",
    driverContact: null,
    driverVehicle: "",
    distance: 0,
    duration: 0,
    fare: 0,
    status: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getHistory();
    setInterval(() => getHistory(), 60000);
  }, []);

  //Getting the history of the user bookings
  async function getHistory() {
    bookings = [];
    let name = JSON.parse(localStorage.getItem("user")).name;
    let result = await fetch(`${BACKEND_URL}bookings/previous/${name}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    console.log(result);
    for (let i = 0; i < result.data.length; i++) {
      bookings.push(result.data[i]);
      setLoading(false);
    }
    console.log(bookings[0].driverVehicle);
  }

  //Function to see the details of the selected ride
  function viewDetails(id) {
    bookings.map((booking) => {
      if (booking._id === id) {
        let dateTime = booking.date.split(".")[0];
        let onlyDate = dateTime.split("T")[0];
        let onlyTime = dateTime.split("T")[1];

        setSelectedBooking({
          riderName: booking.riderName,
          riderOrigin: booking.riderOrigin,
          riderDestination: booking.riderDestination,
          date: onlyDate + " " + onlyTime,
          driverName: booking.driverName,
          driverContact: booking.driverContact,
          driverVehicle: booking.driverVehicle,
          distance: booking.distance,
          duration: booking.duration,
          fare: booking.fare,
          status: booking.status,
        });
      }
      return 0;
    });
    handleShow();
  }

  return (
    <div className="m-5">
      <Card.Header className="text-center" as="h1">
        History
      </Card.Header>
      {bookings.length > 0 ? (
        <>
          {bookings.map((booking) => (
            <Card className="m-2">
              <Card.Body>
                <Card.Title>
                  <b>Booked by: </b>
                  {booking.riderName}
                  <p className="text-sm">
                    {booking.status === "cancelled" && (
                      <Badge bg="danger">Cancelled</Badge>
                    )}
                    {booking.status === "completed" && (
                      <Badge bg="success">Completed</Badge>
                    )}
                  </p>
                </Card.Title>
                <Card.Text>
                  <div>
                    <p>
                      <b>Booking ID: </b>
                      {booking._id}
                    </p>
                    <p>
                      {booking.date.split("T")[0] +
                        " " +
                        booking.date.split("T")[1].split(".")[0]}
                    </p>
                  </div>
                  <ListGroup horizontal>
                    <ListGroup.Item>
                      <b>Origin: </b>
                      {booking.riderOrigin}
                    </ListGroup.Item>
                    <FontAwesomeIcon
                      className="text-green-700"
                      icon={faArrowRightLong}
                    />
                    <ListGroup.Item>
                      <b>Destination: </b>
                      {booking.riderDestination}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Fare: </b>
                      {booking.fare}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
                <Card.Footer>
                  <Button
                    className="mt-1"
                    variant="success"
                    onClick={() => viewDetails(booking._id)}
                  >
                    View
                  </Button>
                </Card.Footer>
              </Card.Body>
            </Card>
          ))}
        </>
      ) : (
        <>
          {loading ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              <Card>
                <Card.Body>
                  <Card.Text className="text-center">
                    No Bookings Found Associated with this account.
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          )}
        </>
      )}

      <DetailsModal
        show={show}
        handleClose={handleClose}
        selectedBooking={selectedBooking}
      />
    </div>
  );
};

export default PreviousRides;
