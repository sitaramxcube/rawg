"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

// Type definition for the DiamondContext
type DiamondContextType = {
  diamondCount: number; // Current count of diamonds
  addToDiamond: () => void; // Function to increment the diamond count
};

// Create a context with the type or null (initial state is null)
const DiamondContext = createContext<DiamondContextType | null>(null);

// Provider component to manage the DiamondContext state
export const DiamondProvider = ({ children }: { children: React.ReactNode }) => {
  const [diamondCount, setDiamondCount] = useState<number>(0); // State to track diamond count

  // Retrieve the diamond count from localStorage on component mount
  useEffect(() => {
    const savedDiamondCount = localStorage.getItem("diamondCount"); // Retrieve saved value
    if (savedDiamondCount) {
      setDiamondCount(Number(savedDiamondCount)); // Parse and set initial value
    }
  }, []); // Empty dependency array ensures this runs only once

  // Save the diamond count to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("diamondCount", diamondCount.toString());
  }, [diamondCount]); // Dependency on diamondCount ensures it updates correctly

  // Function to increment the diamond count
  const addToDiamond = () => {
    setDiamondCount((prevCount) => prevCount + 1);
  };

  return (
    // Provide the diamond state and updater function to children
    <DiamondContext.Provider value={{ diamondCount, addToDiamond }}>
      {children}
    </DiamondContext.Provider>
  );
};

// Custom hook to consume the DiamondContext
export const useDiamond = () => {
  const context = useContext(DiamondContext); // Access the context
  if (!context) {
    // Ensure the hook is used within a provider
    throw new Error("useDiamond must be used within a DiamondProvider");
  }
  return context;
};
