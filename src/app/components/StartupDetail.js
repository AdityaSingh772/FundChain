"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { campaignABI } from "../interact/config2";

export default function StartupDetail({ cardData, onClose }) {
  const { image, title, requiredAmount, receivedAmount, description, id: campaignAddress } = cardData;

  const [donat, setDonat] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [change, setChange] = useState(false);

  useEffect(() => {
    if (!campaignAddress || !ethers.utils.isAddress(campaignAddress)) {
      console.error("Invalid contract address:", campaignAddress);
      setErrorMessage("Invalid contract address provided.");
    }
  }, [campaignAddress]);

  useEffect(() => {
    const Request = async () => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = Web3provider.getSigner();
        const Address = await signer.getAddress();

        // Note: The following lines are commented out as they use undefined variables
        // const provider = new ethers.providers.JsonRpcProvider(
        //   process.env.NEXT_PUBLIC_RPC_URL
        // );
        // const contract = new ethers.Contract(
        //   Data.address,
        //   Campaign.abi,
        //   provider
        // );

        // You might want to do something with the Address here
        console.log("Connected address:", Address);
      } catch (error) {
        console.error("Error in Request function:", error);
        setErrorMessage("Failed to connect to Ethereum wallet.");
      }
    };

    Request();
  }, [change]);

  const DonateFunds = async () => {
    if (!window.ethereum) {
      alert("MetaMask is required to interact with this application!");
      return;
    }
  
    if (!campaignAddress || !ethers.utils.isAddress(campaignAddress)) {
      alert("Invalid contract address provided!");
      return;
    }
  
    if (!donat || parseFloat(donat) <= 0) {
      alert("Please enter a valid donation amount!");
      return;
    }
  
    try {
      setLoading(true);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(campaignAddress, campaignABI, signer);
  
      const value = ethers.utils.parseEther(donat);
  
      const transaction = await contract.donate({
        value,
        gasLimit: ethers.utils.hexlify(1000000)
      });
      await transaction.wait();
  
      alert("Donation successful!");
      setChange(prev => !prev);
      setDonat('');
    } catch (error) {
      console.error("Transaction Error:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="relative w-[80vw] h-[80vh] bg-gray-100  shadow-lg rounded-lg overflow-hidden flex flex-col items-center justify-center mx-auto">
      {/* Image Section */}

      <div className="w-[40vw] h-[40vh] bg-gray-200 mb-4">
        <img src={image} alt="Startup Image" className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col justify-between items-center">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <p className="text-green-500 font-bold mb-4">✔ Verified under the Government of India program</p>
        <p className="text-blue-500 font-bold mb-4">Required Amount: {requiredAmount} ETH</p>
        <p className="text-blue-500 font-bold mb-4">Received Amount: {receivedAmount} ETH</p>

        <div className="flex space-x-4 mb-4">
          <input
            type="number"
            placeholder="Enter amount in ETH"
            value={donat}
            onChange={(e) => setDonat(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <button
            onClick={DonateFunds}
            className={`bg-b1 text-white px-4 py-2 rounded-md hover:bg-b3 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Donate"}
          </button>
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button onClick={onClose} className="text-red-500">Back to List</button>
      </div>
    </div>
  );
}