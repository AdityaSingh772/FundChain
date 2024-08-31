// SPDX-License-Identifier: Unlicensed

pragma solidity >0.7.0 <=0.9.0;

contract CampaignFactory {
    address[] public deployedCampaigns;

    event campaignCreated(
        string title,
        uint requiredAmount,
        address indexed owner,
        address campaignAddress,
        string imgUri,
        uint indexed timestamp,
        string indexed category
    );

    function createCampaign(
        string memory campaignTitle,
        uint requiredCampaignAmount,
        string memory imgUrl,
        string memory category,
        string memory storyUri
    ) public {
        Campaign newCampaign = new Campaign(
            campaignTitle,
            requiredCampaignAmount,
            imgUrl,
            storyUri
        );

        deployedCampaigns.push(address(newCampaign));

        emit campaignCreated(
            campaignTitle,
            requiredCampaignAmount,
            msg.sender,
            address(newCampaign),
            imgUrl,
            block.timestamp,
            category
        ); // Added missing semicolon
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    string public title;
    uint public requiredAmount;
    string public image;
    string public story;
    address payable public owner;
    uint public receivedAmount;

    event donated(address indexed donor, uint indexed amount, uint indexed timestamp);

    constructor(
        string memory campaignTitle,
        uint requiredCampaignAmount,
        string memory imgUrl,
        string memory storyUri
    ) {
        title = campaignTitle;
        requiredAmount = requiredCampaignAmount;
        image = imgUrl;
        story = storyUri;
        owner = payable(msg.sender);
    }

    function donate() public payable {
        require(receivedAmount + msg.value <= requiredAmount, "Donation exceeds required amount");
        receivedAmount += msg.value;

        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Transfer failed");

        emit donated(msg.sender, msg.value, block.timestamp);
    }
}
