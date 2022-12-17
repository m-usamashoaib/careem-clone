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

// const center = { lat: 31.4544132, lng: 74.2766072 };
let center = {};

let bookings = [];

const PickRide = () => {
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(/**@type google.maps.Map*/ (null));
  const [marker, setMarker] = useState(/**@type google.maps.Marker*/ (null));
  const [routeDirectionsResponse, setRouteDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  // const [fare, setFare] = useState(0);
  // const [rideStatus, setRideStatus] = useState("");

  const [driverDirectionsResponse, setDriverDirectionsResponse] =
    useState(null);
  // const [driverAddress, setDriverAddress] = useState(
  //   "PureLogics, Block R1 Block R 1 Phase 2 Johar Town, Lahore, Pakistan"
  // );
  // const [driverAddress, setDriverAddress] = useState(null);
  const [riderName, setRiderName] = useState("");
  const [riderContact, setRiderContact] = useState(null);
  const [riderDistance, setRiderDistance] = useState(0);
  const [riderDuration, setRiderDuration] = useState(0);
  const [riderFare, setRiderFare] = useState(0);
  const [riderOrigin, setRiderOrigin] = useState("");
  const [riderDestination, setRiderDestination] = useState("");
  const [rideDate, setRideDate] = useState(null);

  const [show, setShow] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    center = {};
    navigator.geolocation.getCurrentPosition((position) => {
      center.lat = position.coords.latitude;
      center.lng = position.coords.longitude;
      console.log(center);
    });
    console.log(center);
    getData();
    setInterval(() => getData(), 10000);
  }, []);

  if (!isLoaded) return <h1>Loading</h1>;

  async function getData() {
    let name = JSON.parse(localStorage.getItem("user")).name;
    bookings = [];
    let result = await fetch(`http://localhost:5000/bookings/request/${name}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    console.log(result);
    for (let i = 0; i < result.length; i++) {
      bookings.push(result[i]);
    }
    console.log(bookings);
  }

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

  function acceptRide(id) {
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
      }
    });
    // e.preventDefault();
    map.panTo(center);
    setAccepted(true);
  }

  // function clearRoute() {
  //   setRouteDirectionsResponse(null);
  //   setDistance("");
  //   setDuration("");
  //   originRef.current.value = "";
  //   destinationRef.current.value = "";
  // }

  return (
    <div className="flex">
      <div className=" w-1/2 m-5">
        {bookings.length === 0 ? (
          <Card>
            <Card.Header as="h5"> No Bookings at the moment!</Card.Header>
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
                      <p>Date: {rideDate}</p>
                      <p>Origin: {riderOrigin}</p>
                      <p>Destination: {riderDestination}</p>
                    </Card.Text>
                    <Button variant="success" onClick={showRoute}>
                      Show Route
                    </Button>
                    <Button
                      className="mt-1"
                      variant="success"
                      onClick={handleShow}
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
                        <p>Date: {booking.date}</p>
                        <p>Origin: {booking.riderOrigin}</p>
                        <p>Destination: {booking.riderDestination}</p>
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
          options={{
            icon: {
              url: "https://d1a3f4spazzrp4.cloudfront.net/car-types/map70px/product/map-uberx.png",
              scaledSize: new window.google.maps.Size(30, 30),
            },
          }}
          onLoad={(marker) => setMarker(marker)}
        />
        {bookings?.map((booking, i) => (
          <Marker
            key={i}
            position={booking.location}
            clickable={false}
            zIndex={1}
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
              polylineOptions: { strokeColor: "black" },
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
        riderDistance={riderDistance}
        riderDuration={riderDuration}
        fare={riderFare}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
};

export default PickRide;
