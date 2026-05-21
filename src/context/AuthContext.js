"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { mockCars } from "../data/mockCars";

const AuthContext = createContext();

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper to map backend Car model to frontend schema format
const mapBackendCarToFrontend = (backendCar) => {
  if (!backendCar) return null;
  return {
    id: backendCar._id || backendCar.id,
    _id: backendCar._id || backendCar.id,
    name: backendCar.name,
    type: backendCar.carType || backendCar.type || "SUV",
    carType: backendCar.carType || backendCar.type || "SUV",
    dailyRent: Number(backendCar.dailyRent),
    image: backendCar.image,
    seats: Number(backendCar.seatCapacity || backendCar.seats || 5),
    seatCapacity: Number(backendCar.seatCapacity || backendCar.seats || 5),
    pickupLocation: backendCar.pickupLocation,
    description: backendCar.description,
    available: backendCar.available !== undefined ? backendCar.available : true,
    ownerEmail: backendCar.ownerEmail,
    ownerId: backendCar.ownerId,
    bookingCount: backendCar.bookingCount || backendCar.booking_count || 0,
    booking_count: backendCar.bookingCount || backendCar.booking_count || 0,
    specs: backendCar.specs || {
      transmission: "Automatic",
      fuelType: "Petrol",
      mileage: "24 MPG"
    }
  };
};

// Helper to map backend Booking model to frontend schema format
const mapBackendBookingToFrontend = (backendBooking) => {
  if (!backendBooking) return null;
  const car = backendBooking.carId || {};
  return {
    id: backendBooking._id || backendBooking.id,
    _id: backendBooking._id || backendBooking.id,
    carId: car._id || car.id || backendBooking.carId,
    carName: car.name || backendBooking.carName || "Premium Vehicle",
    carImage: car.image || backendBooking.carImage || "",
    dailyRent: Number(car.dailyRent || backendBooking.dailyRent || 0),
    pickupLocation: car.pickupLocation || backendBooking.pickupLocation || "",
    userEmail: backendBooking.userEmail,
    userId: backendBooking.userId,
    bookingDate: new Date(backendBooking.bookingDate || backendBooking.createdAt || Date.now()).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    startDate: backendBooking.startDate,
    endDate: backendBooking.endDate,
    days: Number(backendBooking.days || 1),
    totalPrice: Number(backendBooking.totalPrice || 0),
    status: backendBooking.status || "Confirmed",
    driverNeeded: backendBooking.driverNeeded || false,
    specialNote: backendBooking.specialNote || "",
  };
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load state and fetch from API on mount
  useEffect(() => {
    const initializeAuth = async () => {
      // 1. Restore user from localStorage
      const storedUser = localStorage.getItem("df_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      // 2. Fetch cars from Express API
      await fetchCars();

      // 3. Fetch bookings if user is authenticated
      const token = localStorage.getItem("df_token");
      if (token) {
        await fetchBookings(token);
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Fetch all cars from Express API
  const fetchCars = async () => {
    try {
      const response = await fetch(`${API_URL}/cars`);
      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        const mapped = data.data.map(mapBackendCarToFrontend);
        setCars(mapped);
      } else {
        // Fallback to mockCars if database is completely empty or response is unexpected
        setCars(mockCars);
      }
    } catch (error) {
      console.error("Express API connection failed, falling back to mock cars:", error);
      setCars(mockCars);
    }
  };

  // Fetch bookings belonging to the currently logged in user
  const fetchBookings = async (token) => {
    const activeToken = token || localStorage.getItem("df_token");
    if (!activeToken) return;

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        headers: {
          "Authorization": `Bearer ${activeToken}`
        }
      });
      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        const mapped = data.data.map(mapBackendBookingToFrontend);
        setBookings(mapped);
      }
    } catch (error) {
      console.error("Failed to fetch bookings from API:", error);
    }
  };

  // Sync state helpers
  const saveSession = (userData, token) => {
    if (userData && token) {
      localStorage.setItem("df_user", JSON.stringify(userData));
      localStorage.setItem("df_token", token);
    } else {
      localStorage.removeItem("df_user");
      localStorage.removeItem("df_token");
    }
  };

  const showToast = (message, type = "success") => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Password Validator: min 6 chars, 1 uppercase, 1 lowercase
  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
    return null;
  };

  // Auth Operations
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();

      if (!data.success) {
        showToast(data.message || "Invalid email or password", "error");
        return false;
      }

      const userData = {
        id: data.user.id || data.user._id,
        name: data.user.name,
        email: data.user.email,
        photoUrl: data.user.photoUrl || "",
      };

      setUser(userData);
      saveSession(userData, data.token);
      
      // Load user's bookings and refresh cars
      await fetchBookings(data.token);
      await fetchCars();

      showToast(`Welcome back, ${userData.name}!`, "success");
      return true;
    } catch (error) {
      console.error("Login server error:", error);
      showToast("Authentication server is unreachable. Please try again later.", "error");
      return false;
    }
  };

  const register = async (name, email, password) => {
    const pwdError = validatePassword(password);
    if (pwdError) {
      showToast(pwdError, "error");
      return false;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, photoUrl: "" }),
      });
      
      const data = await response.json();

      if (!data.success) {
        showToast(data.message || "Registration failed", "error");
        return false;
      }

      const userData = {
        id: data.user.id || data.user._id,
        name: data.user.name,
        email: data.user.email,
        photoUrl: data.user.photoUrl || "",
      };

      setUser(userData);
      saveSession(userData, data.token);
      
      await fetchBookings(data.token);
      await fetchCars();

      showToast("Registration successful! Welcome aboard.", "success");
      return true;
    } catch (error) {
      console.error("Registration server error:", error);
      showToast("Registration failed due to server connectivity error.", "error");
      return false;
    }
  };

  const googleSignIn = async () => {
    // Mock Google Sign In - simulates successful login without backend
    const mockUser = {
      id: "google_" + Date.now(),
      name: "Alex Mercer",
      email: "alex.mercer@gmail.com",
      photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
      googleUser: true,
    };

    const mockToken = "mock_google_token_" + Date.now();

    setUser(mockUser);
    saveSession(mockUser, mockToken);
    
    await fetchBookings(mockToken);
    await fetchCars();

    showToast("Successfully signed in with Google!", "success");
    return true;
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, { method: "POST" });
    } catch (e) {
      console.error("Logout API request error:", e);
    }
    
    setUser(null);
    setBookings([]);
    saveSession(null, null);
    showToast("Signed out successfully. See you again soon!", "info");
  };

  // Car CRUD Operations
  const addCar = async (carDetails) => {
    const token = localStorage.getItem("df_token");
    if (!token) {
      showToast("Please sign in to list a car.", "error");
      return false;
    }

    try {
      const response = await fetch(`${API_URL}/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: carDetails.name,
          dailyRent: Number(carDetails.dailyRent),
          carType: carDetails.type,
          image: carDetails.image,
          seatCapacity: Number(carDetails.seats),
          pickupLocation: carDetails.pickupLocation,
          description: carDetails.description
        }),
      });

      const data = await response.json();

      if (!data.success) {
        showToast(data.message || "Failed to list car", "error");
        return false;
      }

      await fetchCars();
      showToast(`Car "${carDetails.name}" listed successfully!`, "success");
      return true;
    } catch (error) {
      console.error("Add car server error:", error);
      showToast("Listing failed due to server connection error.", "error");
      return false;
    }
  };

  const updateCar = async (carId, updatedFields) => {
    const token = localStorage.getItem("df_token");
    if (!token) return false;

    try {
      const response = await fetch(`${API_URL}/cars/${carId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: updatedFields.name,
          dailyRent: updatedFields.dailyRent !== undefined ? Number(updatedFields.dailyRent) : undefined,
          carType: updatedFields.type || updatedFields.carType,
          image: updatedFields.image,
          seatCapacity: updatedFields.seats !== undefined ? Number(updatedFields.seats) : (updatedFields.seatCapacity !== undefined ? Number(updatedFields.seatCapacity) : undefined),
          pickupLocation: updatedFields.pickupLocation,
          description: updatedFields.description,
          available: updatedFields.available
        }),
      });

      const data = await response.json();

      if (!data.success) {
        showToast(data.message || "Failed to update listing", "error");
        return false;
      }

      await fetchCars();
      showToast("Listing updated successfully!", "success");
      return true;
    } catch (error) {
      console.error("Update car server error:", error);
      showToast("Update failed due to server connection error.", "error");
      return false;
    }
  };

  const deleteCar = async (carId) => {
    const token = localStorage.getItem("df_token");
    if (!token) return false;

    try {
      const response = await fetch(`${API_URL}/cars/${carId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!data.success) {
        showToast(data.message || "Failed to remove listing", "error");
        return false;
      }

      await fetchCars();
      await fetchBookings(token);
      showToast("Listing removed successfully.", "info");
      return true;
    } catch (error) {
      console.error("Delete car server error:", error);
      showToast("Removal failed due to server connection error.", "error");
      return false;
    }
  };

  // Booking Operations
  const bookCar = async (carId, bookingDetails) => {
    const token = localStorage.getItem("df_token");
    if (!user || !token) {
      showToast("Please log in to book a car.", "error");
      return false;
    }

    const targetCar = cars.find((c) => c.id === carId);
    if (!targetCar) {
      showToast("Car listing not found.", "error");
      return false;
    }

    const durationDays = Number(bookingDetails.days) || 1;
    const computedPrice = targetCar.dailyRent * durationDays;

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          carId,
          startDate: bookingDetails.startDate,
          endDate: bookingDetails.endDate,
          days: durationDays,
          totalPrice: computedPrice
        }),
      });

      const data = await response.json();

      if (!data.success) {
        showToast(data.message || "Booking reservation failed", "error");
        return false;
      }

      // Refresh cars and bookings to get the updated status
      await fetchCars();
      await fetchBookings(token);

      showToast(`Successfully booked ${targetCar.name}!`, "success");
      return true;
    } catch (error) {
      console.error("Booking reservation server error:", error);
      showToast("Reservation failed due to server connection error.", "error");
      return false;
    }
  };

  const cancelBooking = async (bookingId, carId) => {
    const token = localStorage.getItem("df_token");
    if (!token) return false;

    try {
      const response = await fetch(`${API_URL}/bookings/${bookingId}/cancel`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!data.success) {
        showToast(data.message || "Failed to cancel booking", "error");
        return false;
      }

      await fetchBookings(token);
      await fetchCars();

      showToast("Booking cancelled successfully.", "info");
      return true;
    } catch (error) {
      console.error("Cancel booking server error:", error);
      showToast("Cancellation failed due to server connection error.", "error");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        cars,
        bookings,
        toasts,
        login,
        register,
        googleSignIn,
        logout,
        addCar,
        updateCar,
        deleteCar,
        bookCar,
        cancelBooking,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
