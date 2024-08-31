
export const campaignFactoryABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "title",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "requiredAmount",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "campaignAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "imgUri",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "string",
          "name": "category",
          "type": "string"
        }
      ],
      "name": "campaignCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "campaignTitle",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "requiredCampaignAmount",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "imgUrl",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "category",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "storyUri",
          "type": "string"
        }
      ],
      "name": "createCampaign",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "deployedCampaigns",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getDeployedCampaigns",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
export const campaignFactoryAddress = "0xef2C856166EF4899C5F8E11aC04f390EA05f3Ab7";
