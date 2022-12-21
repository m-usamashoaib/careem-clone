import React from "react";
import { Carousel, Card, CardGroup, Button, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 brightness-50"
              src="https://www.careem.com/pubweb-v2/super-app-v2/img/feature-1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              We've created opportunities for over a million people in the
              region to earn an income.
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 brightness-50"
              src="https://www.careem.com/pubweb-v2/super-app-v2/img/feature-2.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              We’re making life simple for millions of Customers with our
              everyday services.
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 brightness-50"
              src="https://www.careem.com/pubweb-v2/super-app-v2/img/feature-3.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              With the help of your generous donations through Careem Rewards,
              we have supported thousands of refugee families with daily
              essentials.
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="m-2">
        <CardGroup>
          <Card className="m-1">
            <Card.Img
              variant="top"
              src="https://www.careem.com/pubweb-v2/super-app-v2/img/new-feature-1.jpg"
            />
            <Card.Body>
              <Card.Title>Simplify your payments with Careem Pay</Card.Title>
              <Card.Text>
                Pay for your Careem rides and food orders, send funds to your
                family, and so much more with Careem Pay.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <a
                href="https://www.careem.com/en-ae/careem-pay/"
                className=" text-green-600 cursor-pointer hover:underline hover:text-green-600"
              >
                Learn More
              </a>
            </Card.Footer>
          </Card>
          <Card className="m-1">
            <Card.Img
              variant="top"
              src="https://www.careem.com/pubweb-v2/super-app-v2/img/new-feature-2.jpg"
            />
            <Card.Body>
              <Card.Title>Treat yourself with Careem Rewards</Card.Title>
              <Card.Text>
                Get more from every ride with Careem Rewards by redeeming your
                points on partner benefits or making a donation to your
                favourite charity.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <a
                href="https://www.careem.com/en-ae/rewards/"
                className=" text-green-600 cursor-pointer hover:underline hover:text-green-600"
              >
                Learn More
              </a>
            </Card.Footer>
          </Card>
          <Card className="m-1">
            <Card.Img
              variant="top"
              src="https://www.careem.com/pubweb-v2/super-app-v2/img/new-feature-3.jpg"
            />
            <Card.Body>
              <Card.Title>We care about you</Card.Title>
              <Card.Text>
                We’re here to provide you with a hassle-free experience that
                makes your life easier.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <a
                href="https://www.careem.com/en-ae/safety-and-security/"
                className=" text-green-600 cursor-pointer hover:underline hover:text-green-600"
              >
                Learn More
              </a>
            </Card.Footer>
          </Card>
        </CardGroup>
      </div>
      <div className=" m-9">
        <CardGroup>
          <Card className=" m-1 bg-dark text-black text-center">
            <Card.Img
              src="https://www.careem.com/pubweb-v2/super-app-v2/img/become-1.jpg"
              alt="Card image"
            />
            <Card.ImgOverlay>
              <Card.Title>
                <h3 className=" font-bold">Become a Captain</h3>
              </Card.Title>
              <Card.Text>
                It’s up to you! Start earning with Careem today.
              </Card.Text>
              <Card.Text>
                <Link to="/signup">
                  <Button size="lg" variant="success">
                    Sign up Now
                  </Button>{" "}
                </Link>
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
          <Card className="m-1 bg-dark text-black text-center">
            <Card.Img
              src="https://www.careem.com/pubweb-v2/super-app-v2/img/become-2.jpg"
              alt="Card image"
            />
            <Card.ImgOverlay>
              <Card.Title>
                <h3 className=" font-bold">Become a Partner</h3>
              </Card.Title>
              <Card.Text>Partner with Careem and grow your business.</Card.Text>
              <Card.Text>
                <Button size="lg" variant="success">
                  <a
                    className=" text-white outline-none"
                    href="https://www.careem.com/now-merchant-signup/"
                  >
                    Contact Us
                  </a>
                </Button>{" "}
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
        </CardGroup>
      </div>
      <div>
        <Card className="bg-dark text-white text-center font-extrabold">
          <Card.Img
            src="https://www.careem.com/pubweb-v2/super-app-v2/img/motto-bg.jpg"
            alt="Card image"
          />
          <Card.ImgOverlay>
            <h1>One app for everyday needs.</h1>
          </Card.ImgOverlay>
        </Card>
      </div>
      <div className=" m-20">
        <h2 className="font-bold text-center mt-5">
          Frequently Asked Questions
        </h2>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="font-bold">
              How do I create an account?
            </Accordion.Header>
            <Accordion.Body>
              <p>
                To create a Careem account you need a valid email address and
                mobile number. Download the app for your iOS or Android device
                and sign up with your mobile number. You may use an
                international number as long as the number is active to receive
                SMS.
              </p>{" "}
              <p>
                To make sure it’s your real number, we’ll send you a
                verification code via SMS which you need to enter to sign up. If
                the SMS with the code does not arrive, you can request a call
                from the same screen.
              </p>{" "}
              <p>Once your number is verified, you’re ready to use Careem!</p>
              <p>
                Alternatively, if you're comfortable with linking your Facebook
                profile to your Careem account, you can sign up via Facebook.
                The app will redirect you to a Facebook page where the email and
                password are required to authorize Careem usage.
              </p>{" "}
              <p>
                During the sign-up process, we ask you for your email address.
                We need your email address for instances where you may have
                forgotten your password and need to receive instructions via
                email on how to reset it. We also send you detailed ride
                receipts via email.
              </p>{" "}
              <p>
                You can also create an account on the web at www.careem.com.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header className="font-bold">
              How do i earn Careem rewards points?
            </Accordion.Header>
            <Accordion.Body>
              You’ll earn points on every Careem ride you take. No sign up
              required! The number of points you earn depends on the cost of the
              ride. You’ll earn points on all rides paid by cash, card, or
              invoice. You won’t earn points on rides taken using a Package or
              Careem Credit, but you will earn points for topping up your Wallet
              with credit (excluding Fawry top ups in Egypt). Points are awarded
              based on the actual spend on Careem. Unpaid or free rides will not
              earn you points.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header className="font-bold">
              How can I add my credit card on the app for payments?
            </Accordion.Header>
            <Accordion.Body>
              In the Careem Pay section, press on Add Card which will lead you
              to a simple form, simply enter these details and press Save. For
              some cards, you will be re-directed to enter an OTP sent to your
              mobile number associated with the card and your card will be added
              upon successful authentication. Careem may charge you a small
              amount to verify your card that will automatically be refunded to
              your card.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header className="font-bold">
              How do I become a Captain?
            </Accordion.Header>
            <Accordion.Body>
              Becoming a captain is a simple three step process. First you will
              need to register with Careem by completing the captain form
              available on the website. After reviewing your application, we
              will invite you for a training session. Once the training is
              complete, you can start riding with us.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header className="font-bold">
              Where can I get more information, support or make a claim?
            </Accordion.Header>
            <Accordion.Body>
              We do our best to provide you with all the help you may need in
              our FAQs. If you need to get in touch with us, you can go to the
              app Menu &gt; Get help.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default Home;
