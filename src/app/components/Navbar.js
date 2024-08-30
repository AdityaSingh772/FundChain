// components/Navbar.js
"use client"

import React from 'react';
import Link from 'next/link';

export default function Navbar() {

    const handleForm = () => {
            
    }

  return (
    <header className="bg-b2 shadow-md py-4 px-8 font-roboto">
      <div className="container mx-auto flex justify-between items-center">
        {/* Title */}
        <div className="text-2xl font-bold text-white">
          <Link href="/">
            Fund raise
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
            <button className="bg-b1 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleForm}>
                Create Campaign
            </button>
            <button className="bg-b1 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleForm}>
                Connect Wallet
            </button>
        </div>
      </div>
    </header>
  );
}
