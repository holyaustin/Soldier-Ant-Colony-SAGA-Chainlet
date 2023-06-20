require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
   
    testnet: {
      url: "https://soldierant-1687185722549573-1.jsonrpc.sp1.sagarpc.io", 
      // chainId: 97,
      accounts: [process.env.PRIVATE_KEY],
    },

    mainnet: {
      url: "soldierant-1687185722549573-1.jsonrpc.sp1.sagarpc.io", 
      // chainId: 56,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
