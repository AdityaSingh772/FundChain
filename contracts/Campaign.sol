// SPDX-License-Identifier: Unlicensed
pragma solidity >0.7.0 <=0.9.0;

contract CampaignFactory{
    address[]public deployedCampaigns;
    event campaignCreated(
        string title,
        uint requiredAmount,
        address indexed owner,
        address campaignAddress,
        string imgURL,
        uint indexed timestamp,
        string indexed category
    );

    function createCampaign(string memory campaignTitle,
    uint requiredCampaignAmount,
    string memory imgURI,
    string memory category,
    string memory storyURI) public 
    {
       Campaign newCamp=new Campaign(
        campaignTitle,requiredCampaignAmount,imgURI,storyURI);
       deployedCampaigns.push(address(newCamp));
       emit campaignCreated(campaignTitle, 
                            requiredCampaignAmount, 
                            msg.sender, 
                            address(newCamp), 
                            imgURI, 
                            block.timestamp,
                             category);
    }
}
contract Campaign {
    // State Variables
    string public title;
    uint public requiredAmount;
    string public image;
    string public story;
    address payable public owner;
    uint public receivedAmount;
    event donated(address indexed donor,uint indexed amount,uint indexed timeStamp);
    constructor(
        string memory CampaignTitle,
        uint requiredCampaignAmount,
        string memory imgURI,
        string memory storyURI
    ) {
        title = CampaignTitle;
        requiredAmount = requiredCampaignAmount;
        story = storyURI;
        image = imgURI;
        owner = payable(msg.sender);
    }

    function donate() public payable {
        require(requiredAmount > receivedAmount, "Required amount fulfilled");
        owner.transfer(msg.value);
        receivedAmount += msg.value;
        emit donated(msg.sender,msg.value,block.timestamp);
    }
}
