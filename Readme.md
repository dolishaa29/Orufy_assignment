# Orufy Assignment – MERN Stack Product Management Platform

A modern full-stack MERN application built with secure authentication, protected routes, cloud image uploads, and responsive Material UI design. The platform allows users to manage products efficiently with JWT authentication and Cloudinary-based media storage.

---

# 🚀 Live Demo

🌐 [Orufy Assignment Live Demo](https://orufy-assignment-puce.vercel.app?utm_source=chatgpt.com)

---

# 📁 Project Structure

```text
Orufy_assignment/
│
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── Frontend/
    ├── public/
    └── src/
        ├── components/
        ├── pages/
        ├── services/
        ├── App.js
        └── index.js
```

---

# 🛣 Application Routes

| Route      | Description                  | Access    |
| ---------- | ---------------------------- | --------- |
| `/`        | Dashboard / Product Overview | Protected |
| `/login`   | Login Page                   | Public    |
| `/signup`  | Registration Page            | Public    |
| `/profile` | User Profile                 | Protected |

---

# 🛠 Tech Stack

## Frontend

* React.js
* Material UI (MUI)
* React Router DOM
* Axios

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* BcryptJS
* Multer
* Cloudinary

---

# ✨ Features

✅ Secure JWT Authentication
✅ Password Encryption using BcryptJS
✅ Protected Routes
✅ Product Management System
✅ Cloudinary Image Upload
✅ Responsive UI with Material UI
✅ REST API Architecture
✅ MongoDB Atlas Database Integration

---

# 🔐 Environment Variables Setup

## Backend `.env`

Create a `.env` file inside the `Backend/` folder and add the following variables:

```env
MONGO_URI=your_mongodb_connection_string

PORT=7000

JWT_SECRET=your_jwt_secret

CLOUD_NAME=your_cloudinary_name

API_KEY=your_cloudinary_api_key

API_SECRET=your_cloudinary_api_secret
```

---

## Frontend `.env`

Create a `.env` file inside the `Frontend/` folder:

```env
VITE_API_URL=http://localhost:7000/api
```

---

# ⚠️ Important Security Note

Never upload your `.env` file to GitHub.

Add the following inside `.gitignore`:

```gitignore
node_modules
.env
```

---

# 🧪 Testing Scenarios

| Module         | Test Case               | Expected Output             |
| -------------- | ----------------------- | --------------------------- |
| Authentication | Empty login credentials | 400 Validation Error        |
| Authentication | Invalid email format    | Error Response              |
| Product Upload | Upload image files      | Product stored successfully |
| Database       | Save product details    | MongoDB document created    |
| UI             | Mobile responsiveness   | Proper responsive layout    |

---

# 💻 Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/dolishaa29/Orufy_assignment.git

cd Orufy_assignment
```

---

# ▶️ Backend Setup

```bash
cd Backend

npm install

npm start
```

Backend server runs on:

```text
http://localhost:7000
```

---

# ▶️ Frontend Setup

```bash
cd Frontend

npm install

npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

# 📦 Core Functionalities

* User Signup & Login
* JWT Authentication
* Protected Dashboard
* Product Upload & Management
* Cloudinary Image Storage
* Responsive Material UI Design

---

# 🚀 Future Improvements

* Product Update & Delete
* Admin Dashboard
* Product Search & Filters
* Pagination
* Role-Based Authentication
* Payment Gateway Integration

---

# 👩‍💻 Developed By

## Dolisha Gandhi

MERN Stack Developer & Data Science Enthusiast

GitHub: [GitHub Profile](https://github.com/dolishaa29?utm_source=chatgpt.com)
