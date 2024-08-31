"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import CampaignList from "./components/CampaignList";
import StartupDetail from "./components/StartupDetail";

export default function Home() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleFundClick = (cardData) => {
    setSelectedCard(cardData); 
  };

  const handleCloseDetail = () => {
    setSelectedCard(null); 
  };

  return (
    <div className="bg-b2 min-h-screen w-full">
      <Navbar />
      <div className="h-full w-[80vw] mx-auto my-8">
        {!selectedCard ? (
          <CampaignList onFundClick={handleFundClick} />
        ) : (
          <StartupDetail cardData={selectedCard} onClose={handleCloseDetail} />
        )}
      </div>
    </div>
  );
}
