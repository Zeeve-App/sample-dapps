const EthDex = artifacts.require('EthDex');
const EthSwap = artifacts.require('EthSwap');

module.exports = async function (deployer) {
  // Get the deployed EthDex contract
  const ethDex = await EthDex.deployed();

  // Deploy EthSwap
  await deployer.deploy(EthSwap, ethDex.address);
  const ethSwap = await EthSwap.deployed();

  // Get totalSupply of EthDex
  const totalSupply = await ethDex.totalSupply();

  // Transfer all tokens to the EthSwap Exchange
  await ethDex.transfer(ethSwap.address, totalSupply);
};
