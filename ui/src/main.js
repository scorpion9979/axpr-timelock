import Vue from 'vue'
import VueRouter from 'vue-router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import App from './App.vue'
import routes from './routes'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Buefy)

const router = new VueRouter({routes});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
