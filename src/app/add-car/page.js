"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { PlusCircle, FileText, ArrowRight, DollarSign, Image, Users, MapPin, Sparkles, Loader2, KeyRound } from "lucide-react";

export default function AddCarPage() {
  const { user, isLoading, addCar } = useAuth();
  const router = useRouter();

  // Form Fields State
  const [name, setName] = useState("");
  const [type, setType] = useState("SUV");
  const [dailyRent, setDailyRent] = useState("");
  const [image, setImage] = useState("");
  const [seats, setSeats] = useState("5");
  const [pickupLocation, setPickupLocation] = useState("");
  const [description, setDescription] = useState("");
  
  // Custom technical specs
  const [transmission, setTransmission] = useState("Automatic");
  const [fuelType, setFuelType] = useState("Petrol");
  const [mileage, setMileage] = useState("24 MPG");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Render a sleek loader while checking session
  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  // Gracefully handle unauthenticated views
  if (!user) {
    return (
      <div className="mx-auto w-full max-w-md px-4 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-8 shadow-xl"
        >
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <KeyRound className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Secure Listing Portal
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
            You must be logged in to list vehicles on DriveFleet.
          </p>
          <button
            onClick={() => router.push("/login?redirect=/add-car")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-md hover:from-indigo-700 hover:to-violet-700 transition-all cursor-pointer"
          >
            Sign In Now
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !dailyRent || !image || !pickupLocation || !description) {
      return;
    }

    setIsSubmitting(true);

    const carDetails = {
      name,
      type,
      dailyRent: parseFloat(dailyRent),
      image,
      seats: parseInt(seats),
      pickupLocation,
      description,
      specs: {
        transmission,
        fuelType,
        mileage,
      },
    };

    // Simulate delay
    setTimeout(() => {
      const success = addCar(carDetails);
      setIsSubmitting(false);
      if (success) {
        router.push("/my-added-cars");
      }
    }, 800);
  };

  const loadDemoListing = () => {
    setName("Aston Martin Vantage");
    setType("Sports");
    setDailyRent("220");
    setImage("https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=1200");
    setSeats("2");
    setPickupLocation("Gulshan, Dhaka");
    setDescription("The ultimate automotive luxury statement. Features an incredibly athletic Vantage layout, AMG-sourced twin-turbo V8 engine producing 503 HP, and track-ready carbon composite braking.");
    setTransmission("Paddle Auto");
    setFuelType("Petrol");
    setMileage("18 MPG");
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8 flex-1">
      {/* Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Banner Details */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              List Your Car
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">
              Share your premium vehicle with our luxury community. Set your own pricing, manage details, and earn high yields.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950/40 space-y-4">
            <div className="flex gap-3">
              <Sparkles className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-200">Set Competitive Rates</h4>
                <p className="text-[11px] text-gray-400 dark:text-zinc-500 mt-0.5">Exotics generally rent between $150 to $300 daily.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <PlusCircle className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-200">Instant Demo Load</h4>
                <p className="text-[11px] text-gray-400 dark:text-zinc-500 mt-0.5">Quickly autofill sample high-quality info to try listings.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={loadDemoListing}
              className="w-full rounded-xl border border-indigo-200/50 dark:border-indigo-500/10 bg-indigo-50/50 dark:bg-indigo-950/15 py-2.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors cursor-pointer text-center"
            >
              Autofill Sample Data
            </button>
          </div>
        </div>

        {/* Input Form Column */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-xl shadow-zinc-200/10 dark:shadow-none"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300">Car Model / Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aston Martin Vantage"
                    className="block w-full mt-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-3 px-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-hidden transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300">Vehicle Category</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="block w-full mt-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-3 px-4 text-sm text-gray-700 dark:text-zinc-300 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-hidden transition-all cursor-pointer"
                  >
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Sports">Sports Coupe</option>
                    <option value="Electric">Electric EV</option>
                    <option value="Luxury">Luxury Sedan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300">Daily Flat Rent (BDT)</label>
                  <div className="relative mt-1.5">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      required
                      min="1"
                      value={dailyRent}
                      onChange={(e) => setDailyRent(e.target.value)}
                      placeholder="180"
                      className="block w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-3 pl-8 pr-4 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300">Seating Capacity</label>
                  <div className="relative mt-1.5">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Users className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      required
                      min="1"
                      value={seats}
                      onChange={(e) => setSeats(e.target.value)}
                      placeholder="5"
                      className="block w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-3 pl-9 pr-4 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300">Pickup Location</label>
                  <div className="relative mt-1.5">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="Miami, FL"
                      className="block w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-3 pl-9 pr-4 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-hidden transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Technical Specifications Sub-Form */}
              <div className="border-t border-gray-100 dark:border-zinc-900/80 pt-6 space-y-4">
                <h4 className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">
                  Technical Specifications (Optional)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400">Transmission</label>
                    <input
                      type="text"
                      value={transmission}
                      onChange={(e) => setTransmission(e.target.value)}
                      placeholder="Automatic"
                      className="block w-full mt-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-2 px-3 text-xs text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400">Fuel Type</label>
                    <input
                      type="text"
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                      placeholder="Petrol"
                      className="block w-full mt-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-2 px-3 text-xs text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400">Mileage / Range</label>
                    <input
                      type="text"
                      value={mileage}
                      onChange={(e) => setMileage(e.target.value)}
                      placeholder="24 MPG"
                      className="block w-full mt-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-2 px-3 text-xs text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300">Car Image URL</label>
                <div className="relative mt-1.5 shadow-xs">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Image className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="block w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:outline-hidden transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300">Description</label>
                <div className="relative mt-1.5 shadow-xs">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-start pl-3 pt-3">
                    <FileText className="h-4 w-4 text-gray-400" />
                  </div>
                  <textarea
                    required
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a detailed outline of specifications, exotics features, and availability guidelines..."
                    className="block w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-hidden transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-end border-t border-gray-100 dark:border-zinc-900/80 pt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-linearo-r from-indigo-600 to-violet-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isSubmitting ? "Listing Vehicle..." : "List Vehicle"}
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
