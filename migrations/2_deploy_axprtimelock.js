const Timelock = artifacts.require("Timelock");
const FakeAxpr = artifacts.require("FakeAxpr");

module.exports = async function(deployer, network) {
  if (network == "live") {
    deployer.deploy(Timelock, "0xC39E626A04C5971D770e319760D7926502975e47");
  } else {
    await deployer.deploy(FakeAxpr);
    const contract = await FakeAxpr.deployed();
    deployer.deploy(Timelock, contract.address);
  }
};
