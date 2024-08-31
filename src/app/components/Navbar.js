"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { ethers } from 'ethers';

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
    blockExplorerUrls: [" https://amoy.polygonscan.com/"],
  },
};

export default function Navbar() {
  const [address, setAddress] = useState("Connect Wallet");
  const [balance, setBalance] = useState("-");

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

  return (
    <header className="bg-b2 shadow-md py-4 px-8 font-roboto">
      <div className="container mx-auto flex justify-between items-center">
        {/* Title */}
        <div className="text-2xl font-bold text-white">
          <Link href="/">FundChain</Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <Link href="/create" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Create Campaign
          </Link>
          <button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            {balance.slice(0, 5)}MATIC {address.slice(0, 7)}...{address.slice(39)}
          </button>
        </div>
      </div>
    </header>
  );
}
