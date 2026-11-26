import React from "react";
import { Card, CardGroup, Button, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

const GREEN = "#499d3a";

const features = [
  {
    icon: "🗺️",
    title: "Plan your trip on the map",
    text: "Search your pickup and destination, see the route, distance and travel time before you book.",
  },
  {
    icon: "💸",
    title: "Clear fares up front",
    text: "Every trip shows a recommended fare before you request it. Want a faster match? Offer a little more.",
  },
  {
    icon: "⚡",
    title: "Live ride updates",
    text: "Your driver gets your request instantly, and you see every step: accepted, started and completed.",
  },
];

const steps = [
  ["1", "Set your route", "Enter pickup and destination. The map shows your route and trip time."],
  ["2", "Check the fare", "See the recommended fare and find an available driver nearby."],
  ["3", "Request the ride", "Your driver is notified instantly and you get a confirmation email."],
  ["4", "Ride and rate", "Follow the ride live, then rate your driver when you arrive."],
];

const Home = () => {
  return (
    <div>
      {/* Hero */}
      <section
        className="text-white text-center px-4 py-24"
        style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #2f6f25 100%)` }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold">Your ride, a few clicks away.</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">
          Book a ride, see your fare before you go, and follow your trip in real time.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/signup">
            <Button size="lg" variant="light">
              Book a ride
            </Button>
          </Link>
          <a href="#drive">
            <Button size="lg" variant="outline-light">
              Drive with us
            </Button>
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="m-2 mt-10">
        <CardGroup>
          {features.map((f) => (
            <Card className="m-1 text-center" key={f.title}>
              <Card.Body>
                <div className="text-5xl my-3" aria-hidden="true">
                  {f.icon}
                </div>
                <Card.Title>{f.title}</Card.Title>
                <Card.Text>{f.text}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </CardGroup>
      </section>

      {/* How it works */}
      <section id="how" className="m-9">
        <h2 className="font-bold text-center mb-6">How it works</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {steps.map(([n, title, text]) => (
            <div key={n} className="rounded-lg border p-4">
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold"
                style={{ backgroundColor: GREEN }}
              >
                {n}
              </span>
              <h5 className="mt-3 font-bold">{title}</h5>
              <p className="text-gray-600 mb-0">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Drive / Fares */}
      <section className="m-9">
        <CardGroup>
          <Card id="drive" className="m-1 text-white text-center" style={{ backgroundColor: "#2f6f25" }}>
            <Card.Body className="py-12">
              <div className="text-5xl mb-3" aria-hidden="true">🚗</div>
              <h3 className="font-bold">Become a driver</h3>
              <Card.Text>Sign up with your vehicle details, accept ride requests and drive on your schedule.</Card.Text>
              <Link to="/signup">
                <Button size="lg" variant="light">
                  Sign up to drive
                </Button>
              </Link>
            </Card.Body>
          </Card>
          <Card id="fares" className="m-1 text-white text-center" style={{ backgroundColor: GREEN }}>
            <Card.Body className="py-12">
              <div className="text-5xl mb-3" aria-hidden="true">🧾</div>
              <h3 className="font-bold">How fares work</h3>
              <Card.Text>
                PKR 100 base fare + PKR 20 per km + PKR 10 per minute, calculated from your route.
              </Card.Text>
              <Card.Text className="opacity-90">You can always offer more than the recommended fare.</Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </section>

      {/* FAQ */}
      <section id="faq" className="m-20">
        <h2 className="font-bold text-center mt-5">Frequently Asked Questions</h2>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>How do I create an account?</Accordion.Header>
            <Accordion.Body>
              Click <strong>Sign Up</strong>, choose rider or driver, and enter your details. We send a
              verification link to your email; once you click it, you can log in.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>How is my fare calculated?</Accordion.Header>
            <Accordion.Body>
              From the route between your pickup and destination: PKR 100 base fare, plus PKR 20 per
              kilometre and PKR 10 per minute of estimated travel time. You see it before you request the
              ride, and you can offer a higher amount.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>How do I know where my ride is?</Accordion.Header>
            <Accordion.Body>
              The booking screen updates as soon as your driver accepts, starts and completes the ride. You
              also get emails when the ride is requested, accepted and completed.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>How do I become a driver?</Accordion.Header>
            <Accordion.Body>
              Sign up as a driver with your contact details and vehicle number, then verify your email. After
              logging in, open <strong>Pick a Ride</strong> to see and accept ride requests.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Can I cancel a ride or rate my driver?</Accordion.Header>
            <Accordion.Body>
              Yes. You can cancel a requested ride from the ride details, and rate your driver from 1 to 5
              stars after the trip. Past trips are listed under <strong>Previous Rides</strong>.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>
    </div>
  );
};

export default Home;
