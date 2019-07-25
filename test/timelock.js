const Timelock = artifacts.require("Timelock");
const FakeAxpr = artifacts.require("FakeAxpr");

const BigNumber = web3.utils.BN;

require("chai")
    .use(require("chai-as-promised"))
    .use(require("chai-bn")(BigNumber))
    .should();

let timelock;

contract("timelock: lock AXPR tokens and release them after a set time period", async function (accounts) {
    let [accountA, accountB, accountC, accountD, accountE] = accounts;

    before(async function () {
        faxpr = await FakeAxpr.new({ from: accountA });
        timelock = await Timelock.new(faxpr.address, { from: accountB });
    });

    it("should start with a 0 AXPR fund", async function () {
        let funds = await timelock.funds();
        funds.should.be.a.bignumber.that.equals("0");
    });

    it("should update funds upon receiving AXPR", async function () {
        const amount = new BigNumber("200e18");
        await faxpr.transfer(accountB, amount, { from: accountA });
        await web3.eth.sendTransaction({ from: accountA, to: timelock.address, value: new BigNumber("0.0005e18") })
        let funds = await timelock.funds();
        funds.should.be.a.bignumber.that.equals(amount);
    });

    it("should update total contract funds upon locking AXPR", async function () {
        const beforeAmount = await timelock.funds();
        const diffAmount = new BigNumber("35e18");
        const afterAmount = beforeAmount.sub(diffAmount);
        await timelock.lock(accountC, new BigNumber("1864066838"), diffAmount, { from: accountB })
        let funds = await timelock.funds();
        funds.should.be.a.bignumber.that.equals(afterAmount);
        let balance = await timelock.balanceOf(accountC, { from: accountB });
        balance.should.be.a.bignumber.that.equals(diffAmount);
    });

    it("should update individual user balances upon locking AXPR", async function () {
        const beforeAmount = await timelock.funds();
        const diffAmount1 = new BigNumber("21e18");
        const diffAmount2 = new BigNumber("36e18");
        const afterAmount1 = beforeAmount.sub(diffAmount1);
        const afterAmount2 = afterAmount1.sub(diffAmount2);
        let funds;
        await timelock.lock(accountC, new BigNumber("1864066838"), diffAmount1, { from: accountB })
        funds = await timelock.funds();
        funds.should.be.a.bignumber.that.equals(afterAmount1);
        let balance1 = await timelock.balanceOf(accountC, { from: accountB });
        balance1.should.be.a.bignumber.that.equals(diffAmount1);
        await timelock.lock(accountD, new BigNumber("1864066838"), diffAmount2, { from: accountB })
        funds = await timelock.funds();
        funds.should.be.a.bignumber.that.equals(afterAmount2);
        let balance2 = await timelock.balanceOf(accountD, { from: accountB });
        balance2.should.be.a.bignumber.that.equals(diffAmount2);
    });
});