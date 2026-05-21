# 🚗 DriveFleet: Premium Car Rental Platform

DriveFleet is a comprehensive, full-stack car rental application designed to provide a seamless vehicle booking experience. Whether you're looking for a luxury SUV or an efficient hatchback, DriveFleet connects users with the perfect ride through a clean, modern, and responsive interface.

---

## 🚀 Live Demo
*https://drivefleet-client-murex.vercel.app/*

## 🛠 Tech Stack

**Frontend:**
- Next.js (App Router)
- Vanilla JavaScript
- Tailwind CSS
- Framer Motion (for smooth animations)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for secure authentication
- HTTPOnly Cookies for secure session management

---

## ✨ Core Features

### 👤 User Authentication
- **Secure JWT Authentication:** Protected routes and API endpoints using HTTPOnly cookies.
- **Registration & Login:** Secure password validation (uppercase, lowercase, min 6 characters).
- **Google Login:** Seamless social authentication.

### 🚗 Vehicle Management
- **Explore & Filter:** Real-time search by car name (using MongoDB Regex) and filtering by car type.
- **CRUD Operations:** Owners can securely add, update, and delete their own car listings.
- **Booking System:** Track booking history and automate inventory updates using `$inc` operators.

### 💻 UI/UX Features
- **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop.
- **Dynamic Loading:** Smooth loading spinners and skeletons.
- **Custom Feedback:** Elegant toast/inline notifications instead of browser alerts.
- **Modern Aesthetic:** Clean, grid-based layout with uniform card dimensions.

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- ImgBB or similar Image hosting service

