# Ride-hailing App (MERN)

A full-stack ride-hailing web app: riders book trips with Google Maps routing and fare estimates, drivers receive ride requests **instantly over Socket.io**, and both sides get real-time status updates and email notifications from request to drop-off.

Built with **MongoDB, Express, React and Node.js** in Dec 2022 – Jan 2023.

**👤 Author:** [Muhammad Usama Shoaib](https://m-usamashoaib.github.io) · [LinkedIn](https://www.linkedin.com/in/m-usamashoaib)

> Educational project inspired by ride-hailing apps. Not affiliated with any ride-hailing company.

## Features

**For riders**
- Sign up with **email verification**; JWT login with protected routes
- Choose **pickup and destination** with Google Places autocomplete (the map opens at your current location)
- See the **route, distance and duration** (Google Directions API) and a **fare estimate**: PKR 100 base + PKR 20/km + PKR 10/min
- Offer a higher fare than recommended (never lower)
- Get matched with an **available driver**, with their distance, ETA, vehicle and **average rating**
- Follow the ride live: *requested → accepted → started → completed*, or **cancel** it
- **Rate the driver** (1–5 stars) after the trip, and browse **ride history**

**For drivers**
- Register with vehicle details and email verification
- Receive **ride requests in real time**, with the rider's route on the map
- Accept the ride and get **directions to the pickup point**, then start and complete it; each step is pushed to the rider instantly

**Everyone**
- Email notifications (Nodemailer + Mailgen) when a ride is **requested, accepted and completed**, with trip details and fare
- Profile editing and password change (current password required)

## Tech stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, React Router, Tailwind CSS, React Bootstrap, `@react-google-maps/api`, `react-geocode`, Socket.io client |
| Backend | Node.js, Express, Socket.io, Mongoose, JWT, bcrypt, Nodemailer, Mailgen |
| Database | MongoDB |
| APIs | Google Maps JavaScript, Places, Directions and Geocoding |

## How it works

```
 Rider (React)                     Node.js + Express + Socket.io                 Driver (React)
 ─────────────                     ─────────────────────────────                 ──────────────
 Places autocomplete ─► Directions: distance, duration ─► fare estimate
 GET /driver/free ─────────────► free drivers (MongoDB)
 POST /bookings/addbooking ────► save booking, email rider
 socket "r_request" ───────────► find driver's socket by email ───────────────► "d_request": new ride
                                                                                accept → PUT /bookings/:id
 "r_status" ◄──────────────────── find rider's socket by email ◄────────────── socket "d_status"
 (accepted / started / completed)  email driver & rider at each step
```

Each client sends a `join` event with its email after login, so the server can route events to the right person.

### REST API

| Method | Route | Auth | Purpose |
|---|---|---|---|
| POST | `/rider/register`, `/driver/register` | | Sign up (sends verification email) |
| POST | `/rider/login`, `/driver/login` | | Log in, returns a JWT (2h) |
| GET | `/rider/verify/:id`, `/driver/verify/:id` | | Email verification link |
| GET | `/driver/free` | JWT | Drivers currently available |
| PUT | `/driver/rating/:contact` | JWT | Add a rating |
| POST | `/bookings/addbooking` | JWT | Request a ride |
| GET | `/bookings/request/:name` | JWT | Pending requests for a driver |
| GET | `/bookings/previous/:name` | JWT | Ride history |
| PUT | `/bookings/:id` | JWT | Update ride status |
| PUT | `/rider/:id`, `/driver/:id` | JWT | Edit profile |
| PUT | `/rider/updatepassword/:id`, `/driver/updatepassword/:id` | JWT | Change password |

### Socket.io events

| Event | Direction | Payload |
|---|---|---|
| `join` | client → server | user's email |
| `r_request` → `d_request` | rider → driver | the new booking |
| `d_status` → `r_status` | driver → rider | `accepted`, `started` or `completed` + booking |

## Run locally

**Requirements:** Node.js 18+, a MongoDB database (e.g. MongoDB Atlas), a Google Maps API key, and a Gmail account with an [app password](https://support.google.com/accounts/answer/185833) for sending emails.

### 1. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URL=mongodb+srv://<user>:<password>@<cluster>/ride-hailing
JWTKEY=<any long random string>
BASE_URL=http://localhost:3000
```

Create `backend/env.js` (email credentials, never commit this file):

```js
module.exports = {
  EMAIL: "your.address@gmail.com",
  PASSWORD: "<gmail app password>",
};
```

```bash
npm start   # http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env` with a Google Maps key that has the **Maps JavaScript, Places, Directions and Geocoding** APIs enabled:

```env
REACT_APP_GOOGLE_MAPS_API_KEY=<your key>
```

```bash
npm start   # http://localhost:3000
```

The backend URL is set in `frontend/src/env.js` (`http://localhost:5000/` by default).

### 3. Try it

1. Register a **driver** and a **rider** (two different emails) and click the verification links.
2. Log in as the driver in one browser and as the rider in another (or a private window).
3. As the rider, enter pickup and destination, then request the ride.
4. As the driver, accept it, then start and complete the ride, and watch the rider's screen update.

## What I'd improve today

This was one of my first full-stack projects. Looking back, I'd change:

- **Live driver location:** drivers' locations come from their profile; streaming GPS updates over Socket.io would enable real live tracking.
- **Fare and matching on the server:** fares are calculated in the browser; they should be computed (and validated) on the server.
- **Authorization:** routes check that a JWT is valid, but not that the user may access *that* booking or profile.
- **Driver verification email:** the verification link always points to the rider route, so driver accounts can't verify through it.
- **Socket user list:** connected users live in memory, which breaks with more than one server instance (a Redis adapter would fix it).
- **TypeScript, tests and input validation** (Joi is installed but not yet used).

## License

MIT
