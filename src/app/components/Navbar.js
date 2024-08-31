"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";

const networks = {
  polygon: {
    chainId: `0x${Number(80002).toString(16)}`,
    chainName: "Amoy",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-amoy.polygon.technology/"],
    blockExplorerUrls: ["https://amoy.polygonscan.com/"],
  },
};

export default function Navbar() {
  const [address, setAddress] = useState("Connect Wallet");
  const [balance, setBalance] = useState("-");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const connectWallet = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    if (provider.network !== "matic") {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks["polygon"],
          },
        ],
      });

      const account = provider.getSigner();
      const Address = await account.getAddress();
      setAddress(Address);

      const Balance = ethers.utils.formatEther(await account.getBalance());
      setBalance(Balance);
    } else {
      const account = provider.getSigner();
      const Address = await account.getAddress();
      setAddress(Address);

      const Balance = ethers.utils.formatEther(await account.getBalance());
      setBalance(Balance);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Your form handling logic here
    console.log("Form submitted");
    setIsFormVisible(false);
  };

  return (
    <div>
      <header className={`bg-b2 shadow-md py-4 px-8 font-roboto ${isFormVisible ? "blur-sm" : ""}`}> {/* Highlighted line */}
        <div className="container mx-auto flex justify-between items-center">
          {/* Title */}
          <div className="text-2xl font-bold text-white">
            <Link href="/">Fund raise</Link>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsFormVisible(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Create Campaign
            </button>
            <div onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer">
              {balance.slice(0, 5)}MATIC {address.slice(0, 7)}...{address.slice(39)}
            </div>
          </div>
        </div>
      </header>

      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md shadow-md z-50 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Create Campaign</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Campaign Title
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goal">
                  Funding Goal (MATIC)
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="goal" type="number" placeholder="Goal" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imgUrl">
                  Image URL
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="imgUrl" type="text" placeholder="Image URL" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Category
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="category" type="text" placeholder="Category" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="storyUri">
                  Story URI
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="storyUri" type="text" placeholder="Story URI" />
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Submit
                </button>
                <button onClick={() => setIsFormVisible(false)} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
