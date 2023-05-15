var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "limit charge session expire portion amazing index kiwi torch fantasy ginger crush";

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    sepolia: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, "https://app.zeeve.io/shared-api/eth/f7d5b6624c939b41b58bc6df223df685bde85f1058f03dbe/");
      },
      network_id: 11155111,
      gas: 4500000,
      gasPrice: 10000000000,
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './build/contracts/',
  test_file_extension_regexp: /.*\.test.ts$/,
  compilers: {
    solc: {
      version: '0.8.14',
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: 'petersburg',
    },
  },
};
