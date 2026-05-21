import React from "react";
import Link from "next/link";
import { Car, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-950 text-gray-400 border-t border-zinc-900 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-r from-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-500/20">
                <Car className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Drive<span className="text-indigo-400">Fleet</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium car rental services delivering a high-quality fleet, seamless bookings, and a luxury experience for your journeys across major US cities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-white transition-colors">Explore Cars</Link>
              </li>
              <li>
                <Link href="/add-car" className="hover:text-white transition-colors">List a Car</Link>
              </li>
              <li>
                <Link href="/my-bookings" className="hover:text-white transition-colors">My Bookings</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>52, Gulshan Avenue, Dhaka-1000</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>+880 1722 456 789</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>support@drivefleet.com</span>
              </li>
            </ul>
          </div>

          {/* Socials & Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Follow Us</h3>
            <div className="flex gap-4">
              {/* Custom SVG for Facebook */}
              <a href="#" aria-label="Facebook" className="h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-900 text-gray-400 hover:bg-indigo-600 hover:text-white transition-all hover:scale-115">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              {/* Custom SVG for Instagram */}
              <a href="#" aria-label="Instagram" className="h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-900 text-gray-400 hover:bg-indigo-600 hover:text-white transition-all hover:scale-115">
                <svg className="h-5 w-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              {/* Custom SVG for the new 'X' logo instead of Twitter bird */}
              <a href="#" aria-label="X (formerly Twitter)" className="h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-900 text-gray-400 hover:bg-indigo-600 hover:text-white transition-all hover:scale-115">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Custom SVG for LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-900 text-gray-400 hover:bg-indigo-600 hover:text-white transition-all hover:scale-115">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>

            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} DriveFleet Inc. All rights reserved. Recruiter portfolio project.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
