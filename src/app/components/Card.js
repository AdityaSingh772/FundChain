import React from 'react';export default function Card({ image, title, description, requiredAmount, receivedAmount, onFundClick, onRemoveClick }) {
  return (
    <div className="w-[60vw] h-[40vh] bg-b1 shadow-lg rounded-lg text-b1 overflow-hidden flex flex-col my-7">  <div className="flex flex-grow">
        <div className="w-[20vw] h-[40vh] bg-gray-200 flex-shrink-0">
          <img
            src={image}
            alt="Card Image"
            className="w-full h-full object-cover"
          />
        </div> <div className="flex-grow p-4 flex flex-col justify-between">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-700 mb-4">{description}</p>
          <p>Required: {requiredAmount} ETH</p>
          <p>Received: {receivedAmount} ETH</p>  <div className="flex space-x-4">
            <button 
              onClick={onFundClick} 
              className="bg-b1 text-white px-4 py-2 border-2 border-white rounded-md hover:bg-b3"
            >
              Fund
            </button>
            <button 
              onClick={onRemoveClick} 
              className="bg-red-500 text-white px-4 py-2 rounded-md border-2 border-red-500 hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
</div>
 );}