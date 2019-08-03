<template>
  <div class='lock has-text-centered'>
    <div class='columns is-centered is-mobile'>
      <div class='column is-three-fifths-desktop is-four-fifths-mobile'>
        <div class='container'>
          <div class='field'>
            <div class='control has-icons-left'>
              <input v-model='address' class='input is-large' placeholder='Recipient'>
              <span class='icon is-small is-left'>
                <i class='fab fa-ethereum'></i>
              </span>
            </div>
          </div>
          <div class='field'>
            <div class='control has-icons-left'>
              <input v-model='amount' class='input is-medium' type='number' placeholder='Amount'>
              <span class='icon is-small is-left'>
                <i class='fas fa-coins'></i>
              </span>
            </div>
          </div>
          <b-field>
              <b-datepicker
                  v-model='date'
                  placeholder='Date for release'
                  icon='calendar-today'
                  size='is-medium'
                  editable>
              </b-datepicker>
          </b-field>
          <button v-bind:disabled='disabled()' v-on:click='lock' class='button is-warning is-large'>Lock</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lock',
  data: function() {
    return {
      address: '',
      amount: 0,
      date: null
    }
  },
  computed: {
    BN: function() { return this.web3().utils.toBN },
    bnAmount: function() { return this.BN(this.amount.toString() + '0'.repeat(18)) },
    bnDate: function() { return (this.BN(Date.parse(this.date))).div(this.BN(1000)); }
  },
  inject: ['web3', 'instance', 'disabled', 'toggleDisabled'],
  methods: {
    lock: async function() {
      this.toggleDisabled();
      const account = await this.web3().eth.getAccounts();
      return await this.instance().lock(this.address, this.bnDate, this.bnAmount, { gas: 400000, from: account.toString() }).then(this.toggleDisabled);
    }
  }
}
</script>

