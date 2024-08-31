
"use client";

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Card from '../components/Card';
import { campaignFactoryABI, campaignFactoryAddress } from "../interact/config";
import { campaignABI } from '../interact/config2';

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function fetchCampaigns() {
      if (!window.ethereum) {
        console.error("Please install MetaMask!");
        return;
      }
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const campaignFactory = new ethers.Contract(campaignFactoryAddress, campaignFactoryABI, signer);

      
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
              image: image,
              title: title,
              description: story,
              fundLink: `/fund/${address}`,
              statsLink: `/stats/${address}`,
              requiredAmount: ethers.utils.formatEther(requiredAmount), 
              receivedAmount: ethers.utils.formatEther(receivedAmount), 
            };
          } catch (error) {
            console.error(`Error fetching details for campaign at ${address}:`, error);
            return null; 
          }
        })
      );


      setCampaigns(campaignDetails.filter(campaign => campaign !== null));
    }

    fetchCampaigns();
  }, []);

  return (
    <div className="h-[80vh] scroll-smooth  overflow-y-auto p-4">
       {campaigns.map(card => (
        <Card
          key={card.id}
          image={card.image}
          title={card.title}
          description={card.description}
          fundLink={card.fundLink}
          statsLink={card.statsLink}
        />
      ))}
    </div>

      

  );
}
