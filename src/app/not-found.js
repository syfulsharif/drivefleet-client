"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Car, ArrowLeft, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 py-24 text-center">
      {/* Decorative Blur Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-violet-500/10 dark:bg-violet-500/5 blur-3xl rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-red-500/10 to-orange-500/10 dark:from-red-500/20 dark:to-orange-500/20 text-red-600 dark:text-red-400"
        >
          <AlertCircle className="h-10 w-10" />
        </motion.div>

        {/* 404 Text */}
        <h1 className="text-8xl font-black tracking-tighter bg-linear-to-r from-red-600 to-indigo-600 bg-clip-text text-transparent">
          404
        </h1>
        
        {/* Title */}
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Lost in the Fast Lane?
        </h2>
        
        {/* Description */}
        <p className="mt-3 text-base text-gray-500 dark:text-zinc-400">
          The page you are looking for has taken a detour or does not exist. Let's get you back on track.
        </p>

        {/* Return Button */}
        <div className="mt-8 flex justify-center">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
