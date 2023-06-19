const EthDex = artifacts.require('EthDex');
const truffleAssert = require('truffle-assertions');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { EthDexConfig } = require('../src/constants/contracts');

chai.should();
chai.use(chaiAsPromised);

const toWei = (n) => {
  return web3.utils.toWei(n, 'ether');
};

contract('EthDex', async ([deployer, investor]) => {
  let ethDex;
  let value;

  before(async () => {
    ethDex = await EthDex.new(
      EthDexConfig.INITIAL_SUPPLY,
      EthDexConfig.TOKEN_NAME,
      EthDexConfig.DECIMAL_UNITS,
      EthDexConfig.TOKEN_SYMBOL
    );
    value = toWei('100');
  });

  describe('contract information', async () => {
    it('contract has correct name', async () => {
      assert.equal(await ethDex.name(), EthDexConfig.TOKEN_NAME);
    });

    it('contract has correct initialSupply', async () => {
      assert.equal(await ethDex.totalSupply(), EthDexConfig.INITIAL_SUPPLY);
    });

    it('contract has correct decimalUnits', async () => {
      assert.equal(await ethDex.decimals(), EthDexConfig.DECIMAL_UNITS);
    });

    it('contract has correct initialSupply', async () => {
      assert.equal(await ethDex.symbol(), EthDexConfig.TOKEN_SYMBOL);
    });
  });

  describe('non event emmiting functions', async () => {
    it('owner has correct balance', async () => {
      const balance = await ethDex.balanceOf(deployer);
      assert.equal(balance, EthDexConfig.INITIAL_SUPPLY);
    });

    it('approve returns true', async () => {
      const value = toWei('100');
      const approve = await ethDex.approve(investor, value);

      assert.isTrue(approve.receipt.status);
    });
  });

  describe('event emmiting functions', async () => {
    it('transfer event is emmited', async () => {
      const initialBalanceOwner = await ethDex.balanceOf(deployer);
      const transfer = await ethDex.transfer(investor, value);
      const balanceOwner = await ethDex.balanceOf(deployer);
      const balanceReceiver = await ethDex.balanceOf(investor);

      truffleAssert.eventEmitted(transfer, 'Transfer', async (event) => {
        return (
          event.from === deployer &&
          event.to === investor &&
          event.value === value
        );
      });
      assert.equal(
        BigInt(balanceOwner),
        BigInt(initialBalanceOwner) - BigInt(value)
      );
      assert.equal(balanceReceiver, value);
    });

    it('transfer event is emmited by transferFrom', async () => {
      const initialBalanceOwner = await ethDex.balanceOf(deployer);
      const approve = await ethDex.approve(deployer, value);
      const transfer = await ethDex.transferFrom(deployer, investor, value);
      const balanceOwner = await ethDex.balanceOf(deployer);
      const balanceReceiver = await ethDex.balanceOf(investor);

      truffleAssert.eventEmitted(transfer, 'Transfer', async (event) => {
        assert.equal(event.from, deployer);
        assert.equal(event.to, investor);
        assert.equal(event.value, value);
        return;
      });
      assert.equal(
        BigInt(balanceOwner),
        BigInt(initialBalanceOwner) - BigInt(value)
      );
      assert.equal(BigInt(balanceReceiver), BigInt(toWei('200')));
    });

    it('burn event is emmited', async () => {
      const initialBalanceOwner = await ethDex.balanceOf(deployer);
      const burn = await ethDex.burn(value);
      const balanceOwner = await ethDex.balanceOf(deployer);

      truffleAssert.eventEmitted(burn, 'Burn', async (event) => {
        assert.equal(event.from, deployer);
        assert.equal(event.value, value);
        return;
      });
      assert.equal(
        BigInt(balanceOwner),
        BigInt(initialBalanceOwner) - BigInt(value)
      );
    });

    it('freeze event is emmited', async () => {
      const initialBalanceOwner = await ethDex.balanceOf(deployer);
      const freeze = await ethDex.freeze(value);
      const balanceOwner = await ethDex.balanceOf(deployer);

      truffleAssert.eventEmitted(freeze, 'Freeze', async (event) => {
        assert.equal(event.from, deployer);
        assert.equal(event.value, value);
        return;
      });
      assert.equal(
        BigInt(balanceOwner),
        BigInt(initialBalanceOwner) - BigInt(value)
      );
    });

    it('unfreeze event is emmited', async () => {
      const initialBalanceOwner = await ethDex.balanceOf(deployer);
      const unfreeze = await ethDex.unfreeze(value);
      const balanceOwner = await ethDex.balanceOf(deployer);

      truffleAssert.eventEmitted(unfreeze, 'Unfreeze', async (event) => {
        assert.equal(event.from, deployer);
        assert.equal(event.value, value);
        return;
      });
      assert.equal(
        BigInt(balanceOwner),
        BigInt(initialBalanceOwner) + BigInt(value)
      );
    });
  });
});
