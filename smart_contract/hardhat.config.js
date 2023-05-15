require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
   
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545", 
      // chainId: 97,
      accounts: [process.env.PRIVATE_KEY],
    },

    mainnet: {
      url: "https://bsc-dataseed.binance.org/", 
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
