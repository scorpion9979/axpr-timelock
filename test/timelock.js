const Timelock = artifacts.require("Timelock");
const FakeAxpr = artifacts.require("FakeAxpr");

const BN = web3.utils.toBN;

let timelock, faxpr;

contract("timelock: lock AXPR tokens and release them after a set time period", async function (accounts) {
    let [timelockOwner, axprOwner, accountA, accountB, accountC] = accounts;

    before(async function () {
        faxpr = await FakeAxpr.deployed();
        timelock = await Timelock.deployed();
    });

    it("should start with a 0 AXPR fund", async function () {
        let funds = await timelock.funds.call();
        assert.equal(funds.toString(), "0");
    });

    it("should update funds upon receiving AXPR", async function () {
        const amount = BN("140" + "0".repeat(18));
        await faxpr.approve(timelock.address, amount, { from: axprOwner });
        await timelock.deposit(amount, { from: axprOwner });
        let funds = await timelock.funds.call();
        assert.equal(funds.toString(), amount.toString());
        let balance = await faxpr.balanceOf.call(timelock.address);
        assert.equal(balance.toString(), amount.toString());
    });

    it("should update total contract funds upon locking AXPR", async function () {
        const timeScale = BN(1000);
        const currentBlock = await web3.eth.getBlock();
        const currenTimestamp = BN(currentBlock.timestamp);
        // set release to 20 sec after the current timestamp
        const releaseDatestamp = new Date(currenTimestamp.mul(timeScale).toNumber() + 20000);
        const releaseTimestamp = BN(Date.parse(releaseDatestamp)/timeScale);
        const beforeAmount = await timelock.funds.call();
        const diffAmount = BN("35" + "0".repeat(18));
        const afterAmount = beforeAmount.sub(diffAmount);
        await timelock.lock(accountA, releaseTimestamp, diffAmount, { from: timelockOwner });
        let funds = await timelock.funds.call();
        assert.equal(funds.toString(), afterAmount.toString());
        let balance = await timelock.balanceOf.call(accountA);
        assert.equal(balance.toString(), diffAmount.toString());
    });

    it("should update individual user balances upon locking AXPR", async function () {
        const timeScale = BN(1000);
        const currentBlock = await web3.eth.getBlock();
        const currenTimestamp = BN(currentBlock.timestamp);
        // set release to 20 sec after the current timestamp
        const releaseDatestamp = new Date(currenTimestamp.mul(timeScale).toNumber() + 20000);
        const releaseTimestamp = BN(Date.parse(releaseDatestamp)/timeScale);
        const beforeAmount = await timelock.funds.call();
        const diffAmount1 = BN("21" + "0".repeat(18));
        const diffAmount2 = BN("36" + "0".repeat(18));
        const afterAmount1 = beforeAmount.sub(diffAmount1);
        const afterAmount2 = afterAmount1.sub(diffAmount2);
        let funds;
        await timelock.lock(accountB, releaseTimestamp, diffAmount1, { from: timelockOwner })
        funds = await timelock.funds.call();
        assert.equal(funds.toString(), afterAmount1.toString());
        let balance1 = await timelock.balanceOf.call(accountB);
        assert.equal(balance1.toString(), diffAmount1.toString());
        await timelock.lock(accountC, releaseTimestamp, diffAmount2, { from: timelockOwner })
        funds = await timelock.funds.call();
        assert.equal(funds.toString(), afterAmount2.toString());
        let balance2 = await timelock.balanceOf.call(accountC);
        assert.equal(balance2.toString(), diffAmount2.toString());
    });

    it("should update (top-up) individual user balances upon locking more AXPR", async function () {
        const timeScale = BN(1000);
        const currentBlock = await web3.eth.getBlock();
        const currenTimestamp = BN(currentBlock.timestamp);
        // set release to 20 sec after the current timestamp
        const releaseDatestamp = new Date(currenTimestamp.mul(timeScale).toNumber() + 20000);
        const releaseTimestamp = BN(Date.parse(releaseDatestamp)/timeScale);
        const beforeFunds = await timelock.funds.call();
        const beforeBalance = await timelock.balanceOf.call(accountA);
        const diffAmount = BN("24" + "0".repeat(18));
        const afterFunds = beforeFunds.sub(diffAmount);
        const afterBalance = beforeBalance.add(diffAmount);
        let funds;
        await timelock.lock(accountA, releaseTimestamp, diffAmount, { from: timelockOwner });
        funds = await timelock.funds.call();
        assert.equal(funds.toString(), afterFunds.toString());
        let balance = await timelock.balanceOf.call(accountA);
        assert.equal(balance.toString(), afterBalance.toString());
    });

    it("should fail when trying to unlock balances before period is over", async function() {
        try {
            await timelock.release(accountA, { from: timelockOwner });
        } catch (error) {
            assert(error.message.includes("Timelock: current time is before release time"));
        }
    })

    it("should unlock individual user balances after period passes", function(done) {
        this.timeout(25000);
        setTimeout(async function () {
            const diffAmount1 = BN("59" + "0".repeat(18));
            const diffAmount2 = BN("21" + "0".repeat(18));
            const diffAmount3 = BN("36" + "0".repeat(18));
            await timelock.release(accountA, { from: timelockOwner });
            await timelock.release(accountB, { from: timelockOwner });
            await timelock.release(accountC, { from: timelockOwner });
            let balance1 = await faxpr.balanceOf.call(accountA);
            let balance2 = await faxpr.balanceOf.call(accountB);
            let balance3 = await faxpr.balanceOf.call(accountC);
            assert.equal(balance1.toString(), diffAmount1.toString());
            assert.equal(balance2.toString(), diffAmount2.toString());
            assert.equal(balance3.toString(), diffAmount3.toString());
            done();
        }, 21000);
    });

    it("should fail when trying to unlock a user balance again before locking more AXPR", async function() {
        try {
            await timelock.release(accountA, { from: timelockOwner });
        } catch (error) {
            assert(error.message.includes("Timelock: no tokens locked for beneficiary"));
        }
    })

    it("should update an individual user balance after reset upon locking more AXPR", async function () {
        const timeScale = BN(1000);
        const currentBlock = await web3.eth.getBlock();
        const currenTimestamp = BN(currentBlock.timestamp);
        // set release to 10 sec after the current timestamp
        const releaseDatestamp = new Date(currenTimestamp.mul(timeScale).toNumber() + 10000);
        const releaseTimestamp = BN(Date.parse(releaseDatestamp)/timeScale);
        const beforeFunds = await timelock.funds.call();
        const beforeBalance = await timelock.balanceOf.call(accountA);
        assert.equal(beforeBalance.toString(), "0");
        const diffAmount = BN("24" + "0".repeat(18));
        const afterFunds = beforeFunds.sub(diffAmount);
        const afterBalance = diffAmount;
        let funds;
        await timelock.lock(accountA, releaseTimestamp, diffAmount, { from: timelockOwner });
        funds = await timelock.funds.call();
        assert.equal(funds.toString(), afterFunds.toString());
        let balance = await timelock.balanceOf.call(accountA);
        assert.equal(balance.toString(), afterBalance.toString());
    });

    it("should unlock an individual user balance after period passes", function(done) {
        this.timeout(15000);
        setTimeout(async function () {
            const beforeAmount = BN("59" + "0".repeat(18));
            const diffAmount = BN("24" + "0".repeat(18));
            const afterAmount = beforeAmount.add(diffAmount);
            let faxprBalance, timelockBalance;
            faxprBalance = await faxpr.balanceOf.call(accountA);
            assert.equal(faxprBalance.toString(), beforeAmount.toString());
            timelockBalance = await timelock.balanceOf.call(accountA);
            assert.equal(timelockBalance.toString(), diffAmount.toString());
            await timelock.release(accountA, { from: timelockOwner });
            faxprBalance = await faxpr.balanceOf.call(accountA);
            assert.equal(faxprBalance.toString(), afterAmount.toString());
            timelockBalance = await timelock.balanceOf.call(accountA);
            assert.equal(timelockBalance.toString(), "0");
            done();
        }, 11000);
    });
});