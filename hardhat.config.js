const { task } = require("hardhat/config");
require("@nomiclabs/hardhat-waffle");
require('dotenv').config({ path: './.env.local' }); // Load environment variables from .env.local

// Define a Hardhat task to print the list of accounts
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

// Validate environment variables
if (!privateKey || !process.env.NEXT_PUBLIC_RPC_URL) {
  throw new Error("Please set your NEXT_PUBLIC_PRIVATE_KEY and NEXT_PUBLIC_RPC_URL in your .env.local file");
}

module.exports = {
  solidity: "0.8.10",
  defaultNetwork: "polygon",
  networks: {
    hardhat: {}, // Local Hardhat network configuration
    polygon: {
      url: process.env.NEXT_PUBLIC_RPC_URL, // URL for the Polygon RPC node
      accounts: [privateKey], // Accounts (private keys) for deployment
    },
  },
};
