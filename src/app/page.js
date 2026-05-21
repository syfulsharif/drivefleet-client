"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { 
  Car, 
  MapPin, 
  Users, 
  Fuel, 
  Gauge, 
  ShieldCheck, 
  Clock, 
  BadgeDollarSign, 
  Sparkles, 
  ChevronRight, 
  Star,
  Quote
} from "lucide-react";

export default function HomePage() {
  const { cars, isLoading } = useAuth();
  
  // Show only available cars or maximum first 6 cars for high quality home display
  const featuredCars = cars ? cars.slice(0, 6) : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "out" } }
  };

  const testimonials = [
    {
      id: 1,
      name: "Marcus Vance",
      role: "Luxury Car Enthusiast",
      quote: "DriveFleet exceeded all my expectations. The booking process was buttery smooth, and the Porsche 911 was in absolute showroom condition. Truly a premium service!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Tech Recruiter",
      quote: "This is hands-down the most visually impressive and functional Next.js project I've seen. The attention to UI details, micro-interactions, and state management is outstanding.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
    },
    {
      id: 3,
      name: "Liam O'Connor",
      role: "Corporate Executive",
      quote: "Renting the Range Rover Sport for our weekend corporate retreat in LA was the best decision. Seamless pickup, flawless vehicle, and top-tier support.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
    }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="w-full flex flex-col overflow-hidden pb-16">
      
      {/* 1. HERO BANNER */}
      <section className="relative w-full py-20 lg:py-32 flex items-center justify-center border-b border-gray-100 dark:border-zinc-900 bg-linear-to-b from-indigo-500/5 via-transparent to-transparent">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/5 blur-3xl rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200/50 dark:border-indigo-500/10 bg-indigo-50/50 dark:bg-indigo-950/20 px-4 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Redefining the Luxury Car Rental Experience
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white max-w-4xl mx-auto leading-tight"
          >
            Drive Your Dreams with{" "}
            <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-violet-500 bg-clip-text text-transparent">
              Unmatched Luxury
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Access a highly curated collection of exotic cars, electric grand tourers, and premium SUVs. Book seamlessly or list your own vehicle to start earning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link href="/cars">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 transition-all cursor-pointer"
              >
                Explore Cars
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </Link>
            
            <Link href="/add-car">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md px-8 py-4 text-base font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                List Your Car
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. AVAILABLE CARS SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Featured Luxury Fleet
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-zinc-400">
              Browse our top picks available for rent today.
            </p>
          </div>
          
          <Link href="/cars" className="group mt-4 md:mt-0 flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
            View Entire Fleet 
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-gray-100 dark:bg-zinc-900 animate-pulse border border-gray-200 dark:border-zinc-800" />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredCars.map((car) => (
              <motion.div
                key={car.id}
                variants={itemVariants}
                className="flex flex-col h-full rounded-2xl border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group hover:border-indigo-500/20"
              >
                {/* Image Wrap */}
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

                {/* Body Details */}
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {car.name}
                    </h3>
                  </div>

                  <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-zinc-500 mb-4 font-semibold">
                    <MapPin className="h-3.5 w-3.5" />
                    {car.pickupLocation}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-6">
                    {car.description}
                  </p>

                  {/* Specifications Row */}
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

                  {/* Actions footer */}
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
          </motion.div>
        )}
      </section>

      {/* 3. STATIC SECTION: WHY CHOOSE US */}
      <section className="relative w-full py-20 border-y border-gray-100 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-950/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Why Choose DriveFleet
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-500 dark:text-zinc-400 leading-relaxed">
              We provide the modern standards of car rental: ultra-refined process, exceptional fleets, and reliable customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Fully Verified Listings",
                desc: "Every luxury car in our garage is thoroughly tested and verified by our engineering experts for peak mechanics.",
              },
              {
                icon: Clock,
                title: "Instant Secure Booking",
                desc: "No long queues, no paperwork. Complete a booking modal request, and your luxury vehicle awaits.",
              },
              {
                icon: BadgeDollarSign,
                title: "No Hidden Costs",
                desc: "We strictly value transparency. The prices mentioned are flat-rate rents including insurance.",
              },
              {
                icon: Sparkles,
                title: "Flexible Peer Sharing",
                desc: "Add your car list within minutes, manage availabilities easily, and earn high-yield passive returns.",
              },
            ].map((feature, idx) => {
              const FeatIcon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950/50 hover:scale-[1.02] hover:border-indigo-500/10 transition-all duration-300 shadow-xs"
                >
                  <div className="h-12 w-12 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                    <FeatIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. STATIC SECTION: CUSTOMER TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Loved by Trusted Clients
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 dark:text-zinc-400">
            Hear from our community of passionate drivers and professional recruiters.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center max-w-4xl mx-auto">
          {/* Testimonial Select Slider */}
          <div className="w-full lg:w-1/3 flex lg:flex-col gap-4 justify-center">
            {testimonials.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveTestimonial(idx)}
                className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all ${
                  activeTestimonial === idx
                    ? "border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-950/15 scale-105 shadow-md shadow-indigo-500/5"
                    : "border-gray-100 dark:border-zinc-900 bg-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
                <div className="hidden sm:block">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-none">{t.name}</h4>
                  <p className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1">{t.role}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Testimonial Detail card */}
          <div className="w-full lg:w-2/3">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="relative p-8 sm:p-12 rounded-3xl border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 shadow-xl shadow-zinc-200/20 dark:shadow-none"
            >
              <div className="absolute top-6 right-8 text-indigo-500/20">
                <Quote className="h-12 w-12" />
              </div>

              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-lg font-medium text-gray-700 dark:text-zinc-300 leading-relaxed italic mb-8">
                "{testimonials[activeTestimonial].quote}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-500/30 sm:hidden"
                />
                <div>
                  <h4 className="text-base font-extrabold text-gray-900 dark:text-white leading-tight">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
