const EthDex = artifacts.require('EthDex');
const EthSwap = artifacts.require('EthSwap');
const truffleAssert = require('truffle-assertions');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { EthDexConfig } = require('../src/constants/contracts');

chai.should();
chai.use(chaiAsPromised);

const toWei = (n) => {
  return web3.utils.toWei(n, 'ether');
};

contract('EthSwap', async ([deployer, investor]) => {
  let ethSwap;
  let ethDex;

  before(async () => {
    ethDex = await EthDex.new(
      EthDexConfig.INITIAL_SUPPLY,
      EthDexConfig.TOKEN_NAME,
      EthDexConfig.DECIMAL_UNITS,
      EthDexConfig.TOKEN_SYMBOL
    );
    ethSwap = await EthSwap.new(ethDex.address);

    await ethDex.transfer(ethSwap.address, await ethDex.totalSupply());
  });
  describe('deployment', async () => {
    it('contract has correct name', async () => {
      assert.equal(await ethSwap.name(), 'EthSwap Instant Exchange');
    });

    it('contract has EthDex tokens', async () => {
      const balance = await ethDex.balanceOf(ethSwap.address);
      assert.equal(balance, EthDexConfig.INITIAL_SUPPLY);
    });
  });

  describe('buyTokens function', async () => {
    let transaction;

    before(async () => {
      transaction = await ethSwap.buyTokens({
        from: investor,
        value: toWei('1'),
      });
    });

    it('investor credited with EthDex token', async () => {
      const investorBalance = await ethDex.balanceOf(investor);
      assert.equal(investorBalance, toWei('100'));
    });

    it('contract debited EthDex token', async () => {
      const ethDexBalance = await ethDex.balanceOf(ethSwap.address);
      assert.equal(
        BigInt(ethDexBalance),
        BigInt(EthDexConfig.INITIAL_SUPPLY) - BigInt(toWei('100'))
      );
    });

    it('contract credited Ether', async () => {
      const ethBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(ethBalance.toString(), toWei('1'));
    });

    it('TokenSwap event emmited', async () => {
      truffleAssert.eventEmitted(transaction, 'TokenSwap', async (event) => {
        assert.equal(event.from, investor);
        assert.equal(event.token, ethDex.address);
        return;
      });
    });
  });

  describe('sellTokens function', async () => {
    let transaction;
    const value = toWei('100');
    before(async () => {
      // Approve spending of tokens by EthSwap
      await ethDex.approve(ethSwap.address, value, { from: investor });
      // Spend tokens
      transaction = await ethSwap.sellTokens(value, { from: investor });
    });

    it('investor debited EthDex token', async () => {
      const investorBalance = await ethDex.balanceOf(investor);
      assert.equal(investorBalance.toString(), toWei('0'));
    });

    it('contract credited EthDex', async () => {
      const ethDexBalance = await ethDex.balanceOf(ethSwap.address);
      assert.equal(ethDexBalance, EthDexConfig.INITIAL_SUPPLY);
    });

    it('contract debited Ether', async () => {
      const ethBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(ethBalance.toString(), toWei('0'));
    });

    it('TokenSwap event emmited', async () => {
      truffleAssert.eventEmitted(transaction, 'TokenSwap', async (event) => {
        assert.equal(event.from, investor);
        assert.equal(event.token, ethDex.address);
        return;
      });
    });

    it('investor cannot sell more Tokens than balance', async () => {
      await ethSwap.sellTokens(toWei('500'), { from: investor }).should.be
        .rejected;
    });
  });
});
