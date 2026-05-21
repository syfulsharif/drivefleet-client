"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { MapPin, Users, Fuel, Gauge, ChevronRight, Search, SlidersHorizontal } from "lucide-react";

export default function ExploreCarsPage() {
  const { cars, isLoading } = useAuth();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // Get unique car types for filter buttons dynamically
  const carTypes = useMemo(() => {
    if (!cars) return ["All"];
    const types = new Set(cars.map((c) => c.type));
    return ["All", ...Array.from(types)];
  }, [cars]);

  // Process cars with filters and sorting
  const filteredAndSortedCars = useMemo(() => {
    if (!cars) return [];
    
    let result = cars.filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            car.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "All" || car.type === selectedType;
      return matchesSearch && matchesType;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.dailyRent - b.dailyRent);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.dailyRent - a.dailyRent);
    } else if (sortBy === "available") {
      result.sort((a, b) => (b.available ? 1 : 0) - (a.available ? 1 : 0));
    }

    return result;
  }, [cars, searchQuery, selectedType, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } },
    exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex-1 flex flex-col">
      {/* Page Header */}
      <div className="mb-10 text-left">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Explore Our Fleet
        </h1>
        <p className="mt-3 text-base text-gray-500 dark:text-zinc-400">
          Find your perfect matching ride, from daily high-efficiency commuters to ultimate luxury cruisers.
        </p>
      </div>

      {/* Search & Filter Panel */}
      <div className="mb-8 rounded-3xl border border-gray-100 dark:border-zinc-900 bg-white/50 dark:bg-zinc-950/40 p-6 backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80 shadow-xs rounded-2xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by car name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-3 pl-11 pr-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:outline-hidden transition-colors"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <SlidersHorizontal className="h-4 w-4 text-gray-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="block w-full md:w-48 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-3 px-4 text-sm text-gray-700 dark:text-zinc-300 focus:border-indigo-500 focus:outline-hidden transition-colors cursor-pointer"
            >
              <option value="default">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="available">Availability: First</option>
            </select>
          </div>
        </div>

        {/* Categories Tab Row */}
        <div className="flex flex-wrap gap-2 border-t border-gray-100 dark:border-zinc-900/60 pt-4">
          {carTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                selectedType === type
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10"
                  : "border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800/80"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Cars Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 rounded-2xl bg-gray-100 dark:bg-zinc-900 animate-pulse border border-gray-200 dark:border-zinc-800" />
          ))}
        </div>
      ) : filteredAndSortedCars.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center p-12 text-center border border-gray-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/40 rounded-3xl flex-1 min-h-[300px]"
        >
          <div className="text-4xl text-gray-300 dark:text-zinc-700 mb-4">🚗💨</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">No cars found matching filters</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
            Try adjusting your search criteria or checking alternative categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedType("All");
              setSortBy("default");
            }}
            className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-500/10 hover:bg-indigo-700 transition-all cursor-pointer"
          >
            Clear Filters
          </button>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1"
        >
          <AnimatePresence mode="popLayout">
            {filteredAndSortedCars.map((car) => (
              <motion.div
                key={car.id}
                variants={cardVariants}
                layout
                className="flex flex-col h-full rounded-2xl border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 overflow-hidden shadow-xs hover:shadow-xl hover:border-indigo-500/20 transition-all duration-300 group"
              >
                {/* Image Aspect ratio matches perfectly */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100 dark:bg-zinc-900">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-gray-200 border border-zinc-700/30">
                      {car.type}
                    </span>
                  </div>
                </div>

                {/* Details Body */}
                <div className="flex-1 p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {car.name}
                  </h3>

                  <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-zinc-500 mt-1 mb-4 font-semibold">
                    <MapPin className="h-3.5 w-3.5" />
                    {car.pickupLocation}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-6">
                    {car.description}
                  </p>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-3 gap-2 border-t border-gray-100 dark:border-zinc-900 pt-4 mb-6">
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50/50 dark:bg-zinc-900/50 text-center">
                      <Users className="h-4 w-4 text-indigo-500 mb-1" />
                      <span className="text-[10px] text-gray-400 dark:text-zinc-500">Seats</span>
                      <span className="text-xs font-bold text-gray-700 dark:text-zinc-300">{car.seats}</span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50/50 dark:bg-zinc-900/50 text-center">
                      <Fuel className="h-4 w-4 text-indigo-500 mb-1" />
                      <span className="text-[10px] text-gray-400 dark:text-zinc-500">Fuel</span>
                      <span className="text-xs font-bold text-gray-700 dark:text-zinc-300 truncate max-w-full">
                        {car.specs?.fuelType || "Petrol"}
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gray-50/50 dark:bg-zinc-900/50 text-center">
                      <Gauge className="h-4 w-4 text-indigo-500 mb-1" />
                      <span className="text-[10px] text-gray-400 dark:text-zinc-500">Engine</span>
                      <span className="text-xs font-bold text-gray-700 dark:text-zinc-300 truncate max-w-full">
                        {car.specs?.transmission.split(" ")[0] || "Auto"}
                      </span>
                    </div>
                  </div>

                  {/* Pricing footer */}
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 dark:border-zinc-900 pt-4">
                    <div>
                      <span className="text-sm text-gray-400 dark:text-zinc-500 font-semibold">Daily Rent</span>
                      <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
                        ${car.dailyRent}
                        <span className="text-sm font-semibold text-gray-500 dark:text-zinc-500">/day</span>
                      </p>
                    </div>

                    <Link href={`/cars/${car.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-500/10 hover:from-indigo-700 hover:to-violet-700 transition-all cursor-pointer"
                      >
                        View Details
                        <ChevronRight className="h-3.5 w-3.5" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
