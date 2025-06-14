
# 🗺️ Authenticated Map App – Plot Route from A to B

This is a full-stack React application that allows **authenticated users** to view a map and draw a route between two points (Point A to Point B). Authentication is handled via email/password using **Node.js, Express, MongoDB, and JWT**. The map and routing are powered by **React-Leaflet** and **Leaflet Routing Machine**.

---

## ✅ Features

- 🔐 User authentication (Email/Password) with secure JWT-based login
- 🗺️ Interactive map rendered using `react-leaflet`
- 📍 Select Point A and Point B on the map
- ➡️ Route plotted using Leaflet Routing Machine
- 📌 Use current location as Point A
- 📏 Show distance and estimated travel time
- ⚙️ Protected frontend routes for authenticated users only

---

## 🛠 Tech Stack

| Feature            | Tech Used                       |
|--------------------|---------------------------------|
| Frontend Framework | React (with Vite)               |
| Backend Framework  | Node.js + Express               |
| Database           | MongoDB                         |
| Authentication     | JWT (JSON Web Tokens)           |
| Map Display        | React-Leaflet                   |
| Routing            | Leaflet Routing Machine         |
| Styling            | Plain CSS                       |
| Deployment         | Vercel (Frontend), Render (Backend) |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
https://github.com/shahnwajalam10/Map-Application.git
cd Authenticated Map App
```

### 2. Setup Environment Variables

#### 🔐 Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

#### 🌐 Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
```

---

## 🧱 Folder Structure

```
.
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Login, MapRoute, etc.
│   │   ├── context/     # AuthContext
│   │   └── App.jsx
├── server/              # Express backend
│   ├── controllers/
│   ├── models/          # User.js
│   ├── routes/          # auth.js, route.js
│   ├── middleware/      # authMiddleware.js
│   └── index.js
```

---

## 🧪 Features Implemented

- 🔐 Register/Login via email & password
- ✅ Auth token validation on frontend using `Bearer token`
- 🗺️ Map view available only after login
- 📍 Route from A to B using Leaflet
- 🧭 Use browser geolocation as Point A
- 📏 Show route distance and travel time
- 🌀 Loading spinners and error handling

---

## 💡 What I Learned

- Connecting a full-stack app with MongoDB and React
- Creating protected routes in React using JWTs
- Using `react-leaflet` and integrating Leaflet Routing Machine
- Managing authentication state globally with Context API
- Handling CORS and API security with Express middleware

---

## 🧱 APIs & Endpoints

| Method | Route              | Description            |
|--------|--------------------|------------------------|
| POST   | `/api/register`    | Register new user      |
| POST   | `/api/login`       | Login and return token |

---

## 📦 Deployment Instructions

### Frontend

```bash
cd client
npm install
npm run build
```

### Backend

```bash
cd server
npm install
node index.js
```

Use **Render** or **Cyclic.sh** to deploy backend, and **Vercel** or **Netlify** for frontend.

---

## 🧩 Bonus Features (Optional)

- 🧭 Real-time location detection
- 🎯 Marker popups with coordinates
- 🕒 Loading spinner on map load
- 📱 Fully responsive layout

---

## 👋 Developer Info

**[shahnwaj alam]**  
📧 your.email@example.com  
🔗 [GitHub](https://github.com/shahnwajalam10) | [LinkedIn](https://www.linkedin.com/in/shahnwaj-alam-b08415206/)

---
