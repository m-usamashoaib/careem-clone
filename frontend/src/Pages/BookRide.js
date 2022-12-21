import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Geocode from "react-geocode";
import { Button, Form } from "react-bootstrap";
import RideModal from "../Components/RideModal";

let center = {};

const places = ["places"];

const baseRate = 100;

let freeDrivers = [];

const BookRide = () => {
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: places,
  });

  const [map, setMap] = useState(/**@type google.maps.Map*/ (null));
  const [marker, setMarker] = useState(/**@type google.maps.Marker*/ (null));
  const [routeDirectionsResponse, setRouteDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [fare, setFare] = useState(0);
  const [recommendedFare, setRecommendedFare] = useState(0);
  const [rideStatus, setRideStatus] = useState("");

  const [driverDirectionsResponse, setDriverDirectionsResponse] =
    useState(null);
  const [driverName, setDriverName] = useState("");
  const [driverContact, setDriverContact] = useState(null);
  const [driverVehicle, setDriverVehicle] = useState("");
  const [driverDistance, setDriverDistance] = useState("");
  const [driverDuration, setDriverDuration] = useState("");
  const [avgRating, setAvgRating] = useState(0);

  const [show, setShow] = useState(false);
  const [fareDisabled, setFareDisabled] = useState(true);
  const [driversDisabled, setDriversDisabled] = useState(true);
  const [requestDisabled, setRequestDisabled] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let originRef = useRef();
  let destinationRef = useRef();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      center.lat = position.coords.latitude;
      center.lng = position.coords.longitude;
    });
    setInterval(() => {
      getData();
    }, 10000);
  }, []);

  if (!isLoaded) return <h1>Loading</h1>;

  function calculateFare(distance, duration) {
    let tripDistance = distance.split(" ")[0];
    let tripDuration = duration.split(" ")[0];
    // console.log(duration);

    // console.log(tripDistance);
    setFare(
      Math.floor(
        baseRate + Number(tripDistance) * 20 + Number(tripDuration) * 10
      )
    );
    setRecommendedFare(
      Math.floor(
        baseRate + Number(tripDistance) * 20 + Number(tripDuration) * 10
      )
    );
    setDriversDisabled(false);
  }

  async function getData() {
    freeDrivers = [];
    let result = await fetch("http://localhost:5000/drivers/free", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    // console.log(result);
    for (let i = 0; i < result.length; i++) {
      freeDrivers.push(result[i]);
    }

    // console.log(freeDrivers);
  }

  const request = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    // user = Object(user);
    // console.log(user);
    let result = await fetch("http://localhost:5000/addbooking", {
      method: "post",
      body: JSON.stringify({
        riderName: user.name,
        riderContact: user.contact,
        riderOrigin: originRef.current.value,
        riderDestination: destinationRef.current.value,
        duration: Number(duration.split(" ")[0]),
        distance: Number(distance.split(" ")[0]),
        fare,
        date: new Date(),
        driverName,
        driverContact,
        driverVehicle,
        status: "request",
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    // console.warn(result.booking);
    localStorage.setItem("booking", JSON.stringify(result.booking));
    handleShow();
  };

  async function calculateRoute(e) {
    e.preventDefault();
    try {
      if (
        originRef.current.value === "" ||
        destinationRef.current.value === ""
      ) {
        return;
      }
      const routeDirectionsService = new window.google.maps.DirectionsService();
      const results = await routeDirectionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });
      setRouteDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
      setFareDisabled(false);
      marker.setMap(null);
    } catch {
      alert("No route found between these locations.");
    }
  }
  const averageRatings = (ratings) => {
    let sum = 0;
    console.log(ratings);
    ratings?.map((rating) => {
      sum += rating;
    });
    setAvgRating((sum / ratings?.length).toFixed(1));
    console.log(avgRating);
  };

  function searchDriver(e) {
    // console.log(fare, recommendedFare);
    if (freeDrivers.length === 0) {
      alert("No Driver is free at the moment");
    } else {
      if (fare < recommendedFare) {
        alert("Please enter value greater then recommended value");
      } else {
        setRequestDisabled(false);
        console.log(freeDrivers);
        freeDrivers.map((freeDriver) => {
          if (freeDriver.status === "free") {
            Geocode.fromLatLng(
              freeDriver.location.lat,
              freeDriver.location.lng
            ).then((response) => {
              const driverAddress = response.results[0].formatted_address;
              console.log(driverAddress);
              const driverDirectionsService =
                new window.google.maps.DirectionsService();
              driverDirectionsService
                .route({
                  origin: driverAddress,
                  destination: originRef.current.value,
                  travelMode: window.google.maps.TravelMode.DRIVING,
                })
                .then((results) => {
                  setDriverDirectionsResponse(results);
                  setDriverDistance(results.routes[0].legs[0].distance.text);
                  setDriverDuration(results.routes[0].legs[0].duration.text);
                  setDriverName(freeDriver.name);
                  setDriverContact(freeDriver.contact);
                  setDriverVehicle(freeDriver.vehicleNo);
                  averageRatings(freeDriver.ratings);
                });
            });
            // return;
          }
        });
      }
      e.preventDefault();
      map.panTo(center);
    }
  }

  return (
    <div className="flex">
      <div className=" w-1/2 m-5">
        <Form.Label htmlFor="input">
          <b>Pick Up:</b>
        </Form.Label>
        <Autocomplete>
          <Form.Control type="text" ref={originRef} />
        </Autocomplete>
        <Form.Label htmlFor="input">
          <b>Drop Off:</b>
        </Form.Label>
        <Autocomplete>
          <Form.Control type="text" ref={destinationRef} />
        </Autocomplete>
        <Button className="m-1" variant="success" onClick={calculateRoute}>
          show Route
        </Button>{" "}
        <p>
          <b>Distance:</b> {distance}
        </p>
        <p>
          <b>Duration:</b> {duration}
        </p>
        <Form.Label htmlFor="input">
          <b>Fare:</b>{" "}
        </Form.Label>
        <Button
          className="m-1"
          variant="success"
          disabled={fareDisabled}
          onClick={() => calculateFare(distance, duration)}
        >
          Show Recomended fare
        </Button>{" "}
        <Form.Control
          type="number"
          min={recommendedFare}
          value={fare}
          onChange={(e) => setFare(e.target.value)}
        />
        <Button
          className="m-1"
          variant="success"
          disabled={driversDisabled}
          onClick={searchDriver}
        >
          Search for Drivers
        </Button>{" "}
        <Button
          className="m-1"
          variant="success"
          disabled={requestDisabled}
          onClick={request}
        >
          Request Ride
        </Button>
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
        // onClick={(MouseEvent) => {
        //   console.log(MouseEvent.latLng.toJSON());
        //   Geocode.fromLatLng(
        //     MouseEvent.latLng.toJSON().lat,
        //     MouseEvent.latLng.toJSON().lng
        //   ).then((response) => {
        //     originRef = response.results[0].formatted_address;
        //     console.log(l);
        //     <Marker position={l} />;
        //   });
        // }}
        // onUnmount={(map) => setMap(null)}
      >
        <Marker
          position={center}
          clickable={false}
          zIndex={9}
          onLoad={(marker) => setMarker(marker)}
        />
        {freeDrivers?.map((freeDriver, i) => (
          <Marker
            key={i}
            position={freeDriver.location}
            clickable={false}
            zIndex={9}
            options={{
              // icon: CarIcon,
              icon: {
                url: "https://d1a3f4spazzrp4.cloudfront.net/car-types/map70px/product/map-uberx.png",
                scaledSize: new window.google.maps.Size(30, 30),
              },
            }}
            onLoad={(marker) => setMarker(marker)}
          />
        ))}
        {routeDirectionsResponse && (
          <DirectionsRenderer
            directions={routeDirectionsResponse}
            options={{
              polylineOptions: { strokeColor: "green" },
              // suppressMarkers: true,
            }}
          />
        )}
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
      </GoogleMap>
      <RideModal
        rideStatus={rideStatus}
        setRideStatus={setRideStatus}
        duration={duration}
        driverName={driverName}
        driverContact={driverContact}
        driverVehicle={driverVehicle}
        driverDistance={driverDistance}
        driverDuration={driverDuration}
        driverRating={avgRating}
        fare={fare}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
};

export default BookRide;
