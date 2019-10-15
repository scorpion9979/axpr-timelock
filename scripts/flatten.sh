 
if [ ! -d "flattened" ]; then
    mkdir "flattened"
fi
truffle-flattener contracts/Timelock.sol > flattened/FlattenedToken.sol
