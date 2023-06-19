require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
const path = require("path");

const privateKey = fs.readFileSync(path.resolve(__dirname, ".secret")).toString().trim() || "01234567890123456789";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      // zeeve
      url: `https://app.zeeve.io/shared-api/poly/67b9965cf3af288e72f52eb3e014493ad4132cc9ae9764f4/`,
      accounts: [privateKey]
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};

