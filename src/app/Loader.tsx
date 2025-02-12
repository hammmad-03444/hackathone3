"use client";

import { motion } from "framer-motion";
import { createContext, useState, useContext, ReactNode } from "react";

// Define LoaderContext
const LoaderContext = createContext({
  loading: false,
  showLoader: () => {},
  hideLoader: () => {},
});

// Custom Hook for using the context
export const useLoader = () => useContext(LoaderContext);

// Loader Provider
export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white z-50">
          <Loader />
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
};

const Loader=()=> {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
      <motion.div
        className="relative w-20 h-20 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Outer Circle */}
        <motion.div
          className="absolute w-20 h-20 border-4 border-t-transparent border-blue-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />

        {/* Middle Circle */}
        <motion.div
          className="absolute w-14 h-14 border-4 border-t-transparent border-green-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        />

        {/* Inner Circle */}
        <motion.div
          className="absolute w-8 h-8 border-4 border-t-transparent border-purple-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />

        {/* Branding or Logo */}
        <motion.span
          className="text-lg font-semibold text-gray-900 dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          🚀
        </motion.span>
      </motion.div>
    </div>
  );
}
