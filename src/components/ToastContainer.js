"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useAuth();

  return (
    <div className="fixed top-6 right-6 z-55 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          let Icon = Info;
          let containerClasses = "";
          let iconClasses = "";

          if (toast.type === "success") {
            Icon = CheckCircle2;
            containerClasses = "bg-emerald-50/95 dark:bg-zinc-900/95 border border-emerald-200 dark:border-emerald-950/50 shadow-emerald-100 dark:shadow-none text-emerald-800 dark:text-emerald-300";
            iconClasses = "text-emerald-600 dark:text-emerald-400";
          } else if (toast.type === "error") {
            Icon = AlertTriangle;
            containerClasses = "bg-rose-50/95 dark:bg-zinc-900/95 border border-rose-200 dark:border-rose-950/50 shadow-rose-100 dark:shadow-none text-rose-800 dark:text-rose-300";
            iconClasses = "text-rose-600 dark:text-rose-400";
          } else {
            Icon = Info;
            containerClasses = "bg-indigo-50/95 dark:bg-zinc-900/95 border border-indigo-200 dark:border-indigo-950/50 shadow-indigo-100 dark:shadow-none text-indigo-800 dark:text-indigo-300";
            iconClasses = "text-indigo-600 dark:text-indigo-400";
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              layout
              className={`pointer-events-auto flex items-start gap-3 rounded-2xl p-4 shadow-lg backdrop-blur-md transition-all ${containerClasses}`}
            >
              <div className="mt-0.5">
                <Icon className={`h-5 w-5 ${iconClasses}`} />
              </div>
              <div className="flex-1 text-sm font-semibold leading-relaxed">
                {toast.message}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="rounded-lg p-1 text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-gray-600 dark:hover:text-gray-200 transition-colors shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
