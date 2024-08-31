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

      // Fetch the deployed campaign addresses
      const deployedCampaigns = await campaignFactory.getDeployedCampaigns();

      // Fetch details for each deployed campaign using ABI
      const campaignDetails = await Promise.all(
        deployedCampaigns.map(async (address) => {
          // Instantiate each Campaign contract using the correct ABI
          const campaign = new ethers.Contract(address, campaignABI, signer);
          
          try {
            // Fetch the details from the Campaign contract
            const title = await campaign.title(); // Fetching public state variable 'title'
            const image = await campaign.image(); // Fetching public state variable 'image'
            const requiredAmount = await campaign.requiredAmount(); // Fetching public state variable 'requiredAmount'
            const receivedAmount = await campaign.receivedAmount(); // Fetching public state variable 'receivedAmount'
            const story = await campaign.story(); // Fetching public state variable 'story'

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
            return null; // Handle or skip campaigns with errors
          }
        })
      );

      // Filter out any null entries from campaigns with errors
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


// const cards = [
//     {
//       id: 1,
//       image: 'https://images-platform.99static.com//cU0qBaO133OuhkyLKG1l25ZX9As=/138x129:869x860/fit-in/590x590/99designs-contests-attachments/84/84068/attachment_84068886',
//       title: 'Campaign 1',
//       description: 'Details about Campaign 1',
//       fundLink: 'https://example.com/fund1',
//       statsLink: 'https://example.com/stats1',
//     },
//     {
//       id: 2,
//       image: 'https://images-platform.99static.com//cU0qBaO133OuhkyLKG1l25ZX9As=/138x129:869x860/fit-in/590x590/99designs-contests-attachments/84/84068/attachment_84068886',
//       title: 'Campaign 2',
//       description: 'Details about Campaign 2',
//       fundLink: 'https://example.com/fund2',
//       statsLink: 'https://example.com/stats2',
//     },
//     {
//         id: 1,
//         image: 'https://images-platform.99static.com//cU0qBaO133OuhkyLKG1l25ZX9As=/138x129:869x860/fit-in/590x590/99designs-contests-attachments/84/84068/attachment_84068886',
//         title: 'Campaign 1',
//         description: 'Details about Campaign 1',
//         fundLink: 'https://example.com/fund1',
//         statsLink: 'https://example.com/stats1',
//       },
//       {
//         id: 2,
//         image: 'https://images-platform.99static.com//cU0qBaO133OuhkyLKG1l25ZX9As=/138x129:869x860/fit-in/590x590/99designs-contests-attachments/84/84068/attachment_84068886',
//         title: 'Campaign 2',
//         description: 'Details about Campaign 2',
//         fundLink: 'https://example.com/fund2',
//         statsLink: 'https://example.com/stats2',
//       },
//       {
//         id: 1,
//         image: 'https://images-platform.99static.com//cU0qBaO133OuhkyLKG1l25ZX9As=/138x129:869x860/fit-in/590x590/99designs-contests-attachments/84/84068/attachment_84068886',
//         title: 'Campaign 1',
//         description: 'Details about Campaign 1',
//         fundLink: 'https://example.com/fund1',
//         statsLink: 'https://example.com/stats1',
//       },
//       {
//         id: 2,
//         image: 'https://images-platform.99static.com//cU0qBaO133OuhkyLKG1l25ZX9As=/138x129:869x860/fit-in/590x590/99designs-contests-attachments/84/84068/attachment_84068886',
//         title: 'Campaign 2',
//         description: 'Details about Campaign 2',
//         fundLink: 'https://example.com/fund2',
//         statsLink: 'https://example.com/stats2',
//       },
