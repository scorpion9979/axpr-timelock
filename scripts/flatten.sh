 
if [ ! -d "flattened" ]; then
    mkdir "flattened"
fi
truffle-flattener contracts/Timelock.sol > flattened/FlattenedContract.sol
truffle-flattener contracts/FakeAxpr.sol > flattened/FlattenedToken.sol
