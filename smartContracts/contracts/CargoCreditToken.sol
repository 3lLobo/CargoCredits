// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";



contract CargoCreditsToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("CargoCredit", "CGO") {
        _mint(msg.sender, initialSupply * 10 ** 18);
    }
}