"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Users, 
  Fuel, 
  Gauge, 
  Calendar, 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  Info,
  CalendarCheck,
  CheckCircle,
  FileCheck
} from "lucide-react";

export default function CarDetailsPage({ params: paramsPromise }) {
  // Unwrap params using React.use()
  const params = use(paramsPromise);
  const { id } = params;
  
  const { cars, user, bookCar, showToast } = useAuth();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  // Set default dates (tomorrow and day after tomorrow) after mounting
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const tomorrowStr = today.toISOString().split("T")[0];
    
    today.setDate(today.getDate() + 2);
    const dayAfterStr = today.toISOString().split("T")[0];
    
    setStartDate(tomorrowStr);
    setEndDate(dayAfterStr);
  }, []);

  const car = useMemo(() => {
    return cars.find((c) => c.id === id);
  }, [cars, id]);

  if (!car) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Car Not Found</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
          The listing you are searching for does not exist or has been removed.
        </p>
        <Link href="/cars" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-md">
          <ArrowLeft className="h-4 w-4" /> Back to Fleet
        </Link>
      </div>
    );
  }

  // Calculate rental duration in days
  const durationDays = useMemo(() => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end - start;
    if (diff <= 0) return 1;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [startDate, endDate]);

  const totalPrice = car.dailyRent * durationDays;

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      showToast("Please log in to book this vehicle.", "error");
      router.push(`/login?redirect=/cars/${car.id}`);
      return;
    }

    const bookingDetails = {
      startDate,
      endDate,
      days: durationDays,
    };

    const success = bookCar(car.id, bookingDetails);
    if (success) {
      setIsModalOpen(false);
      router.push("/my-bookings");
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex-1">
      {/* Return Button */}
      <div className="mb-8">
        <Link href="/cars" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Image Gallery & Specs */}
        <div className="lg:col-span-7 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-96 sm:h-[450px] w-full overflow-hidden rounded-3xl border border-gray-100 dark:border-zinc-900 shadow-lg bg-zinc-100 dark:bg-zinc-900"
          >
            <img
              src={car.image}
              alt={car.name}
              className="h-full w-full object-cover"
            />
            
            <div className="absolute top-6 right-6">
              <span className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold shadow-lg backdrop-blur-md ${
                car.available
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
              }`}>
                {car.available ? "Available Now" : "Currently Booked"}
              </span>
            </div>
            
            <div className="absolute bottom-6 left-6">
              <span className="inline-flex items-center rounded-full bg-black/60 backdrop-blur-md px-4 py-1.5 text-xs font-bold text-gray-200 border border-zinc-700/30">
                {car.type} Category
              </span>
            </div>
          </motion.div>

          {/* Technical Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Seating Capacity", val: `${car.seats} Seats`, icon: Users },
              { label: "Fuel System", val: car.specs?.fuelType || "Petrol", icon: Fuel },
              { label: "Transmission", val: car.specs?.transmission || "Automatic", icon: Gauge },
              { label: "Estimated Range", val: car.specs?.mileage || "24 MPG", icon: Zap },
            ].map((spec, idx) => {
              const SpecIcon = spec.icon;
              return (
                <div key={idx} className="flex flex-col p-4 rounded-2xl border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950/50">
                  <SpecIcon className="h-5 w-5 text-indigo-500 mb-2" />
                  <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">{spec.label}</span>
                  <span className="text-sm font-bold text-gray-800 dark:text-zinc-200 mt-1">{spec.val}</span>
                </div>
              );
            })}
          </div>

          {/* Description */}
          <div className="p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950/50">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About This Listing</h2>
            <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
              {car.description}
            </p>
          </div>
        </div>

        {/* Right Column: Pricing & Booking Panel */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-xl shadow-zinc-200/10 dark:shadow-none space-y-6"
          >
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Premium Experience</span>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1 tracking-tight">{car.name}</h1>
              <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-2 font-semibold">
                <MapPin className="h-3.5 w-3.5 text-indigo-500" />
                {car.pickupLocation}
              </p>
            </div>

            <hr className="border-gray-100 dark:border-zinc-900" />

            {/* Price Badge */}
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-semibold text-gray-400">Daily Flat Rate</span>
              <p className="text-4xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
                BDT {car.dailyRent}
                <span className="text-sm font-semibold text-gray-500 dark:text-zinc-500">/day</span>
              </p>
            </div>

            {/* Quick Guarantees */}
            <div className="space-y-3 bg-gray-50/50 dark:bg-zinc-900/10 p-4 rounded-2xl border border-gray-100 dark:border-zinc-900">
              <div className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-zinc-400">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Full premium insurance coverage included</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-zinc-400">
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Free cancellation up to 24h prior</span>
              </div>
            </div>

            {/* Booking action trigger */}
            {car.available ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 py-4 text-base font-bold text-white shadow-xl shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 transition-all cursor-pointer"
              >
                Book Now
              </motion.button>
            ) : (
              <button
                disabled
                className="w-full py-4 text-base font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-900/50 dark:text-zinc-600 rounded-2xl border border-zinc-200 dark:border-zinc-900 cursor-not-allowed text-center"
              >
                Currently Unavailable
              </button>
            )}

            {/* Emulated Owner Info */}
            <div className="flex items-center gap-3 pt-2 text-xs border-t border-gray-100 dark:border-zinc-900">
              <div className="h-9 w-9 rounded-full bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
                DF
              </div>
              <div>
                <p className="text-gray-400 font-semibold">Listed by</p>
                <p className="text-gray-700 dark:text-zinc-200 font-bold truncate max-w-[200px]">{car.ownerEmail}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 5. ELEGANT BOOKING MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md rounded-3xl border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-2xl overflow-hidden z-10 text-left"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-indigo-600 to-violet-600" />
              
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                <CalendarCheck className="h-6 w-6 text-indigo-500" />
                Reserve Booking
              </h3>
              <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1 font-semibold">
                Set dates for your rental session of the <span className="text-gray-600 dark:text-zinc-300 font-bold">{car.name}</span>.
              </p>

              <form onSubmit={handleBookingSubmit} className="mt-6 space-y-6">
                
                {/* Dates Select */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                      Start Date
                    </label>
                    <div className="relative mt-1.5">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="block w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-2.5 pl-9 pr-3 text-xs text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-hidden transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                      End Date
                    </label>
                    <div className="relative mt-1.5">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        required
                        min={startDate || new Date().toISOString().split("T")[0]}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="block w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-2.5 pl-9 pr-3 text-xs text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-hidden transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Rental Summary Panel */}
                <div className="p-4 rounded-2xl bg-gray-50/50 dark:bg-zinc-900/35 border border-gray-100 dark:border-zinc-900 space-y-3">
                  <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Rental Price Invoice</p>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Daily Flat Rent</span>
                    <span className="font-bold text-gray-700 dark:text-zinc-200">BDT {car.dailyRent}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{durationDays} {durationDays === 1 ? "day" : "days"}</span>
                  </div>

                  <hr className="border-gray-100 dark:border-zinc-800" />

                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Estimated Total</span>
                    <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
                      BDT {totalPrice}
                    </span>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-1/3 rounded-xl border border-gray-200 dark:border-zinc-800 py-3 text-xs font-bold text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 py-3 text-xs font-bold text-white shadow-md shadow-indigo-500/10 hover:from-indigo-700 hover:to-violet-700 transition-all cursor-pointer"
                  >
                    {user ? "Confirm Booking" : "Sign In to Book"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
