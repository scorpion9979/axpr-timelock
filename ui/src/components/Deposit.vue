<template>
  <div class='lock has-text-centered'>
    <div class='columns is-centered is-mobile'>
      <div class='column is-three-fifths-desktop is-four-fifths-mobile'>
        <div class='container'>
          <div class='field'>
            <div class='control has-icons-left'>
              <!--TODO: prevent negative amount input-->
              <input v-model='amount' class='input is-medium' type='number' placeholder='Amount'>
              <span class='icon is-small is-left'>
                <i class='fas fa-coins'></i>
              </span>
            </div>
          </div>
          <button v-bind:disabled='disabled()' v-on:click='deposit' class='button is-warning is-large'>Deposit</button>
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
    bnAmount: function() { return this.web3().utils.toBN(this.amount.toString() + '0'.repeat(18)) },
  },
  inject: ['web3', 'timelock', 'instance', 'axpr', 'disabled', 'toggleDisabled', 'success', 'danger'],
  methods: {
    deposit: async function() {
      this.toggleDisabled();
      try {
        const account = await this.web3().eth.getAccounts();
        await this.axpr().methods.approve(this.timelock().address, this.web3().utils.toHex(this.bnAmount))
                                .send({ from: account.toString(), gas: 400000 });
        await this.instance().deposit(this.bnAmount, { gas: 400000, from: account.toString() })
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

