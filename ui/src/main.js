import Vue from 'vue'
import VueRouter from 'vue-router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import App from './App.vue'
import routes from './routes'
import getWeb3 from './utils/getWeb3.js';
import Timelock from './contracts/Timelock';
import * as contract from 'truffle-contract';
import abi from 'human-standard-token-abi';

Vue.config.productionTip = false

Vue.use(VueRouter)
// TODO: use Buefy templates
Vue.use(Buefy)

const router = new VueRouter({
  routes
});

new Vue({
  router,
  data: function() {
    return {
      disabled: true,
      web3: null,
      instance: null,
      timelock: null,
      axpr: null,
    }
  },
  mounted: async function() {
    this.web3 = await getWeb3();
    this.timelock = contract(Timelock);
    this.timelock.setProvider(this.web3.currentProvider);
    this.instance = await this.timelock.deployed();
    this.axpr = new this.web3.eth.Contract(abi, '0xfeb796ec0495Db17DeD472E7aaed80B9e839fcEc');
    this.disabled = false;
  },
  provide() {
    return {
      web3: () => this.web3,
      timelock: () => this.timelock,
      instance: () => this.instance,
      axpr: () => this.axpr,
      disabled: () => this.disabled,
      toggleDisabled: () => {
        this.disabled = !this.disabled;
        return this.disabled;
      },
    }
  },
  render: h => h(App)
}).$mount('#app')
