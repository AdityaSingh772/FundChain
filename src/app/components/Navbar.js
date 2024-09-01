"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import { campaignFactoryABI, campaignFactoryAddress } from "../interact/config";

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

  const [form, setForm] = useState({
    campaignTitle: '',
    requiredCampaignAmount: '',
    imgUrl: '',
    category: '',
    storyUri: '',
  });

  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    });
  };



  const createCampaign = async (e) =>{

    e.preventDefault();
    if(!window.ethereum){
      alert("Metamask is required to interact with this application!!");
      return;
    }

    await window.ethereum.request({ method: 'eth_requestAccounts'});


    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();


    const campaignFactory = new ethers.Contract(
      campaignFactoryAddress, 
      campaignFactoryABI, 
      signer
    );

    try{
      const tx = await campaignFactory.createCampaign(
        form.campaignTitle,
        ethers.utils.parseEther(form.requiredCampaignAmount), 
        form.imgUrl, 
        form.category, 
        form.storyUri
      );

      await tx.wait();
      alert("Campaign created successfully !");
    }
    catch(error) {
      console.log("Error creating campaign:", error);
      alert("Failed to create campaign");
    }


      
    console.log("Form submitted");
    setIsFormVisible(false);

   


  };



  return (
    <div>
      <header className={`bg-b2 text-black shadow-md py-4 px-8 font-roboto ${isFormVisible ? "blur-sm" : ""}`}> {/* Highlighted line */}
        <div className="container mx-auto flex justify-between items-center">
          {/* Title */}
          <div className="text-3xl font-bold text-gray-800">
            <Link href="/">Fund raise</Link>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/about" className="bg-b1  px-4 py-2 rounded-md hover:bg-b3">
                    About 
            </Link>
            <button onClick={() => setIsFormVisible(true)} className="bg-b1  px-4 py-2 rounded-md hover:bg-b3">
              Create Campaign
            </button>
            <div onClick={connectWallet} className="bg-b1  px-4 py-2 rounded-md hover:bg-b3 cursor-pointer">
              {balance.slice(0, 5)}MATIC {address.slice(0, 7)}...{address.slice(39)}
            </div>
          </div>

        </div>
      </header>

      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md shadow-md z-50 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Create Campaign</h2>
            <form onSubmit={createCampaign}>


              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Campaign Title
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" 
                type="text"
                name="campaignTitle"
                placeholder="Campaign Title"
                onChange={handleChange}
                value={form.campaignTitle} />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goal">
                  Funding Goal (MATIC)
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="goal"
                type="text"
                name="requiredCampaignAmount"
                placeholder="Required Amount (ETH)"
                onChange={handleChange}
                value={form.requiredCampaignAmount} />
              </div>



              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imgUrl">
                  Image URL
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="imgUrl"
                
                type="text"
                name="imgUrl"
                placeholder="Image URL"
                onChange={handleChange}
                value={form.imgUrl}/>
              </div>


              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Category
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="category"
                type="text"
                name="category"
                placeholder="Category"
                onChange={handleChange}
                value={form.category}/>
              </div>


              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="storyUri">
                  Story URI
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="storyUri"
                 type="text"
                 name="storyUri"
                 placeholder="Story URI"
                 onChange={handleChange}
                 value={form.storyUri} />
              </div>


              <div className="flex items-center justify-between">
                <button  className="bg-b1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Submit
                </button>
                <button onClick={() => setIsFormVisible(false)} className="inline-block align-baseline font-bold text-sm text-b1 hover:text-blue-800">
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
