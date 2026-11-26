const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const { EMAIL, PASSWORD } = require("../env.js");

const sendMail = (Data, key) => {
  let response;
  let message;

  switch (key) {
    case "verification":
      response = {
        body: {
          name: `${Data.name}`,
          intro: "Welcome to RideHail! We're very excited to have you on board.",
          action: {
            instructions: "To confirm your account, please click here:",
            button: {
              color: "#22BC66", // Optional action button color
              text: "Confirm your account",
              link: `http://localhost:5000/rider/verify/${Data._id}`,
            },
          },
          outro:
            "Need help, or have questions? Just reply to this email, we'd love to help.",
        },
      };
      break;
    case "request":
      response = {
        body: {
          name: `${Data.riderName}`,
          intro:
            "Your ride has been requested successfully. Following are the details of your driver:",
          table: {
            data: [
              {
                feilds: "Name",
                description: `${Data.driverName}`,
              },
              {
                feilds: "Contact No.",
                description: `${Data.driverContact}`,
              },
              {
                feilds: "Vehicle No.",
                description: `${Data.driverVehicle}`,
              },
              {
                feilds: "Fare",
                description: `PKR ${Data.fare}`,
              },
            ],
          },
          action: {
            instructions:
              "You can check the status of your ride and more in your dashboard:",
            button: {
              color: "#3869D4",
              text: "Go to Book Ride",
              link: `http://localhost:3000/bookride`,
            },
          },
          outro: "We thank you for using our services.",
        },
      };
      break;
    case "accept":
      response = {
        body: {
          name: `${Data.driverName}`,
          intro:
            "You have accepted the ride successfully. Following are the details of your rider:",
          table: {
            data: [
              {
                feilds: "Name",
                description: `${Data.riderName}`,
              },
              {
                feilds: "Contact No.",
                description: `${Data.riderContact}`,
              },
              {
                feilds: "Origin",
                description: `${Data.riderOrigin}`,
              },
              {
                feilds: "Destination",
                description: `${Data.riderDestination}`,
              },
              {
                feilds: "Fare",
                description: `PKR ${Data.fare}`,
              },
            ],
          },
          action: {
            instructions:
              "You can check the status of your ride and more in your dashboard:",
            button: {
              color: "#3869D4",
              text: "Go to Pick Ride",
              link: `http://localhost:3000/pickride`,
            },
          },
          outro: "We thank you for using our services.",
        },
      };
      break;
    case "completed":
      response = {
        body: {
          intro:
            "Your ride has completed successfully. Following are the details of your ride:",
          table: {
            data: [
              {
                feilds: "Rider Name",
                description: `${Data.riderName}`,
              },
              {
                feilds: "Rider Contact No.",
                description: `${Data.riderContact}`,
              },
              {
                feilds: "Origin",
                description: `${Data.riderOrigin}`,
              },
              {
                feilds: "Destination",
                description: `${Data.riderDestination}`,
              },
              {
                feilds: "Ride Distance",
                description: `${Data.distance} km`,
              },
              {
                feilds: "Ride Duration",
                description: `${Data.duration} minutes`,
              },
              {
                feilds: "Ride Fare",
                description: `PKR ${Data.fare}`,
              },
              {
                feilds: "Driver Name",
                description: `${Data.driverName}`,
              },
              {
                feilds: "Driver Contact No.",
                description: `${Data.driverContact}`,
              },
              {
                feilds: "Driver Vehicle No.",
                description: `${Data.driverVehicle}`,
              },
            ],
          },
          action: {
            instructions: "You can go to your Home Page:",
            button: {
              color: "#3869D4",
              text: "Go to Home",
              link: `http://localhost:3000/`,
            },
          },
          outro: "We thank you for using our services.",
        },
      };
      break;

    default:
      break;
  }

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "RideHail",
      link: `${process.env.BASE_URL}`,
    },
  });

  let mail = MailGenerator.generate(response);

  switch (key) {
    case "verification":
      message = {
        from: EMAIL,
        to: Data.email,
        subject: "Verify Account",
        html: mail,
      };
      break;
    case "request":
      message = {
        from: EMAIL,
        to: Data.riderEmail,
        subject: "Ride Requested",
        html: mail,
      };
      break;
    case "accept":
      message = {
        from: EMAIL,
        to: Data.driverEmail,
        subject: "Ride Accepted",
        html: mail,
      };
      break;
    case "completed":
      message = {
        from: EMAIL,
        to: `${Data.driverEmail},${Data.riderEmail}`,
        subject: "Ride Completed",
        html: mail,
      };
      break;

    default:
      break;
  }

  transporter
    .sendMail(message)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};

module.exports = {
  sendMail,
};
