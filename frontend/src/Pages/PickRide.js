import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Geocode from "react-geocode";
import { Button, Card } from "react-bootstrap";
import PickModal from "../Components/PickModal";
import { BACKEND_URL } from "../env";

// const center = { lat: 31.4544132, lng: 74.2766072 };
let center = {};

let bookings = [];

const PickRide = () => {
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  //Making a state to manage map and marker
  const [map, setMap] = useState(/**@type google.maps.Map*/ (null));
  const [marker, setMarker] = useState(/**@type google.maps.Marker*/ (null));

  //State to store the directions of route
  const [routeDirectionsResponse, setRouteDirectionsResponse] = useState(null);

  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  //State to store the directions of driver to origin
  const [driverDirectionsResponse, setDriverDirectionsResponse] =
    useState(null);
  // const [driverAddress, setDriverAddress] = useState(
  //   "PureLogics, Block R1 Block R 1 Phase 2 Johar Town, Lahore, Pakistan"
  // );
  // const [driverAddress, setDriverAddress] = useState(null);

  //States to manage the ride details
  const [riderName, setRiderName] = useState("");
  const [riderContact, setRiderContact] = useState(null);
  const [riderDistance, setRiderDistance] = useState(0);
  const [riderDuration, setRiderDuration] = useState(0);
  const [riderFare, setRiderFare] = useState(0);
  const [riderOrigin, setRiderOrigin] = useState("");
  const [riderDestination, setRiderDestination] = useState("");
  const [rideDate, setRideDate] = useState(null);
  const [rideStatus, setRideStatus] = useState("");

  const [show, setShow] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // center = {};
    // navigator.geolocation.getCurrentPosition((position) => {
    //   center.lat = position.coords.latitude;
    //   center.lng = position.coords.longitude;
    //   console.log(center);
    // });
    let user = JSON.parse(localStorage.getItem("user"));
    center.lat = user.location.lat;
    center.lng = user.location.lng;
    console.log(center);
    getData();
    setInterval(() => getData(), 10000);
  }, []);

  if (!isLoaded) return <h1>Loading</h1>;

  async function getData() {
    let name = JSON.parse(localStorage.getItem("user")).name;
    bookings = [];
    let result = await fetch(`${BACKEND_URL}bookings/request/${name}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    console.log(result.data);
    for (let i = 0; i < result.data.length; i++) {
      bookings.push(result.data[i]);
    }
    console.log(bookings);
  }

  //Function to show a route between the Origin and Destination of rider
  async function showRoute(e) {
    console.log(riderOrigin);
    console.log(riderDestination);
    e.preventDefault();
    const routeDirectionsService = new window.google.maps.DirectionsService();
    const results = await routeDirectionsService.route({
      origin: riderOrigin,
      destination: riderDestination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setRouteDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  //Function to set accept the ride when the driver accept a ride it will make directions between driver and origin
  async function acceptRide(id) {
    bookings.map((booking) => {
      if (booking._id === id) {
        let user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        Geocode.fromLatLng(user.location.lat, user.location.lng).then(
          (response) => {
            const driverAddress = response.results[0].formatted_address;
            console.log(driverAddress);
            const driverDirectionsService =
              new window.google.maps.DirectionsService();
            driverDirectionsService
              .route({
                origin: driverAddress,
                destination: booking.riderOrigin,
                travelMode: window.google.maps.TravelMode.DRIVING,
              })
              .then((results) => {
                setDriverDirectionsResponse(results);
                setRiderDistance(results.routes[0].legs[0].distance.text);
                setRiderDuration(results.routes[0].legs[0].duration.text);
                setRiderName(booking.riderName);
                setRiderContact(booking.riderContact);
                setRiderOrigin(booking.riderOrigin);
                // console.log(booking.riderName);
                setRiderDestination(booking.riderDestination);
                setRiderFare(booking.fare);
                setRideDate(booking.date);
              });
          }
        );
        localStorage.setItem("booking", JSON.stringify(booking));
      }
      return 0;
    });

    //Setting the status of ride to accepted
    let booking = JSON.parse(localStorage.getItem("booking"));
    // console.log(_id);
    let finishResult = await fetch(`${BACKEND_URL}bookings/${booking._id}`, {
      method: "put",
      body: JSON.stringify({
        status: "accepted",
        booking,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    finishResult = await finishResult.json();
    console.warn(finishResult);

    let _id = JSON.parse(localStorage.getItem("user"))._id;
    // console.log(_id);
    let result = await fetch(`${BACKEND_URL}driver/${_id}`, {
      method: "put",
      body: JSON.stringify({
        status: "inride",
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    console.warn(result);

    // e.preventDefault();
    map.panTo(center);
    setAccepted(true);
  }

  //Changing the status of ride to started
  const startRide = async () => {
    let { _id } = JSON.parse(localStorage.getItem("booking"));
    console.log(_id);
    let result = await fetch(`${BACKEND_URL}bookings/${_id}`, {
      method: "put",
      body: JSON.stringify({
        status: "started",
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    console.warn(result);
    handleShow();
  };

  return (
    <div className="flex">
      <div className=" w-1/2 m-5">
        {bookings.length === 0 && !accepted ? (
          <Card>
            <Card.Header as="h3"> No Bookings at the moment!</Card.Header>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text>Search for riders</Card.Text>
              <Button
                className="mt-1"
                variant="success"
                onClick={() => window.location.reload()}
              >
                Search
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <>
            {accepted ? (
              <div>
                <Card>
                  <Card.Header as="h5">{riderFare} PKR</Card.Header>
                  <Card.Body>
                    <Card.Title>{riderName}</Card.Title>
                    <Card.Text>
                      <p>
                        <b>Date: </b>
                        {rideDate}
                      </p>
                      <p>
                        <b>Origin: </b>
                        {riderOrigin}
                      </p>
                      <p>
                        <b>Destination: </b>
                        {riderDestination}
                      </p>
                      <p>
                        <b>Distance: </b>
                        {riderDistance}
                      </p>
                      <p>
                        <b>Duration: </b>
                        {riderDuration}
                      </p>
                    </Card.Text>
                    <Button variant="success" onClick={showRoute}>
                      Show Route
                    </Button>
                    <Button
                      className="mt-1"
                      variant="success"
                      onClick={startRide}
                    >
                      Start Ride
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ) : (
              <div>
                {bookings.map((booking) => (
                  <Card>
                    <Card.Header as="h5">
                      Offering {booking.fare} PKR
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{booking.riderName}</Card.Title>
                      <Card.Text>
                        <p>
                          <b>Origin: </b>
                          {booking.riderOrigin}
                        </p>
                        <p>
                          <b>Destination: </b>
                          {booking.riderDestination}
                        </p>
                      </Card.Text>
                      <Button
                        variant="success"
                        onClick={() => acceptRide(booking._id)}
                      >
                        Accept
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="map-container"
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker
          position={center}
          clickable={false}
          zIndex={9}
          options={{
            icon: {
              url: "https://d1a3f4spazzrp4.cloudfront.net/car-types/map70px/product/map-uberx.png",
              scaledSize: new window.google.maps.Size(30, 30),
            },
          }}
          onLoad={(marker) => setMarker(marker)}
          // onUnmount={marker.setMap(null)}
        />
        {bookings?.map((booking, i) => (
          <Marker
            key={i}
            position={booking.location}
            clickable={false}
            zIndex={9}
            options={{
              // icon: CarIcon,
              icon: {
                url: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
                scaledSize: new window.google.maps.Size(30, 30),
              },
            }}
            onLoad={(marker) => setMarker(marker)}
          />
        ))}
        {driverDirectionsResponse && (
          <DirectionsRenderer
            directions={driverDirectionsResponse}
            options={{
              polylineOptions: {
                strokeColor: "black",
                strokeOpacity: "1",
              },
              suppressMarkers: true,
            }}
          />
        )}
        {routeDirectionsResponse && (
          <DirectionsRenderer
            directions={routeDirectionsResponse}
            options={{
              polylineOptions: { strokeColor: "green" },
              // suppressMarkers: true,
            }}
          />
        )}
      </GoogleMap>
      <PickModal
        riderName={riderName}
        riderContact={riderContact}
        distance={distance}
        duration={duration}
        fare={riderFare}
        show={show}
        handleClose={handleClose}
        rideStatus={rideStatus}
        setRideStatus={setRideStatus}
      />
    </div>
  );
};

export default PickRide;
