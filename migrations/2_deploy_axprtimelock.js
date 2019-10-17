require("dotenv").config();
const Timelock = artifacts.require("Timelock");
const FakeAxpr = artifacts.require("FakeAxpr");

module.exports = function(deployer, network, accounts) {
  if (network == "live") {
    // Live AXPR token
    deployer.deploy(Timelock, process.env.ROPSTEN_AXPR_CONTRACT);
  } else if (network == "ropsten") {
    // Ropsten FakeAxpr token
    deployer.deploy(FakeAxpr).then(function() {
      return deployer.deploy(Timelock, FakeAxpr.address).then(function() {
        console.log(`FakeAxpr contract: ${FakeAxpr.address}`);
        console.log(`TimeLock contract: ${Timelock.address}`);
      });
    });
  } else if (network == "development") {
    const [timelockOwner, axprOwner] = accounts;
    deployer.deploy(FakeAxpr, { from: axprOwner }).then(function() {
      return deployer.deploy(Timelock, FakeAxpr.address, { from: timelockOwner }).then(function() {
        console.log(`FakeAxpr contract: ${FakeAxpr.address}`);
        console.log(`TimeLock contract: ${Timelock.address}`);
      });
    });
  }
};
