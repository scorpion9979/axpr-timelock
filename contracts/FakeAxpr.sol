pragma solidity ^0.5.8;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

/**
 * @title FakeAxpr
 * @dev A fake token for testing purposes
 */

contract FakeAxpr is ERC20, ERC20Detailed {
    uint8 public constant DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 348700466.85087e18;

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor () public ERC20Detailed("FakeAxpr", "FAXPR", DECIMALS) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}