"use client";
import { useState } from "react";

const InteractiveWrapper = ({ children, initialData = {} }) => {
  const [data, setData] = useState(initialData);

  const handleSaveProperty = (propertyId, isSaved) => {
    console.log(`Property ${propertyId} ${isSaved ? "saved" : "unsaved"}`);
    // Implement save logic here
  };

  const handleViewProperty = (propertyId) => {
    console.log("View property:", propertyId);
    // Implement view logic here
  };

  return children({ data, setData, handleSaveProperty, handleViewProperty });
};

export default InteractiveWrapper;
