"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import CampaignList from "./components/CampaignList";
import StartupDetail from "./components/StartupDetail";
import Chatbot from "./components/Chatbot";

export default function Home() {
  const [selectedCard, setSelectedCard] = useState(null); // State to manage selected card
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search query

  const handleFundClick = (cardData) => {
    setSelectedCard(cardData); // Set the selected card data when a campaign card is clicked
  };

  const handleCloseDetail = () => {
    setSelectedCard(null); // Close the detail view
  };

  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query state
  };

  return (
    <div className="bg-b2 min-h-screen w-full">
      {/* Pass handleSearch to Navbar */}
      <Navbar onSearch={handleSearch} />
      <div className={`h-full w-[100vw] mx-auto my-8 flex flex-1 gap-3`}>
          <div className="mx-auto">
          {!selectedCard ? (
          // Pass searchQuery and handleFundClick to CampaignList
          <CampaignList searchQuery={searchQuery} onFundClick={handleFundClick} className={`${selectedCard ? "blur-sm" : ""}`} />
          ) : (
          // Pass selectedCard data and handleCloseDetail to StartupDetail
          <StartupDetail cardData={selectedCard} onClose={handleCloseDetail} />
          )}
          </div>
          <div >
            <Chatbot/>
          </div>
      </div>
    </div>
  );
}
