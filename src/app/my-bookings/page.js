"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  DollarSign, 
  Trash2, 
  Loader2, 
  KeyRound, 
  ArrowRight, 
  Car, 
  CheckCircle2,
  XCircle,
  FileCheck
} from "lucide-react";

export default function MyBookingsPage() {
  const { user, isLoading, bookings, cancelBooking } = useAuth();
  const router = useRouter();

  // Filter bookings for the logged-in user
  const myBookings = useMemo(() => {
    if (!user || !bookings) return [];
    return bookings.filter((b) => b.userEmail.toLowerCase() === user.email.toLowerCase());
  }, [bookings, user]);

  const handleCancelBooking = (bookingId, carId) => {
    if (confirm("Are you sure you want to cancel this booking? This will restore the vehicle's availability.")) {
      cancelBooking(bookingId, carId);
    }
  };

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
          className="rounded-3xl border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-8 shadow-xl relative z-10"
        >
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <KeyRound className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Secure Booking Portal
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
            You must be logged in to view your dynamic active bookings.
          </p>
          <button
            onClick={() => router.push("/login?redirect=/my-bookings")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-md hover:from-indigo-700 hover:to-violet-700 transition-all cursor-pointer"
          >
            Sign In Now
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex-1 flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 text-left">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              My Bookings
            </h1>
            <span className="inline-flex h-7 px-3 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {myBookings.length} Active Rents
            </span>
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-zinc-400">
            Monitor your luxury car reservations, track schedules, or manage cancel requests.
          </p>
        </div>

        <Link href="/cars">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md px-5 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
          >
            Rent Another Car
          </motion.button>
        </Link>
      </div>

      {/* Bookings Display */}
      {myBookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-gray-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/40 rounded-3xl flex-1 min-h-[350px]">
          <div className="text-4xl text-gray-300 dark:text-zinc-700 mb-4">🗓️🚗</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">No active bookings</h3>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-zinc-400 max-w-sm">
            You don't have any cars reserved at the moment. Check out our luxury fleet to schedule your next drive.
          </p>
          <Link href="/cars" className="mt-6">
            <button className="rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/10 hover:bg-indigo-700 transition-all cursor-pointer">
              Browse Entire Fleet
            </button>
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden border border-gray-100 dark:border-zinc-900 rounded-3xl bg-white dark:bg-zinc-950/40 shadow-xl shadow-zinc-200/5 dark:shadow-none">
          
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-900/20 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Vehicle</th>
                  <th className="py-4 px-6">Pickup Location</th>
                  <th className="py-4 px-6">Duration Dates</th>
                  <th className="py-4 px-6">Total Price</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-zinc-900/80 text-sm">
                <AnimatePresence>
                  {myBookings.map((booking) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                      className="hover:bg-gray-50/50 dark:hover:bg-zinc-900/10 transition-colors group"
                    >
                      {/* Car Details */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={booking.carImage}
                            alt={booking.carName}
                            className="h-12 w-20 object-cover rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm"
                          />
                          <div>
                            <span className="font-bold text-gray-900 dark:text-white block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {booking.carName}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-zinc-500 font-semibold mt-0.5 block">
                              BDT {booking.dailyRent}/day
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-4 px-6 text-gray-600 dark:text-zinc-400">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-indigo-500 shrink-0" />
                          <span className="font-semibold">{booking.pickupLocation}</span>
                        </div>
                      </td>

                      {/* Dates */}
                      <td className="py-4 px-6 text-gray-600 dark:text-zinc-400">
                        <div className="flex items-start gap-1.5 flex-col">
                          <div className="flex items-center gap-1 text-xs font-bold text-gray-800 dark:text-zinc-300">
                            <Calendar className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                            <span>{booking.startDate} to {booking.endDate}</span>
                          </div>
                          <span className="text-[10px] text-gray-400 font-semibold pl-5">({booking.days} {booking.days === 1 ? "day" : "days"})</span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6">
                        <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 tracking-tight block">
                          ${booking.totalPrice}
                        </span>
                        <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-semibold block">
                          Charged via card
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-xs">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {booking.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleCancelBooking(booking.id, booking.carId)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-2 px-3 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer shadow-xs"
                          title="Cancel Booking"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Cancel
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Mobile Card Grid View */}
          <div className="block md:hidden divide-y divide-gray-100 dark:divide-zinc-900">
            <AnimatePresence>
              {myBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  className="p-6 space-y-4 text-left"
                >
                  <div className="flex gap-4">
                    <img
                      src={booking.carImage}
                      alt={booking.carName}
                      className="h-16 w-24 object-cover rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm shrink-0 bg-zinc-100"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white truncate">{booking.carName}</h4>
                      <p className="text-xs text-gray-400 dark:text-zinc-500 font-semibold mt-0.5">BDT {booking.dailyRent}/day</p>
                      
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-xs">
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-gray-100 dark:border-zinc-900/60 pt-4 text-xs text-gray-600 dark:text-zinc-400">
                    <div>
                      <span className="text-[10px] text-gray-400 dark:text-zinc-500 uppercase tracking-wider block font-bold">Pickup Location</span>
                      <span className="font-semibold flex items-center gap-0.5 mt-0.5 text-gray-800 dark:text-zinc-300">
                        <MapPin className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                        {booking.pickupLocation}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 dark:text-zinc-500 uppercase tracking-wider block font-bold">Total Rents</span>
                      <span className="text-base font-black text-indigo-600 dark:text-indigo-400 tracking-tight block mt-0.5">
                        ${booking.totalPrice}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 dark:border-zinc-900/60 pt-4 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-gray-400 dark:text-zinc-500 uppercase tracking-wider block font-bold">Duration</span>
                      <span className="text-xs font-semibold text-gray-800 dark:text-zinc-300 flex items-center gap-1 mt-0.5">
                        <Calendar className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                        {booking.startDate} - {booking.endDate}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCancelBooking(booking.id, booking.carId)}
                      className="inline-flex items-center gap-1 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-1.5 px-3 text-[11px] font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer shadow-xs"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Cancel
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
