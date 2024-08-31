// components/Card.js
import React from 'react';

export default function Card({ image, title, description, fundLink, statsLink }) {
  return (
    <div className="w-[60vw] h-[20vh] bg-b2 shadow-lg rounded-lg overflow-hidden flex flex-col my-7">
      {/* Card Content */}
      <div className="flex flex-grow">
        {/* Image Section */}
        <div className="w-[13vw] h-[20vh] bg-gray-200 flex-shrink-0">
          <img
            src={image}
            alt="Card Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex-grow p-4 flex flex-col justify-between">
          {/* Title */}
          <h2 className="text-xl font-bold mb-2">{title}</h2>

          {/* Information */}
          <p className="text-gray-700 mb-4">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <a href={fundLink} className="bg-b1 text-white px-4 py-2 rounded-md hover:bg-blue-600" target="_blank" rel="noopener noreferrer">
              Fund
            </a>
            <a href={statsLink} className="bg-b1 text-white px-4 py-2 rounded-md hover:bg-green-600" target="_blank" rel="noopener noreferrer">
              See Statistics
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
