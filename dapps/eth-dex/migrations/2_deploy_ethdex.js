const { EthDexConfig } = require('../src/constants/contracts');
const EthDex = artifacts.require('EthDex');

module.exports = async function (deployer) {
  // Deploy EthDex Token
  await deployer.deploy(
    EthDex,
    EthDexConfig.INITIAL_SUPPLY,
    EthDexConfig.TOKEN_NAME,
    EthDexConfig.DECIMAL_UNITS,
    EthDexConfig.TOKEN_SYMBOL
  );
};
