pragma solidity ^0.5.8;
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";

/**
 * @title Timelock
 * @dev the contract responsible for locking tokens for them to be
 * sent after a defined amount of time has elapsed
 * @notice the contract is ownable, meaning only the owner of the smart
 * contract can run the core functionality. it is also pausable, meaning the
 * owner could put the work of the smart contract into a halt in case of emergencies
 */
contract Timelock is Ownable, Pausable {
    // safe math prevents overflow
    using SafeMath for uint256;
    // safely interact with a third-party token
    using SafeERC20 for IERC20;
    
    event TokensDeposited(uint256 amount);
    event TokensLocked(address beneficiary, uint256 amount);
    event TokensReleased(address beneficiary, uint256 amount);

    /**
     * @dev ERC20 basic token contract being held
     */
    IERC20 private _token;

    /**
     * @dev the non-locked token funds in the contract
     */
    uint256 private _funds;
    
    /**
     * @dev mapping beneficiary addresses to release times
     * @param address the beneficiary addresses to timelocks address
     * @param uint256 time of when tokens should be released
     */
    mapping(address => uint256) private _releaseTimes;
    
    /**
     * @dev mapping beneficiary addresses to amount of locked tokens
     * @param address the beneficiary addresses to timelocks address
     * @param uint256 amount of tokens locked
     */  
    mapping(address => uint256) private _balances;
    
    constructor (address token) public {
        _token = IERC20(token);
        _funds = _token.balanceOf(address(this));
    }

    /**  
     * @dev return the amount of token funds in the smart contract
     */
    function funds() public view returns(uint256) {
        return _funds;
    }

    /**  
     * @dev return the amount of token funds locked for a certain beneficiary
     */
    function balanceOf(address beneficiary) public view returns(uint256) {
        require(beneficiary != address(0), "Timelock: beneficiary is the zero address");
        return _balances[beneficiary];
    }

    /**  
     * @dev return the time to release token funds locked for a certain beneficiary
     */
    function releaseTimeOf(address beneficiary) public view returns(uint256) {
        require(beneficiary != address(0), "Timelock: beneficiary is the zero address");
        return _releaseTimes[beneficiary];
    }

    /**  
     * @dev deposit tokens
     * @notice deposited tokens are added to the non-locked token funds
     */
    function deposit(uint256 amount) public {
        require(amount > 0, "Timelock: amount of tokens to be deposited is invalid");
        _token.safeTransferFrom(msg.sender, address(this), amount);
        _funds += amount;
        emit TokensDeposited(amount);
    }

    /**  
     * @dev lock an amount of tokens for a beneficiary for them to be
     * released at a later point in the future
     * @notice when locking funds for the same user multiple times, it adds
     * to the already locked amounts and uses the last release time defined
     */
    function lock(address beneficiary, uint256 releaseTime, uint256 amount) public onlyOwner whenNotPaused {
        require(beneficiary != address(0), "Timelock: beneficiary is the zero address");
        require(amount <= _funds && amount > 0, "Timelock: amount of tokens to be locked is invalid");
        _releaseTimes[beneficiary] = releaseTime;
        _balances[beneficiary] += amount;
        _funds -= amount;
        emit TokensLocked(beneficiary, amount);(beneficiary, amount);
    }
    
    /**
     * @dev transfers tokens held by timelock to beneficiary.
     * @notice resets beneficiary balance after tokens are released
     */
    function release(address beneficiary) public onlyOwner whenNotPaused {
        // solhint-disable-next-line not-rely-on-time
        require(beneficiary != address(0), "Timelock: beneficiary is the zero address");
        require(_balances[beneficiary] > 0, "Timelock: no tokens locked for beneficiary");
        require(block.timestamp >= _releaseTimes[beneficiary], "Timelock: current time is before release time");
        uint256 amount = _balances[beneficiary];
        _token.safeTransfer(beneficiary, amount);
        _balances[beneficiary] = 0;
        emit TokensReleased(beneficiary, amount);
    }
}