<template>
  <div class='lock has-text-centered'>
    <div class='columns is-centered is-mobile'>
      <div class='column is-three-fifths-desktop is-four-fifths-mobile'>
        <div class='container'>
          <b-field>
            <b-numberinput v-model='amount' size='is-medium' step='0.01' min='0' placeholder='Amount'>
            </b-numberinput>
          </b-field>
          <b-button v-bind:disabled='disabled()' @click='deposit' type='is-warning' size='is-large'>Deposit</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'deposit',
  data: function() {
    return {
      amount: 0
    }
  },
  computed: {
    bnAmount: function() {
      const reg = /^(\d+)?(\.(\d*))?$/;
      const match = this.amount.toString().match(reg);
      const int = match[1] ? match[1] : '';
      const dec = match[3] ? match[3] : '0'
      const zerosRep = int + dec + '0'.repeat(18 - dec.length);
      return this.web3().utils.toBN(zerosRep);
    },
  },
  inject: ['web3', 'timelock', 'instance', 'axpr', 'disabled', 'toggleDisabled', 'success', 'danger'],
  methods: {
    deposit: async function() {
      this.toggleDisabled();
      try {
        const from = await this.web3().eth.getCoinbase();
        let gas;
        gas = await this.axpr().methods.approve(this.timelock().address, this.web3().utils.toHex(this.bnAmount))
                                       .estimateGas({ from });
        await this.axpr().methods.approve(this.timelock().address, this.web3().utils.toHex(this.bnAmount))
                                 .send({ from, gas });
        gas = await this.instance().deposit.estimateGas(this.bnAmount, { from });
        await this.instance().deposit(this.bnAmount, { from, gas })
                             .then(() => this.success('AXPR deposited successfully'));
        this.toggleDisabled();
      } catch (err) {
        this.toggleDisabled();
        this.danger('Encountered an error');
      }
    }
  }
}
</script>

