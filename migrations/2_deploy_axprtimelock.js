const Timelock = artifacts.require("Timelock");
const FakeAxpr = artifacts.require("FakeAxpr");

module.exports = function(deployer, network, accounts) {
  if (network == "live") {
    deployer.deploy(Timelock, "0xC39E626A04C5971D770e319760D7926502975e47");
  } else if (network == "development") {
    let [timelockOwner, axprOwner] = accounts;
    deployer.deploy(FakeAxpr, { from: axprOwner }).then(function() {
      return deployer.deploy(Timelock, FakeAxpr.address, { from: timelockOwner }).then(function() {
        console.log(`FakeAxpr contract: ${FakeAxpr.address}`);
        console.log(`TimeLock contract: ${Timelock.address}`);
      });
    });
  }
};
