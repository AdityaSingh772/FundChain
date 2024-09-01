

"use client";


import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Card from '../components/Card';
import { campaignFactoryABI, campaignFactoryAddress } from "../interact/config";
import { campaignABI } from "../interact/config2"; // Ensure correct import path

export default function CampaignList({ onFundClick }) {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Function to fetch campaigns
  async function fetchCampaigns() {
    if (!window.ethereum) {
      console.error("Please install MetaMask!");
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const campaignFactory = new ethers.Contract(
        campaignFactoryAddress,
        campaignFactoryABI,
        signer
      );


      
      const deployedCampaigns = await campaignFactory.getDeployedCampaigns();

      
      const campaignDetails = await Promise.all(
        deployedCampaigns.map(async (address) => {
          

          const campaign = new ethers.Contract(address, campaignABI, signer);

          try {
            const title = await campaign.title();
            const image = await campaign.image();
            const requiredAmount = await campaign.requiredAmount();
            const receivedAmount = await campaign.receivedAmount();
            const story = await campaign.story();


            return {
              id: address,
              image,
              title,
              description: story,
              requiredAmount: ethers.utils.formatEther(requiredAmount),
              receivedAmount: ethers.utils.formatEther(receivedAmount),
            };
          } catch (error) {
            console.error(`Error fetching details for campaign at ${address}:`, error);

            return null;

          }
        })
      );


      setCampaigns(campaignDetails.filter((campaign) => campaign !== null));
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    }
  }

  // Function to remove a campaign
  async function removeCampaign(address) {
    if (!window.ethereum) {
      console.error("Please install MetaMask!");
      return;

    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const campaignFactory = new ethers.Contract(
        campaignFactoryAddress,
        campaignFactoryABI,
        signer
      );

      const tx = await campaignFactory.removeCampaign(address);
      await tx.wait();
      alert("Campaign removed successfully!");

      // Refresh the campaign list after removal
      fetchCampaigns();
    } catch (error) {
      console.error("Failed to remove campaign:", error);
      alert("Failed to remove campaign. Check the console for details.");
    }
  }

  return (
<ul
    className="flex flex-wrap justify-center list-none p-0 overflow-y-auto max-h-screen scroll-smooth"
    style={{ scrollBehavior: "smooth" }} // Optional inline style for smooth scrolling
  >
    {campaigns.reverse().map((card) => (
      <li key={card.id} className="m-2"> {/* Add margin to separate list items */}
        <Card
          {...card}
          onFundClick={() => onFundClick(card)}
          onRemoveClick={() => removeCampaign(card.id)}
        />
      </li>
    ))}
  </ul>
  );
}
