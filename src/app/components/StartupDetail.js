"use client";

import React from 'react';

export default function StartupDetail({ cardData, onClose }) {
  const { image, title, description } = cardData;

  return (
    <div className="relative w-[80vw] h-[60vh] bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center justify-center mx-auto">
      {/* Image Section */}
      <div className="w-[30vw] h-[30vh] bg-gray-200 mb-4">
        <img src={image} alt="Startup Image" className="w-full h-full object-cover" />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between items-center">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">{title}</h2>

        {/* Description */}
        <p className="text-gray-700 mb-4">{description}</p>

        {/* Verified Marker */}
        <p className="text-green-500 font-bold mb-4">✔ Verified under the Government of India program</p>

        {/* Donation Section */}
        <div className="flex space-x-4 mb-4">
          <input type="number" placeholder="Enter amount" className="px-4 py-2 border rounded-md" />
          <button className="bg-b1 text-white px-4 py-2 rounded-md hover:bg-b3">Donate</button>
        </div>

        {/* Close Button */}
        <button onClick={onClose} className="text-red-500">Back to List</button>
      </div>
    </div>
  );
}
