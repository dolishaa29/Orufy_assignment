# Orufy Assignment – MERN Stack Product Management Platform

A scalable and modern full-stack MERN application built with secure authentication, cloud image storage, protected routing, and responsive UI components. This project demonstrates production-level architecture using MongoDB Atlas, Cloudinary, JWT authentication, and Material UI.

---

## 🚀 Live Demo

🌐 [Orufy Assignment Live Demo](https://orufy-assignment-puce.vercel.app?utm_source=chatgpt.com)

---

# 📁 Project Structure

```text
Orufy_assignment/
│
├── Backend/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── productController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── authValidation.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Product.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── productRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── Frontend/
    ├── public/
    │
    └── src/
        ├── components/
        ├── pages/
        ├── services/
        ├── App.js
        └── index.js
```

---

# 🛣 Application Routes

| Route      | Description               | Access    |
| ---------- | ------------------------- | --------- |
| `/`        | Dashboard / Products Page | Protected |
| `/login`   | User Login Page           | Public    |
| `/signup`  | User Registration Page    | Public    |
| `/profile` | User Profile Page         | Protected |

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

# 🔐 Features

✅ JWT-based Authentication
✅ Password Hashing with BcryptJS
✅ Protected Routes
✅ Product CRUD Operations
✅ Cloudinary Image Upload
✅ Form Validation using express-validator
✅ Responsive Material UI Design
✅ MongoDB Atlas Integration
✅ RESTful API Architecture

---

# ⚙️ Environment Variables

Create a `.env` file inside the `Backend/` directory:

```env
PORT=7000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

> ⚠️ Never push your `.env` file to GitHub.

Add this inside `.gitignore`:

```gitignore
node_modules
.env
```

---

# 🔑 Authentication Validation Middleware

```javascript
// Backend/middleware/authValidation.js

const { check, validationResult } = require('express-validator');

exports.validateLogin = [
  check('email', 'Enter a valid email')
    .isEmail()
    .normalizeEmail(),

  check('password', 'Password must be at least 6 characters')
    .isLength({ min: 6 }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  },
];
```

---

# 📦 Product Model Schema

```javascript
// Backend/models/Product.js

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    trim: true,
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
```

---

# ☁️ Product Controller Example

```javascript
// Backend/controllers/productController.js

const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least one image',
      });
    }

    const imageFiles = req.files.map((file) => ({
      public_id: file.filename,
      url: file.path,
    }));

    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      images: imageFiles,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: savedProduct,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });

  }
};
```

---

# 🧪 API Testing Scenarios

| Module          | Test Case                | Expected Result         |
| --------------- | ------------------------ | ----------------------- |
| Auth Validation | Empty email/password     | 400 Bad Request         |
| Auth Validation | Invalid email format     | Validation error        |
| Product Upload  | Upload image files       | Product created         |
| Database        | Save product data        | MongoDB document stored |
| UI              | Responsive mobile layout | Proper scaling          |

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

Server runs on:

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

# 📸 Core Functionalities

* User Signup & Login
* JWT Authentication
* Protected Dashboard
* Product Upload System
* Cloudinary Image Storage
* Dynamic Product Rendering
* Responsive Material UI Interface

---

# 📚 Future Improvements

* Product Update & Delete
* Admin Dashboard
* Search & Filters
* Pagination
* Role-based Authentication
* Payment Gateway Integration

---

# 👩‍💻 Developed By

## Dolisha Gandhi

Full-stack Web Developer & MERN Stack Enthusiast

GitHub: [GitHub Profile](https://github.com/dolishaa29?utm_source=chatgpt.com)
