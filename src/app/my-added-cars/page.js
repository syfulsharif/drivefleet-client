"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  MapPin, 
  DollarSign, 
  Loader2, 
  KeyRound, 
  ArrowRight,
  AlertTriangle,
  Sparkles,
  Car
} from "lucide-react";

export default function MyAddedCarsPage() {
  const { user, isLoading, cars, updateCar, deleteCar } = useAuth();
  const router = useRouter();

  // Modals state
  const [editingCar, setEditingCar] = useState(null);
  const [deletingCarId, setDeletingCarId] = useState(null);

  // Edit form state
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editDailyRent, setEditDailyRent] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editSeats, setEditSeats] = useState("");
  const [editPickupLocation, setEditPickupLocation] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Filter cars owned by this user
  const myCars = useMemo(() => {
    if (!user || !cars) return [];
    return cars.filter((c) => c.ownerEmail.toLowerCase() === user.email.toLowerCase());
  }, [cars, user]);

  // Open Edit Modal
  const startEdit = (car) => {
    setEditingCar(car);
    setEditName(car.name);
    setEditType(car.type);
    setEditDailyRent(car.dailyRent);
    setEditImage(car.image);
    setEditSeats(car.seats);
    setEditPickupLocation(car.pickupLocation);
    setEditDescription(car.description);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingCar) return;

    const updatedFields = {
      name: editName,
      type: editType,
      dailyRent: parseFloat(editDailyRent),
      image: editImage,
      seats: parseInt(editSeats),
      pickupLocation: editPickupLocation,
      description: editDescription,
    };

    updateCar(editingCar.id, updatedFields);
    setEditingCar(null);
  };

  const handleDeleteConfirm = () => {
    if (!deletingCarId) return;
    deleteCar(deletingCarId);
    setDeletingCarId(null);
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
            Secure Dashboard
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
            You must be logged in to view your added listings.
          </p>
          <button
            onClick={() => router.push("/login?redirect=/my-added-cars")}
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
              My Added Cars
            </h1>
            <span className="inline-flex h-7 px-3 items-center justify-center rounded-full bg-indigo-500/10 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {myCars.length} listings
            </span>
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-zinc-400">
            Add, update, or remove your vehicle listings on our car rental dashboard.
          </p>
        </div>

        <Link href="/add-car">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-md hover:from-indigo-700 hover:to-violet-700 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add New Car
          </motion.button>
        </Link>
      </div>

      {/* Content Grid */}
      {myCars.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border border-gray-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/40 rounded-3xl flex-1 min-h-[350px]">
          <div className="text-4xl text-gray-300 dark:text-zinc-700 mb-4">🔑🚘</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">You have no listings yet</h3>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-zinc-400 max-w-sm">
            List your luxury car and start sharing it with drivers across major US cities to generate returns.
          </p>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/add-car">
              <button className="rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-500/10 hover:bg-indigo-700 transition-all cursor-pointer">
                Create First Listing
              </button>
            </Link>
            
            {user.email === "admin@drivefleet.com" && (
              <button 
                onClick={() => router.refresh()} 
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-3 text-xs font-bold text-gray-600 dark:text-zinc-300 cursor-pointer"
              >
                Reload Context
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {myCars.map((car) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="flex flex-col h-full rounded-2xl border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 overflow-hidden shadow-xs hover:shadow-lg transition-all"
              >
                {/* Image Showcase */}
                <div className="relative h-52 w-full overflow-hidden bg-gray-100 dark:bg-zinc-900">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold shadow-md backdrop-blur-md ${
                      car.available
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                    }`}>
                      {car.available ? "Available" : "Booked"}
                    </span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{car.name}</h3>
                  </div>

                  <p className="flex items-center gap-1 text-xs text-gray-400 dark:text-zinc-500 mt-1 mb-4 font-semibold">
                    <MapPin className="h-3.5 w-3.5 text-indigo-500" />
                    {car.pickupLocation}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-6">
                    {car.description}
                  </p>

                  <div className="mt-auto border-t border-gray-100 dark:border-zinc-900 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400 dark:text-zinc-500 font-semibold">Price per Day</span>
                      <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
                        BDT {car.dailyRent}
                      </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(car)}
                        className="p-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                        title="Update Listing"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeletingCarId(car.id)}
                        className="p-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/10 transition-colors cursor-pointer"
                        title="Delete Listing"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editingCar && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingCar(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] z-10 text-left"
            >
              <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-indigo-500" />
                Update Listing
              </h3>
              <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1 font-semibold">
                Modify vehicle fields below to update the search index listings.
              </p>

              <form onSubmit={handleEditSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Car Model Name</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="block w-full mt-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-2.5 px-3.5 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Category</label>
                    <select
                      value={editType}
                      onChange={(e) => setEditType(e.target.value)}
                      className="block w-full mt-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-2.5 px-3.5 text-sm text-gray-700 dark:text-zinc-300 focus:border-indigo-500 focus:outline-hidden cursor-pointer"
                    >
                      <option value="SUV">SUV</option>
                      <option value="Sedan">Sedan</option>
                      <option value="Sports">Sports</option>
                      <option value="Electric">Electric</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Daily Flat Rent (BDT)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={editDailyRent}
                      onChange={(e) => setEditDailyRent(e.target.value)}
                      className="block w-full mt-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-2.5 px-3.5 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Seats</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={editSeats}
                      onChange={(e) => setEditSeats(e.target.value)}
                      className="block w-full mt-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-2.5 px-3.5 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Location</label>
                    <input
                      type="text"
                      required
                      value={editPickupLocation}
                      onChange={(e) => setEditPickupLocation(e.target.value)}
                      className="block w-full mt-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-2.5 px-3.5 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Image URL</label>
                  <input
                    type="url"
                    required
                    value={editImage}
                    onChange={(e) => setEditImage(e.target.value)}
                    className="block w-full mt-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-2.5 px-3.5 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">Description</label>
                  <textarea
                    required
                    rows="3"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="block w-full mt-1.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-2.5 px-3.5 text-sm text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-hidden"
                  />
                </div>

                <div className="flex gap-3 border-t border-gray-100 dark:border-zinc-900 pt-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setEditingCar(null)}
                    className="w-1/3 rounded-xl border border-gray-200 dark:border-zinc-800 py-2.5 text-xs font-bold text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 py-2.5 text-xs font-bold text-white shadow-md hover:from-indigo-700 hover:to-violet-700 transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deletingCarId && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeletingCarId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm rounded-3xl border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-2xl z-10 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400">
                <AlertTriangle className="h-6 w-6 animate-bounce" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                Remove Listing
              </h3>
              <p className="mt-2 text-xs text-gray-500 dark:text-zinc-400 leading-relaxed font-semibold">
                Are you absolutely sure you want to delete this listing? This action cannot be undone and will cancel active rents.
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setDeletingCarId(null)}
                  className="w-1/2 rounded-xl border border-gray-200 dark:border-zinc-800 py-3 text-xs font-bold text-gray-500 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer text-center"
                >
                  Keep Car
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  className="w-1/2 rounded-xl bg-red-600 py-3 text-xs font-bold text-white shadow-md hover:bg-red-700 transition-colors cursor-pointer text-center"
                >
                  Delete Listing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
