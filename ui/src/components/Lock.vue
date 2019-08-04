<template>
  <div class='lock has-text-centered'>
    <div class='columns is-centered is-mobile'>
      <div class='column is-three-fifths-desktop is-four-fifths-mobile'>
        <div class='container'>
          <b-field>
            <b-input v-model='address' size='is-large' placeholder='Recipient' icon='ethereum'>
            </b-input>
          </b-field>
          <b-field>
            <b-numberinput v-model='amount' size='is-medium' step='0.01' min='0' placeholder='Amount'>
            </b-numberinput>
          </b-field>
          <b-field>
              <b-datepicker
                  v-model='date'
                  placeholder='Date for release'
                  icon='calendar-today'
                  size='is-medium'
                  editable>
              </b-datepicker>
          </b-field>
          <b-button v-bind:disabled='disabled()' @click='lock' type='is-warning' size='is-large'>Lock</b-button>
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
    bnAmount: function() {
      const reg = /^(\d+)?(\.(\d*))?$/;
      const match = this.amount.toString().match(reg);
      const int = match[1] ? match[1] : '';
      const dec = match[3] ? match[3] : '0'
      const zerosRep = int + dec + '0'.repeat(18 - dec.length);
      return this.web3().utils.toBN(zerosRep);
    },
    bnDate: function() { return (this.BN(Date.parse(this.date))).div(this.BN(1000)); }
  },
  inject: ['web3', 'instance', 'disabled', 'toggleDisabled', 'success', 'danger'],
  methods: {
    lock: async function() {
      this.toggleDisabled();
      try {
        const from = await this.web3().eth.getCoinbase();
        const gas = await this.instance().lock.estimateGas(this.address, this.bnDate, this.bnAmount, { from });
        await this.instance().lock(this.address, this.bnDate, this.bnAmount, { from, gas })
                             .then(() => this.success('AXPR locked successfully'));
        this.toggleDisabled();
      } catch (err) {
        this.toggleDisabled();
        this.danger('Encountered an error');
      }
    }
  }
}
</script>

