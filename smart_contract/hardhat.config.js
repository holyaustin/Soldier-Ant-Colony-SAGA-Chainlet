require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
   
    // for testnet
    testnet: {
      url: "https://data-seed-prebsc-2-s3.binance.org:8545",
      accounts: [process.env.PRIVATE_KEY],
      // allowUnlimitedContractSize: true
    },

        // for mainnet
        'optimism': {
          url: "https://bsc-dataseed.binance.org",
          accounts: [process.env.PRIVATE_KEY],
        },

  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
