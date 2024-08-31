"use client"
import { useState } from "react";
import { ethers } from "ethers";
import { campaignFactoryABI, campaignFactoryAddress } from "../interact/config";

export default function Home() {
    const [form, setForm] = useState({
        campaignTitle: '',
        requiredCampaignAmount: '',
        imgUrl: '',
        category: '',
        storyUri: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const createCampaign = async () => {
        if (!window.ethereum) {
            alert("MetaMask is required to interact with this application.");
            return;
        }

        
        await window.ethereum.request({ method: 'eth_requestAccounts' });

    
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        
        const signer = provider.getSigner();

        
        const campaignFactory = new ethers.Contract(
            campaignFactoryAddress,
            campaignFactoryABI,
            signer
        );

        
        try {
            const tx = await campaignFactory.createCampaign(
                form.campaignTitle,
                ethers.utils.parseEther(form.requiredCampaignAmount), 
                form.imgUrl,
                form.category,
                form.storyUri
            );

            await tx.wait();

            alert("Campaign created successfully!");
        } catch (error) {
            console.error("Error creating campaign:", error);
            alert("Failed to create campaign. See console for details.");
        }
    };

    return (
        <div>
            <h1>Create a Campaign</h1>
            <input
                type="text"
                name="campaignTitle"
                placeholder="Campaign Title"
                onChange={handleChange}
                value={form.campaignTitle}
            />
            <input
                type="text"
                name="requiredCampaignAmount"
                placeholder="Required Amount (ETH)"
                onChange={handleChange}
                value={form.requiredCampaignAmount}
            />
            <input
                type="text"
                name="imgUrl"
                placeholder="Image URL"
                onChange={handleChange}
                value={form.imgUrl}
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                onChange={handleChange}
                value={form.category}
            />
            <input
                type="text"
                name="storyUri"
                placeholder="Story URI"
                onChange={handleChange}
                value={form.storyUri}
            />
            <button onClick={createCampaign}>Create Campaign</button>
        </div>
    );
}
