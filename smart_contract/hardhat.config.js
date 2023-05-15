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
      url: "https://eth.bd.evmos.dev:8545",
      accounts: [process.env.PRIVATE_KEY],
      // allowUnlimitedContractSize: true
    },

        // for mainnet
        'optimism': {
          url: "https://eth.bd.evmos.org:8545",
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
