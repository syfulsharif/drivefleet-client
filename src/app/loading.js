import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-black">
      {/* Dynamic Glowing Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />
      
      <div className="relative flex flex-col items-center gap-4">
        {/* Outer Pulsing Glow */}
        <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-xl animate-pulse" />
        
        {/* Spinner */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600 dark:text-indigo-400" />
        </div>
        
        {/* Description */}
        <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white animate-pulse">
          Loading Fleet...
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Preparing your luxury journey
        </p>
      </div>
    </div>
  );
}
