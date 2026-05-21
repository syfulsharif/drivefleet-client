"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Car, Mail, Lock, User, AlertCircle, Check, X, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const { user, register, googleSignIn } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live Password Validations
  const hasMinLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/cars");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!hasMinLength || !hasUpperCase || !hasLowerCase) {
      setError("Please make sure your password meets all standard criteria.");
      return;
    }

    setIsSubmitting(true);
    const success = await register(name, email, password);
    setIsSubmitting(false);
    if (success) {
      router.push("/cars");
    }
  };

  const handleGoogleSignIn = async () => {
    const success = await googleSignIn();
    if (success) {
      router.push("/cars");
    }
  };

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Dynamic Glowing Background Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 rounded-3xl border border-gray-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-8 shadow-xl shadow-zinc-200/20 dark:shadow-none relative z-10"
      >
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-tr from-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-500/20 mb-4">
            <Car className="h-6 w-6" />
          </Link>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
            Sign up to rent cars or list your fleet in minutes.
          </p>
        </div>

        {/* Action Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 p-4 text-sm text-red-600 dark:text-red-400"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="relative mt-1.5 rounded-xl shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-hidden transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative mt-1.5 rounded-xl shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-hidden transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative mt-1.5 rounded-xl shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/30 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-hidden transition-all"
                  placeholder="••••••••"
                />
              </div>

              {/* Password Checklist UI */}
              <div className="mt-3 p-3 rounded-xl border border-gray-100 dark:border-zinc-900 bg-gray-50/50 dark:bg-zinc-900/10 space-y-2">
                <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
                  Password Requirements
                </p>
                <div className="flex items-center gap-2 text-xs">
                  {hasMinLength ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <X className="h-3.5 w-3.5 text-gray-400" />
                  )}
                  <span className={hasMinLength ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-gray-500 dark:text-zinc-500"}>
                    At least 6 characters
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {hasUpperCase ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <X className="h-3.5 w-3.5 text-gray-400" />
                  )}
                  <span className={hasUpperCase ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-gray-500 dark:text-zinc-500"}>
                    At least 1 uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {hasLowerCase ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <X className="h-3.5 w-3.5 text-gray-400" />
                  )}
                  <span className={hasLowerCase ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-gray-500 dark:text-zinc-500"}>
                    At least 1 lowercase letter
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 focus:outline-hidden disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSubmitting ? "Registering..." : "Get Started"}
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200 dark:border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-zinc-950 px-3 text-gray-400 dark:text-zinc-500 font-semibold">
              Or register with
            </span>
          </div>
        </div>

        {/* Google Register */}
        <div className="mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-3 text-sm font-bold text-gray-700 dark:text-zinc-200 shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 0, 0)">
                <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.58h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.53C21.68,11.75 21.56,11.37 21.35,11.1z" fill="#4285F4" />
                <path d="M12,20.84c2.47,0 4.54,-0.82 6.06,-2.23l-3.3,-2.58c-0.91,0.61 -2.08,0.98 -3.3,0.98c-2.37,0 -4.38,-1.6 -5.1,-3.75H2.94v2.66C4.46,18.96 8.01,20.84 12,20.84z" fill="#34A853" />
                <path d="M6.9,13.26c-0.18,-0.54 -0.28,-1.11 -0.28,-1.7s0.1,-1.16 0.28,-1.7V7.2H2.94C2.33,8.42 2,9.79 2,11.23c0,1.44 0.33,2.81 0.94,4.03L6.9,13.26z" fill="#FBBC05" />
                <path d="M12,6.51c1.34,0 2.55,0.46 3.5,1.37l2.62,-2.62C16.54,3.82 14.47,3 12,3C8.01,3 4.46,4.88 2.94,7.2L6.9,9.86C7.62,7.71 9.63,6.51 12,6.51z" fill="#EA4335" />
              </g>
            </svg>
            Sign up with Google
          </motion.button>
        </div>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-gray-500 dark:text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
