<template>
  <div class="lock has-text-centered">
    <div class="columns is-centered is-mobile">
      <div class="column is-three-fifths-desktop is-four-fifths-mobile">
        <div class="container">
          <div class="field">
            <div class="control has-icons-left">
              <input v-model="address" class="input is-large" placeholder="Recipient">
              <span class="icon is-small is-left">
                <i class="fab fa-ethereum"></i>
              </span>
            </div>
          </div>
          <div class="field">
            <div class="control has-icons-left">
              <input v-model="amount" class="input is-medium" type="number" placeholder="Amount">
              <span class="icon is-small is-left">
                <i class="fas fa-coins"></i>
              </span>
            </div>
          </div>
          <b-field>
              <b-datepicker
                  v-model="date"
                  placeholder="Date for release"
                  icon="calendar-today"
                  size="is-medium"
                  editable>
              </b-datepicker>
          </b-field>
          <!-- <div class="field">
            <div class="control has-icons-left">
              <input class="input is-large" type="date" placeholder="Date for release"/>
              <span class="icon is-small is-left">
                <i class="fas fa-calendar-alt"></i>
              </span>
            </div>
          </div> -->
          <button v-on:click="lock" class="button is-warning is-large">Lock</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getWeb3 from '../utils/getWeb3.js';
import Timelock from '../contracts/Timelock';
import * as contract from 'truffle-contract';

export default {
  name: 'lock',
  data: function() {
    return {
      web3IsActive: false,
      web3: null,
      instance: null,
      address: "",
      amount: 0,
      date: null
    }
  },
  // computed: {
  //   address: function() { return this.address },
  //   amount: function() { return this.amount },
  //   date: function() { return this.date }
  // },
  mounted: async function() {
    this.web3 = await getWeb3();
    let timelock = contract(Timelock);
    timelock.setProvider(this.web3.currentProvider);
    this.instance = await timelock.deployed();
    let a = await this.web3.eth.getAccounts()
    this.address = a.toString();
    let funds = await this.instance.funds.call();
    this.amount = funds/Math.pow(10, 18);
    // this.$emit('update:address', address)
  },
  methods: {
    lock: function() {
      // console.log("Hi");
      // let web3 = await getWeb3();
      // console.log(web3);
      // // let timelock = contract(Timelock);
      // timelock.setProvider(web3.currentProvider);
      // let instance = await timelock.deployed();
      this.web3IsActive = true;
      this.instance.methods.lock(this.props.address, this.props.date, this.props.amount);
    }
  }
}
</script>

