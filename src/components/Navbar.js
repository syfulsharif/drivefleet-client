"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { Car, Menu, X, ChevronDown, LogOut, PlusCircle, BookOpen, User, FolderPlus } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close menus on path change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  // Handle clicking outside profile dropdown to close it
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClose = () => setDropdownOpen(false);
    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, [dropdownOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Cars", href: "/cars" },
    { name: "Add Car", href: "/add-car", private: true },
    { name: "My Bookings", href: "/my-bookings", private: true },
  ];

  const activeLinkStyle = "text-indigo-600 dark:text-indigo-400 font-semibold relative after:absolute after:bottom-[-20px] after:left-0 after:right-0 after:h-[3px] after:bg-indigo-600 after:rounded-t-md";
  const inactiveLinkStyle = "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-zinc-800/50 bg-white/75 dark:bg-black/75 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                <Car className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Drive<span className="text-indigo-600 dark:text-indigo-400">Fleet</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => {
              if (link.private && !user) return null;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={isActive ? activeLinkStyle : inactiveLinkStyle}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop User Section */}
          <div className="hidden md:flex md:items-center md:gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(!dropdownOpen);
                  }}
                  className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50 py-1.5 px-3 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold text-sm uppercase ring-2 ring-indigo-500/20">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" />
                    ) : (
                      user.name.charAt(0)
                    )}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 origin-top-right rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 shadow-xl ring-1 ring-black/5 focus:outline-none">
                    <div className="px-3 py-2 border-b border-gray-100 dark:border-zinc-900 mb-1">
                      <p className="text-xs text-gray-400 dark:text-zinc-500">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-700 dark:text-zinc-200 truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/add-car"
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                    >
                      <FolderPlus className="h-4 w-4" />
                      Add Car
                    </Link>

                    <Link
                      href="/my-bookings"
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                    >
                      <BookOpen className="h-4 w-4" />
                      My Bookings
                    </Link>

                    <Link
                      href="/my-added-cars"
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                    >
                      <User className="h-4 w-4" />
                      My Added Cars
                    </Link>

                    <hr className="my-1 border-gray-100 dark:border-zinc-900" />

                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 transition-all hover:scale-[1.02] active:scale-95"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-900 hover:text-gray-500 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-zinc-900 bg-white/95 dark:bg-black/95 backdrop-blur-md">
          <div className="space-y-1 px-4 py-3">
            {navLinks.map((link) => {
              if (link.private && !user) return null;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block rounded-xl px-3 py-2 text-base font-semibold ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {user ? (
              <div className="border-t border-gray-100 dark:border-zinc-900 mt-4 pt-4">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold uppercase ring-2 ring-indigo-500/20">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" />
                    ) : (
                      user.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="mt-2 space-y-1">
                  <Link
                    href="/my-added-cars"
                    className="block rounded-xl px-3 py-2 text-base font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900"
                  >
                    My Added Cars
                  </Link>
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-base font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 border-t border-gray-100 dark:border-zinc-900 pt-4 px-3">
                <Link
                  href="/login"
                  className="flex w-full items-center justify-center rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-indigo-500/20 hover:from-indigo-700 hover:to-violet-700 transition-all"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
