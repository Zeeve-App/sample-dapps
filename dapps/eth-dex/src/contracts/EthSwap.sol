// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import './EthDex.sol';

contract EthSwap {
    string public _name = 'EthSwap Instant Exchange';
    EthDex public ethDex;
    uint256 public rate = 100;

    event TokenSwap(address from, address token, uint256 amount, uint256 rate);

    constructor(EthDex _ethDex) {
        ethDex = _ethDex;
    }

    function buyTokens() public payable returns (bool success) {
        // Calculate the number of EthDex tokens to purchase
        uint256 tokenAmount = msg.value * rate;

        // Require EthSwap has enough tokens
        require(
            ethDex.balanceOf(address(this)) >= tokenAmount,
            'Insufficient Balance'
        );
        ethDex.transfer(msg.sender, tokenAmount);

        // Emit a token bought event
        emit TokenSwap(msg.sender, address(ethDex), tokenAmount, rate);
        return true;
    }

    function sellTokens(uint256 _value) public returns (bool success) {
        // User cannot sell more tokens than in balance
        require(ethDex.balanceOf(msg.sender) >= _value);

        // Calculate the amoiunt of Ether to purchase
        uint256 etherAmount = _value / rate;

        // Require EthSwap has enough Ether
        require(address(this).balance >= etherAmount);

        // Transfer to EthSwap
        ethDex.transferFrom(msg.sender, address(this), _value);
        payable(msg.sender).transfer(etherAmount);
        emit TokenSwap(msg.sender, address(ethDex), _value, rate);
        return true;
    }

    function name() public view returns (string memory) {
        return _name;
    }
}
